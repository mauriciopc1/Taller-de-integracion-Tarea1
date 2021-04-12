var char_id = GetURLParameter('id');

const picture = document.getElementsByClassName("character-info__picture")[0];
const char_name = document.getElementsByClassName("character-info__name")[0];
const details = document.getElementsByClassName("character-info__details")[0];

const getCharacter = async id => {
    var response = await fetch(`https://tarea-1-breaking-bad.herokuapp.com/api/characters/${id}`);
    var character = await response.json();
    return character[0];
}

const characterHtml = async id => {
    const character = await getCharacter(id);
    picture.innerHTML = `
        <img src="${character.img}">
    `;
    char_name.innerHTML = `${character.name}`;
    var bbAppearances = ``;
    var bcsAppearances = ``;
    for (var i = 0; i < character.appearance.length; i++) {
        bbAppearances += `<a class=character-info__link href="index.html?serie=breaking-bad&season=${character.appearance[i]}">${character.appearance[i]}</a>, `;
    }
    for (var i = 0; i < character.better_call_saul_appearance.length; i++) {
        bcsAppearances += `<a class=character-info__link href="index.html?serie=better-call-saul&season=${character.better_call_saul_appearance[i]}">${character.better_call_saul_appearance[i]}</a>, `;
    }
    bbAppearances = bbAppearances.substring(0, bbAppearances.length - 2);
    bcsAppearances = bcsAppearances.substring(0, bcsAppearances.length - 2);
    details.innerHTML = `
    <div class="character-info__detail">
        <div class="character-info__detail-label">Nickname:</div>
        <di class="character-info__detail-data">${character.nickname}</di>
    </div>
    <div class="character-info__detail">
        <div class="character-info__detail-label">Ocupación:</div>
        <div class="character-info__detail-data">${character.occupation.join(', ')}</div>
    </div>
    <div class="character-info__detail">
        <div class="character-info__detail-label">Actor o actriz:</div>
        <div class="character-info__detail-data">${character.portrayed}</div>
    </div>
    <div class="character-info__detail">
        <div class="character-info__detail-label">Estado:</div>
        <div class="character-info__detail-data">${character.status}</div>
    </div>
    <div class="character-info__detail">
        <div class="character-info__detail-label">Apariciones en Breaking Bad:</div>
        <div class="character-info__detail-data">
            ${bbAppearances}
        </div>
    </div>
    <div class="character-info__detail">
        <div class="character-info__detail-label">Apariciones en Better Call Saul:</div>
        <div class="character-info__detail-data">
            ${bcsAppearances}
        </div>
    </div>
    <div class="character-info__detail">
        <div class="character-info__quotes-label"></div>
        <div class="character-info__quotes-data"></div>
    </div>
    `;
    const quotesLabel = document.getElementsByClassName("character-info__quotes-label")[0];
    const quotesData = document.getElementsByClassName("character-info__quotes-data")[0];
    const fullName = character.name.split(' ');
    var res = await fetch(`https://tarea-1-breaking-bad.herokuapp.com/api/quote?author=${fullName[0]}+${fullName[1]}`);
    var quotes = await res.json();

    if (quotes.length > 0) {
        quotesLabel.innerHTML = "Frases:";
        var quotesHtml = ``;
        for (var i = 0; i < quotes.length; i++) {
            quotesHtml += `<h4 class="character-info__quote">${quotes[i].quote}</h4>`;
        }
        quotesData.innerHTML = `${quotesHtml}`;
    }
}

characterHtml(char_id);