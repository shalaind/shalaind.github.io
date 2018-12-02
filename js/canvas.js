var canvas = document.querySelector("canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight; 


var context = canvas.getContext("2d");

// // // Rectangle 
// // context.fillStyle = "rgba(255, 0, 0)";
// // context.fillRect(400,200, 50,50);

// // Line Path
// context.beginPath();
// context.moveTo(150,300);
// context.lineTo(300, 10);
// context.lineTo(350,500);
// context.strokeStyle="blue";
// context.stroke();

var mouse = {
    x: undefined,
    y: undefined
}

var colorArray = ["#00ff7f","#00ff94","#00ffa9","#00ffbf","#00ffd4"];
var maxRadius = 40;
var minRadius = 2;


window.addEventListener("mousemove",function(event){
    mouse.x = event.x;
    mouse.y = event.y;
    // console.log(mouse);
})

window.addEventListener("resize",function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight; 

    init();
})
// new animation to generate multiple circles 

function Circle(x,y,xSpeed, ySpeed, radius){
    this.x = x; 
    this.y = y; 
    this.xSpeed = xSpeed;
    this.ySpeed = ySpeed;
    this.radius = radius;
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)];
    this.minRadius = radius;

    // draw the circle 
    this.draw = function() {
        context.beginPath();
        context.arc( this.x , this.y , this.radius , 0, Math.PI * 2, false);
        context.lineWidth = 5; 
        context.strokeStyle = "blue";
        context.fillStyle = this.color;
        context.fill();

    }

    this.update = function() {
        // conditional statement that stops circle at the edge of the screen 
        if (this.x + this.radius > innerWidth || this.x - this.radius < 0){
            this.xSpeed = -this.xSpeed
        }
        if (this.y + this.radius > innerHeight || this.y - this.radius < 0){
            this.ySpeed = -this.ySpeed
        }

        this.x += this.xSpeed;
        this.y += this.ySpeed;

        //mouse interaction 

        if(mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50 ){

            if (this.radius < maxRadius){
                this.radius +=1;
            }
        }

        else if (this.radius > this.minRadius ){
            this.radius -= 1;
        }



        this.draw();

    }
}




//create a for loop to automate 100 circles 

var circleArray = [];

for (var i = 0; i < 1000; i++){
    var radius = Math.random() * 6 + 1;
    var x = Math.random() * (innerWidth - radius * 2) + radius; 
    var y = Math.random() * (innerHeight - radius * 2) + radius;
    var xSpeed = (Math.random() - 0.5); 
    var ySpeed = (Math.random() - 0.5);
    circleArray.push(new Circle(x, y, xSpeed, ySpeed, radius));
}

console.log(circleArray);

function init (){

    circleArray = [];
    for (var i = 0; i < 200; i++){
    var radius = Math.random() * 6 + 1;
    var x = Math.random() * (innerWidth - radius * 2) + radius; 
    var y = Math.random() * (innerHeight - radius * 2) + radius;
    var xSpeed = (Math.random() - 0.5); 
    var ySpeed = (Math.random() - 0.5);
    circleArray.push(new Circle(x, y, xSpeed, ySpeed, radius));
    }
}



        
//make the circle move 
function animate() {
    requestAnimationFrame(animate);
    //clear the canvas for each animation 
    context.clearRect(0,0, innerWidth, innerHeight);

    for(i = 0; i < circleArray.length; i++){
        circleArray[i].update();
    }
}

init();
animate();