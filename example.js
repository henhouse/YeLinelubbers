var renderer = PIXI.autoDetectRenderer(1000, 750,{backgroundColor : 0x1099bb});
document.body.appendChild(renderer.view);

// create the root of the scene graph
var stage = new PIXI.Container();

// create a texture from an image path
var texture = PIXI.Texture.fromImage('ship_final.png');

// create a new Sprite using the texture
var bunny = new PIXI.Sprite(texture);

// center the sprite's anchor point
bunny.anchor.x = 0.5;
bunny.anchor.y = 0.5;

// move the sprite to the center of the screen
bunny.position.x = 200;
bunny.position.y = 150;

stage.addChild(bunny);

var graphics = new PIXI.Graphics();

// draw a rounded rectangle
graphics.lineStyle(2, 0x242124, 1);
graphics.beginFill(0xFF00BB, 0.25);
graphics.drawRoundedRect(350, 350, 300, 100, 15);
graphics.endFill();
graphics.interactive = true;
stage.addChild(graphics);

var style = {
    font : 'bold 50px Verdana',
    fill : '#ffffff',
};

var playText = new PIXI.Text('PLAY', style);
playText.x = 430;
playText.y = 365;
stage.addChild(playText);

var startText = new PIXI.Text('Welcome to Linelubbers!', style);
startText.x = 200;
startText.y = 200;
stage.addChild(startText);


graphics.on('mousedown', onDown);

function onDown (eventData)
{
    generateNumberLine();
    stage.removeChild(graphics);
    stage.addChild(richText);
    stage.removeChild(playText);
    stage.removeChild(startText);
}

var style = {
    font : 'bold 25px Delitsch',
    fill : '#F7EDCA',
//    dropShadow : true,
//    dropShadowColor : '#000000',
//    dropShadowAngle : Math.PI / 6,
//    dropShadowDistance : 3,
    wordWrap : true,
    wordWrapWidth : 350
};

var richText = new PIXI.Text('Yar! Our enemies be at -5, we are at 10. SINK THEIR SHIP!', style);
richText.position.x = 650;
richText.position.y = 45;


function generateNumberLine(){
    // create a new graphics object
    var graphics = new PIXI.Graphics();
    var linexStart = 200;
    var linexEnd = 800;
    var linexIncremented = linexStart;
    var liney = 590;
    var interval = 50;
    var currentNumber = -11;
    // begin a green fill..
    //graphics.beginFill(0x00FF00);
    
    // width, color
    graphics.lineStyle(5, 0x000000);
    
    // draw a triangle using lines
    graphics.moveTo(linexStart,liney);
    graphics.lineTo(linexEnd, liney);
    
    for (var i = currentNumber; currentNumber < 10; currentNumber++)
    {
        if (currentNumber == -1 || currentNumber == -11 || currentNumber == 9)
        {
            graphics.moveTo(linexIncremented, liney-50);
            graphics.lineTo(linexIncremented, liney+50);
            
            if (currentNumber == -1)
            {
                var style = {
                    font : 'bold 25px Verdana',
                    fill : '#000000',
                };
                var zero = new PIXI.Text('0', style);
                zero.x = 492;
                zero.y = liney+50;
                stage.addChild(zero);
            }
        }
        else
        {
            graphics.moveTo(linexIncremented, liney-30);
            graphics.lineTo(linexIncremented, liney+30);
        }

        linexIncremented += 30;
    }
    
    // end the fill
    //graphics.endFill();
    
    // add it the stage so we see it on our screens..
    stage.addChild(graphics);
}

// start animating
animate();
function animate() {
    requestAnimationFrame(animate);

    // just for fun, let's rotate mr rabbit a little
    bunny.rotation += 0.1;

    // render the container
    renderer.render(stage);
}
