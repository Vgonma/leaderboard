import './style.css';
import sortHighScore from './modules/functions.js';

const GAME_ID = 'jccgB5fj04V0JWXqHy2g';
const fetchData = () => {
  fetch(
    `https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${GAME_ID}/scores/`,
  )
    .then((response) => response.json()).then((data) => {
      if (data) {
        const dataArray = data.result;
        sortHighScore(dataArray);
        const scoreboardDOM = document.querySelector('.scoreboard');
        scoreboardDOM.innerHTML = '';
        for (let i = dataArray.length - 1; i >= 0; i -= 1) {
          const li = document.createElement('li');
          li.classList.add('score');
          li.innerHTML = `${dataArray[i].user}: ${dataArray[i].score}`;
          scoreboardDOM.appendChild(li);
        }
      }
    });
};

const addScore = (name, newScore) => {
  fetch(
    `https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${GAME_ID}/scores/`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: name,
        score: newScore,
      }),
    },
  )
    .then((res) => res.json());
};

fetchData();
const refreshbtn = document.querySelector('.btn-refresh');
refreshbtn.addEventListener('click', () => {
  fetchData();
});

const addScoreForm = document.querySelector('.add-score-form');
addScoreForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const user = addScoreForm.children[0].value;
  const score = parseInt(addScoreForm.children[1].value, 10);
  addScore(user, score);
  addScoreForm.children[0].value = '';
  addScoreForm.children[1].value = '';
  setTimeout(() => fetchData(), 500);
});
