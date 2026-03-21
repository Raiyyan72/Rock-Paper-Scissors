let userscore = 0;
let compscore = 0;
let msg = document.querySelector("#msg");

const winsound = new Audio("winsound.mp3");
const drawsound = new Audio("drawsound.mp3");
const clicksound = new Audio("click-sound.mp3");
const losesound = new Audio("losesound.mp3");

const openingPage = document.getElementById("opening-page");
const gamePage = document.getElementById("game-page");
const startBtn = document.getElementById("start-game-btn");


const userscorepra= document.querySelector("#score-you");
const compscorepra= document.querySelector("#comp-score");

const choices = document.querySelectorAll(".choice");

const button = document.querySelector("#button");

const bgmusic = document.getElementById("bgmusic");
bgmusic.volume=0.2;
bgmusic.play();

const musicbtn = document.querySelector("#musicbtn");


const resetbtn = ()=>{
    userscore = 0;
    compscore = 0;
    losesound.pause();
    drawsound.pause();
    winsound.pause();
}
window.addEventListener("click", () => {
    bgmusic.play();
}, { once: true });


const gencompchoice = ()=>{
    const options =["rock","paper", "scissors"]
  const randidx = Math.floor(Math.random()*3);
  return options[randidx]

} 

const drawgame = ()=>{
     drawsound.currentTime = 0;
    drawsound.play();
    msg.innerText = "Match was Draw , Play once again:"
     msg.style.backgroundColor= "#ADD8E6";
}

const showwinner = (userwin , userchoice,compchoice)=>{
    if(userwin){
        userscore++;
        userscorepra.innerText = userscore;

        winsound.currentTime = 0;
    winsound.play();

        msg.innerText =`You win! Your ${userchoice} Beats ${compchoice}`;
        msg.style.backgroundColor= "green";
        }else{
            losesound.currentTime = 0;
            losesound.play();
            compscore++;
            compscorepra.innerText = compscore;
         msg.innerText =`You Lost! ${compchoice} Beats Your ${userchoice}:`;
         msg.style.backgroundColor= "Red";
    }

}

const playgame = (userchoice)=>{
    const compchoice = gencompchoice();

    if(userchoice === compchoice){
        drawgame();
    }else {
        let userwin = true;
        if(userchoice==="rock"){
            userwin=compchoice==="paper" ? false:true;
        }else if(userchoice==="paper"){
            userwin=compchoice==="scissors"?false:true;
        }else{
            userwin = compchoice ==="rock"?false:true;
        }
       showwinner(userwin ,userchoice,compchoice);
    }

 
} 

choices.forEach((choice)=>{
    choice.addEventListener("click",()=>{
         clicksound.currentTime = 0; 
        clicksound.play();
        
 losesound.pause();
    drawsound.pause();
    winsound.pause();


        const userchoice = choice.getAttribute("id");
        console.log("User Choice = " , userchoice)
        playgame(userchoice);
    })
})

button.addEventListener("click",()=>{
    resetbtn();
     userscorepra.innerText = userscore;
    compscorepra.innerText = compscore;

    msg.innerText = "Game Reset , Play new Game!";
    msg.style.backgroundColor = "#C6AC8F";
});

musicbtn.addEventListener("click", () => {
    if (bgmusic.paused) {
        bgmusic.play();
        musicbtn.innerText = "Pause Music";
    } else {
        bgmusic.pause();
        musicbtn.innerText = "Play Music";
    }
});


startBtn.addEventListener("click", () => {
  openingPage.style.display = "none";  
  gamePage.style.display = "block";  
  bgmusic.play(); 
});





const exitBtn = document.getElementById("exit-btn");

exitBtn.addEventListener("click", () => {
    // Hide game page
    gamePage.style.display = "none";

    // Show opening/start page
    openingPage.style.display = "block";

    //reset game scores
    resetbtn();
    userscorepra.innerText = userscore;
    compscorepra.innerText = compscore;

    // Reset message
    msg.innerText = "Welcome! Click Start to play.";
    msg.style.backgroundColor = "#C6AC8F"; 

   
    bgmusic.pause();
    bgmusic.currentTime = 0;
    musicbtn.innerText = "Play Music";
});