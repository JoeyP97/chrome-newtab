let clock = document.querySelector(".clock")

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

setInterval(updateClock,1000)
updateClock()