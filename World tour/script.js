function loadData()
{
    fetch('https://restcountries.com/v3.1/independent?status=true')
    .then(response => response.json())
    .then(allCountryData=>displayData(allCountryData,6))
}



// var count =12
function displayData(allCountryData,count)
{
    // console.log(allCountryData[10].name.official)
    // console.log(allCountryData[10].capital[0])
    // console.log(allCountryData[10].maps.googleMaps)
    // console.log(allCountryData[10].population)
    // console.log(allCountryData[10].continents[0])
    // console.log(allCountryData[10].flags.svg)
    const container = document.querySelector('#allCard')
    container.innerHTML='';
    // let count =12
    for(let i=0;i<count;i++)
    {
        // let position = Math.floor(Math.random()*200);
        const { flags,maps,name,population} = allCountryData[i];
        const div = document.createElement('div');
        const modal = document.querySelector('#showDetails');
        div.innerHTML=
        `<div class="card w-full bg-blue-100 text-black h-full shadow-xl">
        <figure class="px-10 pt-10"><img class="w-full" src="${flags.svg}" alt="Album"/></figure>
        <div class="card-body">
            <h2 class="card-title">${name.official}</h2>
           
            <p><span class="font-bold text-normal">Population: </span> ${population}</p>
            <div class="flex justify-center"> 
            <button class="btn w-fit text-center btn-success bg-blue-300" onclick="showDetails.showModal(); getID('${allCountryData[i].cca2}');">Show Details</button> 
            </div>
            </div>
        </div>
        `;
        container.appendChild(div);
    }
    
    
}

document.querySelector('#btn').addEventListener('click',()=>
{
    document.location.reload();

})
loadData()

function getID(id)
{
    const loader = document.querySelector('#loader');
    // loader.classList.remove('hidden')
    const url = `https://restcountries.com/v3.1/alpha/${id}`;
    fetch(url)
    .then(res=> res.json())
    .then(data=>showallDetails(data[0]));
    loader.classList.add('hidden');
    
}

function showallDetails(data)
{
    const {name,region,timezones,currencies,cca2} = data;
    const allCurrency = Object.keys(currencies)[0];
    // console.log(allCurrency);
    const div = document.querySelector('#modal-body');
    div.innerHTML=
    `
    <h2 class="card-title pb-2">${name.common} <div class="badge badge-secondary badge-outline">${cca2} </div>
    </h2>

    <p> <span class="font-bold">Timezones: ${timezones} </span> </p>
    <p> <span class="font-bold">Borders:  </span> </p>
    <p> <span class="font-bold">Currency: ${allCurrency ? allCurrency : ''}  </span> </p>
    <p> <span class="font-bold">Region: ${region ? region : ''}  </span> </p>
    
    `;
}

 
document.querySelector('#showAllCountry').addEventListener('click',()=>
{
    fetch('https://restcountries.com/v3.1/independent?status=true')
    .then(response => response.json())
    .then(allCountryData=>displayData(allCountryData,allCountryData.length))
    document.querySelector('#showAllCountry').setAttribute('disabled',true);
})

// function currencyName()
// {
//     fetch('https://restcountries.com/v3.1/currency/Bangladesh')
//     .then(response => response.json()) 
//     .then(Data => console.log(Data)) 
//         // {
//         //     const data = cData;
//         //     return data;
//         // });
// }

// // console.log(currencyName('BD'));
// currencyName()


document.querySelector('#Search-btn').addEventListener('click',()=>
{
    const btnn= document.querySelector('#srctext');
    const loader= document.querySelector('#srcloader');
    const searchCountry = document.querySelector('#Search-Country').value;   
    btnn.classList.add('hidden');
    loader.classList.remove('hidden');
    const url = `https://restcountries.com/v3.1/name/${searchCountry}`;
    fetch(url).then(response => response.json()).then(data => showCountryBySearch(data))
    btnn.classList.remove('hidden');
    loader.classList.add('hidden');
    
})

function showCountryBySearch(data)
{
    const container = document.querySelector('#allCard');
    // console.log(container);
    container.innerHTML='';
    data.forEach(element => 
    {
        const {capital,name,cca2,region,population,timezones,flags,startOfWeek}=element;
        const div = document.createElement('div');
        div.innerHTML=
        `
        <div class="card w-full bg-blue-100 text-black h-full shadow-xl w-full">
        <figure class="px-10 pt-10"><img class="rounded" src="${flags.svg} " alt="${name.common}" /></figure>
        <div class="card-body">
            <h2 class="card-title">${name.common} <div class="badge badge-accent badge-outline">${cca2}</div></h2>
            <p><b>Offical Name: </b> ${name.official} </p>
            <p><b>Capital Name: </b> ${capital[0]? capital[0] : ''} </p>
            <p><b>Region Name: </b> ${region} </p>
            <p><b>Population: </b> ${population} </p>
            <p><b>Timezone: </b> ${timezones} </p>
            <p class="capitalize"><b>Start of Week: </b> ${startOfWeek} </p>
        </div>
        </div>
        `;
        container.appendChild(div);
        const showAllbtn= document.querySelector('#showAllCountry');
        showAllbtn.classList.add('hidden')
        // console.log(element);
    });
}