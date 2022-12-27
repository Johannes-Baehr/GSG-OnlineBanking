const button = document.getElementById("mobile-button")
const menu = document.getElementById("mobile-menu")
const loginButton = document.getElementById('login-button')

console.log(button)
console.log(menu)

button.addEventListener("click", () => {
    menu.classList.toggle("hidden")
})

loginButton.addEventListener('click', () => {
    window.location = '/login/login.html'
})

