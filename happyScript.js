window.addEventListener('DOMContentLoaded', function () {

    //The entire page will load before the API is called. 
    //Had to move some code around to get all the functions to work prperly since the API is now the last thing that happens.
    window.onload = sendAPIRequest

    //Selecting the back button
    const backButton = document.querySelector('#back');

    //Fetch the API data
    async function sendAPIRequest() {
        let response = await fetch('https://opentdb.com/api.php?amount=1&type=multiple');
        console.log(response)
        let data = await response.json()
        console.log(data)
        useAPIData(data)
    }

    //Randomly sorting the array of answers
    function sortArrayRandomly(array) {
        return array.concat().sort(() => 0.5 - Math.random());
    }

    //
    function useAPIData(data) {
        //Create answers object to identify the four possible answers
        let answers = sortArrayRandomly([data.results[0].correct_answer, data.results[0].incorrect_answers[0], data.results[0].incorrect_answers[1], data.results[0].incorrect_answers[2]]);
        //Create correctAnswer object to identify the one correct answer
        let correctAnswer = data.results[0].correct_answer;
        //Create the index (value) of the one correct answer
        let correctAIndex = answers.findIndex(answer => answer === correctAnswer);

        //Group of console logs
        console.log("answersArray", answers);
        console.log("correctAnswer", correctAnswer);
        console.log("correctAIndex", correctAIndex);

        //Selecting the question div
        const questionDiv = document.querySelector("#questionDiv");
        //Creating a "paragraph" where the question from the API will populate
        const question = document.createElement("p");
        //Adding the question to the newly created paragraph from the API
        question.innerHTML = `Question: ${data.results[0].question}`
        //Appending the question from the API to the Div
        questionDiv.appendChild(question);
        //
        answers.map((answer, index) => {
            //Creating an element of button
            const button = document.createElement("button");
            //Adding the button to the HTML
            button.innerHTML = answer;
            //Giving the button an "id" *****************************
            button.setAttribute("id", `${index}`);
            //Appending the button to the questoin Div
            questionDiv.appendChild(button);

        })
        //Creating the correctButton element and giving it the correct answers index number
        let correctButton = document.getElementById(`${correctAIndex}`);

        //Adding an event listener for when the correct answer is selected
        correctButton.addEventListener("click", () => {
            //Trigger an alert when the correct answer is selected.
            alert("Correct! Keep smiling!")
            //"Reloading" the page after the alert is closed. 
            //New trivia questions would continue to stack without the reload property.
            location.reload(true)
        })
    }

    //Adding an event listener for when the back button is clicked.
    backButton.addEventListener("click", () => {
        //Indicating where the back button will take the user
        location.href = "index.html"
    })
})

// either find or filter - then add an alert listener to the button it finds. Then build the butons as the API pulls the data in (could make the id of the button the index of the array, then get the query selector of the id of the )
//grab the conatiner in JS and get the API data then create the button elements based off what the random sort is, find/filter correct answer (so I know which index value is correct in the array) 
//after getting index value - then create buttons one at a time, as I create button I will give the button the ID which will become the index value (give the correct one the correct value)
//then once I know which one is correct I can run eventlistener on that one
