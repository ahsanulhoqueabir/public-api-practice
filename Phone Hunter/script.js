function loadData(value,count)
{
    // value();
    const url=`https://openapi.programming-hero.com/api/phones?search=${value}`;
    document.querySelector('#loader').classList.remove('hidden');
    fetch(url).then(response =>response.json()).then(data =>
        {
            // console.log(data);
            if(data.status == true)
            {
                document.querySelector('#loader').classList.add('hidden');
                showData(data.data,count);
            }
            else
            {
                document.querySelector('#loader').classList.add('hidden');
                const container = document.querySelector('#container')
                container.innerHTML = '';
                const div = document.createElement('div');
                div.innerHTML=
                `
                <div class="alert alert-error capitalized"> <i class="fa-solid fa-triangle-exclamation"></i> <span>No data found.</span></div>
                `;
                container.appendChild(div)
                
            }
        });
}

loadData('s22')

function showData(data,count)
{
    const container = document.querySelector('#container')
    container.innerHTML = '';
    // console.log(data.length)
    if(count && data.length >4)
    {
        data = data.slice(0,4);
        document.querySelector('#allBtn').classList.remove('hidden');
    }
    else
    {
        document.querySelector('#allBtn').classList.add('hidden');
    }
    // let x = 4 || count;
    data.forEach(element => {
        const {phone_name,slug,releaseDate,brand,image,others,mainFeatures} = element;
        // console.log(element);
        const div = document.createElement('div');
        div.innerHTML=
        `
        <div class="card w-full bg-blue-100 text-black shadow-xl">
        <figure class="px-10 pt-10"> <img class="hover:scale-[110%]" src="${image}" alt="${phone_name} " class="rounded-xl" /> </figure>
        <div class="card-body">
            <h2 class="card-title">${phone_name}</h2>
            <p><b>Brand: </b> ${brand} </p>
            <div class="card-actions">
            <button onclick="showDetails('${slug}'); ProductDetails.showModal()" class="btn hover:bg-teal-300 border-0 capitalize">Details</button>
            </div>
        </div>
        </div>
        `;
        container.appendChild(div)
    });
};


function Process(count)
{
    const text = document.querySelector('#Company').value;
    loadData(text,count);
    // document.querySelector('#Company').value = '';
}
// loadData()
document.querySelector('#Search').addEventListener('click',()=>
{
    Process(4);
})

// search input field enter button 
document.querySelector('#Company').addEventListener("keypress", function(event) 
{
    // console.log(event.key);
    if (event.key === 'Enter') 
    {
        Process(4)
    }
});
// document.location.reload();

document.querySelector('#allBtn').addEventListener('click',()=>
{
    Process();
});

function showDetails(id)
{
    // console.log(id);
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    document.querySelector('#loader').classList.remove('hidden');
    fetch(url).then(res => res.json()).then(data => 
        {
            document.querySelector('#loader').classList.add('hidden');
            displayProductDetails(data.data)
        });
        
    }
    
function displayProductDetails(element)
{
        
    const {name,slug,releaseDate,brand,image,others,mainFeatures} = element;
    const {chipSet,displaySize,storage,memory,sensors}=mainFeatures;
    let Allsensor = '';
    sensors.forEach(x=>
        {
            Allsensor +=', ' + x;
        })
    const {WLAN,Bluetooth,GPS,NFC,Radio,USB} =others;
    // console.log(Allsensor);
    const parent = document.querySelector('#detailsBox');
    parent.innerHTML = ''
    const div = document.createElement('div');
    div.innerHTML=
    `
        <div class="flex px-2 gap-2">
        <div>
            <img src="${image}" alt="${name}" srcset="">
            <h1 class="text-xl font-bold mt-3">${name} </h1>
        </div>
        <div>
            <p class="text-md"><span class="font-bold">Release Date: </span>${releaseDate} </p>
            <p class="text-md"><span class="font-bold">Display Size: </span>${displaySize} </p>
            <p class="text-md"><span class="font-bold">Storage: </span>${storage} </p>
            <p class="text-md"><span class="font-bold">Memory: </span>${memory} </p>
            <p class="text-md"><span class="font-bold">Bluetooth: </span>${Bluetooth} </p>
            <p class="text-md"><span class="font-bold">GPS: </span>${GPS} </p>
            <p class="text-md"><span class="font-bold">WLAN: </span>${WLAN} </p>
            <p class="text-md"><span class="font-bold">NFC: </span>${NFC} </p>
            <p class="text-md"><span class="font-bold">Radio: </span>${Radio} </p>
            <p class="text-md"><span class="font-bold">USB: </span>${USB} </p>
            <p class="text-md capitalize"><span class="font-bold">All sensor: </span>${Allsensor} </p>
        </div>
        </div>
        
    `;
    parent.appendChild(div);
}