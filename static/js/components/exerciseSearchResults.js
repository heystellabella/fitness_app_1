export function renderExerciseSearchResults() {
  const searchValue = document.getElementById("search-bar").value;

  axios
    .get(`https://exercisedb.p.rapidapi.com/exercises/name/${searchValue}`, {
      headers: {
        "X-RapidAPI-Key": "164db46a4amsh7966b0337aa8006p128e47jsn6e9b51af6944",
        "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
      },
    })
    .then((response) => {
      console.log(response.data);

    })
}
