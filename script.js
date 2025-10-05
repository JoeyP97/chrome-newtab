let clock = document.querySelector(".clock")
let shortcuts = document.querySelector(".shortcuts")
const storageKey = 'userLinks'

window.onload = function () {
    let savedLinks = JSON.parse(localStorage.getItem(storageKey)) || []
    savedLinks.forEach(link => addShortcut(link))
    };


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

function makeShortcut() {
    let url = prompt("Enter a website:")
    if (url && isValid(url)) {
        addShortcut(url)
        try {
                let stored = localStorage.getItem(storageKey)
                currentLinks = stored ? JSON.parse(stored) : []  
            } catch (e) {
                console.log("Invalid string")
                currentLinks = []
            }
            currentLinks.unshift(url)
            localStorage.setItem(storageKey, JSON.stringify(currentLinks))

    } else {
        alert("invalid url")
        console.log("invalid url")
    }
    
function isValid(url) {
    return url.startsWith("http://") || url.startsWith("https://")
}
    
}

//function for adding shortcuts (experimental)
function addShortcut(url) {
    let newShortcut = document.createElement("a")
    newShortcut.classList.add("shortcut")
    newShortcut.target = "_blank"
    newShortcut.href = url
    let newButton = document.createElement("Button")
    newButton.classList.add("remove")   
    shortcuts.prepend(newShortcut)
    shortcuts.firstChild.prepend(newButton)

    newButton.addEventListener('click', (event) => {
        event.stopPropagation()
        event.preventDefault()
        console.log("pressed")
        let currentLinks = []
        let targetLink = event.target.parentElement
        console.log(targetLink)
        try {
            let stored = localStorage.getItem(storageKey)
            currentLinks = stored ? JSON.parse(stored) : []
        } catch(e) {
            console.log("JSON parse failed")
            return
        }

        let index = currentLinks.indexOf(targetLink.href)
        console.log(index)

        currentLinks.forEach(link => {
            console.log(link)
            console.log(targetLink.href)
            if (link == targetLink.href) {
                console.log("pass")
                if (index != -1) {
                    currentLinks.splice(index, 1)
                    localStorage.setItem(storageKey, JSON.stringify(currentLinks))
                    targetLink.remove()
                    event.target.remove()
                }
            }
        })
        })
}

function removeLink() {
    let currentLinks = []

    try {
        let stored = localStorage.getItem(storageKey)
        currentLinks = stored ? JSON.parse(stored) : []
    } catch(e) {
        console.log("JSON parse Failed")
        return
    }

    if (currentLinks.length > 0) {
        currentLinks.shift()
        localStorage.setItem(storageKey, JSON.stringify(currentLinks))
        shortcuts.removeChild(shortcuts.firstChild)
    }
}

// remove individual link (test)
function removeLinkTest(button) {
    let currentLinks = []
    let targetLink = button.parentElement
    console.log(targetLink)
    try {
        let stored = localStorage.getItem(storageKey)
        currentLinks = stored ? JSON.parse(stored) : []
    } catch(e) {
        console.log("JSON parse failed")
        return
    }

    currentLinks.forEach(link => {
        if (link == targetLink) {
            console.log("pass")
        }
    })
}


setInterval(updateClock,1000)
updateClock()