// Node Server Running port
const socket = io("http://localhost:8000");

const form = document.getElementById("sendContainer");
const msgInp = document.getElementById("msgInp");
const msgContainer = document.querySelector(".container");
var audio = new Audio("sms.mp3");
//create a div tag when user join the chat showing  user name
const append = (msg, position) => {
  const msgElement = document.createElement("div");
  msgElement.innerText = msg;
  msgElement.classList.add("msg");
  msgElement.classList.add(position);
  msgContainer.append(msgElement);
  if (position == "left") {
    audio.play();
  }
};

//When user send the msg
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const msg = msgInp.value;
  append(`You: ${msg}`, "right");
  socket.emit("send", msg);
  msgInp.value = "";
});
//when user try to join the chat
const name = prompt("Enter your name to join");
socket.emit("newUser-joined", name);

//when user joined chat
socket.on("user-joined", (name) => {
  append(`${name} Joined the chat`, "right");
});

//Receiving a msg
socket.on("receive", (data) => {
  append(`${data.name}:${data.msg}`, "left");
});

//for anybody left the chat
socket.on("leave", (data) => {
  append(`${name} left the chat`, "right");
});

