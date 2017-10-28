---
layout: post
title:  "Arduino Node SocketIO Setup Tutorial"
date:  2017-10-28 11:35:55 +0300
categories: projects
comments: true
---

Arduino is a cool thing - people making all kinds of interesting stufff with it - from robots to synthesizers and so on. It happened that friend of mine gave me one to play with. After some experiments and googling I've made a connection between Arduino and webpage. It was really easy, and below is my little tutorial on how to make such thing. Hope you'll find it useful and will make something bigger from it. 

You can download source code here: https://github.com/IgorKonovalov/Arduino_to_Node

In this tutorial you will learn how to connect data from potentiometer on Arduino, transfer in through serial port to Node server and then connect in to the webpage through Socket IO - so webpage will know about changes on potentiometer and reacted accordingly

Let's start with Arduino setup. I'm using nano but it shouldn't matter at all. Here is my wiring: 

<img src="{{ site.url }}\assets\IMG\Arduino_node\arduino-socketio.png" alt="arduino-node-socketio tutorial arduino wiring">

The code for arduino is dead simple: 

{% highlight java %}
int sensorPin = A0; // potentiometer is connected to analog pin 0
int sensorValue;

void setup()
{ 
  Serial.begin(9600); // opens serial port, sets data rate to 9600 bps
}

void loop()
{
  sensorValue = analogRead(sensorPin); // we read values from pin
  Serial.println(sensorValue); // and send it to serial port
}
{% endhighlight %}

Now you can connect Arduino to computer through usb and it will be constantly sending data to serial. Now let's start node server to listen for it. You'll need node and npm (I'm using node 8.7 at the moment of tutorial)

Create new folder and initialize it
{% highlight bash %}
mkdir Arduino-Node-SockeIO && cd Arduino-Node-SockeIO && npm init -y
{% endhighlight %}

We'll need only three packages: Express - for easy setting up server, SerialPort - for port listening and Socket.IO for connecting node server and web page. Let's install them!

{% highlight bash %}
npm i -S express serialport socket.io
{% endhighlight %}

Create file server.js at the root of the project and add these lines: 

{% highlight javascript %}
const http = require('http')
const express = require('express')
const app = express()

const Server = http.createServer(app)
const port = 3000

app.get('/', (req, res) => {
  res.send('<h1>Hello world!</h1>')
})

Server.listen(port, () => {
  console.log(`Express server started on ${port}`);
})
{% endhighlight %}

Add start script to package.json: 
{% highlight javascript %}
...
"scripts": {
  "start": "node server.js"
}
...
{% endhighlight %}

Now, running 
{% highlight bash %}
npm run start
{% endhighlight %}
Should welcome you with "Express server started on 3000" in terminal. And if you go to localhost:3000 in your browser you should see 

<img src="{{ site.url }}\assets\IMG\Arduino_node\localhost.png" width="75%" alt="arduino-node-socketio tutorial localhost">

Congratulations! Let's add socket.io integration.
Create folder _public_ in the root directory and add there file index.html with following code:

{% highlight html %}
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Arduino-Node-SocketIO</title>
</head>
<body>
    <style>
        body {
            transition: all .1s;
            /* transition for smoothness */
        }
    </style>
    <script src="/socket.io/socket.io.js"></script>
    <script src="index.js"></script>
</body>
</html>
{% endhighlight %}

Add index.js to the same folder with

{% highlight javascript %}
const socket = io.connect('http://localhost:3000')

socket.on('connected', () => {
  console.log('Socket Connected')
})
socket.on('disconnect', () => {
  console.log('Socket Disconnected')
})
socket.on('click', () => console.log('server registered click event'))

document.addEventListener('click', e =>
  socket.emit('click', { x: e.clientX, y: e.clientY }) 
  // we listening for client click events
  // and sending this data to server
)
{% endhighlight %}

Add following code to server.js (root directory) 

{% highlight javascript %}
// remove lines: 
app.get('/', (req, res) => {
  res.send('<h1>Hello world!</h1>')
})

// and add lines:
const io = require('socket.io').listen(Server) // we creating socket object

app.use(express.static(__dirname + '/public')) 
// we serving files from "public" directory

io.on('connection', socket => {
  console.log('a user connected')
  socket.emit('connected')
  socket.on('click', ({ id, x, y }) => {
    console.log(`socket with id ${id} just clicked on { ${x}, ${y} }`)
    // print to console event from web page
    socket.emit('click') // and let page knows it
  })
})

{% endhighlight %}

Check it first - now if you restart server and navigate to localhost:3000 you should see in terminal "a user connected" and in browser console "Socket Connected". Click on any place on the page - you shold see coordinates of click printed in terminal and "server registered click event" in browser console.

Sockets are a bit confusing at the first moment, but it's a really simple concept - we listen and emit events from both server and browser side. In code above, we start server with "io" listener - after user connect we emit "connected" event, for which already listens socket client, and so on. Socket's itself is a very broad topic, and I would like to concentrate on arduino part now. Please leave a comment below if you would like to get more in depth socket tutorial

So let's connect it all together! 

We already setup arduino part and plugged it by usb to computer. Now we need to listen to serial port. 
We'll use library SerialPort

server.js: 

{% highlight javascript %}
// delete these lines:
io.on('connection', socket => {
  console.log('a user connected')
  socket.emit('connected')
  socket.on('click', ({ id, x, y }) => {
    console.log(`socket with id ${id} just clicked on { ${x}, ${y} }`)
    socket.emit('click')
  })
})

// add these lines:
const serialport = require('serialport')
const sp_readline = serialport.parsers.Readline // we use readline parser

const sPort = new serialport('__your port here__', { 
  // you'll need to check for a port name first and use yours
  baudRate: 9600
})
const parser = new sp_readline()

sPort.on('open', () => {
  console.log('Serial Port Opened')
  let lastValue
  io.on('connection', socket => {
    socket.emit('connected')
    parser.on('data', data => {
      let lastValue 
      // we use additional variable to avoid constant 
      // sending data to connected socket
      if (lastValue !== data) {
        socket.emit('data', data)
      }
      lastValue = data
    })
  })
})
{% endhighlight %}

index.js

{% highlight javascript %}
// remove these lines 
socket.on('click', () => console.log('server recieved a click event'))

document.addEventListener('click', e =>
  socket.emit('click', { id: socket.id, x: e.clientX, y: e.clientY })
)

// add these lines
socket.on('data', data => {
    document.body.setAttribute('style', `background-color: hsl(${Math.round(data/3)}, 100%, 50%)`)
})
{% endhighlight %}

Now we creating a new serialPort listener which will listens for data from particular port. You'll need to check to which port connected your Arduino manually - there is many ways to do so, for example "serialport-list" command in terminal if you'll install serialport package globally. 

When we are connected to port and to socket, we emit "connected" event to let browser know that everything is ok and start to parse data from serial port. Once these data is not the same as before (to avoid passing it every 100ms) we sendind data event.
Once we recieved event on browser side we simply setting background attribute for 1024 / 3 possible variants. 

And now, if everything is works as intended - we can change potentiometer value on Arduino and these will change background of our page. Isn't it cool? There is a thousands possibilities to play with this thing, enjoy!

Thank you for reading! 
Check source code for a tutorial https://github.com/IgorKonovalov/Arduino_to_Node

Please leave a comment below - What ideas you came up with? Should I make more tutorials like these one? What kind of?