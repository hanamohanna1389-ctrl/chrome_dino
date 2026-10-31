let game_container = document.querySelector('.game');
let dino = document.querySelector('.dino');
let tree = document.querySelector('.tree');
let show_score = document.querySelector('.showing-score');
let score = document.querySelector('.score');
let best_record = document.querySelector(".record");
let refresh = document.querySelector(".refresh");
let refresh_btn = document.querySelector(".refresh-btn");
let jumping_audio = new Audio("./audio/jumping.ogg");
let losing_audio = new Audio("./audio/losing.wav");
let counter = 0;
let first_click = true
let score_interval;
let check_position;

tree.style.animationPlayState = "paused";


function play_jump_audio() {
    jumping_audio.currentTime = 0;
    jumping_audio.volume = 0.2
    jumping_audio.play();

    setTimeout(function () {
        jumping_audio.pause();
    }, 350);
}

function play_lose_audio() {
    losing_audio.currentTime = 0;
    losing_audio.volume = 0.4
    losing_audio.play();

    setTimeout(function () {
        losing_audio.pause();
    }, 600);
}

function start_game() {
    clearInterval(score_interval);
    clearInterval(check_position);

    score.innerHTML = 0;
    tree.style.animation = "none";
    tree.offsetHeight;
    tree.style.animation = "tree 1.7s infinite linear";
    tree.style.animationPlayState = "running";

    best_record.innerHTML = localStorage.getItem("best_record") || 0;

    score_interval = setInterval(function () {
        counter++;
        score.innerHTML = counter;
    }, 1650);

    check_position = setInterval(function () {
        let dino_pos = dino.getBoundingClientRect();
        let tree_pos = tree.getBoundingClientRect();
        let game_pos = game_container.getBoundingClientRect();
        let dino_bottom_relative = game_pos.bottom - dino_pos.bottom;
        let distance = tree_pos.left - dino_pos.left;

        if (distance > 0 && distance < (dino_pos.width * 0.7) && dino_bottom_relative < 10) {
            jumping_audio.pause();
            play_lose_audio();
            tree.style.animationPlayState = "paused";
            clearInterval(score_interval);
            clearInterval(check_position);
            refresh.style.opacity = 1;
            refresh.style.pointerEvents = "auto";

            let best_record = Number(localStorage.getItem("best_record")) || 0;

            if (counter > best_record) {
                localStorage.setItem("best_record", counter);
            }

            counter = 0;
        }
    }, 10);
}

document.addEventListener('click', function () {
    if (first_click) {
        start_game();
        first_click = false;
        dino.classList.add("animate")
        setTimeout(function () {
            dino.classList.remove('animate');
        }, 400);
    } else {
        if (dino.classList.contains("animate")) {
            return
        } else {
            dino.classList.add("animate")
        }
        setTimeout(function () {
            dino.classList.remove('animate');
        }, 500);
    }
    play_jump_audio()
})

function Refresh() {
    refresh.style.opacity = 0;
    refresh.style.pointerEvents = "none";
    first_click = false;
    start_game();
}

refresh.addEventListener("click", Refresh)
