

// Get the canvas element
var canvas = document.getElementById("myCanvas");

// Set the canvas size
canvas.width = 300;
canvas.height = 300;

// Get the canvas context for drawing
var ctx = canvas.getContext("2d");

// Set the stroke color and width
ctx.strokeStyle = "black";
ctx.lineWidth = 10;


// find postion of the canvas
var position = document.querySelector("#myCanvas").getBoundingClientRect()
//console.log(position)

// Set the initial position
var pos = { x: 8, y: 64 };

// Set up the mouse event listeners
canvas.addEventListener("mousedown", function (e) {
    pos = { x: e.clientX, y: e.clientY };
    canvas.addEventListener("mousemove", draw);
});

canvas.addEventListener("mouseup", function () {
    canvas.removeEventListener("mousemove", draw);
});

// Function to draw on the canvas
function draw(e) {
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
    pos = { x: e.clientX, y: e.clientY };
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
}

// Function to reset the canvas
function reset() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    document.getElementById('result').innerHTML=null

}

// Function to save the canvas as an image
function save() {
    const canvas1 = document.getElementById('myCanvas');
    const imgdata=canvas1.toDataURL()
    //console.log(typeof imgdata);


    // Save binary data to file or send to backend for further processing
    // Create a new FormData object and add the binary data to it
   
    // Send the binary data to the backend API using the fetch() method

    fetch('/', {
        method: 'POST',
        headers:{
            'Content-Type':'text/plain'
        },
        body: imgdata 
    })
        .then(response => response.json())
        .then(data=>{
           // console.log(data['data'])
            document.getElementById('result').innerHTML=data['data']
        })
        .catch(error => {
            console.error('Error uploading image:', error);
        });

}
