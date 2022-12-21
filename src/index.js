import './style.css';

const fetchData = () => {
  fetch(
    'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/jccgB5fj04V0JWXqHy2g/scores/',
  )
    .then((response) => response.json()).then((data) => {
      if (data) {
        const scoreboardDOM = document.querySelector('.scoreboard');
        scoreboardDOM.innerHTML = '';
        for (let i = 0; i < data.result.length; i += 1) {
          const li = document.createElement('li');
          li.classList.add('score');
          li.innerHTML = `${data.result[i].user}: ${data.result[i].score}`;
          scoreboardDOM.appendChild(li);
        }
      }
    });
};

const refreshbtn = document.querySelector('.btn-refresh');
refreshbtn.addEventListener('click', () => {
  console.log('refresh');
  fetchData();
});

fetchData();
