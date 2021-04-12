const searchInput = document.getElementById("search");
const matchList = document.getElementById("match-list");

// funcion extraida de https://www.learningjquery.com/2012/06/get-url-parameters-using-jquery
function GetURLParameter(sParam)
{
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) 
    {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) 
        {
            return sParameterName[1];
        }
    }
}

const searchCharacter = async input => {
    if (input.length !== 0) {
        var response = await fetch(`https://tarea-1-breaking-bad.herokuapp.com/api/characters?name=${input}`);
        var characters = await response.json();
        response = await fetch(`https://tarea-1-breaking-bad.herokuapp.com/api/characters?name=${input}&limit=10&offset=10`);
        var nextPage = await response.json();

        for (var i = 1; i < 8; i++) {
            if (nextPage.length !== 0) {
                characters.push(...nextPage);
                response = await fetch(`https://tarea-1-breaking-bad.herokuapp.com/api/characters?name=${input}&limit=10&offset=${i}0`);
                nextPage = await response.json();
            }
        }
        console.log(characters);
        charactersHtml(characters)
    }
    else {
        matchList.innerHTML = '';
    }
};

// Codigo basado en el tutorial extraido de https://www.youtube.com/watch?v=1iysNUrI3lw
const charactersHtml = characters => {
    if (characters.length > 0) {
        const html = characters.map(
            character => `
            <div class="search-bar__list-element">
                <a class="search-bar__link" href="character.html?id=${character.char_id}"> ${character.name} <a>
            </div>
            `
        ).join('');
        matchList.innerHTML = html;
    }
}

searchInput.addEventListener('keyup', () => searchCharacter(search.value));