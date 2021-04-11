var char_id = GetURLParameter('id');

const id = document.getElementsByClassName("character-info__id")[0];

id.innerHTML = `${char_id}`;