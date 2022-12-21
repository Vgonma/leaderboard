const GAME_ID = 'jccgB5fj04V0JWXqHy2g';
const fetchData = async () => {
  try {
    const response = await fetch(
      `https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${GAME_ID}/scores/`,
    );
    const data = await response.json();
    return (data);
  } catch (err) {
    return err;
  }
};

const addScore = async (name, newScore) => {
  try {
    const response = await fetch(
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
    );
    return await response.json();
  } catch (err) {
    return err;
  }
};

module.exports = { fetchData, addScore };
