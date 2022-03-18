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

    if(data.status === "OK" ) {

        let question = document.createElement("p");
        question.innerHTML = data.questionText;
        let q_div = document.getElementById("question");
        q_div.append(question);
        q_div.append(document.createElement("br"));

        const input = document.getElementById("answer-box").value;
        const type=data.questionType;

        if(input.innerText === type && type === "INTEGER")
        {

            answer();
        }

    }
    else
    {
        alert(data.errorMessages);
    }


}



async function answer() {

    const session=sessionID;

    const params=new URLSearchParams(location.search);
    const answer_params = params.get("answer");

    const ANSWER_URL="https://codecyprus.org/th/api/answer?session=" + session +"&answer=" + answer_params;

    const response=await fetch(ANSWER_URL);
    const data=await response.json();



    const input = document.getElementById("answer-box").value;

    if(input.innerText === answer_params)
    {
       alert(data.message);


    }

    console.log(data);








}


