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


     /*    let response=fetch('https://codecyprus.org/th/api/list')
         .then(response => response.json())
         .then(json =>{ console.log(json)

         }
        );



       let challengesList=document.getElementById("challenges");


           response.forEach(item=> {
           let listItem=document.createElement("li");
            listItem.innerHTML=json.treasureHunts[item];
             challengesList.appendChild(listItem);
           });

*/
let list_url='https://codecyprus.org/th/api/list';

  async function getList()
  {
     const response=await fetch(list_url);
     const json_data=await response.json();


      console.log(json_data);

      let array=json_data.treasureHunts;


      for(const item of array)
      {
          let listItem=document.createElement("li");
          listItem.textContent=item;
          let challengeList=document.getElementById("challenges");
          challengeList.appendChild(listItem);
      }

  }

getList();