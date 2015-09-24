var stage, renderer;

function startMenu()
{
    var startButton = new PIXI.Graphics();

    // draw a rounded rectangle
    startButton.lineStyle(2, 0x242124, 1);
    startButton.beginFill(0xFF00BB, 0.25);
    startButton.drawRoundedRect(350, 350, 300, 100, 15);
    startButton.endFill();
    startButton.interactive = true;
    stage.addChild(startButton);

    var style = {
        font : 'bold 50px Chelsea Market',
        fill : '#ffffff',
    };
    var playText = new PIXI.Text('PLAY', style);
    playText.x = 430;
    playText.y = 365;
    stage.addChild(playText);


    var titleText = new PIXI.Text('Welcome to Linelubbers!', style);
    titleText.x = 200;
    titleText.y = 200;
    stage.addChild(titleText);

    startButton.on('mousedown', onDown);

    function onDown(eventData)
    {
        generateNumberLine();
        stage.removeChild(startButton);
        stage.removeChild(playText);
        stage.removeChild(titleText);
        testScene();
    }
}

function testScene()
{
    // create a texture from an image path
    var shipTexture = PIXI.Texture.fromImage('ship_final.png');

    // create a new Sprite using the texture
    var ship = new PIXI.Sprite(shipTexture);
    stage.addChild(ship);

    // center the sprite's anchor point
    ship.anchor.x = 0.5;
    ship.anchor.y = 0.5;

    // move the sprite to the center of the screen
    ship.position.x = 20;
    ship.position.y = 590;

    var style = {
        font : 'bold 25px Helvetica',
        fill : '#F7EDCA',
        dropShadow : true,
        dropShadowColor : '#000000',
        dropShadowAngle : Math.PI / 6,
        dropShadowDistance : 2,
        wordWrap : true,
        wordWrapWidth : 345
    };

    var questionText = new PIXI.Text('Yar! Our enemies be at -5, we are at 10. I won\'t rest until I see a hanging from the yardarm!', style);
    questionText.position.x = 650;
    questionText.position.y = 45;
    stage.addChild(questionText);
    }

function generateNumberLine(){
    // create a new graphics object
    var graphics = new PIXI.Graphics();
    var linexStart = 20;
    var linexEnd = 980;
    var linexIncremented = linexStart;
    var liney = 675;
    var interval = 48;
    var currentNumber = -11;

    // width, color
    graphics.lineStyle(5, 0x000000);

    // draw horizontal line
    graphics.moveTo(linexStart, liney);
    graphics.lineTo(linexEnd, liney);

    // loop and create vertical lines
    for (var i = currentNumber; currentNumber < 10; currentNumber++)
    {
        if (currentNumber == -1 || currentNumber == -11 || currentNumber == 9)
        {
            graphics.moveTo(linexIncremented, liney-30);
            graphics.lineTo(linexIncremented, liney+30);
        }
        else
        {
            graphics.moveTo(linexIncremented, liney-15);
            graphics.lineTo(linexIncremented, liney+15);
        }

        linexIncremented += 48;
    }

        var zero = new PIXI.Text('0', {font: 'bold 25px Verdana'});
        zero.x = 491;
        zero.y = 710;
        stage.addChild(zero);
    
    // add it the stage so we see it on our screens..
    stage.addChild(graphics);
}


window.onload = function()
{
    renderer = PIXI.autoDetectRenderer(1000, 750,{backgroundColor : 0x1099bb});
    document.getElementById('game').appendChild(renderer.view);
    // create the root of the scene graph
    stage = new PIXI.Container();

    // call first scene
    startMenu();

    // start animating
    animate();
}


function animate() {
    requestAnimationFrame(animate);

    // render the container
    renderer.render(stage);
}
