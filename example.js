var renderer = PIXI.autoDetectRenderer(1024, 678,{backgroundColor : 0x1099bb});
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

stage.addChild(bunny);

var style = {
    font : 'bold 18px Delitsch',
    fill : '#F7EDCA',
//    dropShadow : true,
//    dropShadowColor : '#000000',
//    dropShadowAngle : Math.PI / 6,
//    dropShadowDistance : 3,
    wordWrap : true,
    wordWrapWidth : 400
};

var richText = new PIXI.Text('Yo, our enemies be at -5, we are at 1293. SINK THEIR SHIP!', style);
richText.x = 650;
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
