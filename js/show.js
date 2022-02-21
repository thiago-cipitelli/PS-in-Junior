const url = "https://lobinhos.herokuapp.com/wolves"
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id')

const showWolf = () => {
  fetch(url)
  .then((response) => response.json())
    .then((wolves)=> {
      wolf = wolves.find((item) => item.id == id)
      const body = document.getElementsByTagName("section")[0]
      const lobo = document.createElement("div")
      lobo.classList.add("content")
      lobo.innerHTML = `<div class="content">
        <h1>${wolf.name}</h1>
      <div class="wolf">
        <div class="card">
          <div class="box-bg"></div>
          <div class="pfp" style="background-image: url('${wolf.image_url}')" alt=""></div>
          <div class="buttons">
            <a class="btn green" href="./adotar.html?id=${wolf.id}">ADOTAR</a>
            <button class="btn red" onclick="deleteWolf()">EXCLUIR</button>
          </div>
        </div>
          <div class="info">
            <p>${wolf.description}</p>
          </div>
        </div>
      </div>
`
      body.appendChild(lobo)
    })
}

showWolf(id)

const deleteWolf = () => {
  const key = "/" + id
  const config = {
      method: "DELETE",
      headers: {
        "content-Type": "application/json"
      }
    }
  fetch(url + key, config)
  .then((response) => response.json())
    .then((wolves)=> {
      console.log("foi")
    })
    .catch((error) => {
      console.log(error)
    })
}
