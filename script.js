var playerCount;
var difficulty = -1;
var word = '';

function init() {
  let val = document.getElementById('playerCount').value;
  playerCount = val;

  let home = document.querySelector('.home');
  home.style.visibility = 'hidden';

  let main = document.querySelector('.main');
  main.style.visibility = 'visible';

  // easy();

  document.body.style.background = 'white';

  displayPlayer();
}

function easy() {
  difficulty = 0;
  let btn = document.getElementById('difficultybtn');

  btn.innerHTML = 'Easy';
}

function medium() {
  difficulty = 1;
  let btn = document.getElementById('difficultybtn');

  btn.innerHTML = 'Medium';
}

function hard() {
  difficulty = 2;
  let btn = document.getElementById('difficultybtn');

  btn.innerHTML = 'Hard';
}

function tjoh() {
  difficulty = 3;
  let btn = document.getElementById('difficultybtn');

  btn.innerHTML = 'Tjoh';
}

function playerVis(val) {
  let lbl = document.getElementById('playerLabel');
  lbl.textContent = 'Number of players: ' + val;
}

function displayPlayer() {
  let pdialog = document.getElementById('playerStatus');
  pdialog.textContent = 'Players remaining: ' + playerCount;
}

function removePlayer() {
  playerCount--;
  displayPlayer();
  if (playerCount === 1) {
    console.log('game over');
    let modal = document.querySelector('.modal');
    modal.style.visibility = 'visible';  
    let main = document.querySelector('.main');
    main.style.filter = 'brightness(0.3)';
    document.body.style.background = '#111111';
    main.style.background = '#111111';
  }
}

function reset() {
  location.reload();
}

function addPlayer() {
  playerCount++;
  displayPlayer();
}

function cardczar() {

  console.log('prev: ' + word);
  newword();
  console.log('new: ' + word);

  document.getElementById('hintbox').innerHTML = "";

  let elem = document.getElementById('word');
  elem.textContent = word;

  document.getElementById('points').innerHTML = 'Points Available: ' + word.length;
}

function isValid(difficulty) {
  let len = word.length;

  console.log(word);

  if (difficulty === 0) {
    if (len < 5) return true;
  } else if (difficulty === 1) {
    if (len > 4 && len < 8) return true;
  } else if (difficulty === 2) {
    if (len > 7 && len < 12) return true;
  } else {
    if (len > 11) return true;
  }

  return false;
}

function newword() {
  var request = new XMLHttpRequest();
  request.open('GET', 'https://random-word-api.herokuapp.com/word?number=1', true);
  request.onload = function () {
    var data = JSON.parse(this.response);

    document.getElementById('hintbox').innerHTML = "";

    let elem = document.getElementById('word');
    elem.textContent = data[0];

    document.getElementById('points').innerHTML = 'Points Available: ' + data[0].length;
  }
  request.send();
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


function definition() {
  document.getElementById('hintbox').innerHTML = "";
  let cur = document.getElementById('word').textContent;

  var request = new XMLHttpRequest();
  var url = 'https://api.dictionaryapi.dev/api/v2/entries/en/' + cur;
  console.log(url);
  request.open('GET', url, true);

  request.onload = function () {
    var data = JSON.parse(this.response);

    console.log(request.status);

    console.log(data);

    if (request.status < 400) {
      data.forEach(element => {
        let card = document.createElement('div');
        let cardbody = document.createElement('div');

        card.classList.add('card');
        cardbody.classList.add('card-body');
        cardbody.innerHTML = '💡 ' + JSON.stringify(element['meanings'][0]['definitions'][0]['definition']);
        card.appendChild(cardbody);

        document.getElementById('hintbox').appendChild(card);
      });
    } else {
      let card = document.createElement('div');
      let cardbody = document.createElement('div');

      card.classList.add('card');
      cardbody.classList.add('card-body');
      cardbody.innerHTML = "❌ CONSULT THE DICTIONARY";
      card.appendChild(cardbody);

      document.getElementById('hintbox').appendChild(card);
    }

  }

  request.send();
}