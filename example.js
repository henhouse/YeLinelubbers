var renderer = PIXI.autoDetectRenderer(1000, 750,{backgroundColor : 0x1099bb});
document.body.appendChild(renderer.view);

// create the root of the scene graph
var stage = new PIXI.Container();

// create a texture from an image path
var texture = PIXI.Texture.fromImage('obama.png');

// create a new Sprite using the texture
var bunny = new PIXI.Sprite(texture);

// center the sprite's anchor point
bunny.anchor.x = 0.5;
bunny.anchor.y = 0.5;

// move the sprite to the center of the screen
bunny.position.x = 200;
bunny.position.y = 150;

//stage.addChild(bunny);

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


graphics.on('mousedown', onDown);

function onDown (eventData)
{
    console.log("I was pressed.");
}

var style = {
    font : 'bold 50px Delitsch',
    fill : '#F7EDCA',
//    dropShadow : true,
//    dropShadowColor : '#000000',
//    dropShadowAngle : Math.PI / 6,
//    dropShadowDistance : 3,
    wordWrap : true,
    wordWrapWidth : 400
};

var richText = new PIXI.Text('Ye Linelubbers!', style);
richText.x = 310;
richText.y = 45;

stage.addChild(richText);

// start animating
animate();
function animate() {
    requestAnimationFrame(animate);

    // just for fun, let's rotate mr rabbit a little
    bunny.rotation += 0.1;

    // render the container
    renderer.render(stage);
}
