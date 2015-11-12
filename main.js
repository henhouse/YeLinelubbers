var stage, renderer;
var ship;
var graphics;
var enemyShip;
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

window.onload = function()
{
    renderer = PIXI.autoDetectRenderer(1000, 750,{backgroundColor : 0x1099bb});
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
    var startButton = new PIXI.Graphics();
    startButton = PIXI.Sprite.fromImage('Assets/Buttons/StartButton.png');
    startButton.interactive = true;
    startButton.buttonMode = true;
    startButton.anchor.set(0.5);
    startButton.x = 500;
    startButton.y = 365;
    startButton
        // on release
        .on('mouseup', function() {
            stage.removeChild(startButton);
            stage.removeChild(tutorialButton);
            stage.removeChild(leaderboardsButton);
            stage.removeChild(titleText);
            generateNumberLine();
            testScene();
        });

    stage.addChild(startButton);
    

    var tutorialButton = new PIXI.Graphics();
    tutorialButton = PIXI.Sprite.fromImage('Assets/Buttons/TutorialButton.png');
    tutorialButton.interactive = true;
    tutorialButton.buttonMode = true;
    tutorialButton.anchor.set(0.5);
    tutorialButton.x = 500;
    tutorialButton.y = 475;
    tutorialButton
        // on release
        .on('mouseup', function() {
            // generate tutorial
        });

    stage.addChild(tutorialButton);


    var leaderboardsButton = new PIXI.Graphics();
    leaderboardsButton = PIXI.Sprite.fromImage('Assets/Buttons/LeaderboardsButton.png');
    leaderboardsButton.interactive = true;
    leaderboardsButton.buttonMode = true;
    leaderboardsButton.anchor.set(0.5);
    leaderboardsButton.x = 500;
    leaderboardsButton.y = 585;
    leaderboardsButton
        // on release
        .on('mouseup', function() {
            // leaderboard code
        });

    stage.addChild(leaderboardsButton);


    var titleText = new PIXI.Text('Welcome to Linelubbers!', style);
    titleText.x = 200;
    titleText.y = 200;
    stage.addChild(titleText);


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
                music.setTexture(texture02);
            } else {
                titleMusic.play();
                onOrOff = 1;
                music.setTexture(texture01);
                
            }
        });
    stage.addChild(music);
    music.scale.x = 0.3;
    music.scale.y = 0.3;
}

function testScene()
{
    startPosition = Math.floor((Math.random() * 20) - 10);
    answer = startPosition;
    makeShotBox()
    makeShip();
    questionText = new PIXI.Text('Ahoy matey, let\'s get started! Place our ship at ' + startPosition, stylePirate);
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
        if(i > 9 || i < -9){
            ppoo[array] = new PIXI.Text(i, {font: 'bold 25px Verdana'});
            ppoo[array].x = numxIncrement-10;
        } else if(i > -10 && i < 0){
            ppoo[array] = new PIXI.Text(i, {font: 'bold 25px Verdana'});
            ppoo[array].x = numxIncrement-5;
        } else if(i >= 0 && i < 10){
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

    // render the container
    renderer.render(stage);
}

function makeShotBox(){
    shotBox[0] = new PIXI.Graphics();
    
    // draw a rounded rectangle
    shotBox[0].lineStyle(2, 0x242124, 1);
    shotBox[0].drawRoundedRect(50, 50, 300, 100, 15);
    stage.addChild(shotBox[0]);
    //draw the canonballs
    for(i=shotCount; i>0; i--){
        shotBox[i] = new PIXI.Graphics();
        shotBox[i].lineStyle(2, 0x242124, 1);
        shotBox[i].beginFill(0x000000, 1);
        shotBox[i].drawCircle(((i*100)), 100, 20);
        shotBox[i].endFill();
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
            if (snapShip != -1) {
                this.position.x = snapShip.x;
                this.position.y = snapShip.y-15;
            }
            //window.alert(answerCorrect);
            if(snapShip == -1){
                
            } else if (snapShip.number == answer && answerCorrect == 0) {
                section = cont();
            }else{
                section = wrongAns(1);
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
    
    if(winOrLose == 0){
        var titleText = new PIXI.Text('Our Ship is sunk!', style);
        titleText.x = 300;
        titleText.y = 200;
        stage.addChild(titleText);
    } else {
        var titleText = new PIXI.Text('Good work mate!', style);
        titleText.x = 300;
        titleText.y = 200;
        stage.addChild(titleText);
    }
    
    answerCorrect = 0;
    secondAnswerCorrect = 0;
    currentNumer = -10;
    numxIncrement = numX;
    linexIncremented = linexStart;
    shotCount = 3;
    restartButton.on('mousedown', onDown);

   function onDown(eventData)
    {
        stage.removeChild(restartButton);
        stage.removeChild(restartText);
        stage.removeChild(titleText);
        generateNumberLine();
        testScene();
    }
}