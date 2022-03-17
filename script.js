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

getList();

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
                window.location.href="startGame.html";
                console.log(session);

            }

        })

}

start();

const session_params = new URLSearchParams(location.search);
const session=session_params.get("session");
console.log(session);



async function getQuestions()
{
    const QUESTIONS_URL="https://codecyprus.org/th/api/question?session" + session;

    const res= await fetch(QUESTIONS_URL);
    const data= await res.json();


    console.log(data);

    if(data.status === "OK" && session === session_params.get("session"))
    {

        for(let q=0; q < data.numOfQuestions-1; q++)
        {
            let question=document.createElement("h2");
            question.textContent=data.questionText;
            //question.href=QUESTIONS_URL;
            let q_div=document.getElementById('question');
            q_div.append(question);
            q_div.append(document.createElement("br"));

        }


    }
    else
    {
        alert(data.errorMessages);
    }


}
getQuestions();



