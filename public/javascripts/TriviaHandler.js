class TriviaHandler {
  constructor (baseUrl) {
    this.BASE_URL = baseUrl;
    this.questionElm = document.getElementById("question")
    this.answersDiv = document.getElementById("answers")
    this.msgElm = document.getElementById("msg")
    this.answerButtons = document.getElementsByClassName("answer-btn")    
    this.answers = []
    this.answersSpreaded
  }

  getQuestion() {
    axios.get(this.BASE_URL)
    .then(response => {
      console.log(response)
      this.answersDiv.innerHTML = ""
      this.msgElm.innerHTML = "<p>Tienes una oportunidad de poner a prueba tus conocimientos y poder librarte del castigo!</p>"
      this.questionElm.innerHTML = response.data.results[0].question
      this.answers = [response.data.results[0].correct_answer, response.data.results[0].incorrect_answers[0], response.data.results[0].incorrect_answers[1], response.data.results[0].incorrect_answers[2]]
      console.log("*****************", this.answers)
      this.answersSpreaded = [...this.answers]
      while (this.answersSpreaded.length) {
        let answer = this.answersSpreaded.splice(this.answersSpreaded.length * Math.random() | 0, 1)[0] 
        this.answersDiv.innerHTML += `<li><button class="answer-btn">${answer}</button></li>`
      }
      for (let i = 0; i < this.answerButtons.length; i++) {
        this.answerButtons[i].onclick = (e) => {
          if (e.currentTarget.innerText == this.answers[0]) console.log("respuesta correcta!")
          else { console.log("respuesta incorrecta") }
        }
      }
    })
  }
  getPunishment(punishment) {
    switch (punishment) {
      case "APERITIVOS":
        triviaAPI.postPunishment("Invitar a aperitivos en Ironbeers")
        break;
      case "DESAYUNO":
        triviaAPI.postPunishment("Traer desayuno al día siguiente")
        break;
      case "PERREO":
        triviaAPI.postPunishment("Perrear al Dr. Vicario")
        break;
      case "CANTAR":
        triviaAPI.postPunishment("Cantar en el clase de Web")
        break;
      case "¿Y TU PERRO?":
        triviaAPI.postPunishment("Preguntar en Data si han visto a tu perro de manera desesperada")
        break;
      case "POST-IT":
        triviaAPI.postPunishment("Pegar un post-it a alguien de Data con tu número")
        break;
      case "PERREO":
        triviaAPI.postPunishment("Perrear a Fabio durante 30 secs")
        break;
      case "BODA":
        triviaAPI.postPunishment("Brindar por tu futura boda en las gradas de Ironhack")
        break;
      case "LA CLASE":
        triviaAPI.postPunishment("Hacer lo que elija la clase")
        break;
      case "EMBARAZO":
        triviaAPI.postPunishment("Llamar a un familiar y decirle que estás embarazad@")
        break;
      case "CONFIESA":
        triviaAPI.postPunishment("Confesarle tu amor a Alvaro Cotelo por Slack")
        break;
      case "¿QUEDAMOS?":
        triviaAPI.postPunishment("Poner una nota “te espero en el baño en 5 min” a la persona que digan los TA")
        break;
      case "CREEPY":
        triviaAPI.postPunishment("Quedarte mirando 30 secs por el cristal de web con cara de creepy")
        break;
      case "LA MACARENA":
        triviaAPI.postPunishment("Bailar la Macarena en una de las mesas communes")
        break;
      case "VENGANZA":
        triviaAPI.postPunishment("¡¡¡Venganza!!!")
        break;
      case "LA CROQUETA":
        triviaAPI.postPunishment("Hacer la croqueta de un lado a otro de la clase")
        break;
      case "EL MONO":
        triviaAPI.postPunishment("Imitar a un mono loco y excitado")
        break;
      case "FOTO SEXY":
        triviaAPI.postPunishment("Mandar una foto sexy a Soni y preguntarle si vale para LinkedIn")
        break;
      case "PREGUNTAR":
        triviaAPI.postPunishment("Preguntar a Dani si te puede hacer algo por programación")
        break;
    }
  }
  postPunishment(description) {
    this.answersDiv.innerHTML = ""
    this.answersDiv.innerHTML = "<p>Tienes que:</p>"
    this.answersDiv.innerHTML += `<p>${description}</p>`
  }
}


   // Lista de perreos
      // Traer desayuno al día siguiente DESAYUNO
      // Perrear al Dr. Vicario PERREO
      // Cantar en el clase de Web CANTAR
      // Pregunta en Data si han visto a tu perro de manera desesperada ¿Y TU PERRO?
      // Pegar un post-it a alguien de Data con tu número POST-IT
      // Perrear a Fabio durante 30 secs PERREO
      // Brindar por tu futura boda en las gradas de Ironhack BODA
      // Lo que elija la clase CLASE
      // Llamar a un familiar y decirle que estás embarazad@ EMBARAZO
      // Confesarle tu amor a Alvaro Cotelo por Slack CONFESIÓN DE AMOR
      // Nota “te espero en el baño en 5 min” a la persona que digan los TA ¿QUEDAMOS?
      // Quedarte mirando 30 secs por el cristal de web con cara de creepy CREEPY
      // Bailar la Macarena en una de las mesas communes LA MACARENA
      // Venganza VENGANZA
      // Hacer la croqueta de un lado a otro de la clase LA CROQUETA
      // Imitar a un mono loco y excitado EL MONO
      // Mandar una foto sexy a Soni y preguntarle si vale para LinkedIn FOTO SEXY
      // Preguntar a Dani sit e puede hacer algo por programación PREGUNTAR A DANI
      // Invitar a aperitivos en Ironbeers APERITIVOS