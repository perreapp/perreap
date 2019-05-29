class TriviaHandler {
  constructor (baseUrl) {
    this.BASE_URL = baseUrl;
  }

  getQuestion() {
    axios.get(this.BASE_URL)
    .then(response => {
      console.log(response.data.results[0].question)
      console.log(response.data.results[0])
      console.log("Cual es la correcta?", response.data.results[0].correct_answer, response.data.results[0].incorrect_answers[0], response.data.results[0].incorrect_answers[1], response.data.results[0].incorrect_answers[2])
      // this.usersUl.innerHTML = ""
      // response.data.forEach(user => {
      //   if (user.group == group) {
      //   if (user.palitos == 3) {
      //     this.able = ""
      //   }
      //   const listUser = `<li id="${user._id}">Usuario ${user.username} tiene <input type="text" placeholder="${user.palitos}"> <button id="${user._id}" class="update-user">Actualizar</button><button id="${user._id}" class="delete-user")>Eliminar</button><button class="roulette-user" ${this.able}>Atelur</button>`
      //   this.usersUl.innerHTML += listUser
      //   }
      // });
    })
  }
}