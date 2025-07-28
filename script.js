// Declaring Variables
const leftJokeText = document.querySelector('#left-joke .joke-text');
const rightJokeText = document.querySelector('#right-joke .joke-text');
const voteLeftBtn = document.getElementById('vote-left');
const voteRightBtn = document.getElementById('vote-right');
const scoreList = document.getElementById('score-list');

let currentJokes = {
    left: '',
    right: ''
};


let champion = {
    text: '',   
    score: 0
};

// Fetching joke from the API
async function getDadJoke() {
    try {
        const response = await fetch ( 'https://icanhazdadjoke.com/', {
            headers: {
                Accept: 'application/json'
            }
        });

        const data = await response.json();
        return data.joke
        
    } catch (error) {
        console.error('Failed to fetch a joke', error);
        return 'Ooops! Sorry, could not fetch a joke';
    }
}

// Stores initial champion and challenger

async function loadJokes() {
    champion.text = await getDadJoke(); // First Champion
    champion.score = 0;

    let challenger = await getDadJoke();
    while (challenger === champion.text) {
        challenger = await getDadJoke();
    }

    document.getElementById('champion-text').textContent = champion.text;
    document.getElementById('champion-score').innerHTML = `Streak:<br><strong>${champion.score}</strong>`;


    leftJokeText.textContent = champion.text;
    rightJokeText.textContent = challenger;
    currentJokes.right = challenger;

}

loadJokes();

//  Loads new Challenger after voting

async function loadNewChallenger () {
    let newJoke = await getDadJoke();
    while (newJoke === champion.text) {
        newJoke = await getDadJoke();
    }

    rightJokeText.textContent = newJoke;
    currentJokes.right = newJoke;
}

// Voting

voteLeftBtn.addEventListener('click', () => {
    champion.score += 1;
    updateChampionUI();
    loadNewChallenger();
})

voteRightBtn.addEventListener('click', async () => {
    champion.text = currentJokes.right;
    champion.score = 1;
    updateChampionUI();
    await loadNewChallenger();
})

// Update Champion

function updateChampionUI() {
    document.getElementById('champion-text').textContent = champion.text;
    document.getElementById('champion-score').innerHTML = `Streak:<br><strong>${champion.score}</strong>`;
    leftJokeText.textContent = champion.text;
}










