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
const postWolf = () => {
  let nome = document.forms["form"]["nome"].value;
  let idade = document.forms["form"]["idade"].value;
  let email = document.forms["form"]["e-mail"].value;
  if (nome == "" || idade == "" || email == "" ) {
    return false
  }else{
    const key = '/' + id
    const body = {
      wolf: {
        adopter_name: nome,
        adopter_age: idade,
        adopter_email: email
      }
    }
    const config = {
      method: "PUT",
      body: JSON.stringify(body),
      headers: {
        "content-Type": "application/json"
      }
    }
    fetch(url + key, config)
      .then((response) => response.json())
      .then((wolf)=> {
        console.log(wolf)
      })
      .catch((error) => {
        console.log(error)
      })
  }
}

showWolf(id)
