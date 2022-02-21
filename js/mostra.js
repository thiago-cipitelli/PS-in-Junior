const url = "https://lobinhos.herokuapp.com/wolves"
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id')
const showWolf = (id) => {
  fetch(url)
  .then((response) => response.json())
    .then((wolves)=> {
      wolf = wolves.find((item) => item.id == id)
      const body = document.getElementById("section")
      const lobo = document.createElement("div")
      lobo.classList.add("card")
      lobo.innerHTML = `
        <img class="pfp" src="${wolf.image_url}" alt="">
        <div class="info">
        <h1>${wolf.name}</h1>
        ID:${wolf.id}
      `
      body.insertBefore(lobo, body.children[0]);
    })
}

showWolf(id)
