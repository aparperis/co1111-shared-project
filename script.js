function navTransition()
{
    //const b_menu=document.querySelector('.hamburger-menu');
    const nav=document.querySelector('.nav-items-drop');

    if(nav.style.display=== "none")
    {
        nav.style.display="flex";

    }
    else
    {
        nav.style.display="none";

    }
}



let list_url='https://codecyprus.org/th/api/list';

  async function getList()
  {
     const response=await fetch(list_url);
     const json_data=await response.json();


      console.log(json_data);

      let array=json_data.treasureHunts;

      let challengeList=document.getElementById('challenges');

      for(const item of array)
      {

                 let listItem=document.createElement("a");
                 listItem.textContent= item.name ;
                 listItem.href = "start.html?treasureHuntID=" + item.uuid;
                 challengeList.appendChild(listItem);
                 challengeList.append(document.createElement("br"));
                 challengeList.append(document.createElement("br"));
                 challengeList.append(document.createElement("br"));
      }

  }

const id_params = new URLSearchParams(location.search);
const treasureHuntID = id_params.get("treasureHuntID");

console.log(treasureHuntID);


function start()
{
    const playerName = document.getElementById("playerName").value;
    const appName = "Team5App";
    const START_URL = "https://codecyprus.org/th/api/start?player=" + playerName + "&app=" + appName + "&treasure-hunt-id=" + treasureHuntID;

    console.log(START_URL);

    fetch(START_URL)
        .then(response=> {
            return response.json();
        })
        .then(data=>{

            console.log(data);
            if(data.status=== "ERROR") {
                alert(data.errorMessages);
            }
            else
            {
                setCookie("sessionID", data.session, 30);
                window.location.href="startGame.html";
                console.log(data.session);

            }

        })

}



async function getQuestions()
{

    const session=sessionID;
    console.log(session);

    const QUESTIONS_URL="https://codecyprus.org/th/api/question?session=" + session;

    const response= await fetch(QUESTIONS_URL);
    const data= await response.json();

    console.log(data);

    if(data.status === "OK")
    {

        if(data.completed === false)
        {
            let question = document.createElement("h3");
            question.innerHTML = data.questionText;
            question.style.color="#212326";
            let q_div = document.getElementById("question");
            q_div.innerHTML=data.questionText;
            q_div.append(document.createElement("br"));

            let answerElement=document.getElementById("answer-box");
            let ans = answerElement.value;

            let skip_btn=document.getElementById("skip");

            if(data.canBeSkipped === true)
            {
               skip_btn.style.display="flex";


            }
            else
            {
                skip_btn.style.display="none";

            }


        }
        else
        {
            document.getElementById("answer-box").style.display="none";
            let txt=document.createElement("h3");
            txt.textContent=data.questionText;
            let x=document.getElementById("questions_div");
            x.append(txt);
            let lb_btn=document.getElementById("submit-btn");
            lb_btn.innerText="LEADERBOARD";
            lb_btn.href="leaderboard.html";

        }

    }
    else
    {
        alert(data.errorMessages);
    }

}

async function answer()
{

    const session=sessionID;
    let answerElement=document.getElementById("answer-box");
    let answer = answerElement.value;

    let ANSWER_URL="https://codecyprus.org/th/api/answer?session=" + session + "&answer=" + answer;

    const response= await fetch(ANSWER_URL);
    const data = await response.json();

    console.log(data);

    let correct=data.correct;

   if(data.status === "OK")
   {
       if(correct)
       {

           if(data.completed === false)
           {
               alert(data.message);
               await getQuestions();


           }
           else
           {
               window.location.href="leaderboard.html";
           }

       }
       else
       {
           alert(data.message);
       }
   }

}

async function Skip()
{

    const SKIP_URL="https://codecyprus.org/th/api/skip?session=" + sessionID;
    const response=await fetch(SKIP_URL);
    const data=await response.json();

   if(data.status==="OK")
   {

       alert(data.message);
       await getQuestions();
   }


}

async function score()
{
    const SCORE_URL= "https://codecyprus.org/th/api/score?session=" + sessionID;
    const response = await fetch(SCORE_URL);
    const data = await response.json();

    if(data.status==="OK")
    {
        if(data.completed=== false )
        {
            if( data.finished===false)
            {



            }


        }

    }

}

async function Leaderboard()
{

    let session=sessionID;

    const LB_URL="https://codecyprus.org/th/api/leaderboard?session="+ session +"&sorted&limit=10";
    const response=await fetch(LB_URL);
    const data= await response.json();

    console.log(data);

    if(data.status==="OK")
    {
        let lb_array=data.leaderboard;
        let lb=document.getElementById("lb-div");


        for(let i of lb_array)
        {
            console.log(lb_array[i]);

            let lbItems=document.createElement("div");
            let player=document.createElement("h3");
            let score=document.createElement("h3");
            let br=document.createElement("br");
            let completionTime=document.createElement("h3");
            player.textContent="Player: "+i.player;
            score.textContent="Score: " + i.score;
            completionTime.textContent="Completion Time: " + i.completionTime;
            lb.append(lbItems);
            lb.append(player);
            lb.append(score);
            lb.append(completionTime);
            lb.append(br);


        }

    }


}


