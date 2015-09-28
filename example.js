var stage, renderer;
var questionText;
var numberine;
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
var answer = -8;
var secondAnswer = -3;
var style = {
    font : 'bold 50px Chelsea Market',
    fill : '#ffffff',
};

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
        init_ship();
    }
}

function testScene(){
    var style = {
        font : 'bold 25px Helvetica',
        fill : '#F7EDCA',
        dropShadow : true,
        dropShadowColor : '#000000',
        dropShadowAngle : Math.PI / 6,
        dropShadowDistance : 2,
        wordWrap : true,
        wordWrapWidth : 375
    };

    questionText = new PIXI.Text('Ahoy! Place our ship at -8', style);
    questionText.x = 650;
    questionText.y = 45;
    stage.addChild(questionText);
}

function generateNumberLine(){
    // create a new graphics object
    var graphics = new PIXI.Graphics();
    numberLine = new PIXI.Graphics();
    var ppoo = [];
    var array = 0;
    // width, color
    graphics.lineStyle(5, 0x000000);
    numberLine.lineStyle(5, 0x000000);

    // draw horizontal line
    numberLine.moveTo(linexStart, liney);
    numberLine.lineTo(linexEnd, liney);

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
    stage.addChild(numberLine);
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

function init_ship(){
    ship = PIXI.Sprite.fromImage('./ship_final.png');
    ship.interactive = true;
    ship.buttonMode = true;
    ship.anchor.set(0.5);
    ship
        // events for drag start
        .on('mousedown', function(event) {
            this.data = event.data;
            //this.alpha = 0.5;
            this.dragging = true;
        })
        // events for drag end
        .on('mouseup', function() {
            //this.alpha = 1;
            this.dragging = false;
            // set the interaction data to null
            this.data = null;
            var snap_object = numberLine_getClosestNumber(this.position.x, this.position.y);
            if (snap_object != -1) {
                this.position.x = snap_object.x;
                this.position.y = snap_object.y-15;
                
            }
            console.log(snap_object);
            if (snap_object.number == answer) {
                cont();
            } else{
                wrongAns();
            }
        })
        // events for drag move
        .on('mousemove', function() {
            if (this.dragging)
            {
                var newPosition = this.data.getLocalPosition(this.parent);
                this.position.x = newPosition.x;
                this.position.y = newPosition.y;
            }
        });
    // move the sprite to its designated position
    ship.position.x = 200;
    ship.position.y = 400;
    
    stage.addChild(ship);
}

function numberLine_getClosestNumber(x, y) {
    var answerNums = new Array();
    var range = (linexEnd-linexStart);
    for (var i = 0; i <= range; i++) {
        var numline_num = ((i/(range/20))-10);
        var numline_x = i + linexStart;
        var numline_y = liney - 60;
        var d = Math.sqrt( (numline_x - x)*(numline_x - x) + (numline_y - y)*(numline_y - y) );
        answerNums.push( {distance: d, x: numline_x, y: numline_y, number: numline_num} );
    }
    
    var lowest_index = 0;
    var lowest_distance = answerNums[0].distance;
    for (var i = 0; i < answerNums.length; i+=increments) {
        if (answerNums[i].distance < lowest_distance) {
            lowest_distance = answerNums[i].distance;
            lowest_index = i;
        }
    }
    if (lowest_distance > 100) {
        return -1;
    }
    return answerNums[lowest_index];
}

function cont(){
    var style = {
        font : 'bold 25px Helvetica',
        fill : '#F7EDCA',
        dropShadow : true,
        dropShadowColor : '#000000',
        dropShadowAngle : Math.PI / 6,
        dropShadowDistance : 2,
        wordWrap : true,
        wordWrapWidth : 375
    };
    stage.removeChild(questionText);
    questionText = new PIXI.Text('Yar! Our enemies be 3 away from us in the positive direction, find em for me!', style);
    questionText.x = 650;
    questionText.y = 45;
    stage.addChild(questionText);
}

function wrongAns(){
    
}