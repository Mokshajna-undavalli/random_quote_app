const quoteText=document.getElementById("quote")
const authorText=document.getElementById("author")

async function getQuote(){
const res=await fetch("https://api.quotable.io/random")
const data=await res.json()

quoteText.innerText=data.content
authorText.innerText="- "+data.author
}

document.getElementById("newQuote").onclick=getQuote

document.getElementById("copyQuote").onclick=()=>{
navigator.clipboard.writeText(quoteText.innerText)
alert("Copied!")
}

/* LIKE */
document.getElementById("likeQuote").onclick=()=>{
let liked=JSON.parse(localStorage.getItem("liked"))||[]
liked.push(quoteText.innerText)
localStorage.setItem("liked",JSON.stringify(liked))
}

/* FAVORITES */
document.getElementById("favQuote").onclick=()=>{
let fav=JSON.parse(localStorage.getItem("favorites"))||[]
fav.push(quoteText.innerText)
localStorage.setItem("favorites",JSON.stringify(fav))
}

/* PANELS */
document.getElementById("favBtn").onclick=()=>{
let fav=JSON.parse(localStorage.getItem("favorites"))||[]
let list=document.getElementById("favoritesList")
list.innerHTML=""
fav.forEach(q=>{
let li=document.createElement("li")
li.innerText=q
list.appendChild(li)
})
document.getElementById("favoritesPanel").classList.add("active")
}

document.getElementById("likedBtn").onclick=()=>{
let liked=JSON.parse(localStorage.getItem("liked"))||[]
let list=document.getElementById("likedList")
list.innerHTML=""
liked.forEach(q=>{
let li=document.createElement("li")
li.innerText=q
list.appendChild(li)
})
document.getElementById("likedPanel").classList.add("active")
}

document.querySelectorAll(".closePanel").forEach(btn=>{
btn.onclick=()=>{
document.querySelectorAll(".side-panel").forEach(p=>p.classList.remove("active"))
}
})

/* SHARE */
document.getElementById("shareTopBtn").onclick=()=>{
let text=quoteText.innerText+" "+authorText.innerText
if(navigator.share){
navigator.share({text})
}else{
navigator.clipboard.writeText(text)
alert("Copied to share")
}
}

/* THEME */
document.getElementById("themeToggle").onclick=()=>{
document.body.classList.toggle("light")
}

getQuote()

if("serviceWorker" in navigator){
navigator.serviceWorker.register("service-worker.js")
}