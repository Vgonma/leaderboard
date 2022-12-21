import './style.css';
import sortHighScore from './modules/functions.js';
import { fetchData, addScore } from './modules/leaderboardData.js';

const populateBoard = async () => {
  const data = await fetchData();
  sortHighScore(data.result);
  const scoreboardDOM = document.querySelector('.scoreboard');
  scoreboardDOM.innerHTML = '';
  for (let i = data.result.length - 1; i >= 0; i -= 1) {
    const li = document.createElement('li');
    li.classList.add('score');
    li.innerHTML = `${data.result[i].user}: ${data.result[i].score}`;
    scoreboardDOM.appendChild(li);
  }
};
populateBoard();
const refreshbtn = document.querySelector('.btn-refresh');
refreshbtn.addEventListener('click', () => {
  populateBoard();
});

const addScoreForm = document.querySelector('.add-score-form');
addScoreForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const user = addScoreForm.children[0].value;
  const score = parseInt(addScoreForm.children[1].value, 10);
  addScore(user, score);
  addScoreForm.children[0].value = '';
  addScoreForm.children[1].value = '';
  setTimeout(() => populateBoard(), 500);
});
