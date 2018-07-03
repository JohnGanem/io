var gulp = require('gulp');
var babel = require('gulp-babel');
var jshint = require('gulp-jshint');
var nodemon = require('gulp-nodemon');
var uglify = require('gulp-uglify');
var util = require('gulp-util');
var mocha = require('gulp-mocha');
var webpack = require('webpack-stream');
var fs = require('fs');


gulp.task('build', ['build-client', 'build-server', 'build-model', 'test']);

gulp.task('test', ['lint'], function () {
    gulp.src(['test/**/*.js'])
            .pipe(mocha());
});

gulp.task('lint', function () {
    return gulp.src(['**/*.js', '!node_modules/**/*.js', '!bin/**/*.js'])
            .pipe(jshint({
                esnext: true
            }))
            .pipe(jshint.reporter('default', {verbose: true}))
            .pipe(jshint.reporter('fail'));
});

gulp.task('build-client', ['lint', 'move-client'], function () {
    return gulp.src(['src/client/js/app.js'])
            .pipe(uglify())
            .pipe(webpack(require('./webpack.config.js')))
            .pipe(babel({
                presets: [
                    ['es2015', {'modules': false}]
                ]
            }))
            .pipe(gulp.dest('bin/client/js/'));
});

gulp.task('move-client', function () {
    return gulp.src(['src/client/**/*.*', '!client/js/*.js'])
            .pipe(gulp.dest('./bin/client/'));
});


gulp.task('build-server', ['lint'], function () {
    return gulp.src(['src/server/**/*.*', 'src/server/**/*.js'])
            .pipe(babel())
            .pipe(gulp.dest('bin/server/'));
});

gulp.task('build-model', ['lint'], function () {
    return gulp.src(['src/model/**/*.*', 'src/model/**/*.js'])
            .pipe(babel())
            .pipe(gulp.dest('bin/model/'));
});

gulp.task('watch', ['build'], function () {
    gulp.watch(['src/client/**/*.*'], ['build-client', 'move-client']);
    gulp.watch(['src/server/*.*', 'src/server/**/*.js'], ['build-server']);
    gulp.watch(['src/model/*.*', 'src/model/**/*.js'], ['build-model']);
    gulp.start('run-only');
});

gulp.task('run', ['build'], function () {
    var stream = nodemon({
        delay: 10,
        script: './bin/server/server.js',
        watch: "./src/",
        args: ["config.json"],
        ext: 'html js css json',
        tasks: ['build']
    })
            .on('restart', function () {
                util.log('Serveur redémarré !');
            })
            .on('crash', function () {
                util.log('Serveur crash !');
                stream.emit('restart', 10);  // restart the server in 10 seconds
            });
    return stream;
});

gulp.task('run-only', function () {
    var stream = nodemon({
        delay: 10,
        script: './server/server.js',
        cwd: "./bin/",
        args: ["config.json"],
        ext: 'html js css json'
    })
            .on('restart', function () {
                util.log('Serveur redémarré !');
            })
            .on('crash', function () {
                util.log('Serveur crash !');
                stream.emit('restart', 10);  // restart the server in 10 seconds
            });
    return stream;
});

gulp.task('default', ['run']);
