const url = "https://lobinhos.herokuapp.com/wolves"
let currentPage = 1;

const getWolves = () => {
  fetch(url)
    .then((response) => response.json())
    .then((wolf)=> {
      return wolf
    })
}

const listItems = (items, pageActual, limitItems) => {
  let result = []
  let totalPage = Math.ceil( items.length / limitItems)
  let count = ( pageActual * limitItems ) - limitItems
  let delimiter = count + limitItems

  if (pageActual <= totalPage) {
    for (let i=count; i<delimiter; i++) {
      result.push(items[i])
      count++
    }
  }
  return result
}

function alerta () {
  alert("inicio")
}

const listWolves = (pag) => {
  let cont = 1
  const body = document.querySelector('.wolves')
  body.innerHTML = ` `
  fetch(url)
    .then((response) => response.json())
    .then((wolves)=> {
      let list = listItems(wolves, pag, 4)
      list.map((item) => {
        const wolf = document.createElement("div")
        wolf.classList.add("wolf")
        if (cont%2==0) {
          wolf.classList.add("right")
          wolf.innerHTML = `
          <div class="info">
          <h4>${item.name}</h4>
          Idade: ${item.age} anos
          <p>${item.description}</p>
          </div>
          <div class="box-bg-right"></div>
          <div class="image" style="background-image: url('${item.image_url}')"></div>`
        }else{
        wolf.innerHTML = `
          <div class="box-bg"></div>
          <div class="image" style="background-image: url('${item.image_url}')"></div>
          <div class="info">
            <div class="data">
              <div class="name">
                <h4>${item.name}</h4>
                Idade: ${item.age} anos
              </div>
              <button class="btn">Adotar</button>
            </div>
            <p>${item.description}</p>
          </div>`
        }
        body.appendChild(wolf)
        cont++ 
      })
    })
  const pages = document.querySelector('.pages')
  pages.innerHTML = `<a href="#" onclick="listWolves(${pag-1})"> ${pag-1} </a> 
    <a href="#" onclick="listWolves(${pag})"> ${pag} </a>
    <a href="#" onclick="listWolves(${pag+1})"> ${pag+1} </a>

    `
}
listWolves(currentPage)

