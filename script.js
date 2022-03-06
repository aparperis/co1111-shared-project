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

/*fetch('https://codecyprus.org/th/api/list')
    .then(response => response.json())
    .then(jsonObject => { console.log(jsonObject)
    }); */

function calLlIST() {
    let httpRequest=new XMLHttpRequest();

    httpRequest.onload=function() {
        document.getElementById('myDiv').innerText=this.responseText;
    };

    httpRequest.open("https://codecyprus.org/th/api/list",true);
    httpRequest.send();
}
calLlIST();