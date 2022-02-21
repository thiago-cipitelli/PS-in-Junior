const url = "https://lobinhos.herokuapp.com/wolves"
let currentPage = 1;

const getWolves = () => {
  fetch(url)
    .then((response) => response.json())
  .then((wolf)=> {
      return wolf
    })
}

const envia = () => {
  let nome = document.forms["form"]["nome"].value;
  let idade = document.forms["form"]["idade"].value;
  let foto = document.forms["form"]["foto"].value;
  let descr = document.forms["form"]["descr"].value;
  if (nome == "" || idade == "" || foto == "" || descr == "" ) {
    return false
  }else{
    console.log(nome, idade, foto, descr)
    const body = {
      wolf: {
        name: nome,
        age: idade,
        image_url: foto,
        description: descr
      }
    }
    const config = {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "content-Type": "application/json"
      }
    }
    fetch(url, config)
      .then((response) => response.json())
      .then((wolf)=> {
        console.log(wolf)
      })
      .catch((error) => {
        console.log(error)
      })
  }
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

const search = () => {
  let check = document.getElementById("chkbox").checked 
  if (check) {
    listWolves(1, check)
  }else{
    listWolves(1, false)
  }
}

const listWolves = (pag, check) => {
  let cont = 1
  let newurl = url
  let button = ''
  check?newurl+="/adopted":0

  const body = document.querySelector('.wolves')
  body.innerHTML = ` `
  fetch(newurl)
    .then((response) => response.json())
    .then((wolves)=> {
      let list = listItems(wolves, pag, 4)
      list.map((item) => {
        check?button=`<a class="btn green" id="${item.id}" ">Adotado</a>`:button=`<a class="btn" id="${item.id}" href="./show-lobo.html?id=${item.id}">Adotar</a>`
        const wolf = document.createElement("div")
        wolf.classList.add("wolf")
        if (cont%2==0) {
          wolf.classList.add("right")
          wolf.innerHTML = `
          <div class="info">
          <div class="data">`+ button + `
            <div class="name">
              <h4>${item.name}</h4>
              Idade: ${item.age} anos
            </div>
          </div>
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
              </div>` + button
                     +
            `
            </div>
            <p>${item.description}</p>
          </div>`
        }
        body.appendChild(wolf)
        
        cont++ 
      })
    })
  const pages = document.querySelector('.pages')
  if (pag == 1 || pag == 2) {
    pages.innerHTML = `<a href="#" onclick="listWolves(${pag})"> ${pag} </a> 
    <a href="#" onclick="listWolves(${pag+1})"> ${pag+1} </a>
    <a href="#" onclick="listWolves(${pag+2})"> ${pag+2} </a>
    <a href="#" onclick="listWolves(${pag+3})"> ${pag+3} </a>
    <a href="#" onclick="listWolves(${pag+4})"> ${pag+4} </a>
    <a href="#" onclick="listWolves(${pag+1})"> >> </a>
      `
  }else{
    pages.innerHTML = `
    <a href="#" onclick="listWolves(${pag-1})"> << </a> 
    <a href="#" onclick="listWolves(${pag-2})"> ${pag-2} </a>
    <a href="#" onclick="listWolves(${pag-1})"> ${pag-1} </a> 
    <a href="#" onclick="listWolves(${pag})"> ${pag} </a>
    <a href="#" onclick="listWolves(${pag+1})"> ${pag+1} </a>
    <a href="#" onclick="listWolves(${pag+2})"> ${pag+2} </a>
    <a href="#" onclick="listWolves(${pag+1})"> >> </a>
    `
  }
}
listWolves(currentPage)

