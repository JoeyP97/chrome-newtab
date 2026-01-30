let clock = document.querySelector(".clock")
let shortcuts = document.querySelector(".shortcuts")
let popup = document.querySelector("#make-pop")
let edit = document.querySelector("#edit-pop")
let currentShortcut
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
    savedLinks.forEach(link => addShortcut(link.url, link.title))
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

    if (hours == 0) {
        hours = 12
    }

    const timeString =`${hours}:${minutes}`
    clock.textContent = timeString
}

function showPopUp() {
    if (popup.classList.contains("hidden")) {
        popup.classList.remove("hidden")
    } else {
        popup.classList.add("hidden")
        let value = document.getElementById("pop_1")
        let value_2 = document.getElementById("pop_2")
        value.value = ""
        value_2.value = ""
    }
}
function showEdit(currentUrl, currentTitle) {
    let value = document.getElementById("edit_1")
    let value_2 = document.getElementById("edit_2")
    if (edit.classList.contains("hidden")) {
        edit.classList.remove("hidden")
        value.value = currentUrl
        value_2.value = currentTitle
    } else {
        edit.classList.add("hidden")
        value.value = ""
        value_2.value = ""
    }
}

function makeShortcut(event) {
    //popup.classList.remove("hidden")
    // let url = prompt("Enter a website:")
    let url = document.getElementById("pop_1").value.trim()
    let shortName = document.getElementById("pop_2").value.trim()
    if (!shortName) {
        shortName = "Untitled"
    }
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
        url = "https://" + url
    }
    if (!url.endsWith("/")) {
        url = url + "/"
    }
    if (url && isValid(url)) {
        addShortcut(url, shortName)
        try {
                let stored = localStorage.getItem(storageKey)
                currentLinks = stored ? JSON.parse(stored) : []  
            } catch (e) {
                console.log("Invalid string")
                currentLinks = []
            }
            currentLinks.push({
                url, 
                title: shortName})
            localStorage.setItem(storageKey, JSON.stringify(currentLinks))

    } else {
        alert("invalid url")
        console.log("invalid url")
    }
    
function isValid(url) {
    return url.startsWith("http://") || url.startsWith("https://")
}
showPopUp()
    
}

//function for adding shortcuts (experimental)
function addShortcut(url, title) {
    console.log(title)
    let newP = document.createElement("p")
    newP.classList.add("title")
    newP.textContent = `${title}`
    let newShortcut = document.createElement("a")
    newShortcut.classList.add("shortcut")
    newShortcut.target = "_blank"
    newShortcut.href = url
    newShortcut.dataset.url = url
    console.log(title)
    // newShortcut.innerHTML = `${url[8].toUpperCase()}`
    newShortcut.style.backgroundImage = `url(https://www.google.com/s2/favicons?sz=64&domain_url=${url})`
    let newButton = document.createElement("Button")
    let editButton = document.createElement("Button")
    newButton.classList.add("remove")   
    editButton.classList.add("edit")
    editButton.textContent = "..."
    shortcuts.prepend(newShortcut)
    shortcuts.firstChild.appendChild(editButton)
    shortcuts.firstChild.appendChild(newButton)
    newShortcut.appendChild(newP)

    newButton.addEventListener('click', (event) => {
        event.stopPropagation()
        event.preventDefault()
        console.log("pressed")
        let currentLinks = []
        let targetLink = event.target.parentElement
        try {
            let stored = localStorage.getItem(storageKey)
            currentLinks = stored ? JSON.parse(stored) : []
        } catch(e) {
            console.log("JSON parse failed")
            return
        }

        let index = currentLinks.findIndex(
            link => link.url === targetLink.dataset.url
        )
        

        if (index != -1) {
            currentLinks.splice(index, 1)
            localStorage.setItem(storageKey, JSON.stringify(currentLinks))
            targetLink.remove()
            event.target.remove()
            }
        })

        editButton.addEventListener('click', (event) => {
            event.stopPropagation()
            event.preventDefault()
            currentShortcut = event.target.parentElement
            let currentUrl = currentShortcut.dataset.url
            let currentTitle = currentShortcut.lastChild.textContent
            showEdit(currentUrl, currentTitle)
        })
}

//function to edit existing shortcut
function editShortcut() {
    console.log(currentShortcut)
    let currentLinks = []
    let targetLink = currentShortcut
    let url = document.getElementById("edit_1").value.trim()
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
        url = "https://" + url
    }
    if (!url.endsWith("/")) {
        url = url + "/"
    }
    let shortName = document.getElementById("edit_2").value.trim()
    if (!shortName) {
        shortName = "Untitled"
    }
    try {
        let stored = localStorage.getItem(storageKey)
        currentLinks = stored ? JSON.parse(stored) : []
    } catch(e) {
        console.log("JSON parse failed")
        return
    }

    currentLinks.forEach(link => {
        if (targetLink.dataset.url == link.url) {
            targetLink.dataset.url = url
            link.url = url
            link.title = shortName
            targetLink.href = url
            targetLink.lastChild.textContent = shortName
            targetLink.style.backgroundImage = `url(https://www.google.com/s2/favicons?sz=64&domain_url=${url})`
        }
    })

    localStorage.setItem(storageKey, JSON.stringify(currentLinks))
    showEdit()
}

document.getElementById("make-pop").addEventListener('keyup', (event) => {
    if (event.key === "Enter") {
        document.getElementById("edit_shortcut").click()
    }
})

document.getElementById("edit_1").addEventListener('keyup', (event) => {
    if (event.key === "Enter") {
        document.getElementById("edit_shortcut").click()
    }
})

document.getElementById("edit_2").addEventListener('keyup', (event) => {
    if (event.key === "Enter") {
        document.getElementById("edit_shortcut").click()
    }
})

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