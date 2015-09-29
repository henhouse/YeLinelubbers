var stage, renderer;
var ship;
var enemyShip;
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
var answer;
var answerCorrect = 0;
var secondAnswer;
var secondAnswerCorrect = 0;
var distanceFrom;
var startPosition;
var style = {
    font : 'bold 50px Chelsea Market',
    fill : '#ffffff',
};
var stylePirate = {
    font : 'bold 25px Helvetica',
    fill : '#F7EDCA',
    dropShadow : true,
    dropShadowColor : '#000000',
    dropShadowAngle : Math.PI / 6,
    dropShadowDistance : 2,
    wordWrap : true,
    wordWrapWidth : 345
};

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
        stage.removeChild(startButton);
        stage.removeChild(playText);
        stage.removeChild(titleText);
        generateNumberLine();
        testScene();
    }
}

function testScene()
{
    startPosition = Math.floor((Math.random() * 22) - 10);
    answer = startPosition;
    makeShip();
    questionText = new PIXI.Text('Ahoy matey, let\'s get started! Place our ship at ' + startPosition, stylePirate);
    questionText.x = 650;
    questionText.y = 45;
    stage.addChild(questionText);
}

function generateNumberLine()
{
    // create a new graphics object
    var graphics = new PIXI.Graphics();
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
        } else if(currentNumber > -10 && currentNumber < 0){
            ppoo[array] = new PIXI.Text(currentNumber, {font: 'bold 25px Verdana'});
            ppoo[array].x = numxIncrement-5;
        } else if(currentNumber >= 0 && currentNumber < 10){
            ppoo[array] = new PIXI.Text(currentNumber, {font: 'bold 25px Verdana'});
            ppoo[array].x = numxIncrement+2;
        }
        ppoo[array].y = numY;
        stage.addChild(ppoo[array]);
        numxIncrement += increments;
        
        linexIncremented += increments;
        array++;
        
    }
    
    // add it the stage so we see it on our screens..
    stage.addChild(graphics);
    graphics.interactive = true;
}

function animate()
{
    requestAnimationFrame(animate);

    // render the container
    renderer.render(stage);
}

function makeShip()
{
    ship = PIXI.Sprite.fromImage('ship_final.png');
    ship.interactive = true;
    ship.buttonMode = true;
    ship.anchor.set(0.5);
    ship
        // drag start
        .on('mousedown', function(event) {
            this.data = event.data;
            this.dragging = true;
        })
        // drag end
        .on('mouseup', function() {
            this.dragging = false;
            this.data = null;
            var snapShip = getClosestNumber(this.position.x, this.position.y);
            if (snapShip != -1) {
                this.position.x = snapShip.x;
                this.position.y = snapShip.y-15;
                
            }
            //window.alert(answerCorrect);
            if (snapShip.number == answer && answerCorrect == 0) {
                cont();
            }else{
                wrongAns();
            }
        })
        // drag move
        .on('mousemove', function() {
            if (this.dragging)
            {
                var newPosition = this.data.getLocalPosition(this.parent);
                this.position.x = newPosition.x;
                this.position.y = newPosition.y;
            }
        });
    // initiallize the ship in its designated location
    ship.position.x = 200;
    ship.position.y = 400;
    
    stage.addChild(ship);
}

function makeEnemy()
{
    enemyShip = PIXI.Sprite.fromImage('ship_final.png');
    enemyShip.interactive = true;
    enemyShip.buttonMode = true;
    enemyShip.anchor.set(0.5);
    enemyShip
        // drag start
        .on('mousedown', function(event) {
            this.data = event.data;
            this.dragging = true;
        })
        // drag end
        .on('mouseup', function() {
            this.dragging = false;
            this.data = null;
            var snapShip = getClosestNumber(this.position.x, this.position.y);
            if (snapShip != -1) {
                this.position.x = snapShip.x;
                this.position.y = snapShip.y-15;
                
            }
            //window.alert(answerCorrect);
            if(snapShip.number == secondAnswer && secondAnswerCorrect == 0){
                cont2();
            }else{
                wrongAns();
            }
        })
        // drag move
        .on('mousemove', function() {
            if (this.dragging)
            {
                var newPosition = this.data.getLocalPosition(this.parent);
                this.position.x = newPosition.x;
                this.position.y = newPosition.y;
            }
        });
    // initiallize the ship in its designated location
    enemyShip.position.x = 200;
    enemyShip.position.y = 400;
    
    stage.addChild(enemyShip);
}

function getClosestNumber(x, y)
{
    var numlineAnswers = new Array();
    var range = (linexEnd-linexStart);
    for (var i = 0; i <= range; i++) {
        var currentNum = ((i/(range/20))-10);
        var currentX = i + linexStart;
        var currentY = liney - 60;
        var d = Math.sqrt( (currentX - x)*(currentX - x) + (currentY - y)*(currentY - y) );
        numlineAnswers.push( {distance: d, x: currentX, y: currentY, number: currentNum} );
    }
    
    var lowest_index = 0;
    var lowest_distance = numlineAnswers[0].distance;
    for (var i = 0; i < numlineAnswers.length; i+=increments) {
        if (numlineAnswers[i].distance < lowest_distance) {
            lowest_distance = numlineAnswers[i].distance;
            lowest_index = i;
        }
    }
    if (lowest_distance > 100) {
        return -1;
    }
    return numlineAnswers[lowest_index];
}

function cont()
{
    distanceFrom = Math.floor((Math.random() * 22) - 10);
    if (startPosition < 0) {
        while (distanceFrom + startPosition < - 20) {
            distanceFrom ++;
        }
    }
    if (startPosition > 20) {
        while (distanceFrom + startPosition > 20) {
            distanceFrom --;
        }
    }
    
    var findEm = distanceFrom - startPosition;
    
    secondAnswer = distanceFrom;
        
    answerCorrect = 1;
    stage.removeChild(questionText);
    questionText = new PIXI.Text('Yar! Our enemies be ' + findEm + ' away from us, find em for me!', stylePirate);
    questionText.x = 650;
    questionText.y = 45;
    stage.addChild(questionText);
    ship.interactive = false;
    makeEnemy();
}

function cont2(){
    secondAnswerCorrect = 1;
    stage.removeChild(questionText);
    questionText = new PIXI.Text('Good work, you took \'em down!', stylePirate);
    questionText.x = 650;
    questionText.y = 45;
    stage.addChild(questionText);
    enemyShip.interactive = false;
}

function wrongAns()
{
    stage.removeChild(questionText);
    questionText = new PIXI.Text('That\'s the wrong numer you scallywag! Try again.', stylePirate);
    questionText.x = 650;
    questionText.y = 45;
    stage.addChild(questionText);
}