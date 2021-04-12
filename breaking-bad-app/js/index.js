var serie = GetURLParameter('serie');
var season = GetURLParameter('season');

const breakingBad = document.getElementById("breaking-bad");
const betterCallSaul = document.getElementById("better-call-saul");
const seasons = document.getElementsByClassName("seasons__container")[0];

let bbOpen= false;
let bcsOpen= false;

const getEpisodes = async show => {
    var res = await fetch(`https://tarea-1-breaking-bad.herokuapp.com/api/episodes?series=${show}`);
    var episodes = await res.json();
    return episodes;
}

const seasonHtml = episodes => {
    if (episodes.length > 0) {
        const html = episodes.map(
            episode => `
            <div class="seasons__episode-container">
                <a class="seasons__episode-link" href="episode.html?id=${episode.id}">${episode.number}. ${episode.title}</a>
            </div>
            `
        ).join('');
        return html;
    }
}


const showEpisodes = async episodes => {
    season_json = {};
    for (var ep = 0; ep <episodes.length; ep++) {
        if (season_json[episodes[ep].season] != null) {
            season_json[episodes[ep].season].push({
                id: episodes[ep]["episode_id"],
                title: episodes[ep]["title"],
                number: episodes[ep]["episode"],
            });
        }
        else {
            season_json[episodes[ep].season] = [{
                id: episodes[ep]["episode_id"],
                title: episodes[ep]["title"],
                number: episodes[ep]["episode"],
            }];
        }
    }
    var seasonEpisodesHtml = ``;
    Object.entries(season_json).forEach(([key, value]) => {
        seasonEpisodesHtml += `
        <div id="${key}" class="seasons__season-title">
            <a class="seasons__season-title-link">Season ${key}</a>
        </div>
        `
        seasonEpisodesHtml += `<div class="seasons__episodes-container">`;
        seasonEpisodesHtml += seasonHtml(value);
        seasonEpisodesHtml += `</div>`;

    });
    seasons.innerHTML = seasonEpisodesHtml;
};

const openSeason = seasonString => {
    const seasonDiv = document.getElementById(`${seasonString}`);
    seasonDiv.classList.toggle("seasons__season-title--ative");
    var content = seasonDiv.nextElementSibling;
    if (content.style.maxHeight) {
    content.style.maxHeight = null;
    } else {
    content.style.maxHeight = content.scrollHeight + "px";
    }
};

const collapseSeasons = () => {
    var season = document.getElementsByClassName("seasons__season-title");
    var i;
    for (i = 0; i < season.length; i++) {
    season[i].addEventListener("click", function() {
        this.classList.toggle("seasons__season-title--ative");
        var content = this.nextElementSibling;
        if (content.style.maxHeight) {
        content.style.maxHeight = null;
        } else {
        content.style.maxHeight = content.scrollHeight + "px";
        }
    });
    }
}

const clickBreakingBad = async () => {
    if (!bbOpen) {
        bbOpen = true;
        if (bcsOpen === true) {
            betterCallSaul.classList.toggle("shows-section__show-container--active");
        }
        bcsOpen = false;
        breakingBad.classList.toggle("shows-section__show-container--active");
        const episodes = await getEpisodes(`Breaking+Bad`);
        showEpisodes(episodes);
        collapseSeasons();
    }
    else {
        bbOpen = false;
        breakingBad.classList.toggle("shows-section__show-container--active");
        seasons.innerHTML = '';
    }
}

const clickBetterCallSaul = async () => {
    if (!bcsOpen) {
        bcsOpen = true;
        if (bbOpen === true) {
            breakingBad.classList.toggle("shows-section__show-container--active");
        }
        bbOpen = false;
        betterCallSaul.classList.toggle("shows-section__show-container--active");
        const episodes = await getEpisodes("Better+Call+Saul");
        showEpisodes(episodes);
        collapseSeasons();
    }
    else {
        bcsOpen = false
        betterCallSaul.classList.toggle("shows-section__show-container--active");
        seasons.innerHTML = '';
    }
}

betterCallSaul.addEventListener('click', clickBetterCallSaul);
breakingBad.addEventListener('click', clickBreakingBad);

const selectSeason = async () => {
    if (serie && season) {
        if (serie == "better-call-saul") {
            await clickBetterCallSaul();
            openSeason(season);
        }
        else if (serie == "breaking-bad") {
            await clickBreakingBad();
            openSeason(season);
        }
    }
}

selectSeason();