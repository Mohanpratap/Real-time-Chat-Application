const socket = io('http://localhost:8000');
var x = true;
// Get DOM elements in respective Js variables
const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp')
const messageContainer = document.querySelector(".container")
const head = document.querySelector('.head');
const nm = document.querySelector('.naam');

// Audio that will play on receiving messages
var audio = new Audio('ting.mp3');

// Function which will append event info to the contaner
const append = (message, position) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    const div2 = document.createElement('div');
    const D = document.createElement('div');
    const de = new Date().toLocaleDateString();


    if (x) {
        D.innerHTML = `${de}`;

    }

    D.classList.add('date');
    const dataContainer = document.createElement('div');
    dataContainer.classList.add('date-container');
    dataContainer.append(D);
    var day = new Date();
    var min = day.getMinutes();
    var hr = day.getHours();
    let zone;
    if (hr < 12)
        zone = "AM";
    else {
        zone = "PM";
    }


    var n = hr % 12;
    if (hr <= 24) {
        if (n == 0);
        hr = 12;
        if (n != 0)
            hr = n;
    }
    if (min > 59) {
        min = 0;
    }
    if (hr)



        div2.innerHTML = `${hr}:${min} ${zone}`;
    div2.classList.add('time');
    messageElement.append(div2);
    messageContainer.append(messageElement);
    if (x) {
        messageContainer.append(dataContainer);
        x = false;
    }

    if (position == 'left') {
        audio.play();
    }
}


// Ask new user for his/her name and let the server know
const name = prompt("Enter your name to join");
head.innerHTML = `${name}`;
socket.emit('new-user-joined', name);

// If a new user joins, receive his/her name from the server
socket.on('user-joined', name => {
    nm.innerHTML = "Online";
    append(`${name} joined the chat`, 'right')
})

// If server sends a message, receive it
socket.on('receive', data => {
    append(`${data.name}: ${data.message}`, 'left')
})

// If a user leaves the chat, append the info to the container
socket.on('left', name => {
    nm.innerHTML = "Offline";
    append(`${name} left the chat`, 'right')
})

// If the form gets submitted, send server the message
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`, 'right');
    socket.emit('send', message);
    messageInput.value = ''
})