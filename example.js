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
    ship.position.x = 120;
    ship.position.y = 600;

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

    var questionText = new PIXI.Text('Yar! Our enemies be at -5, we are at -8. I won\'t rest until I see \'em hanging from the yardarm!', style);
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
    var lineLength = linexEnd - linexStart;
    var increments = lineLength/20;
    var liney = 675;
    var currentNumber = -10;
    var numX = linexStart-10;
    var numY = liney+40;
    var numxIncrement = numX;
    var ppoo = [];
    var array = 0;
    
    // width, color
    graphics.lineStyle(5, 0x000000);

    // draw horizontal line
    graphics.moveTo(linexStart, liney);
    graphics.lineTo(linexEnd, liney);

    // loop and create vertical lines
    for (var i = currentNumber; currentNumber <= 10; currentNumber++)
    {
        if (currentNumber == -0 || currentNumber == -10 || currentNumber == 10)
        {
            graphics.moveTo(linexIncremented, liney-30);
            graphics.lineTo(linexIncremented, liney+30);
        }
        else
        {
            graphics.moveTo(linexIncremented, liney-15);
            graphics.lineTo(linexIncremented, liney+15);
            
        }
        if(currentNumber > 9 || currentNumber < -9){
            ppoo[array] = new PIXI.Text(currentNumber, {font: 'bold 25px Verdana'});
            ppoo[array].x = numxIncrement-10;
            ppoo[array].y = numY;
            stage.addChild(ppoo[array]);
            numxIncrement += increments;
        } else if(currentNumber > -10 && currentNumber < 0){
            ppoo[array] = new PIXI.Text(currentNumber, {font: 'bold 25px Verdana'});
            ppoo[array].x = numxIncrement-5;
            ppoo[array].y = numY;
            stage.addChild(ppoo[array]);
            numxIncrement += increments;
        } else if(currentNumber >= 0 && currentNumber < 10){
            ppoo[array] = new PIXI.Text(currentNumber, {font: 'bold 25px Verdana'});
            ppoo[array].x = numxIncrement+2;
            ppoo[array].y = numY;
            stage.addChild(ppoo[array]);
            numxIncrement += increments;
        }
        linexIncremented += increments;
        array++;
        
    }
    
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
