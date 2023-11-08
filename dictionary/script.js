
function loadData()
{
    const input = document.querySelector('#searchInput').value;
    if(input)
    {
        const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${input} `;
        document.querySelector('#loader').classList.remove('hidden');
        fetch(url).then(response =>response.json()).then(data =>
            {
                if(data.title == "No Definitions Found")
                {
                    document.querySelector('#loader').classList.add('hidden');
                    alert('No word found!');
                }
                else
                {
                    document.querySelector('#loader').classList.add('hidden');
                    showData(data);
                }
            });
        }    
}

loadData()

function showData(data)
{
    const {word,phonetics,meanings,sourceUrls} = data[0];
    const parent = document.querySelector('#container')
    const div = document.createElement('div');
    div.innerHTML=`
    
    `;
}