// l

let gameseq = [];
let userseq = [];

let btns = ["yellow", "red", "green", "blue"];

let h2 = document.querySelector("h2");

let started = false;
let level = 0;

//  Start game on keypress
document.addEventListener("keypress", function () {
    if (started == false) {
        console.log("game started");
        started = true;
        levelup();
    }
});

// Flash button for game sequence
function btnFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 250);
}

// Flash button for user press (different color feedback)
function userFlash(btn) {
    btn.classList.add("userflash");
    setTimeout(function () {
        btn.classList.remove("userflash");
    }, 250);
}

// Level up - add new color to sequence
function levelup() {
    userseq = []; // reset user sequence each level
    level++;
    h2.innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random() * 4); //  Fixed: was *3
    let randColor = btns[randIdx];
    let randbtn = document.querySelector(`.${randColor}`);

    gameseq.push(randColor);
    console.log(gameseq);
    btnFlash(randbtn);
}

//  Check user input against game sequence
function checkSeq(idx) {
    if (userseq[idx] === gameseq[idx]) {
        // Correct so far
        if (userseq.length === gameseq.length) {
            // Full sequence matched - go to next level
            setTimeout(levelup, 1000);
        }
    } else {
        // Wrong button pressed - Game Over
        h2.innerText = `Game Over! You reached Level ${level}. Press any key to restart.`;
        document.querySelector("body").classList.add("gameover");
        setTimeout(function () {
            document.querySelector("body").classList.remove("gameover");
        }, 200);
        startOver();
    }
}

//  Reset everything for a new game
function startOver() {
    level = 0;
    gameseq = [];
    userseq = [];
    started = false;
}

// Handle button press
function btnpress() {
    let btn = this;
    userFlash(btn);
    let userColor = btn.getAttribute("id"); //  Fixed: added let
    userseq.push(userColor);
    console.log(userseq);
    checkSeq(userseq.length - 1);
}

// Attach click listeners to all buttons
let allBtns = document.querySelectorAll(".btn");
for (let btn of allBtns) {
    btn.addEventListener("click", btnpress);
}