let game_container = document.querySelector('.game');
let dino = document.querySelector('.dino');
let tree = document.querySelector('.tree');
let show_score = document.querySelector('.showing-score');
let score = document.querySelector('.score');
let best_record = document.querySelector(".record");
let refresh = document.querySelector(".refresh");
let refresh_btn = document.querySelector(".refresh-btn");
let counter = 0;
let first_click = true
let score_interval;
let check_position;

tree.style.animationPlayState = "paused";


function start_game() {
    clearInterval(score_interval);
    clearInterval(check_position);

    score.innerHTML = 0;
    tree.style.animation = "none";
    tree.offsetHeight;
    tree.style.animation = "tree 1s infinite linear";
    tree.style.animationPlayState = "running";

    best_record.innerHTML = localStorage.getItem("best_record") || 0;

    score_interval = setInterval(function () {
        counter++;
        score.innerHTML = counter;
    }, 1000);

    check_position = setInterval(function () {
        let dino_pos = dino.getBoundingClientRect();
        let tree_pos = tree.getBoundingClientRect();
        let game_pos = game_container.getBoundingClientRect();
        let dino_bottom_relative = game_pos.bottom - dino_pos.bottom;
        let distance = tree_pos.left - dino_pos.left;

        if (distance > 0 && distance < (dino_pos.width * 0.7) && dino_bottom_relative < 10) {
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
})

function Refresh() {
    refresh.style.opacity = 0;
    refresh.style.pointerEvents = "none";
    first_click = false;
    start_game();
}

refresh.addEventListener("click", Refresh)
