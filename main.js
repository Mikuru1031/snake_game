const width = 640;
const height = 640;
const size = 80;
const count = document.querySelector("span");
// 食べたリンゴの数を表示
let appleCounter = 0
count.innerText = appleCounter;

function setup() {
    createCanvas(width, height);
    frameRate(4);
    // ヘビを生成
    snake = new Snake();
    // リンゴを生成
    apple = new Apple();
}

function draw() {
    background("whitesmoke");
    //マス目を描画
    dispCell();
    // ヘビを描画
    snake.disp();
    //リンゴを描画
    apple.disp();
    
    //ヘビを動かす
    snake.move();
    //ヘビがリンゴを食べる 
    snake.eat();

    if (appleCounter == width / size * height / size -1) {
        noLoop();
        background("gold");
        fill("white");
        textSize(30);
        text(`おめでとう!!!🥳`, 200, height / 2 - 40);
        text("スペースキー: リトライ", 140, height / 2 + 20)
    }
}

function keyPressed() {
    if (key == "w" && !snake.isDown) {
        frameRate(100);
        snake.isUp = true;
        snake.isDown = false;
        snake.isLeft = false;
        snake.isRight = false;
        snake.vx = 0
        snake.vy = -1
    }
    if (key == "s" && !snake.isUp) {
        frameRate(100);
        snake.isUp = false;
        snake.isDown = true;
        snake.isLeft = false;
        snake.isRight = false;
        snake.vx = 0
        snake.vy = 1
    }
    if (key == "a" && !snake.isRight) {
        frameRate(100);
        snake.isUp = false;
        snake.isDown = false;
        snake.isLeft = true;
        snake.isRight = false;
        snake.vx = -1
        snake.vy = 0
    }
    if (key == "d" && !snake.isLeft) {
        frameRate(100);
        snake.isUp = false;
        snake.isDown = false;
        snake.isLeft = false;
        snake.isRight = true;
        snake.vx = 1
        snake.vy = 0
    }
    if (keyCode == UP_ARROW && !snake.isDown) {
        frameRate(100);
        snake.isUp = true;
        snake.isDown = false;
        snake.isLeft = false;
        snake.isRight = false;
        snake.vx = 0
        snake.vy = -1
    }
    if (keyCode == DOWN_ARROW && !snake.isUp) {
        frameRate(100);
        snake.isUp = false;
        snake.isDown = true;
        snake.isLeft = false;
        snake.isRight = false;
        snake.vx = 0
        snake.vy = 1
    }
    if (keyCode == LEFT_ARROW && !snake.isRight) {
        frameRate(100);
        snake.isUp = false;
        snake.isDown = false;
        snake.isLeft = true;
        snake.isRight = false;
        snake.vx = -1
        snake.vy = 0
    }
    if (keyCode == RIGHT_ARROW && !snake.isLeft) {
        frameRate(100);
        snake.isUp = false;
        snake.isDown = false;
        snake.isLeft = false;
        snake.isRight = true;
        snake.vx = 1
        snake.vy = 0
    }
    if (key == " ") {
        location.reload();
    }
}

function dispCell() {
    for (let c = 0; c <= height / size; c++) {
        for (let r = 0; r <= width / size; r++) {
            fill("whitesmoke");
            rect(c * size, r * size, size, size);
        }
    }
}

class Snake {
    constructor() {
        this.body = [createVector(0, 0)]
        this.vx = 0;
        this.vy = 0;
        this.isUp = false;
        this.isDown = false
        this.isLeft = false;
        this.isRight = true;
    }

    disp() {
        fill("lightgreen")
        this.body.forEach((body) => {
            rect(body.x, body.y, size, size);
        })
    }

    move() {
        frameRate(4);
        let head = this.body[this.body.length -1].copy();
        head.x += this.vx * size;
        head.y += this.vy * size;

        //ゲームオーバー
        if (snake.end()) {
            noLoop();
            background("gray");
            fill("white");
            textSize(30);
            text(`残念!!!🤭`, 260, height / 2 - 40);
            text("スペースキー: リトライ", 150, height / 2 + 20);
        }

        this.body.shift();
        this.body.push(head);
    }

    eat() {
        let head = this.body[this.body.length -1];
        if (head.x == apple.body.x && head.y == apple.body.y) {
            //食べたリンゴの数をカウント
            appleCounter += 1;
            count.innerText = appleCounter;
            //ヘビの体を大きくする   
            this.add();
            apple.move();
        }
    }

    add() {
        let head = this.body[this.body.length -1].copy();
        head.x -= this.vx * size;
        head.y -= this.vy * size;
        this.body.unshift(head);
    }

    end() {
        let head = this.body[this.body.length -1];
        if (head.x < 0 || head.y < 0 || head.x >= width || head.y >= height) {
          return true;
        }
    
        for (let i = 0; i < this.body.length -1; i++) {
          if (this.body[i].x === head.x && this.body[i].y === head.y) {
            return true
          }
        }
    }
}

class Apple {
    constructor() {
        this.body = createVector(floor(random(0, width / size)) * size, floor(random(0, height / size)) * size)
    }

    disp() {
        fill("orangered")
        rect(this.body.x, this.body.y, size, size);
    }

    move() {
        this.body.x = floor(random(0, width / size)) * size;
        this.body.y = floor(random(0, height / size)) * size;

        for (let i = 0; i < snake.body.length -1; i++) {
            if (snake.body[i].x == this.body.x && snake.body[i].y == this.body.y) {
                this.body.x = floor(random(0, width / size)) * size;
                this.body.y = floor(random(0, height / size)) * size;
            }
        }
    }
}