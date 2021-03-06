/***********************
~ YE LINELUBBERS ~

A game made by Henry Henderson, Kyle Garner, Gunnar Bearley, Andy Thornburg, Rob Martin III for CSCI 373 Software Engineering as a game to help 7th graders 
in North Carolina practice the number line.

LICENSE: GPLv2

************************/

var stage, renderer;
var height = 750;
var width = 1000;
var ship;
var graphics;
var enemyShip;
var startShip;
var logo;
var startButton;
var creditsText;
var questionText;
var questionTextX = 625;
var questionTextY = 45;
var scoreText;
var scoreTextX = 375;
var scoreTextY = 75;
var numberline;
var ppoo = [];
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
var score = 100;
var shotCount = 3;
var shotBox = [];
var distanceFrom;
var startPosition;
var onOrOff;
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
var creditsStyle = {
    font : 'bold 12px Arial',
    fill : '#F7EDCA',
    dropShadow : true,
    dropShadowColor : '#000000',
    dropShadowAngle : Math.PI / 6,
    dropShadowDistance : 1,
    wordWrap : true,
    wordWrapWidth : 50
};

window.onload = function()
{
    renderer = PIXI.autoDetectRenderer(width, height,{backgroundColor : 0x1099bb});
    document.getElementById('game').appendChild(renderer.view);
    // create the root of the scene graph
    stage = new PIXI.Container();

    var background = PIXI.Sprite.fromImage('Assets/Backgrounds/FinalBackground.png');
    background.width = renderer.width;
    background.height = renderer.height;
    stage.addChild(background);

    // call first scene
    startMenu();

    // start animating
    animate();
}

function startMenu()
{
    logo = new PIXI.Graphics();
    logo = PIXI.Sprite.fromImage('Assets/Buttons/Title.png');
    logo.interactive = false;
    logo.buttonMode = false;
    logo.anchor.set(0.5);
    logo.x = 510;
    logo.y = 380;
    logo.alpha = 0.1;
    stage.addChild(logo);


    // Random ship going by
    startShip = PIXI.Sprite.fromImage('Assets/Ships/BadGuyShip.png');
    startShip.x = 900;
    startShip.y = 350;
    stage.addChild(startShip);


    startButton = new PIXI.Graphics();
    startButton = PIXI.Sprite.fromImage('Assets/Buttons/newStart.png');
    startButton.interactive = true;
    startButton.buttonMode = true;
    startButton.anchor.set(0.5);
    startButton.x = 500;
    startButton.y = 675;
    startButton.alpha = 0.0;
    startButton
        // on release
        .on('mouseup', function() {
            stage.removeChild(startButton);
            stage.removeChild(startShip);
            stage.removeChild(logo);
            stage.removeChild(creditsText);
            generateNumberLine();
            testScene();
        });

    stage.addChild(startButton);


    // Music by YouTuber Ross Bugden
    // https://www.youtube.com/watch?v=hVBgKCYrI-c
    var titleMusic = new Howl({
        urls: ['Assets/Music/ThemeMusic.mp3'],
        autoplay: true,
        loop: true,
        volume: 0.5
    });

    var texture01 = PIXI.Texture.fromImage('Assets/Buttons/Volume_On.png');
    var texture02 = PIXI.Texture.fromImage('Assets/Buttons/Volume_Off.png');

    onOrOff = 1;
    var music = new PIXI.Sprite(texture01);
    music.interactive = true;
    music.buttonMode = true;
    music.x = 980;
    music.y = 5;
    music
        .on('mouseup', function() {
            if(onOrOff == 1){
                titleMusic.pause();
                onOrOff = 0;
                music.texture = texture02;
            } else {
                titleMusic.play();
                onOrOff = 1;
                music.texture = texture01;

            }
        });
    stage.addChild(music);
    music.scale.x = 0.3;
    music.scale.y = 0.3;

    creditsText = new PIXI.Text('π', creditsStyle);
    creditsText.x = 5;
    creditsText.y = 730;
    creditsText.alpha = 0;
    creditsText.interactive = true;
    creditsText.buttonMode = true;
    creditsText
        .on('mouseup', function() {
            creditsScene();
            stage.removeChild(startShip);
            stage.removeChild(logo);
            stage.removeChild(creditsText);
            stage.removeChild(startButton);
    });
    stage.addChild(creditsText);
}

function creditsScene()
{
    var credits = new PIXI.Text("Authors", {font: 'bold 65px Verdana', fill : '#FFF'});
    credits.x = width/2-130;
    credits.y = height/2-200;
    stage.addChild(credits);

    var names = new PIXI.Text("Henry Henderson Kyle Garner Gunnar Bearley Andy Thornburg Rob Martin III", {font: 'bold 25px Verdana', fill : '#FFF', wordWrap : true, wordWrapWidth : 275, dropShadow : true, dropShadowColor : '#000000', dropShadowAngle : Math.PI / 6, dropShadowDistance : 1});
    names.x = width/2-110;
    names.y = height/2+70;
    stage.addChild(names);

    var backButton = new PIXI.Text("< Back", {font: 'bold 25px Verdana', fill : '#FFF'});
    backButton.interactive = true;
    backButton.buttonMode = true;
    backButton.anchor.set(0.5);
    backButton.x = 500;
    backButton.y = 675;
    backButton
        // on release
        .on('mouseup', function() {
            stage.removeChild(backButton);
            stage.removeChild(names);
            stage.removeChild(credits);
            startMenu();
        });
    stage.addChild(backButton);
}

function testScene()
{
    startPosition = Math.floor((Math.random() * 20) - 10);
    answer = startPosition;
    makeShotBox()
    makeShip();
    questionText = new PIXI.Text('Ahoy matey, let\'s get started! Drag and place our ship at ' + startPosition, stylePirate);
    questionText.x = questionTextX;
    questionText.y = questionTextY;
    stage.addChild(questionText);
    scoreText = new PIXI.Text("Score: " + score, stylePirate);
    scoreText.x = scoreTextX;
    scoreText.y = scoreTextY;
    stage.addChild(scoreText);
}

function generateNumberLine()
{
    var array = 0;
    // create a new graphics object
    graphics = new PIXI.Graphics();
    // width, color
    graphics.lineStyle(5, 0x000000);

    // draw horizontal line
    graphics.moveTo(linexStart, liney);
    graphics.lineTo(linexEnd, liney);

    // loop and create vertical lines
    for (var i = currentNumber; i <= 10; i++)
    {
        if (i == 0 || i == -10 || i == 10)
        {
            graphics.moveTo(linexIncremented, liney-30);
            graphics.lineTo(linexIncremented, liney+30);
        }
        else
        {
            graphics.moveTo(linexIncremented, liney-15);
            graphics.lineTo(linexIncremented, liney+15);

        }
        if (i > 9 || i < -9)
        {
            ppoo[array] = new PIXI.Text(i, {font: 'bold 25px Verdana'});
            ppoo[array].x = numxIncrement-10;
        }
        else if (i > -10 && i < 0)
        {
            ppoo[array] = new PIXI.Text(i, {font: 'bold 25px Verdana'});
            ppoo[array].x = numxIncrement-5;
        }
        else if (i >= 0 && i < 10)
        {
            ppoo[array] = new PIXI.Text(i, {font: 'bold 25px Verdana'});
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
    //graphics.interactive = true;
    //currentNumber = -10;
    //linexIncremented = linexStart;
    //numxIncrement = numX;
}

function animate()
{
    requestAnimationFrame(animate);

    // make start screen ship slowly move to the left
    startShip.x -= 0.25;

    if (logo.alpha < 1.0)
        logo.alpha += 0.01;

    if (startButton.alpha < 1.0)
        startButton.alpha += 0.01;

    if (creditsText.alpha < 1.0)
        creditsText.alpha += 0.01;

    // render the container
    renderer.render(stage);
}

function makeShotBox()
{
    shotBox[0] = new PIXI.Graphics();

    // draw a rounded rectangle
    shotBox[0].lineStyle(2, 0x242124, 1);
    shotBox[0].drawRoundedRect(50, 50, 300, 75, 15);
    stage.addChild(shotBox[0]);
    //draw the canonballs
    for (i=shotCount; i>0; i--)
    {
        shotBox[i] = PIXI.Sprite.fromImage('Assets/Sprites/BombSprite.png');
        shotBox[i].scale.x = 0.5;
        shotBox[i].scale.y = 0.5;
        shotBox[i].x = (i*87);
        shotBox[i].y = 65;
        stage.addChild(shotBox[i]);
    }
    shotBox[4] = new PIXI.Text('Cannonballs Left', stylePirate);
    shotBox[4].x = 100;
    shotBox[4].y = 10;
    stage.addChild(shotBox[4]);
}

function makeShip()
{
    var section = 1;
    ship = PIXI.Sprite.fromImage('Assets/Ships/BadGuyShip.png');
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
            //console.log(snapShip);
            if (snapShip != -1)
            {
                this.position.x = snapShip.x;
                this.position.y = snapShip.y-15;
            }
            //window.alert(answerCorrect);
            if (snapShip == -1)
            {
                // um, hello?
                // what is this if statement? LOL
            }
            else if (snapShip.number == answer && answerCorrect == 0)
                section = cont();
            else
                section = wrongAns(1);
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
    ship.position.x = 750;
    ship.position.y = 455;

    stage.addChild(ship);
}

function makeEnemy()
{
    enemyShip = PIXI.Sprite.fromImage('Assets/Ships/Ship.png');
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
            //console.log(snapShip);
            if (snapShip != -1) {
                this.position.x = snapShip.x;
                this.position.y = snapShip.y-15;
            }
            //window.alert(answerCorrect);
            if(snapShip == -1){

            } else if(snapShip.number == secondAnswer && secondAnswerCorrect == 0){
                cont2();
            }else{
                wrongAns(2);
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
    enemyShip.position.x = 750;
    enemyShip.position.y = 455;

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
    var direction;
    distanceFrom = Math.floor((Math.random() * 20) - 10);
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
    if(findEm < 0){
        findEm = findEm * -1;
        direction = "negative"
    } else {
        direction = "positive"
    }
    secondAnswer = distanceFrom;

    answerCorrect = 1;
    score += 10;
    stage.removeChild(scoreText);
    stage.removeChild(questionText);
    scoreText = new PIXI.Text("Score: " + score, stylePirate);
    scoreText.x = scoreTextX;
    scoreText.y = scoreTextY;
    questionText = new PIXI.Text('Yar! Our enemies be ' + findEm + ' away from us in the ' + direction + ' direction, find em for me!', stylePirate);
    questionText.x = questionTextX;
    questionText.y = questionTextY;
    stage.addChild(questionText);
    stage.addChild(scoreText);
    ship.interactive = false;
    addShot();
    makeEnemy();
    return(2);
}

function cont2()
{
    secondAnswerCorrect = 1;
    score += 10;
    addShot();
    stage.removeChild(scoreText);
    stage.removeChild(questionText);
    scoreText = new PIXI.Text("Score: " + score, stylePirate);
    scoreText.x = scoreTextX;
    scoreText.y = scoreTextY;
    questionText = new PIXI.Text('Good work, you took \'em down!', stylePirate);
    questionText.x = questionTextX;
    questionText.y = questionTextY;
    stage.addChild(questionText);
    stage.addChild(scoreText);
    enemyShip.interactive = false;
    youLose(1);
}

function wrongAns(section)
{
    var direction;
    var findEm = distanceFrom - startPosition;
    if(findEm < 0){
        findEm = findEm * -1;
        direction = "negative"
    } else {
        direction = "positive"
    }
    score-=10;
    stage.removeChild(scoreText);
    stage.removeChild(questionText);
    scoreText = new PIXI.Text("Score: " + score, stylePirate);
    scoreText.x = scoreTextX;
    scoreText.y = scoreTextY;
    if(section == 1){
        questionText = new PIXI.Text('That\'s the wrong numer you scallywag! Place our ship at ' + startPosition + '.', stylePirate);
    } else if (section == 2){
        questionText = new PIXI.Text('That\'s the wrong numer you scallywag! Our enemies be ' + findEm + ' away from us in the ' + direction + ' direction.', stylePirate);
    }
    questionText.x = questionTextX;
    questionText.y = questionTextY;
    stage.addChild(questionText);
    stage.addChild(scoreText);
    if(section != 1){
        subtractShot();
    }
}
function addShot()
{
    if(shotCount < 3){
        shotCount++;
        stage.addChild(shotBox[shotCount]);
    }
}
function subtractShot()
{
    stage.removeChild(shotBox[shotCount]);
    shotCount--;
    if(shotCount <= 0){
        youLose(0);
    }

}

function youLose(winOrLose)
{
    //clear the stage
    stage.removeChild(ship);
    stage.removeChild(enemyShip);
    stage.removeChild(graphics);
    stage.removeChild(questionText);
    stage.removeChild(scoreText);
    for(i=0; i<ppoo.length;i++){
        stage.removeChild(ppoo[i]);
    }
    for(i=0; i<shotBox.length;i++){
        stage.removeChild(shotBox[i]);
    }
    var restartButton = new PIXI.Graphics();



    if (winOrLose == 0)
    {
        // draw a rounded rectangle
        restartButton.lineStyle(2, 0x242124, 1);
        restartButton.beginFill(0xFF00BB, 0.25);
        restartButton.drawRoundedRect(350, 450, 300, 100, 15);
        restartButton.endFill();
        restartButton.interactive = true;
        stage.addChild(restartButton);

        var restartText = new PIXI.Text('Restart?', style);
        restartText.x = 400;
        restartText.y = 465;
        stage.addChild(restartText);

        var titleText = new PIXI.Text('Our Ship is sunk!', style);
        titleText.x = 300;
        titleText.y = 200;
        stage.addChild(titleText);

        answerCorrect = 0;
        secondAnswerCorrect = 0;
        currentNumber = -10;
        numxIncrement = numX;
        linexIncremented = linexStart;
        shotCount = 3;
    }
    else
    {
        var titleText = new PIXI.Text('Good work, mate!', style);
        titleText.x = 300;
        titleText.y = 200;
        stage.addChild(titleText);

        answerCorrect = 0;
        secondAnswerCorrect = 0;
        currentNumber = -10;
        numxIncrement = numX;
        linexIncremented = linexStart;
        shotCount = 3;

        setTimeout(generateNumberLine, 1500);
        setTimeout(testScene, 1500);
        setTimeout(removeText, 1500);
    }


    restartButton.on('mousedown', onDown);

   function onDown(eventData)
    {
        stage.removeChild(restartButton);
        stage.removeChild(restartText);
        stage.removeChild(titleText);
        generateNumberLine();
        testScene();
    }
    function removeText()
    {
        stage.removeChild(titleText);
    }
}
