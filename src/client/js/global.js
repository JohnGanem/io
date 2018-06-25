module.exports = {
    borderDraw: true,
    gridDraw: true,
    spin: -Math.PI,
    enemySpin: -Math.PI,
    mobile: false,
    fishsSides: 20,

    // Canvas
    screenWidth: window.innerWidth,
    screenHeight: window.innerHeight,
    idDiv: 'cvs',
    
    
    gameWidth: 0,
    gameHeight: 0,
    playerBorder: 0,
    xoffset: -0,
    yoffset: -0,
    enteredGame: false,
    gameStart: false,
    disconnected: false,
    died: false,
    win: false,
    followPlayer: false,
    noPlayerToFollow: false,
    kicked: false,
    startPingTime: 0,
    willFollow: false,
    backgroundColor: '#f2fbff',
    lineColor: '#000000',
    initialBorderColor: '#DD0000'
};
