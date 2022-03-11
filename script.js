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



let list_url='https://codecyprus.org/th/api/list';

  async function getList()
  {
     const response=await fetch(list_url);
     const json_data=await response.json();


      console.log(json_data);

      let array=json_data.treasureHunts;

      let challengeList=document.getElementById("challenges");

      for(const item of array)
      {

                 let listItem=document.createElement("a");
                 listItem.textContent= item.name ;
                 listItem.href = "start.html?treasureHuntID=" + item.uuid;
                 challengeList.appendChild(listItem);
                 challengeList.appendChild(document.createElement("br"))
      }




  }

getList();