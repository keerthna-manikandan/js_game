//challege 1:your age in day

function reset() {
    document.getElementById('ageInDays').remove();
}

function ageInDays(){
   
    var birthyr= prompt("your birth year? ");
    var aged = (2020-birthyr)*365;
    var h1 = document.createElement('h1');
    var textAnswer = document.createTextNode("You are "+aged + " days old");
    h1.setAttribute('id','ageInDays');
    h1.appendChild(textAnswer);
    document.getElementById('flex-box-result').appendChild(h1);
    

}

//cat challenge

function generate(){
    var image = document.createElement('img');
    var div = document.getElementById('flex-cat');
    image.src = "http://thecatapi.com/api/images/get?format=src&type=gif&size=small";
    div.appendChild(image);
}

//rock paper scisor

function winner(human,bot){
    var rpsdb = {
         'rock': { 'scisor':1,'rock':0.5 ,'paper':0},
         'paper': { 'rock':1,'paper':0.5 ,'scisor':0},
         'scisor': { 'paper':1,'scisor':0.5 ,'rock':0}
    }

    var yourScore = rpsdb[human][bot];
    var compScore = rpsdb[bot][human];
    return [yourScore,compScore];
}


function rpsGame(yourChoice){
    console.log(yourChoice);
    var human,bot;
    human = yourChoice.id;
    bot = botchoice();
    let results = winner(human,bot);
    console.log(bot);
    console.log(results);
    let message = final(results);
    console.log(message);
    display(human,bot,message);
}

function botchoice(){
    var num = Math.floor(Math.random()*3);
    return ['rock','paper','scisor'][num];
}

function final([you,comp]){
    if(you === 1){
        return {
            'message':"YOU WIN",
            'color': "green"
        };
    }else if(you===0){
        return {
            'message': "YOU LOST",
            'color': "red"
        };
    }
    else{
        return {
            'message':"ITS A TIE",
            'color':"yellow"
        };
    }
}

function display(human,bot,fmessage){
    var db = {
        'rock' : "rock.png",
        'paper' : "paper.png",
        'scisor' : "scisorrs.png"
    };

    document.getElementById('rock').remove();
    document.getElementById('paper').remove();
    document.getElementById('scisor').remove();

    var humandiv = document.createElement('div');
    var botdiv = document.createElement('div');
    var messagediv = document.createElement('div');

    humandiv.innerHTML = "<img src='" + db[human] + "'height=150 width = 150 style = 'box-shadow: 0px 10px 50px rgba(37,50,233,1);'>"
    var box = document.getElementById('flex-box-rps');
    box.append(humandiv);

    messagediv.innerHTML = "<h1 style ='color: "+fmessage['color'] + "; font-size:60px; padding: 30px;'>"+fmessage['message']+"</h1>"
    box.append(messagediv);

    botdiv.innerHTML = "<img src='" + db[bot] + "'height=150 width = 150 style = 'box-shadow: 0px 10px 50px rgba(243,38,24,1);'>"
    box.append(botdiv);
}

//button color change

var allbut =document.getElementsByTagName('button');
let resetc = [];
for(let i=0;i<allbut.length;i++){
    resetc.push(allbut[i].classList[1]);
}

function colchange(but){
    if(but.value === 'red'){
        butred();
    }else if(but.value === 'green'){
        butgreen();
    }else if(but.value === 'reset'){
        butreset();
    }else if(but.value === 'random'){
        butrandom();
    }
}

function butred(){
    for(let i=0;i<allbut.length;i++){
        allbut[i].classList.remove(allbut[i].classList[1]);
        allbut[i].classList.add('btn-danger');       
    }
    
}

function butgreen(){
    for(let i=0;i<allbut.length;i++){
        allbut[i].classList.remove(allbut[i].classList[1]);
        allbut[i].classList.add('btn-success');       
    }
    
}

function butreset(){
    for(let i=0;i<allbut.length;i++){
        allbut[i].classList.remove(allbut[i].classList[1]);
        allbut[i].classList.add(resetc[i]);       
    }
    
}

function butrandom(){  
    var x = Math.floor(Math.random()*7);
    let b = ['btn-primary','btn-secondary','btn-success','btn-danger','btn-warning','btn-info','btn-dark'];
    for(let i=0;i<allbut.length;i++){        
        allbut[i].classList.remove(allbut[i].classList[1]);
        allbut[i].classList.add(b[x]);       
    }    
}

//blackjack
let wins=0;
let lost=0;
let draw=0;
let bjGame = {
    'you' : {
        'scoreSpan': '#your-result',
        'div': '#your-box',
        'score':0
    },
    'dealer' : {
        'scoreSpan': '#dealer-result',
        'div': '#dealer-box',
        'score':0
    },

    'imgSrc':['K.png','Q.png','J.png','A.png','2.png','3.png','4.png','5.png',
    '6.png','7.png','8.png','9.png','10.png'],

    'imgScore': [10,10,10,1,2,3,4,5,6,7,8,9,10],
    'isStand':false,
    'turnsOver': false  ,
    'hitOver': false  
}; 

const YOU = bjGame['you'];
const DEALER = bjGame['dealer'];

const hitSound = new Audio("swish.m4a");
const lostSound = new Audio("aww.mp3");
const winSound = new Audio("cash.mp3");

document.querySelector('#bj-hit').addEventListener('click',hit);
document.querySelector('#bj-stand').addEventListener('click',stand);
document.querySelector('#bj-deal').addEventListener('click',deal);

function hit(){
    if(bjGame['isStand']===false)
    {showCard(YOU);
        bjGame['hitOver']=true;
    }
}

function showCard(activeplayer){
    let b = Math.floor(Math.random()*13);
    if(activeplayer['score']<=21){
        
        showScore(activeplayer,bjGame['imgScore'][b]);
        let cardImg = document.createElement('img');
        cardImg.src= bjGame['imgSrc'][b];
        document.querySelector(activeplayer['div']).appendChild(cardImg);
        hitSound.play();
    }
    else{
        document.querySelector(activeplayer['scoreSpan']).textContent = 'BUST';
        document.querySelector(activeplayer['scoreSpan']).style.color = 'red';
    }
}

function deal(){
    if(bjGame['turnsOver']===true){
        let yourImg = document.querySelector('#your-box').querySelectorAll('img');
        let dealerImg = document.querySelector('#dealer-box').querySelectorAll('img');

        for(let i=0;i<yourImg.length;i++){
            yourImg[i].remove();
        }
        for(let i=0;i<dealerImg.length;i++){
            dealerImg[i].remove();
        }
        let scoreDis = document.querySelector(YOU['scoreSpan']).textContent=0;
        YOU['score']=0
        scoreDis = document.querySelector(DEALER['scoreSpan']).textContent=0;
        DEALER['score']=0;
        document.querySelector(YOU['scoreSpan']).style.color='white';
        document.querySelector(DEALER['scoreSpan']).style.color = 'white';
        document.querySelector('#bj-result').textContent = "Lets Play!";
        document.querySelector('#bj-result').style.color = "black";    
        bjGame['isStand']=bjGame['turnsOver']=bjGame['turnsOver']=false;

    }
}

function showScore(player,s){
    if((s===1) && (player['score']+11<=21)){
        s=11;
    }
    player['score'] +=s;
    let scoreDis = document.querySelector(player['scoreSpan']);
    
    scoreDis.innerHTML = player['score'];
}

function sleep(ms){
    return new Promise(resolve => setTimeout(resolve,ms));
}

async function stand(){
    if(bjGame['hitOver']===true){
        bjGame['isStand']=true;
        while(DEALER['score']<15){
            showCard(DEALER);
            await sleep(1000);
        }
            
        bjGame['turnsOver']=true;
        bjGame['hitOver']=false;
        computeWinner();  
    }
}

function computeWinner(){
    let winner;
    if(YOU['score']<=21){
        if(DEALER['score']>=21 || YOU['score']>DEALER['score']){
            wins ++;
            winSound.play();
            console.log('you won');
           document.querySelector('#bj-result').textContent = "YOU WON!";
           document.querySelector('#bj-result').style.color = "green";
           document.querySelector('#wins').textContent =wins;
        }
        else if(DEALER['score']>=21  || (DEALER['score'] === YOU['score'])){
            draw++;
            console.log('you drew');
            document.querySelector('#bj-result').textContent = "ITS A DRAW!";
            document.querySelector('#bj-result').style.color = "yellow";
            document.querySelector('#draws').textContent = draw;
        }
        
        else{
            lost++;
            console.log('you lost');
            document.querySelector('#bj-result').textContent = "YOU LOST!";
           document.querySelector('#bj-result').style.color = "red";
           document.querySelector('#loses').textContent = lost;
           lostSound.play();
        }
    }
    else if(YOU['score']>21 && DEALER['score']<=21){
        lost++;
        lostSound.play();
        console.log('you lost');
        document.querySelector('#bj-result').textContent = "YOU LOST!";
       document.querySelector('#bj-result').style.color = "red";
       document.querySelector('#loses').textContent = lost;
    }
    else if(YOU['score']>21 && DEALER['score']>21){
        draw++;
        console.log('you drew');
        document.querySelector('#bj-result').textContent = "ITS A DRAW!";
        document.querySelector('#bj-result').style.color = "yellow";
        document.querySelector('#draws').textContent = draw; 
    }
}

