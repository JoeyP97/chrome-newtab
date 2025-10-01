let clock = document.querySelector(".clock")
let shortcuts = document.querySelector(".shortcuts")

// working digital clock
function updateClock() {
    const now = new Date()
    let hours = now.getHours()
    let minutes = now.getMinutes()

    minutes = minutes < 10 ? "0" + minutes : minutes;

    if (hours > 12) {
        hours -= 12
    }

    const timeString =`${hours}:${minutes}`
    clock.textContent = timeString
}

//function for adding shortcuts (experimental)
// function addShortcut() {
//     let website = prompt("Enter Website")
//     let newShortcut = document.createElement("a")
//     newShortcut.classList.add("shortcut")
//     newShortcut.href = website
//     shortcuts.prepend(newShortcut)
// }

setInterval(updateClock,1000)
updateClock()