function loadData()
{
    fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.json())
    .then(data=>displayData(data))
}

function displayData(data)
{
    // console.log(data)
    const container = document.querySelector('#allPost');
    for(let i=0;i<12;i++)
    {
        const position = Math.floor(Math.random()*100);
        const div = document.createElement('div');
        div.innerHTML=`
        <div class="card w-100 text-black h-full bg-blue-100 shadow-xl">
        <div class="card-body">
            <h2 class="card-title">Title: ${data[position].title}</h2>
            <p><span class='font-bold'>Description:</span> ${data[position].body}</p>
        </div>
        </div>
        `;
        container.appendChild(div)
    }
}

loadData()
document.querySelector('#btn').addEventListener('click',()=>
{
    document.location.reload()
});
