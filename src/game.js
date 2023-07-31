const canvas = document.querySelector("#game")
const game = canvas.getContext("2d")
const btnUp = document.querySelector("#up")
const btnLeft = document.querySelector("#left")
const btnRight = document.querySelector("#right")
const btnDown = document.querySelector("#down")
const spanLives = document.querySelector("#lives")
const spanTime = document.querySelector("#time")
const spanRecord = document.querySelector("#record")
const pResult = document.querySelector("#result")

let canvasSize //Es variable el tama;a del cambas
let elementsSize // Es variable el tama;no del elemento
let level = 0 //indicamos que va a empezar en el nivel 0
let lives = 3 // Le vamos a dar 3 vidas siempre para que inicie

//Variables del Tiempo del jugador
let timePlayer
let timeInterval
let timeStar

const playerPosition = {
  //Creamos la posicion del jugador
  x: undefined,
  y: undefined,
}

const giftPosition = {
  x: undefined,
  y: undefined,
}

let enemyPosition = [] //creamos un array de Cada posicion de los enemigos

window.addEventListener("load", setCanvasSize) //Escuchar apenas cargue el archivo HTML
window.addEventListener("resize", setCanvasSize) //escuchamos el reize, que lo que hace es que cada vez que se cambie el tama;o de la pantalla llama a la function Stargame

// function fixNumer(n) {
//   return Number(n.toFixed(2))
// }

function setCanvasSize() {
  if (window.innerHeight > window.innerWidth) {
    canvasSize = window.innerWidth * 0.7
  } else {
    canvasSize = window.innerHeight * 0.7
  }

  canvasSize = Number(canvasSize.toFixed(0))

  canvas.setAttribute("width", canvasSize)
  canvas.setAttribute("height", canvasSize)

  elementsSize = canvasSize / 10 // cada elemento va tener la decima parte de medida del valor del canva

  playerPosition.x = undefined
  playerPosition.y = undefined
  startGame()
}

function startGame() {
  console.log({ canvasSize, elementsSize })

  game.font = elementsSize + "px Verdana"
  game.textAlign = "end"

  const map = maps[level] //Le damos el nivel

  if (!map) {
    // si no hay mas mapas
    gameWin() // llamamos la funcion gameWin()
    return
  }

  if (!timeStar) {
    timeStar = Date.now()
    timeInterval = setInterval(showTime, 100) // llamamos a la Funcion cada 0.1 segundos
    showRecord()
  }
  const mapRows = map.trim().split("\n") //usamos .trim para limpiarlo y con .split le quitamos los saltos de linea
  const mapRowCols = mapRows.map((row) => row.trim().split(""))
  console.log({ map, mapRows, mapRowCols })

  showLives()

  enemyPosition = []
  game.clearRect(0, 0, canvasSize, canvasSize)

  mapRowCols.forEach((row, rowI) => {
    row.forEach((col, colI) => {
      const emoji = emojis[col]
      const posy = elementsSize * (rowI + 1)
      const posx = elementsSize * (colI + 1)

      if (col == "O") {
        // si  la columna es el emogi
        if (!playerPosition.x && !playerPosition.y) {
          playerPosition.x = posx // la pedimos la posicion en X
          playerPosition.y = posy // y tambien en Y
          //console.log({ playerPosition })
        }
      } else if (col === "I") {
        // si el objeto es "I"
        giftPosition.x = posx // va ser el mismo valor en cordenadas de x
        giftPosition.y = posy
      } else if (col === "X") {
        //si el elemento es X
        enemyPosition.push({
          //la vamos a insertar posicion x , y
          x: posx,
          y: posy,
        })
      }

      game.fillText(emoji, posx, posy)
    })
  })
  movePlayer() // hay que llamar la funcion de movimiento
}

function movePlayer() {
  const gitfColisionX = playerPosition.x.toFixed(3) == giftPosition.x.toFixed(3) //toFixed es para formatear el numero y darle que tantos deciamles queremos
  const gitfColisionY = playerPosition.y.toFixed(3) == giftPosition.y.toFixed(3)
  const giftColision = gitfColisionX && gitfColisionY // aqui tienen que ser iguales, para que halla una colision

  if (giftColision) {
    // si hay colicion con el Regalo
    levelWin()
  }

  const enemyCollision = enemyPosition.find((enemy) => {
    const enemyCollisionX = enemy.x.toFixed(3) == playerPosition.x.toFixed(3) // si el enemigo es igual al jugador en X
    const enemyCollisionY = enemy.y.toFixed(3) == playerPosition.y.toFixed(3) // si el enemigo es igual al jugador en Y
    return enemyCollisionX && enemyCollisionY // si x , y son iguales
  })

  if (enemyCollision) {
    // si hay colicion
    levelFail()
  }

  game.fillText(emojis["PLAYER"], playerPosition.x, playerPosition.y) // le inertamos el emoji a la posicion en X & Y
}

function levelWin() {
  //Funcion para incrementar niveles
  console.log("Subiste de nivel")
  level++ //Aumentamos el nivel
  startGame() // llamamos a la funcion stargame por que alla estan los niveles
}

function levelFail() {
  // Creamos la funcion la funcion para cuando chocamos
  lives-- // si chocamos las vidas van a disminuir

  if (lives <= 0) {
    // si nos quedamos sin vidas
    level = 0 // volvemos al nivel 1
    lives = 3 // y volvemos a tener 3 vidas
    timeStar = undefined
  }
  playerPosition.x = undefined
  playerPosition.y = undefined
  startGame() // llamamos a stargame
}

function gameWin() {
  //Creamos la funcion para acabar el juego
  console.log("Ganaste el juego")
  clearInterval(timeInterval)

  const recordTime = localStorage.getItem("record_time") //creamos un variable en el localstorage
  const playerTime = Date.now() - timeStar // el tiempo del jugador va ser el tiempo de ahora menos el de inicio
  if (recordTime) {
    //si hay tiempo record
    if (recordTime > playerTime) {
      //si el tiempo record es mayor al del jugador
      localStorage.setItem("record_time", playerTime) // le enviamos un nuevo valor a la variable del localstorage
      pResult.innerHTML = "Superaste el record"
    } else {
      // si no superamos el record
      pResult.innerHTML = "Record no superado"
    }
  } else {
    // si es primera vez que lo superamos
    localStorage.setItem("record_time", playerTime)
    pResult.innerHTML =
      "Primera vez ? muy bien ahora intenta superar el recorde otra vez"
  }

  console.log({ recordTime, playerTime })
}

function showLives() {
  const heartsArray = Array(lives).fill(emojis["HEART"]) // creamos un array [❤,❤,❤]
  console.log(heartsArray)

  spanLives.innerHTML = "" //Limpiamos las vidas antes de hacer el append
  heartsArray.forEach((heart) => spanLives.append(heart)) // por cada vida
}

function showTime() {
  // Creamos la funcion para el tiempo
  spanTime.innerHTML = Date.now() - timeStar // Date.now es el tiempo que llevamos menos el tiempo que esta transcurriendo
}

function showRecord() {
  //Creamos la funcion del record
  spanRecord.innerHTML = localStorage.getItem("record_time") // le enviamos al html el tiempo record
}

window.addEventListener("keydown", moveByKeys)
//Escuchar Movimientos
btnUp.addEventListener("click", moveUp)
btnLeft.addEventListener("click", moveLeft)
btnRight.addEventListener("click", moveRight)
btnDown.addEventListener("click", moveDown)
//Funcion para mover dependiendo de la letra seleccionada

function moveByKeys(event) {
  if (event.key === "ArrowUp") moveUp() //escuchamos el evento de subir
  else if (event.key === "ArrowLeft") moveLeft() //izquierda
  else if (event.key === "ArrowRight") moveRight() //derecha
  else if (event.key === "ArrowDown") moveDown() //Abajo
}

function moveUp() {
  //Mover Arriba
  console.log("me quieron mover hacia arriba")
  if ([playerPosition.y - elementsSize] < elementsSize) {
    console.log("OUT")
  } else {
    playerPosition.y -= elementsSize // la posicon de Y va ser el valor de elementSize
    startGame()
  }
}
function moveLeft() {
  //Mover a la Izquierda
  if ([playerPosition.x - elementsSize] < elementsSize) {
    console.log("OUT")
  } else {
    playerPosition.x -= elementsSize // la posicon de x va ser el valor de elementSize
    startGame()
  }
}
function moveRight() {
  //MOver a la derecha
  if ([playerPosition.x + elementsSize] > canvasSize) {
    console.log("OUT")
  } else {
    playerPosition.x += elementsSize // la posicon de x va ser el valor de elementSize
    startGame()
  }
}
function moveDown() {
  // Mover Abajo
  if ([playerPosition.y + elementsSize] > canvasSize) {
    console.log("OUT")
  } else {
    playerPosition.y += elementsSize // la posicon de x va ser el valor de elementSize
    startGame()
  }
}

//   game.fillText(emojis["X"], 100, 100)
//   game.fillText(emojis["X"], 100, 100)
//   game.fillText(emojis["X"], 100, 100)
//   game.fillText(emojis["X"], 100, 100)
//   game.fillText(emojis["X"], 100, 100)
//   game.fillText(emojis["X"], 100, 100)
//   game.fillText(emojis["X"], 100, 100)
//   game.fillText(emojis["X"], 100, 100)
//   game.fillText(emojis["X"], 100, 100)
//   game.fillText(emojis["X"], 100, 100)

//window.innerHeight
//window.innerWidth

//game.fillRect(0, 50, 100, 100) //Definir donde va iniciar el trazo
//game.clearRect(50, 50, 50, 50) //borramos el rectangulo de dichas medidas
//   game.clearRect(0, 0, 50, 50) // (50(horizontal), 50,(vertical), 50(Ancho), 50(alto))
//   game.font = "13px verdana" //Agregamos el tamano del texto y la fuente
//   game.fillStyle = "black" //le asignamos el color que va tener el texto
//   game.textAlign = "end"
//   game.fillText("Luis", 25, 25) //agregamos un nombre como ejemplo, y le damos las cordenadas de ubicacion
