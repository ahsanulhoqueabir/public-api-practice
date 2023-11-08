function getData(id)
{
    const value = document.querySelector('#search-value').value;
    const searchID = id || value;

    const url = `https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=${searchID}`;
    document.querySelector('#spinner').classList.remove('hidden');
    fetch(url)
    .then(respons => respons.json())
    .then(data =>{
        document.querySelector('#spinner').classList.add('hidden');
        showData(data.player)
    })
}
function showData(players)
{
    
      if(players === null)
      {
        
        const container = document.querySelector('#player-info');
        container.innerHTML = '';
        const p = document.createElement('div')
        p.innerHTML=
        `
        <div class="alert alert-error w-full items-center flex text-white">
        <i class="fa-regular fa-circle-xmark"></i>
        <span>Error! No player found in DataBase with this Name.</span>
        </div>
        `;
        container.appendChild(p)

        }
      else
      {
          const container = document.querySelector('#player-info')
        //   document.querySelector('#playerDetails').innerHTML='';
          container.innerHTML = "";
          for(let player of players)
          {
              // console.log(player);
              const {strThumb,strPlayer,strNationality,strTeam,strTeam2,dateBorn,strDescriptionEN,strGender,strHeight,strWeight,strBanner,strFacebook,strInstagram,idPlayer}=player;
              const div = document.createElement('div');
              div.innerHTML =
              `
                  <div class="card w-full h-full text-black bg-blue-100 shadow-2xl">
                  <figure class="px-10 pt-10">
                  <img src="${strThumb ? strThumb : 'https://picsum.photos/300'}" alt="${strPlayer}" class="rounded-xl" />
                  </figure>
                  <div class="card-body items-center text-center">
                  <h2 class="card-title">${strPlayer}</h2>
                  <p>Nationality: ${strNationality} </p>
                  <p>Club: ${strTeam} </p>
  
                  <div class="flex gap-3 ">
                  <button onclick="PlayerDetails('${idPlayer}')" class="btn-sm h-fit bg-black rounded text-white"> <i class="fa-solid fa-circle-info"></i>  Details </button>
                  <button onclick="deleteData(event)" class=" outline-none rounded btn-sm bg-red-600"><i class="fa-solid fa-trash"></i> Delete</button>
  
                  </div>
                  </div>
                  </div>
              `;
              container.appendChild(div);
          }

      }
    
}
getData("messi");

function PlayerDetails(id)
{
    const url = `https://www.thesportsdb.com/api/v1/json/3/lookupplayer.php?id=${id}`;
    fetch(url)
    .then(response=> response.json())
    .then((data) => showDetail(data.players[0]))
}

function showDetail(data)
{
    const {strThumb,strPlayer,strNationality,strTeam,strTeam2,dateBorn,strDescriptionEN,strGender,strHeight,strWeight,strBanner,strFacebook,strInstagram,idPlayer,strSport}=data;

    const container= document.querySelector('#playerDetails');
    container.innerHTML = "";
    const div = document.createElement('div');
    div.classList.add("p-3","rounded")
    div.innerHTML=`
        <div class="card full bg-blue-100 text-black shadow-xl pb-4">
        <figure><img src="${strBanner ? strBanner : 'https://picsum.photos/600/200'} " alt="${strPlayer}" /></figure>
        <div class="card-body">
        <h2 class="card-title">${strPlayer}</h2>
        <p>${strDescriptionEN? strDescriptionEN.slice(0,250) + '...' : 'No data in DataBase'}</p>
        <p>Teams: ${strTeam ? strTeam : 'Not Available'}, ${strNationality ? strNationality : 'Not Available'}</p>
        <p> Date of Birth: ${dateBorn ? dateBorn : 'Not Available'}
        </div>

        <div class='flex flex-row-reverse '>
            <div class="flex justify-center gap-5 text-2xl mr-4"> 
                <button class="btn btn-outline bg-black"><a href='${strFacebook? strFacebook : '#'}' > <i class="fa-brands fa-facebook"></i> </a></button>
                <button class="btn btn-outline bg-black"> <a href='${strInstagram? strInstagram : '#'} ' > <i class="fa-brands fa-instagram"></i> </a></button> 
            </div>
            <div class="flex items-center h-full w-full ml-4">
            <img class="h-[15%] w-[15%] rounded-full" src="${strThumb? strThumb : 'https://picsum.photos/300'} ">
            <div class="flex flex-col ml-3">
                <strong>${strPlayer ? strPlayer : 'Not Available'} </strong>
                <span>${strSport ? strSport : 'Not Available'} </span>
            </div>
            </div>

        </div>
        </div>       
    `;
    // ${strDescriptionEN.slice(0,150)+'....'} to show descrpition of 150 letter 
     container.appendChild(div);
    //  console.log(data);
}

function deleteData(e)
{
    
 console.log(e.target.parentNode.parentNode.parentNode.parentNode.classList.add('hidden'));
    
}

function regenerate()
{
    document.location.reload();
}

