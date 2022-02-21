const url = "https://lobinhos.herokuapp.com/wolves"

const showWolf = () => {
  fetch(url)
  .then((response) => response.json())
    .then((wolves)=> {
      const wolf1 = wolves[0]
      const wolf2 = wolves[1]
      const body = document.getElementsByTagName("section")[0]
      const lobo = document.createElement("div")
      lobo.classList.add("examples")
      lobo.innerHTML = `<h2>Lobos Exemplo</h2>
        <div class="wolf">
          <div class="box-bg"></div>
          <div class="image" style="background-image: url('${wolf1.image_url}')" alt=""></div>
          <div class="info">
            <h4>${wolf1.name}</h4>
            Idade: ${wolf1.age} anos
            <p>${wolf1.description}</p>
          </div>
        </div>
        <div class="wolf">
          <div class="box-bg"></div>
          <div class="image" style="background-image: url('${wolf2.image_url}')" alt=""></div>
          <div class="info">
            <h4>${wolf2.name}</h4>
            Idade: ${wolf2.age} anos
            <p>${wolf2.description}</p>
          </div>
        </div>
`
      body.appendChild(lobo)
    })
}
showWolf()
