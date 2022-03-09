function navTransition()
{
    const b_menu=document.querySelector('.hamburger-menu');
    const nav=document.querySelector('.nav-items');

    if(nav.style.transform==="translateX(100%)")
    {
        nav.style.transform="translateX(0%)";
        nav.style.transition="transform 0.5s ease-in" ;
    }
    else
    {
        nav.style.transform="translateX(100%)";

    }
}


         let response=fetch('https://codecyprus.org/th/api/list')
         .then(response => response.json())
         .then(json =>{ console.log(json)

         }
        );



       let challengesList=document.getElementById("challenges");
      /* Hre I have to reference the parsed array*/

           response.forEach(item=> {
           let listItem=document.createElement("li");
            listItem.innerHTML=json.treasureHunts[item];
             challengesList.appendChild(listItem);
           });



