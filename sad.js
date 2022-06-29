const jokeButton = document.querySelector('.btn.btn-warning.btn');
const jokeHolder = document.querySelector('.joke');


// fetch('https://api.humorapi.com/jokes/search')
//   .then(response => response.json())
//   .then(data => console.log(data));

async function fetchJoke() {
    const response = await fetch ("https://icanhazdadjoke.com", {
        headers: {
            Accept: "application/json",

        },
    });
    // console.log(response);
    const data = response.json();
    return data;

}

async function handleClick() {
    const { joke } = await fetchJoke();
    jokeHolder.textContent = joke
    console.log(joke);
}

jokeButton.addEventListener('click', handleClick);

