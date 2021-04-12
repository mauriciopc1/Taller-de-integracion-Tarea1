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
        <div class="seasons__season-title">
            <a class="seasons__season-title-link">Season ${key}</a>
        </div>
        `
        seasonEpisodesHtml += seasonHtml(value);
    });
    seasons.innerHTML = seasonEpisodesHtml;
};

const clickBreakingBad = async () => {
    if (!bbOpen) {
        bbOpen = true;
        bcsOpen = false;
        const episodes = await getEpisodes(`Breaking+Bad`);
        showEpisodes(episodes);
    }
    else {
        bbOpen = false;
        seasons.innerHTML = '';
    }
}

const clickBetterCallSaul = async () => {
    if (!bcsOpen) {
        bcsOpen = true;
        bbOpen = false;
        const episodes = await getEpisodes("Better+Call+Saul");
        showEpisodes(episodes);
    }
    else {
        bcsOpen = false
        seasons.innerHTML = '';
    }
}

betterCallSaul.addEventListener('click', clickBetterCallSaul);
breakingBad.addEventListener('click', clickBreakingBad);

if (serie && season) {
    if (serie == "better-call-saul") {
        clickBetterCallSaul();
    }
    else if (serie == "breaking-bad") {
        clickBreakingBad();

    }
}