var pos = 0;
var isGameOver = false;
var timerDino = null;
var points = 0;

function control(e) {
    if (e.keyCode === 32 || e.keyCode === 38) {
      myMove()
    }
  }
document.addEventListener('keyup', control)
function myMove() {
  if (isGameOver)
    return false;

  var isJumping = false
  var elem = document.getElementById("animate");   
  pos = 0;
  var speed = 5;  
  var frameImg = true;
  timerDino = setInterval(frame, 5);  

  function frame() {
    if (frameImg){
        frameImg = false;
        elem.style.backgroundImage="url('medo.png')"; 
    }    
    if (pos <= 0 && isJumping) {
        isJumping = false
        frameImg = true;
        elem.style.backgroundImage="url('surpresa.png')"; 
    	clearInterval(timerDino);
    }
    if (pos == 250) {
        speed *= -1;
        isJumping = true;
         
    } 
    pos += speed; 
    elem.style.bottom = pos + "px";     
  }
}

document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid')
    console.log('inicio')
    function generateObstacles() {
        let randomTime = Math.random() * 2000
        let obstaclePosition = 1000
        let obstacleSpeed = -20
        const obstacle = document.createElement('div')
        obstacle.classList.add('obstacle')
        grid.appendChild(obstacle)
        obstacle.style.left = obstaclePosition + 'px'
        var timerObstacles = setInterval(function () {

          let obstacleHeight = obstacle.style.height;

          if(obstaclePosition > 0 && obstaclePosition < 80 && pos < 70  && pos <= obstacleHeight) {
            clearInterval(timerDino)
            clearInterval(timerObstacles)
            isGameOver = true;     
            $('#modalExemplo').modal('show'); 
            document.getElementById('points').innerHTML = 'Sua pontuação: ' + points.toString();
          }

          if (obstaclePosition === 0){            
            points++;
            document.getElementById('pontuacao').innerHTML = points.toString();
          }
            
          obstaclePosition += obstacleSpeed
          obstacle.style.left = obstaclePosition + 'px'
        }, 20)
        if (!isGameOver) setTimeout(generateObstacles, randomTime)
      }
      generateObstacles()
})

