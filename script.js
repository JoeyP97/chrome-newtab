let clock = document.querySelector(".clock")
let shortcuts = document.querySelector(".shortcuts")
const storageKey = 'userLinks'
const hideButton = document.querySelector(".bg-hide")
const bgSelector = document.querySelector(".bg-selector")
const backgrounds = [
    "assets/pumpkin-chrome.png",
    "assets/weheartit.gif",
    "assets/christmas.gif",
    "assets/summer.gif",
    "assets/summer2.webp",
]

// grab background from local storage and set
const savedBg = localStorage.getItem("selectedBackground")
if (savedBg) document.body.style.backgroundImage = `url(${savedBg})`

// create dropdown list of backgrounds
backgrounds.forEach(bg => {
    let img = document.createElement("div")
    img.classList.add("bg-option")
    img.style.backgroundImage = `url(${bg})`
    img.addEventListener("click", ( () => {
        document.body.style.backgroundImage =`url(${bg})`
        localStorage.setItem("selectedBackground", bg)
    }))
    bgSelector.appendChild(img)
})

// make button hide background list
hideButton.addEventListener("click", () => {
    if (bgSelector.classList.contains("hidden")) {
        bgSelector.classList.remove("hidden")
    } else {
        bgSelector.classList.add("hidden")
    }
})

// grab all saved links on page load
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
    if (url[url.length - 1] != "/") {
        url = url + "/"
    }
    if (url && isValid(url)) {
        addShortcut(url)
        try {
                let stored = localStorage.getItem(storageKey)
                currentLinks = stored ? JSON.parse(stored) : []  
            } catch (e) {
                console.log("Invalid string")
                currentLinks = []
            }
            currentLinks.push(url)
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
    // newShortcut.innerHTML = `${url[8].toUpperCase()}`
    newShortcut.style.backgroundImage = `url(https://www.google.com/s2/favicons?sz=64&domain_url=${url})`
    let newButton = document.createElement("Button")
    newButton.classList.add("remove")   
    shortcuts.prepend(newShortcut)
    shortcuts.firstChild.appendChild(newButton)

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