var playerCount;
var difficulty = 'easy';

function init() {
  let val = document.getElementById('playerCount').value;
  playerCount = val;

  let home = document.querySelector('.home');
  home.style.visibility = 'hidden';

  let main = document.querySelector('.main');
  main.style.visibility = 'visible';

  easy();

  document.body.style.background = 'white';

  displayPlayer();
}

function easy() {
  difficulty = 'easy';
  let btn = document.getElementById('difficultybtn');

  btn.innerHTML = 'easy';
}

function medium() {
  difficulty = 'medium';
  let btn = document.getElementById('difficultybtn');

  btn.innerHTML = 'medium';
}

function hard() {
  difficulty = 'hard';
  let btn = document.getElementById('difficultybtn');

  btn.innerHTML = 'hard';
}

function tjoh() {
  difficulty = 'tjoh';
  let btn = document.getElementById('difficultybtn');

  btn.innerHTML = 'tjoh';
}

function playerVis(val) {
  let lbl = document.getElementById('playerLabel');
  lbl.textContent = val;
}

function displayPlayer() {
  let pdialog = document.getElementById('playerStatus');
  pdialog.textContent = 'Players remaining: ' + playerCount;
}

function removePlayer() {
  playerCount--;
  displayPlayer();
}

function addPlayer() {
  playerCount++;
  displayPlayer();
}

function newword() {
  var request = new XMLHttpRequest();
  request.open('GET', 'https://random-word-api.herokuapp.com/word?number=1', true);

  request.onload = function () {
    var data = JSON.parse(this.response);

    let word = document.getElementById('word');
    word.textContent = data[0];

    document.getElementById('points').innerHTML = 'Points Available: ' + data[0].length;
  }

  document.getElementById('hintbox').innerHTML = "";

  request.send();
}

function definition() {
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