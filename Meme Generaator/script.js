function loadMeme(input)
{
    const url = `https://meme-api.com/gimme/${input}`;
    fetch(url)
    .then(response => response.json())
    .then(allMeme => displayMeme(allMeme))
}

function displayMeme(allMeme)
{
    console.log(allMeme.memes)
    const container = document.querySelector('#allMeme');
    container.innerText = "";
    for(meme of allMeme.memes)
    {
        
        const  div = document.createElement('div');
        div.classList.add('bg-blue-100');
        div.classList.add('p-3');
        div.classList.add('rounded-md');
        div.innerHTML=`
            <div class="card card-compact w-full h-full bg-base-100 shadow-xl">
            <figure class="h-fit w-fit"><img  src="${meme.url}" alt="Album"/></figure>
            <div class="card-body">
                <h2 class="card-title">Title: ${meme.title}</h2>
                <p>Author: ${meme.author}</p>
            </div>
            </div>
        `
        container.appendChild(div);
    }
}

document.querySelector('#btn').addEventListener('click',()=>
{
    const input = document.querySelector('#input').value;
    loadMeme(input);

})
