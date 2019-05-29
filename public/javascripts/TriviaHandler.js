class TriviaHandler {
  constructor (baseUrl) {
    this.BASE_URL = baseUrl;
    this.questionElm = document.getElementById("question")
    this.answersDiv = document.getElementById("answers")
    this.answerButtons = document.getElementsByClassName("answer-btn")
    this.answers = []
    this.answersSpreaded
  }

  getQuestion() {
    axios.get(this.BASE_URL)
    .then(response => {
      this.questionElm.innerHTML = response.data.results[0].question
      this.answers = [response.data.results[0].correct_answer, response.data.results[0].incorrect_answers[0], response.data.results[0].incorrect_answers[1], response.data.results[0].incorrect_answers[2]]
      console.log("*****************", this.answers)
      this.answersSpreaded = [...this.answers]
      this.answersDiv.innerHTML = ""
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
}