var id = GetURLParameter('id');

const title = document.getElementsByClassName("episode-info__title")[0];
const episodeInfo = document.getElementsByClassName("episode-info__group-data");

const getEpisode = async id => {
    const res = await fetch(`https://tarea-1-breaking-bad.herokuapp.com/api/episodes/${id}`);
    const episode = await res.json();
    return episode[0];
}

const formatDate = date => {
    const month = [
        0,
        "enero",
        "febrero",
        "marzo",
        "abril",
        "mayo",
        "junio",
        "julio",
        "agosto",
        "septiembre",
        "octubre",
        "noviembre",
        "diciembre"
    ]
    var dateArr = date.split('-');
    var dateString = `${dateArr[2].split("T")[0]} de ${month[parseInt(dateArr[1])]} de ${dateArr[0]}`;
    return dateString;
}

const getCharacterId = async charName => {
    var response = await fetch(`https://tarea-1-breaking-bad.herokuapp.com/api/characters?name=${charName}`);
    var character = await response.json();
    return character[0].char_id;
}

const characterFormat = async characters => {
    if (characters.length > 0) {
        const html = characters.map(
            async character => `
            <div class="episode-info__character-list">
                <a class="episode-info__link" href="character.html?id=${await getCharacterId(character)}"> ${character} <a>
            </div>
            `
        );
        return (await Promise.all(html)).join('');
    }
    return ``;
}

const episodeHtml = async (id) => {
    episode = await getEpisode(id);
    title.innerHTML = episode.title;
    episodeInfo[0].innerHTML = episode.series;
    episodeInfo[1].innerHTML = episode.season;
    episodeInfo[2].innerHTML = episode.episode;
    episodeInfo[3].innerHTML = formatDate(episode.air_date);
    episodeInfo[4].innerHTML = await characterFormat(episode.characters);
}

episodeHtml(id);