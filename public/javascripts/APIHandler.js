class APIHandler {
  constructor (baseUrl) {
    this.BASE_URL = baseUrl;
    this.usersUl = document.getElementById('users-list')
    this.deleteButtons = document.getElementsByClassName("delete-user")
    this.updateButtons = document.getElementsByClassName("update-user")
    this.able = "disabled"
  }

  getFullList(group) {
    axios.get(this.BASE_URL)
    .then(response => {
      this.usersUl.innerHTML = ""
      response.data.forEach(user => {
        if (user.group == group) {
        // console.log
        if (user.palitos == 3) this.able = ""
        const listUser = `<li>Usuario ${user.username} tiene <input type="text" placeholder="${user.palitos}"> <button id="${user._id}" class="update-user">Actualizar</button><button id="${user._id}" class="delete-user")>Eliminar</button><button class="roulette-user" ${this.able}>Atelur</button>`
        this.usersUl.innerHTML += listUser
        }
      });
      // console.log(response.data.role)
      for (let i = 0; i < this.deleteButtons.length; i++) {
        this.deleteButtons[i].onclick = function() {
          console.log(this.parentNode.parentNode.removeChild(this.parentNode))
          console.log(this.getAttribute("id"))
          usersAPI.deleteOneUser(this.getAttribute("id"))
        }
      }
      for (let i = 0; i < this.updateButtons.length; i++) {
        this.updateButtons[i].onclick = function() {
          console.log(this.parentNode.childNodes[1].value)
          console.log(this.getAttribute("id"))
          if (this.parentNode.childNodes[1].value === 3) { this.parentNode.lastChild.removeAttribute("disabled") }
          usersAPI.updateUser(this.getAttribute("id"), this.parentNode.childNodes[1].value)         
        }
      }
    })
    .catch(error => console.log('¡ops! error:', error))
  }

  deleteOneUser(id) {
    axios.delete(`${this.BASE_URL}/${id}`)
    .then(response => {
        // console.log(response.data)
        const { _id, username } = response.data
        console.log("Borrado:", _id, username)
     })
    .catch(error => console.log('¡ops! error:', error))
  }

  updateUser(id, value) { // ********************************
    console.log("*****************", id, value)
    const passValue = { value: value }
    axios.put(`${this.BASE_URL}/${id}`, passValue)
    .then(response => {
      console.log(response)
        const { campos } = response.data
        console.log("Updated:", campos)
      })
    .catch(error => console.log('¡ops! error:', error))
  }


  //////////////////////////////////////////////////////////////////////////////
  // clearAll() {
  //   this.charactersDiv.innerHTML = ""
  // }

  // getOneRegister(searchCharacterID) {

  //   axios.get(`${this.BASE_URL}/${searchCharacterID}`)
  //   .then(response => {
  //     console.log(response.data)
  //       const { id, name, occupation, weapon, cartoon } = response.data
  //       this.name.innerHTML = name
  //       this.occupation.innerHTML = occupation
  //       this.weapon.innerHTML = weapon
  //       this.cartoon.innerHTML = cartoon
  //   })
  //   .catch(error => console.log('¡ops! error:', error))
  // }

  // createOneRegister(character) {
  //   axios.post(this.BASE_URL, character)
  //   .then(response => {
  //       const { id, name, occupation, weapon, cartoon } = response.data
  //       console.log("Created:", id, name, occupation, weapon, cartoon)
  //   })
  //   .catch(error => console.log('¡ops! error:', error))
  // }

  // updateOneRegister(updatedCharacter) {
  //   axios.put(`${this.BASE_URL}/${updatedCharacter.id}`, updatedCharacter)
  //       .then(response => {
  //           const { id, name, occupation, weapon, cartoon } = response.data
  //           console.log("Updated:", id, name, occupation, weapon, cartoon)
  //        })
  //       .catch(error => console.log('¡ops! error:', error))
  // }

  // deleteOneRegister(deleteCharacterID) {
  //   axios.delete(`${this.BASE_URL}/${deleteCharacterID}`)
  //   .then(response => {
  //       const { id, name, occupation, weapon, cartoon } = response.data
  //       console.log("Borrado:", id, name, occupation, weapon, cartoon)
  //    })
  //   .catch(error => console.log('¡ops! error:', error))
  // }
}