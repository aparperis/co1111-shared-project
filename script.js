/*This function below is to activate the hamburger whenever we click on it */
function navTransition()
{
    /*Access the navigation menu from the HTML page using it's element*/
    const nav=document.querySelector('.nav-items-drop');

    // If the display of the menu is none, meaning it does not show initially
    if(nav.style.display=== "none")
    {
        //when clicking the burger menu it changes to flex and the menu displays
        nav.style.display="flex";


    }
    else
    {
        //when clicking again the menu hides.
        nav.style.display="none";

    }

}

//Using URLSearchParams to retrieve the treasureHuntID from the URL
const id_params = new URLSearchParams(location.search);
const treasureHuntID = id_params.get("treasureHuntID");

//Printing it on the console
console.log(treasureHuntID);

//This is the List API Url, which we stored it in a variable for easier access
let list_url='https://codecyprus.org/th/api/list';

//This function is to get the available treasure hunts and display them as a list
  async function getList()
  {
      //Fetching the API and storing it in a variable
      const response = await fetch(list_url);
      const json_data = await response.json();

      // const res=await fetch("https://codecyprus.org/th/test-api/list?number-of-ths=2");
      // const test_dat=await res.json();
      //
      // console.log(test_dat);


      console.log(json_data);

      //Creating a variable that stores the array from the API
      let array = json_data.treasureHunts;
      //Get the element id
      let challengeList = document.getElementById('challenges');

      //Looping through the API array of the treasure hunts
      for (const item of array)
      {

             //Creating an <a> tag to display the Available treasure hunts
              let listItem = document.createElement("a");
              //Setting the text of the anchor tag to display the name of the treasure hunts
              listItem.textContent = item.name;
              listItem.href = "start.html?treasureHuntID=" + item.uuid;
              //Appending all the elements
              challengeList.appendChild(listItem);
              challengeList.append(document.createElement("br"));
              challengeList.append(document.createElement("br"));
              challengeList.append(document.createElement("br"));


      }


  }

//This function is for entering your name to start the game
function start()
{
    //Getting the value of the input which the player enters and storing it in a variable
    const playerName = document.getElementById("playerName").value;
    //Naming the name of the app
    const appName = "Team5App";
    //Creating a variable with the new URL, which consists of the new parameters
    const START_URL = "https://codecyprus.org/th/api/start?player=" + playerName + "&app=" + appName + "&treasure-hunt-id=" + treasureHuntID;

    console.log(START_URL);

    //Fetching the API
    fetch(START_URL)
        .then(response=> {
            //Returning the response
            return response.json();
        })
        .then(data=>{

            console.log(data);
            //If there is an error we get the error messages and alert them to the screen
            if(data.status=== "ERROR")
            {
                alert(data.errorMessages);


            }
            else
            {
                //If everything is OK we store the session of the given Treasure hunt as a cookie
                setCookie("sessionID", data.session, 30);
                window.location.href="startGame.html";
                console.log(data.session);

            }

        })

}

//This function retrieves all the questions and displays them on the screen
async function getQuestions()
{

    //We stored the seeion in a variable
    const session=sessionID;
    console.log(session);

    //Storing the URL API with the stores session
    const QUESTIONS_URL="https://codecyprus.org/th/api/question?session=" + session;

    //Fetching the API
    const response= await fetch(QUESTIONS_URL);
    const data= await response.json();

    console.log(data);


    if(data.status === "OK")
    {

        let skip_btn=document.getElementById("skip");
        //If the treasure hunt is not completed
        if(data.completed === false)
        {
            //We create an h3 element which will display the questions
            let question = document.createElement("h3");
            question.innerHTML = data.questionText;
            question.style.color="#212326";
            let q_div = document.getElementById("question");
            q_div.innerHTML=data.questionText;
            q_div.append(document.createElement("br"));

            let answerElement=document.getElementById("answer-box");
            let s_btn=document.getElementById("submit-btn");



            let mess=document.getElementById("a_message");

            //If the question requires Location the we call the getLocation() function
           if(data.requiresLocation === true)
           {
               await getLocation();
           }

            //The following if statements change the color of the questions depending on their type
            if(data.questionType === "INTEGER")
            {
                q_div.style.color="#bd4440";
                //Changing the type of the input to number, so it only accepts numeric values
                answerElement.type="number";
                mess.textContent="NOTE: This question only accepts Numbers as input!";

            }
            else if(data.questionType === "BOOLEAN")
            {
                q_div.style.color="#1d9686";
                answerElement.type="text";
                mess.textContent="";

            }
            else if(data.questionType === "MCQ")
            {
                q_div.style.color="#51964b";
                answerElement.type="text";
                mess.textContent="";

            }
            else if(data.questionType === "TEXT")
            {
                q_div.style.color="#b068e3";
                answerElement.type="text";
                mess.textContent="";

            }

            //If the question can be skipped, a 'skip' button appears
            if(data.canBeSkipped === true)
            {
               skip_btn.style.display="flex";
               //Call the score function so the score changes when skipping
               await score();
               //The input resets to empty
               answerElement.value='';

            }
            else
            {
                //If the question cannot be skipped, the 'skip' button disappears
                skip_btn.style.display="none";

            }


        }
        else
        {
            //When the quiz finishes, it directs us to the leaderboard page
            window.location.href="leaderboard.html";
            await Leaderboard();
        }



    }
    else
    {
        //If the status is not OK, then an error message displays on the screen
        alert(data.errorMessages);
    }

}

//This functions retrieves the answers from the API
async function answer()
{
   //Storing the session in a variable
    const session=sessionID;
    //Get the input from the HTML page
    let answerElement=document.getElementById("answer-box");
    //Getting the actual value that the player enters, and storing it in a variable
    let answer = answerElement.value;

    //Storing the API URL with the new parameters
    let ANSWER_URL="https://codecyprus.org/th/api/answer?session=" + session + "&answer=" + answer;

    //Fetching the API
    const response= await fetch(ANSWER_URL);
    const data = await response.json();

    console.log(data);

    //Variable that stores if the answer is correct
    let correct=data.correct;

   if(data.status === "OK")
   {
       if(correct)
       {
           //If the answer is correct, we reset the answer
           answerElement.value='';

           //Checking if the quiz is not completed
           if(data.completed === false)
           {
               //If it's not completed, we display the message 'Well done'.
               alert(data.message);
               //Calling the getQuestions() function to move to the next question
               await getQuestions();
               //Calling the score() function to get the score
               await score;



           }
           else
           {
               //If it's completed, it directs you to the leaderboard page
               window.location.href="leaderboard.html";
           }

       }
       else
       {
           //If the answer is wrong, it displays the appropriate message
           alert(data.message);
           //Resets the input to empty
           answerElement.value='';
           //Getting the score
           await score();
       }
   }

}

//This function gets your location
function getPosition(pos)
{
    //Displaying the latitude and Longitude
    alert("Latitude: " + pos.coords.latitude + ", Longitude: " + pos.coords.longitude);
}

//This function calls the location API
async function getLocation()
{

   //Storing the URL with the stored session
    const LOCATION_URL="https://codecyprus.org/th/api/location?session="+sessionID+"&latitude=34.683646&longitude=33.055391";

   //Fetching the API
    const response= await fetch(LOCATION_URL);
    const data=await response.json();
    //This asks the users permission to access their location
    if(navigator.geolocation)
    {
        //Access the current position
        navigator.geolocation.getCurrentPosition(getPosition);


    }
    else
    {
        alert("Your browser does not support Geolocation");
    }

    console.log(data);

    if(data.status === "OK")
    {

        alert(data.message);

    }



}




//This is the skip function that calls the skip API
async function Skip()
{

    //Storing the URL with the stored session
    const SKIP_URL="https://codecyprus.org/th/api/skip?session=" + sessionID;
    //Fetching the API
    const response=await fetch(SKIP_URL);
    const data=await response.json();

   if(data.status==="OK")
   {
       //Alert a message that the question has been skipped
       alert(data.message);
       //Get the next question with the getQuestions() function
       await getQuestions();
   }



}

//This function gets the score from the API
async function score()
{
    //Storing the URL in a variable
    const SCORE_URL= "https://codecyprus.org/th/api/score?session=" + sessionID;
    //Fetching the API
    const response = await fetch(SCORE_URL);
    const data = await response.json();

    if(data.status==="OK")
    {
        //If the quiz is not completed
        if(data.completed=== false )
        {
            //The treasure hunt is not completed
            if( data.finished===false)
            {
                //Get the element id
              let scoreItem=document.getElementById("score-div");
              //Set the value to the score
              scoreItem.innerHTML= "SCORE: "+ data.score;


            }


        }

    }

}

//This functions calls the leaderboard APi
async function Leaderboard()
{

    let session=sessionID;
    //Setting the limit of the players that appear on the leaderboard
    const limit=1000;



    const LB_URL="https://codecyprus.org/th/api/leaderboard?session="+ session +"&sorted&limit=" + limit;
    //Fetching the API
    const response=await fetch(LB_URL);
    const data= await response.json();

    console.log(data);

    if(data.status==="OK")
    {
        //Storing the leaderboard array in a variable
        let lb_array=data.leaderboard;
        //Getting the element ID from the HTML page
        let lb=document.getElementById("lb-div");

       //Looping through the leaderboard array
        for(let i of lb_array)
        {

            //Creating a div which will hold the player name, score, and time
            let lbItems=document.createElement("div");
            //Creating an h3 element which holds the name of the player
            let player=document.createElement("h3");
            //Creating an h3 element which holds the score
            let score=document.createElement("h3");
            let br=document.createElement("br");
            //Creating an h3 element which holds the completion time
            let completionTime=document.createElement("h3");
            //Setting the text content to the player at position i
            player.textContent="Player: " + i.player;
            //Setting the score of that position
            score.textContent="Score: " + i.score;
            completionTime.textContent="Completion Time: " + i.completionTime;
            //Append all the data to the div we created above
            lbItems.append(player);
            lbItems.append(score);
            lbItems.append(completionTime);

            //Append all the divs to the HTML page
            lb.append(lbItems);
            lb.append(br);



        }
        //Accessing the name of the selected treasure hunt and displaying it
        let name=document.createElement("h3");
        name.textContent=data.treasureHuntName;
        let div=document.getElementById("th-name");
        div.append(name);



    }


}

//List testing
async function listTesting()
{

    let x=new URLSearchParams(window.location);
    let params= x.get("number-of-ths")
    testListURL="https://codecyprus.org/th/test-api/list?" + params;
    const res=await fetch(testlistURL)
    const testData=await res.json();

    console.log(testData);



}
async function startTest()
{
    let x=new URLSearchParams(window.location);
    let params= x.get("player");

   let  start_test_url="https://codecyprus.org/th/test-api/start?" + params;

    const res=await fetch(start_test_urlL)
    const testData=await res.json();

    console.log(testData);



}

