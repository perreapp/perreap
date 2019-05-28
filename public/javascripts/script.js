const usersAPI = new APIHandler("http://localhost:3000/user/api")
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('users-list') !== null) usersAPI.getFullList()
  if (document.getElementById('group-menu') !== null) document.getElementById("group-menu").onclick = function() {
    usersAPI.getFullList(this.value)
  }
}, false);
