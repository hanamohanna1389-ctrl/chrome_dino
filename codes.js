let dino = document.querySelector('.dino');
let tree = document.querySelector('.tree');
let show_score = document.querySelector('.showing-score');
let score = document.querySelector('.score');
let counter = 0;
let refresh = document.querySelector(".refresh");
let refresh_btn = document.querySelector(".refresh-btn");
let score_interval;
let check_position;

function start_game() {
    clearInterval(score_interval);
    clearInterval(check_position);

    score.innerHTML = 0;
    tree.style.animation = "none";
    tree.offsetHeight;
    tree.style.animation = "tree 1s infinite linear";
    tree.style.animationPlayState = "running";

    score_interval = setInterval(function () {
        counter++;
        score.innerHTML = counter;
    }, 1000);

    check_position = setInterval(function () {
        let dino_pos = dino.getBoundingClientRect();
        let tree_pos = tree.getBoundingClientRect();
        let dino_top = dino_pos.top;
        let tree_left = tree_pos.left;

        if (tree_left < 450 && dino_top >= 150) {
            tree.style.animationPlayState = "paused";
            clearInterval(score_interval);
            clearInterval(check_position);
            refresh.style.opacity = 1;
            refresh.style.pointerEvents = "auto";
            counter = 0;
        }
    }, 10);
}

document.addEventListener('click', function () {
    if (dino.classList.contains("animate")) {
        return
    } else {
        dino.classList.toggle("animate")
    }
    setTimeout(function () {
        dino.classList.remove('animate');
    }, 400);
});

start_game()

function Refresh() {
    refresh.style.opacity = 0;
    refresh.style.pointerEvents = "none";
    start_game();
}

refresh.addEventListener("click", Refresh)
