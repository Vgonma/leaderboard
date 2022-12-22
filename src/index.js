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
    li.innerHTML = `
    <span class="placement">${scoreboardDOM.children.length + 1}</span>
    <span class="name-tracker">
    ${data.result[i].user}</span>
    <span class="points-tracker">${data.result[i].score}</span>`;
    scoreboardDOM.appendChild(li);
  }
};
populateBoard();
const refreshbtn = document.querySelector('.btn-refresh');
refreshbtn.addEventListener('click', () => {
  populateBoard();
});

const addScoreForm = document.querySelector('.add-score-form');
addScoreForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const user = addScoreForm.children[0].value;
  const score = parseInt(addScoreForm.children[1].value, 10);
  await addScore(user, score);
  addScoreForm.children[0].value = '';
  addScoreForm.children[1].value = '';
});
