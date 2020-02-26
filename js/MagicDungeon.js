class Maze { //迷路
    constructor(mazeSize) {
        this.mazeSize = mazeSize;
        this.startY = this.getRandomOdd(this.mazeSize);
        this.startX = this.getRandomOdd(this.mazeSize);
        this.currentY = this.startY;
        this.currentX = this.startX;
        this.initializeMazeField(this.mazeSize);
        this.digMazeField(this.mazeField);
    }

    getRandomOdd(mazeSize) { //ランダムな奇数の値を取得
        while(1) {
            let num = Math.floor(Math.random() * (mazeSize - 1));
            if( num % 2 != 0) return num;
        };
    }

    initializeMazeField(mazeSize) {
        var mazeField = new Array(mazeSize);
        for(let i = 0; i < mazeSize; i++) {
            mazeField[i] = new Array(mazeSize).fill(0);
        }
        this.mazeField = mazeField;
    }

    digMazeField(mazeField) { //穴を掘る
        let digDirection;
        mazeField[this.startY][this.startX] = 2;    //スタート配置

        let i = 0;
        while(i < 10000 ) {
            let digY;
            let digX;
            let preDigY = 0;
            let preDigX = 0;
            i++;
            switch(digDirection = Math.floor(Math.random() * 4)) {
                case 0:
                    digY = -2;
                    preDigY = -1;
                    digX = 0;
                    break;
                case 1:
                    digY = 0;
                    digX = 2;
                    preDigX = 1;
                    break;
                case 2:
                    digY = 2;
                    preDigY = 1;
                    digX = 0;
                    break;
                case 3:
                    digY = 0;
                    digX = -2;
                    preDigX = -1;
                    break;
            }

            if(this.currentY + digY > 0 && this.currentY + digY < mazeSize - 1 && this.currentX + digX > 0 && this.currentX + digX < mazeSize - 1) {
                if(mazeField[this.currentY + digY][this.currentX + digX] == 0) {
                    mazeField[this.currentY + digY][this.currentX + digX] = 1;
                    mazeField[this.currentY + preDigY][this.currentX + preDigX] = 1;
                    this.currentY += digY;
                    this.currentX += digX;
                }else {
                    do {
                        this.currentY = this.getRandomOdd(this.mazeSize);
                        this.currentX = this.getRandomOdd(this.mazeSize);
                    }while(mazeField[this.currentY][this.currentX] != 1)
                }
            }
        }
        this.mazeField = mazeField;
    }
}

var redslm = new Image();
redslm.src = "./image/redSlime.png";
var slm = new Image();
slm.src = "./image/slime.png";

class Character { //キャラクター系のスーパークラス
    constructor(img, name){
        //ステータス
        this.name = name;
        this.charaNum = charaNum; charaNum++;
        this.HP = 100;
        this.maxHP = this.HP;
        this.MP = 100;
        this.maxMP = this.MP;
        this.AK = 10;
        this.DF = 10;
        this.SP = 10;
        this.IQ = 10;
        this.LUCK = 10;

        //移動
        this.move = 0;
        this.moveDistance = mazeBoxSize;
        this.moveSpeed = mazeBoxSize / 10;
        this.initCharaPosition();
        this.moveDiection = "";
        //画像
        this.img = img;
        this.width = mazeBoxSize;
        this.height = mazeBoxSize;
    }

    initCharaPosition() {
        while(true) {
            let y = Math.floor(Math.random() * (mazeSize - 1));
            let x = Math.floor(Math.random() * (mazeSize - 1));
            if(maze.mazeField[y][x] === 1) {
                this.y = this.moveDistance * y;
                this.x = this.moveDistance * x;
                maze.mazeField[y][x] = this.charaNum;
                break;
            }
        }
    }

    moveCharacter() {
        if(this.move > 0) {
            this.move -= this.moveSpeed;
            if(this.moveDiection === 'left') this.x -= this.moveSpeed;
            if(this.moveDiection === 'up')  this.y -= this.moveSpeed;
            if(this.moveDiection === 'right') this.x += this.moveSpeed;
            if(this.moveDiection === 'down') this.y += this.moveSpeed;
        }
    }

    moveSet() {
        if(this.move === 0) {
            let x = this.x / this.moveDistance;
            let y = this.y / this.moveDistance;
            let check = true;
            let i = 0;

            if(maze.mazeField[y][x - 1] !== player.charaNum && maze.mazeField[y][x + 1] !== player.charaNum && maze.mazeField[y - 1][x] !== player.charaNum && maze.mazeField[y + 1][x] !== player.charaNum) {

            while(check) {
                var directioin = Math.floor(Math.random() * 4);
                switch(directioin) {
                    case 0:
                        var nextX = x - 1;
                        if(maze.mazeField[y][nextX] === 1) {
                            maze.mazeField[y][nextX] = this.charaNum;
                            maze.mazeField[y][x] = 1;
                            this.move = this.moveDistance;
                            this.moveDiection = "left";
                            check = false;
                        }else if(maze.mazeField[y][nextX] === player.charaNum) check = false;
                        break;
                    case 1:
                        var nextY = y - 1;
                        if(maze.mazeField[nextY][x] === 1) {
                            maze.mazeField[nextY][x] = this.charaNum;
                            maze.mazeField[y][x] = 1;
                            this.move = this.moveDistance;
                            this.moveDiection = "up";
                            check = false;
                        }else if(maze.mazeField[y][nextX] === player.charaNum) check = false;
                        break;
                    case 2:
                        var nextX = x + 1;
                        if(maze.mazeField[y][nextX] === 1) {
                            maze.mazeField[y][nextX] = this.charaNum;
                            maze.mazeField[y][x] = 1;
                            this.move = this.moveDistance;
                            this.moveDiection = "right";
                            check = false;
                        }else if(maze.mazeField[y][nextX] === player.charaNum) check = false;
                        break;
                    case 3:
                        var nextY = y + 1;
                        if(maze.mazeField[nextY][x] === 1) {
                            maze.mazeField[nextY][x] = this.charaNum;
                            maze.mazeField[y][x] = 1;
                            this.move = this.moveDistance;
                            this.moveDiection = "down";
                            check = false;
                        }else if(maze.mazeField[y][nextX] === player.charaNum) check = false;
                        break;
                    }
                    if(i++ > 100 ) break;
                }

            }
            
        }
    }

    attack() {
        
    }
} 

var cback = new Image();
cback.src = './image/player_back.png';
var cfront = new Image();
cfront.src = './image/player_front.png';
var cright = new Image();
cright.src = './image/player_right.png';
var cleft = new Image();
cleft.src = './image/player_left.png';

class Player extends Character { //操作キャラクター
    constructor(img, name) {
        super(img, name);
        this.AK = 30;
        this.DF = 30;

        //技
        this.heal = 10;
    }

    moveCharacter() {
        input.move_key();
        if(this.move === 0) {
            var x = this.x / this.moveDistance;
            var y = this.y / this.moveDistance;

            if(input.left === true) {
                    var nextX = x - 1;
                    this.moveDiection  = 'left';
                    this.img = cleft;
                    if(maze.mazeField[y][nextX] === 1) {
                        maze.mazeField[y][nextX] = this.charaNum;
                        maze.mazeField[y][x] = 1;
                        this.move = this.moveDistance;
                        input.push = 'left';
                        if(player.MP < player.maxMP) player.MP += 1;
                        game.counTurn();
                    }
                    if(maze.mazeField[y][nextX] === 2) {
                        game.goal();
                    }
            }

            if(input.up === true) {
                    var nextY = y - 1;
                    this.moveDiection = 'up';
                    this.img = cback;
                    if(maze.mazeField[nextY][x] === 1) {
                        maze.mazeField[nextY][x] = this.charaNum;
                        maze.mazeField[y][x] = 1;
                        this.move = this.moveDistance;
                        input.push = 'up';
                        if(player.MP < player.maxMP) player.MP += 1;
                        game.counTurn();
                    }
                    if(maze.mazeField[nextY][x] === 2) {
                        game.goal();
                    }
                    
            }

            if(input.right === true) {
                    var nextX = x + 1;
                    this.moveDiection  = 'right';
                    this.img = cright;
                    if(maze.mazeField[y][nextX] === 1) {
                        maze.mazeField[y][nextX] = this.charaNum;
                        maze.mazeField[y][x] = 1;
                        this.move = this.moveDistance;
                        input.push = 'right';
                        if(player.MP < player.maxMP) player.MP += 1;
                        game.counTurn();
                    }
                    if(maze.mazeField[y][nextX] === 2) {
                        game.goal();
                    }
            }

            if(input.down === true) {
                    var nextY = y + 1;
                    this.moveDiection  = 'down';
                    this.img = cfront;
                    if(maze.mazeField[nextY][x] === 1) {
                        maze.mazeField[nextY][x] = this.charaNum;
                        maze.mazeField[y][x] = 1;
                        this.move = this.moveDistance;
                        input.push = 'down';
                        if(player.MP < player.maxMP) player.MP += 1;
                        game.counTurn();
                    }
                    if(maze.mazeField[nextY][x] === 2) {
                        game.goal();
                    }
            }
        }

        if(this.move > 0) {
            this.move -= this.moveSpeed;
            if(input.push === 'left') this.x -= this.moveSpeed;
            if(input.push === 'up')  this.y -= this.moveSpeed;
            if(input.push === 'right') this.x += this.moveSpeed;
            if(input.push === 'down') this.y += this.moveSpeed;
        }
    }

    attack() {
        input.attack_key();
        if(input.enter === true) {
            input.enter = false;
            game.checkNeighbour(player, player.moveDiection);
            game.counTurn();
        }
    }

    healPlayer() {
        input.heal_key();
        if(input.z === true) {
            input.z === false;
            if(this.HP < this.maxMP  && this.MP >= this.heal) {
                this.HP += this.heal;
                this.MP -= this.heal;
                log.addLog(this.name + "はHPを" + this.heal + "かいふく！");
                game.counTurn();
            } 
        }
    }
}

class Enemy extends Character {
    constructor(img, name) {
        super(img, name);
    }

    attack() {
        let x = this.x / this.moveDistance;
        let y = this.y / this.moveDistance;

        if(maze.mazeField[y][x - 1] === player.charaNum || maze.mazeField[y][x + 1] === player.charaNum || maze.mazeField[y - 1][x] === player.charaNum || maze.mazeField[y + 1][x] === player.charaNum) {
            battle.battle(this, player);
        }
    }
}

class GameMain { //ゲームのメイン処理
    constructor(width, height) {
        this.width = width * 2.0;
        this.height = height * 1.5;
        this.turn = 0;
        this.players = new Array(); //プレイヤーを格納   
        this.enemys = new Array(); //エネミーを格納
        this.dungeonLevel = 1;

        canvas = document.getElementById('canvas');
        canvas.width = this.width;
        canvas.height = this.height;
        ctx = canvas.getContext('2d');
    }
    
    addPlayers(character) {
        this.players.push(character);
    }

    addEnemys(character) {
        this.enemys.push(character);
    }

    dletePlayer(player) {
        game.players = game.players.filter(players => {
            maze.mazeField[player.y / player.moveDistance][player.x / player.moveDistance] = 1;
            return  players !== player;
        });
    }

    dleteEnemy(enemy) {
        game.enemys = game.enemys.filter(enemys => {
            maze.mazeField[enemy.y / enemy.moveDistance][enemy.x / enemy.moveDistance] = 1;
            return  enemys !== enemy;
        });
    }

    enemyRandomGenerate() {
        let enemyNum = Math.floor(Math.random() * 10);
        let enemyImage = "";
        
        for(let i = 0; i < enemyNum; i++) {
            let enemyName = "enemy" + i;
            switch(Math.floor(Math.random() * 2)) {
                case 0 :
                    game.addEnemys(new Enemy(slm, enemyName));
                    break;
                case 1 :
                    game.addEnemys(new Enemy(redslm, enemyName));
                    break;
            }
        }
    }

    counTurn() {
        var time = new Date().getTime();
        while (new Date().getTime() < time + 200);
        this.turn++;
        this.enemys.forEach(character => {
            character.attack();
            character.moveSet();
        });

        log.addLog("---------------" + this.getTurn() + "---------------");
    }

    getTurn() {
        return this.turn;
    }

    viewTurn() {
        let fontSize = 20;
        ctx.fillStyle = `black`;
        ctx.font = fontSize + `px serif`;
        //ctx.fillText("ターン:" + this.turn, mazeBoxSize * mazeSize, mazeBoxSize + fontSize);
    }

    drawCharacter() {
        this.players.forEach(character => {
            ctx.drawImage(character.img, character.x, character.y, character.width, character.height);
            ctx.fillStyle = 'red';
            ctx.fillRect(character.x, character.y - 10, character.width, 5);
            let HPratio = character.HP / character.maxHP;
            ctx.fillStyle = '#80FF80';
            ctx.fillRect(character.x, character.y - 10, character.width * HPratio, 5);
        });

        this.enemys.forEach(character => {
            ctx.drawImage(character.img, character.x, character.y, character.width, character.height);
            ctx.fillStyle = 'red';
            ctx.fillRect(character.x, character.y - 10, character.width, 5);
            let HPratio = character.HP / character.maxHP;
            ctx.fillStyle = '#80FF80';
            ctx.fillRect(character.x, character.y - 10, character.width * HPratio, 5);
        });
    }

    drawMazeField(mazeField) {
        for(let i = 0; i < mazeSize; i++) {
            for(let j = 0; j < mazeSize; j++){
                if(mazeField[i][j] == 0){
                    ctx.fillStyle="black"; 
                }else if(mazeField[i][j] == 2){
                    ctx.fillStyle="red";
                }else {
                    ctx.fillStyle="white"; 
                }
                ctx.fillRect(j * mazeBoxSize, i * mazeBoxSize, (j * mazeBoxSize) + mazeBoxSize, (i * mazeBoxSize) + mazeBoxSize);
            }
        }
    }

    drawLogField() {
        //背景白のログを書く場所を表示
        ctx.fillStyle = "white";
        ctx.fillRect(mazeBoxSize, mazeBoxSize * mazeSize,mazeBoxSize * (mazeSize - 2), canvas.height - (mazeBoxSize * (mazeSize + 1)));
    }

    drawSubFiled() {
        //右横に詳細をかく書く場所を表示
        ctx.fillStyle = `white`;
        ctx.fillRect(mazeBoxSize * mazeSize, mazeBoxSize, mazeBoxSize * (mazeSize - 2),canvas.height - mazeBoxSize * 2);
    }

    checkNeighbour(character, direction) {
        let y = character.y / character.moveDistance;
        let x = character.x / character.moveDistance;

        switch(direction) {
            case "left":
                x = Math.floor(--x);
                break;
            case "up":
                y = Math.floor(--y);
                break;
            case "right":
                x = Math.ceil(++x);
                break;
            case "down":
                y = Math.ceil(++y);
                break;
        }

        let enemy = "";
        this.enemys.forEach(character => {
            if(maze.mazeField[y][x] === character.charaNum) enemy = character;
        });
        if(enemy != "") battle.battle(player, enemy);
    }

    viewPlayerStatus() {
        //文字色黒
        let fontSize = mazeBoxSize;
        ctx.fillStyle="black";
        ctx.font = fontSize + "px serif";
        //ステータス表示
        ctx.fillText(player.name, mazeBoxSize, mazeBoxSize * (mazeSize + 1));
        ctx.fillText("HP " + player.HP + "   MP: " + player.MP, mazeBoxSize, mazeBoxSize * (mazeSize + 2));
        ctx.fillText(this.dungeonLevel + "階", mazeBoxSize, mazeBoxSize * (mazeSize + 3));
    }

    goal() {
        maze = new Maze(mazeSize);
        player.initCharaPosition();
        this.enemys = new Array();
        this.enemyRandomGenerate();
        this.dungeonLevel += 1;
    }
}

class Input { //キー入力処理
    constructor() {
        this.up = false;
        this.left= false;
        this.down = false;
        this.right = false;
        this.enter = false;
        this.push = "";
        this.preTime = performance.now();
    }

    move_key() {
        addEventListener("keydown", () => {
            const key_code = event.keyCode;
            //上下左右
            if(key_code === 37) this.left = true;
            if(key_code === 38) this.up = true;
            if(key_code === 39) this.right = true;
            if(key_code === 40) this.down = true;
            event.preventDefault(); //方向キーでブラウザのスクロールを止められる(みたい)
        }, false);

        addEventListener("keyup", () => {
            const key_code = event.keyCode;
            //上下左右
            if(key_code === 37) this.left = false;
            if(key_code === 38) this.up = false;
            if(key_code === 39) this.right = false;
            if(key_code === 40) this.down = false;
        }, false);
    }

    attack_key() {
        addEventListener(`keydown`, () => {
            const key_code = event.keyCode;
            if(key_code === 13) this.enter = true;
            event.preventDefault();
        }, false);

        addEventListener(`keyup`, () => {
            const key_code = event.keyCode;
            if(key_code === 13) this.enter = false;
        }, false);
    }

    heal_key() {
        addEventListener(`keydown`, () => {
            const key_code = event.keyCode;
            if(key_code === 90) this.z = true;
            event.preventDefault();
        }, false);

        addEventListener(`keyup`, () => {
            const key_code = event.keyCode;
            if(key_code === 90) this.z = false;
        }, false);
    }
}


class GameLog{
    constructor() {
        this.gameLog = new Array();
    }

    addLog(text) {
        this.gameLog.push(text);
    }

    getLog() {
        let endLog = new Array();
        for(let i = 0; i < logSize; i++) {
            endLog.unshift(this.gameLog[(this.gameLog.length - 1) - i]);
        }
        return endLog;
    }

    viewLog() {
        //文字色黒
        let fontSize = mazeBoxSize;
        ctx.fillStyle="black";
        ctx.font = fontSize + "px serif";
        //ログ表示
        let endLog = log.getLog();
        for(let i = 0, p = 0; i < endLog.length; i++) {
            //mazeBoxSize * mazeSize, mazeBoxSize + fontSize;
            if(endLog[i] != undefined) ctx.fillText(endLog[i], mazeBoxSize * mazeSize , mazeBoxSize - fontSize + p * mazeBoxSize);
            p++;
        }
    }
}

class Battle {
    constructor() {

    }

    battle(attacker, server) {
        log.addLog(" ");

        log.addLog(attacker.name + "のこうげき");
        server.HP -= attacker.AK;
        log.addLog(server.name + "に" + attacker.AK + "のダメージ!");
        if(server.HP <= 0) {
            server.HP = 0;
            if(server === player) {
                log.addLog(player.name + "はしんでしまった...");
                game.dletePlayer(player);
            }else {
                log.addLog(server.name + "をたおした！");
                game.dleteEnemy(server);
            }
        }

        log.addLog(" ");
    }
}

function main() { //メイン関数
    //描画
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.beginPath();
    game.drawMazeField(maze.mazeField);
    game.drawLogField();
    game.drawSubFiled();
    game.drawCharacter();
    game.viewPlayerStatus();
    log.viewLog();

    //player
    game.players.forEach(character => {
        character.moveCharacter();
        character.attack();
        character.healPlayer();
    });

    //enemys
    game.enemys.forEach(character => {
        character.moveCharacter();
    });

    requestAnimationFrame(main);
}

//canvas
let canvas;
let ctx;
//迷路
let mazeSize = 15; // 15以上が好ましい。ログがずれるから。
let mazeBoxSize = 20 //5の倍数
let maze = new Maze(mazeSize);
//ゲーム
let charaNum = 100;
let game = new GameMain(mazeSize * mazeBoxSize, mazeSize * mazeBoxSize);
let input = new Input();

let player = new Player(cfront, "hibiking");
game.addPlayers(player);;

game.enemyRandomGenerate();

//バトル
let battle = new Battle();

//ログ
let log = new GameLog();
let logSize = Math.floor(canvas.height / mazeBoxSize);
 
addEventListener('load', main(), false);