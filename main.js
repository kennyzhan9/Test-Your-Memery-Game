// function modal() {
//     const modal = document.getElementById('startScreen');
//     const btn = document.getElementById('openModal');
//     const close = document.getElementById('modalClose');

//     btn.onclick = function() {
//         modal.style.display = "block";
//     }

//     close.onclick = function() {
//         modal.style.display = "none";
//     }
// }
// modal();

// const wdiInstructors = [
//     {name: 'A-aron', image: 'assets/a-aron.png'},
//     {name: 'Drake', image: 'assets/drake.png'},
//     {name: 'Jason', image: 'assets/jason.png'},
//     {name: 'JohnM', image: 'assets/jm.png'},
//     {name: 'JZ', image: 'assets/jz.png'},
// ];

// const eastTeams = [
//     {name: 'Bucks', img: 'assets/bucks.png',},
//     {name: 'Bulls', img: 'assets/bulls.png',},
//     {name: 'Cavaliers', img: 'assets/cavaliers.png',},
//     {name: 'Celtics', img: 'assets/celtics.png',},
//     {name: 'Hawks', img: 'assets/hawks.png',},
//     {name: 'Heat', img: 'assets/heat.png',},
//     {name: 'Hornets', img: 'assets/hornets.png',},
//     {name: 'Knicks', img: 'assets/knicks.png',},
//     {name: 'Magic', img: 'assets/magic.png',},
//     {name: 'Nets', img: 'assets/nets.png',},
//     {name: 'Pacers', img: 'assets/pacers.png',},
//     {name: 'Pistons', img: 'assets/pistons.png',},
//     {name: 'Raptors', img: 'assets/raptors.png',},
//     {name: 'Sixers', img: 'assets/sixers.png',},
//     {name: 'Wizards', img: 'assets/wizards.png',},
// ];

// const westTeams = [
//     {name: 'Blazers', img: 'assets/blazers.png',},
//     {name: 'Clippers', img: 'assets/clippers.png',},
//     {name: 'Grizzlies', img: 'assets/grizzlies.png',},
//     {name: 'Jazz', img: 'assets/jazz.png',},
//     {name: 'Kings', img: 'assets/kings.png',},
//     {name: 'Lakers', img: 'assets/lakers.png',},
//     {name: 'Mavericks', img: 'assets/mavericks.png',},
//     {name: 'Nuggets', img: 'assets/nuggets.png',},
//     {name: 'Pelicans', img: 'assets/pelicans.png',},
//     {name: 'Rockets', img: 'assets/rockets.png',},
//     {name: 'Spurs', img: 'assets/spurs.png',},
//     {name: 'Suns', img: 'assets/suns.png',},
//     {name: 'Thunder', img: 'assets/Thunder.png',},
//     {name: 'Timberwolves', img: 'assets/timberwolves.png',},
//     {name: 'Warriors', img: 'assets/warriors.png',},
// ];

//array of memes
const memes = [
    {name: 'kim', image: 'assets/kimye.png', type: 'kimye'},
    {name: 'kanye', image: 'assets/kanye.jpg', type: 'kimye'},
    {name: 'drPhil', image: 'assets/drphil.png', type: 'phillOfShit'},
    {name: 'bullcrap', image: 'assets/bullcrap.png',type: 'phillOfShit'},
    {name: 'brian', image: 'assets/brian.jpg', type: 'pbjTime'},
    {name: 'brian2', image: 'assets/brian2.png', type: 'pbjTime'},
    {name: 'trump', image: 'assets/trump.jpg', type: 'awkward'},
    {name: 'ivanka', image: 'assets/ivanka.jpg', type: 'awkward'},
    {name: 'kids', image: 'assets/kids.jpg', type: 'delicious'},
    {name: 'tide', image: 'assets/tide.png', type: 'delicious'},
    {name: 'kju', image: 'assets/kju.jpg', type: 'hairDid'},
    {name: 'paulyd', image: 'assets/paulyd.jpeg', type: 'hairDid'},
    {name: 'noBug', image: 'assets/nobug.jpeg', type: 'programmers'},
    {name: 'noWork', image: 'assets/nowork.jpg', type: 'programmers'},
    {name: 'grope', image: 'assets/grope.jpg', type: 'poster'},
    {name: 'dope', image: 'assets/dope.jpg', type: 'poster'},
    {name: 'bacardi', image: 'assets/bacardi.jpg', type: 'oww'},
    {name: 'cardiB', image: 'assets/cardib.jpg', type: 'oww'},
    {name: 'fuel', image: 'assets/fuel.jpg', type: 'coding'},
    {name: 'life', image: 'assets/life.jpg', type: 'coding'},
];

//select container and card
const grid = document.querySelector("#gameGrid");
grid.classList.add('grid');
const tile = document.querySelector(".card");
const images = document.querySelectorAll("img");
const allTiles = document.querySelectorAll(".card");

//reset moves
let firstClick = "null";
let secondClick = "null";
let checkClicks = [];
let keepCount = 0;

//shuffle array
const newGame = shuffle(memes);

function startGame() {
    //create the tiless
    for (i = 0; i < newGame.length; i += 1) {
        const tiles = document.createElement("div");
        tiles.classList.add('tiles', 'hide');
        tiles.innerHTML = `<img src="${newGame[i].image}" class="imgOff" data-name="${newGame[i].type}">`;

        //add event listeners
        tiles.addEventListener('click', (event) => {
            event.preventDefault();
            let selected = event.target;
            //restricting event listeners to only div.tiles
            if (selected.className !== 'tiles') {
                handleClicks(selected);
            }
            else {
                return ;   
            }
        });
        grid.appendChild(tiles);
    }
}
startGame();

//tried Fisher-Yates shuffle but it was returning some undefined objects in my array
//using John Master's shuffle method from 'high-low' assignment
function shuffle(arr) {
    return arr.sort(() => 0.5 - Math.random());
}

//restrict to two clicks
function handleClicks(e) {
    //break continuous looping
    let stop = false;
    let thisTile = e;
    let lastTile = checkClicks[0];
    //loop through two clicks
    while (checkClicks.length < 2 && stop === false) {
        //first click
        if (checkClicks.length === 1) {
            e.classList.add('show');
            e.classList.remove('hide');
            checkClicks.push(e);
            //run checkMatch after 1st click
            checkMatch(thisTile, lastTile);
        }
        //none clicked
        else {
            e.classList.add('show');
            e.classList.remove('hide');
            checkClicks.push(e);
        }
        stop = true;
    }
}

//compare both tiles
function checkMatch(a, b) {
    let match = false;
    if (a.dataset.name === b.dataset.name) {
        match = true;
        console.log(match);
        checkClicks = [];
        a.classList.add('matched');
        b.classList.add('matched');
        checkWin();
    }
    else {
        console.log(match);
        setTimeout(flipBack, 1000);
        function flipBack() {
            a.classList.remove('show');
            a.classList.add('hide');
            b.classList.remove('show');
            b.classList.add('hide');
            checkClicks = [];
        }
    }
}

function checkWin() {
    const all = document.querySelectorAll('.matched');
    if (all.length === 20) {
        console.log('Winner!');
    }
    
}