var fieldWidth, fieldHeight;
var maxID = 0;
function circle(x, y, r,vx,vy, color) // класс задающий круг
{
    this.x = x; // координата х
    this.y = y; // координата у
    this.r = r; // радиус
    this.vX = vx; // скорость шара по оси х
    this.vY = vy; // скорость шара по оси у
    this.id = maxID++;
    this.color = color;
    var self = this;
    this.draw = function(color, globalAlpha) // метод рисующий круг
    {
        context.globalAlpha = globalAlpha; // "прозрачность"
        context.fillStyle = color; // цвет заливки
        context.beginPath();
        context.arc(this.x, this.y, this.r, 0, Math.PI * 2, true);
        context.fill();
    };
    
    this.update = function() // метод рисующий круг
    {
    	if (this.y - this.r < 0 || this.y + this.r >= fieldHeight) // соприкосновение с "полом" и "потолком" холста
        {
            this.vY = -this.vY;
        }
        if (this.x - this.r < 0 || this.x + this.r >= fieldWidth) // соприкосновение с левой и правй "стенкой" холста 
        {
            this.vX = -this.vX;
        }
        
        for (var i = 0; i < circles.length; i++){
        	if (this.id == circles[i])
        		continue;
        	var distance = Math.sqrt((this.x - circles[i].x)*(this.x - circles[i].x) + (this.y - circles[i].y)*(this.y - circles[i].y));
        	//console.log(this.id, circles[i].id, distance);

        	if (distance <= this.r + circles[i].r){
        		this.vX *= -1;
        		this.vY *= -1;
        
        		circles[i].vX*=-1
        		circles[i].vY*=-1;
        		
        		this.x +=  this.vX;
        		this.y +=  this.vY;
        		circles[i].y += circles[i].vY;
        		circles[i].x += circles[i].vY;
        		
         	}
        	
        }
        
        
        this.x += this.vX;
        this.y += this.vY;
        // приращение координат
        
    };
}

function rect(x, y, width, height) // класс задающий прямоугольник
{
    this.x = x; // координата х
    this.y = y; // координата у
    this.width = width; // ширина
    this.height = height; // высота
    this.draw = function(color, globalAlpha) // функция рисует прямоугольник согласно заданным параметрам
    {
        context.globalAlpha = globalAlpha;
        context.fillStyle = color;
        context.fillRect(this.x, this.y, this.width, this.height);
    };
}
 
 
function initBalls(canvas_width, canvas_height) // Инициализация переменных
{
	fieldWidth = canvas_width;
	fieldHeight = canvas_height;
    field = new rect(0, 0, canvas_width, canvas_height); // прямоугольник закрашивающий фон   
    var canvas = document.getElementById("example");
    canvas.width = field.width; // ширина холста
    canvas.height = field.height; // высота холста
    context = canvas.getContext("2d");
     
    circles = [];
    circles.push(new circle(field.width/2, field.height/2, 12, 5, 3, "#f00"));
    circles.push(new circle(field.width/3, field.height/3, 16, 3, 5, "#ffff00"));
    circles.push(new circle(field.width/5, field.height/3, 24, 3, 5, "#00ff00"));
    circles.push(new circle(field.width/5, field.height/3, 24, 3, 5, "#ffff00"));
    circles.push(new circle(field.width/10, field.height/5, 5, 3, 3, "#0000ff"));

    setInterval(gameLoop, 1000 / 50); //отрисовываем 50 раз за секунду

    
}
var circles;

function gameLoop(){
	
	field.draw("#000",0.1);
	
	for (var i = 0; i < circles.length; i++){
		circles[i].draw(circles[i].color,1);
	}
	
    for (var i = 0; i < circles.length; i++){
		circles[i].update();
    }    
}


