class APIHandler {
  constructor (baseUrl) {
    this.BASE_URL = baseUrl;
    this.usersUl = document.getElementById('users-list')
    this.deleteButtons = document.getElementsByClassName("delete-user")
    this.updateButtons = document.getElementsByClassName("update-user")
    this.rouletteButtons = document.getElementsByClassName("roulette-user")
    this.able = "disabled"
  }
  getFullList(group) {
    axios.get(this.BASE_URL)
    .then(response => {
      this.usersUl.innerHTML = ""
      response.data.forEach(user => {
        if (user.group == group) {
        if (user.palitos == 3) {
          this.able = ""
        } 
        // <img src="${user.photo}" alt="${user.name}"><p>${user.firstName} ${user.lastName} (${user.username})</p>
        const listUser = `<li id="${user._id}"><img src="${user.photo}" alt="${user.name}"><p> ${user.username} palitos:</p> <input type="text" placeholder="${user.palitos}"> <button id="${user._id}" class="update-user">Actualizar</button><button id="${user._id}" class="delete-user")>Eliminar</button><button class="roulette-user" ${this.able}>Atelur</button>`
        this.usersUl.innerHTML += listUser
        }
      });
      //Delete buttons
      for (let i = 0; i < this.deleteButtons.length; i++) {
        this.deleteButtons[i].onclick = function() {
          console.log(this.parentNode.parentNode.removeChild(this.parentNode))
          console.log(this.getAttribute("id"))
          //usersAPI.deleteOneUser(this.getAttribute("id"))
          usersAPI.updateUser(this.getAttribute("id"), "group", "undefined")
        }
      }
      //Update buttons
      for (let i = 0; i < this.updateButtons.length; i++) {
        this.updateButtons[i].onclick = function() {
          console.log(this.parentNode.childNodes[3].value)
          console.log(this.getAttribute("id"))
          console.log(this.parentNode.lastChild)
          if (this.parentNode.childNodes[3].value == 3) { 
            console.log("***************************")
            this.parentNode.lastChild.removeAttribute("disabled")
          }
          else this.parentNode.lastChild.setAttribute("disabled", true) 
          usersAPI.updateUser(this.getAttribute("id"), "palitos", this.parentNode.childNodes[3].value)         
        }
      }
      //Rlt buttons
      for (let i = 0; i < this.rouletteButtons.length; i++) {
        this.rouletteButtons[i].onclick = function() {
          let userId = this.parentNode.getAttribute("id")
          usersAPI.updateUser(userId, 0)
          window.location = `/user/roulette/${userId}`          
        }
      }
    })
    .catch(error => console.log('¡ops! error:', error))
  }

  deleteOneUser(id) {
    axios.delete(`${this.BASE_URL}/${id}`)
    .then(response => {
        const { _id, username } = response.data
        console.log("Borrado:", _id, username)
     })
    .catch(error => console.log('¡ops! error:', error))
  }

  updateUser(id, field, value) { //Meter opción de poder actualizar un campo concreto
    const passValue = {}
    passValue[field] = value
    axios.put(`${this.BASE_URL}/${id}`, passValue)
    .then(response => {
      console.log(response)
        const { campos } = response.data
        console.log("Updated:", campos)
      })
    .catch(error => console.log('¡ops! error:', error))
  }
}