function loadData(value)
{
    const url= `https://codeforces.com/api/user.rating?handle=${value}`;
    document.querySelector('#loader').classList.remove('hidden');
    fetch(url).then(response => response.json()).then(data =>
        {
            if(data.status == 'FAILED')
            {
                document.querySelector('#loader').classList.add('hidden');
                document.querySelector('#table-data').innerHTML='';
                document.querySelector('#container').innerHTML=
                `
                <div class="alert alert-error"> <i class="fa-solid fa-triangle-exclamation"></i> <span>Error! No Data Found With This ID <span class='text-2xl font-bold text-blue-100'> ${value}</span> </span></div>
                `;                
            }
            else
            {
                document.querySelector('#loader').classList.add('hidden');
                showData(data.result)
            }
        });
}

function loadUser(value)
{
    const url= `https://codeforces.com/api/user.info?handles=${value}`;
    document.querySelector('#loader').classList.remove('hidden');
    fetch(url).then(response => response.json()).then(data =>
        {
            if(data.status == 'FAILED')
            {
                document.querySelector('#loader').classList.add('hidden');        
            }
            else
            {
                document.querySelector('#loader').classList.add('hidden');
                showUser(data.result[0]);
            }
        });
}

document.querySelector('#ínputButton').addEventListener('click',()=>
{
    const value = document.querySelector('#value').value;
    loadData(value)
    loadUser(value)
})

document.querySelector('#value').addEventListener('keypress',(e)=>
{
    if(e.key=='Enter')
    {
        const value = document.querySelector('#value').value;
        loadData(value)
        loadUser(value)
    }
});

function showData(data)
{
    let contestNumber = data.length;
    makeNull('section')
    if(contestNumber>0)
    {

        document.querySelector('#section').innerHTML=
        `
         <h1 class="text-4xl text-center">Rating Data Table</h1>
    
        `;
    
        makeNull('tbody')
        document.querySelector('#thead').innerHTML=
        `
        <tr class="text-xl">
        <th>NO</th>
        <th>Present Rating</th>
        <th>Rating Change</th>
        <th>Rank</th>
        <th>Contest Name</th>
        </tr>
        `;
        // console.log(contestNumber);
        for(let i=contestNumber-1;i>=0;i--)
        {
            const {contestId,contestName,rank,oldRating,newRating} = data[i];
            const change = parseInt(newRating)- parseInt(oldRating);
            const tr = document.createElement('tr');
            tr.innerHTML=
            `
            <td>${contestNumber- i}</td>
            <td>${newRating} </td>
            <td>${change} </td>
            <td>${rank} </td>
            <td><a href="https://codeforces.com/contest/${contestId}">${contestName} </a></td>
            `;
            tbody.appendChild(tr);
        }
    }
    
};

function showUser(data)
{
    const {lastName,country,city,rating,friendOfCount,titlePhoto,firstName,organization,rank,maxRating,handle} = data;
    const parent = document.querySelector('#container')
   parent.innerHTML=
   `
   <div class="card w-full lg:w-[40%] mx-auto bg-base-100 shadow-stone-100 shadow-xl">
    <figure class="px-10 pt-10">
        <img src="${titlePhoto} " alt="Shoes" class="rounded-xl" />
    </figure>
    <div class="card-body items-left">
        <h2 class="card-title">${firstName ? firstName : 'No Name Found! '}   ${lastName ? lastName : ' '} <div class="badge badge-accent badge-outline">${rank? rank : ' No Data'}</div> </h2>
        ${addP('Present Rating',rating)} 
        ${addP('Max Rating',maxRating)}    
        ${addP('Follower',friendOfCount)}    
        ${addP('Country',country)}    
        ${addP('City',city)}    
        ${addP('Organization',organization)}    
        <div class="card-actions">
        <button class="btn btn-primary bg-teal-300 border-0 capitalize hover:bg-blue-100">  <a target="_blank" href="https://codeforces.com/profile/${handle}"><i class="fa-solid fa-chart-simple"></i> Follow Me</a></button>
        </div>
    </div>
    </div>
   `;

}

// reuseable function 

function addP(name,value)
{
   const p = `<p class="text-md"><span class="font-bold ">${name}: </span>${value ? value : 'No Data Found!'} </p>`;
   return p;
}

function makeNull(id)
{
    document.getElementById(id).innerHTML = '';
}