var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Game = (function () {
    function Game() {
        var _this = this;
        this.isRunning = true;
        this.gameLoop = function () {
            _this.processInput();
            _this.update();
            _this.render();
            _this.checkGameOver();
            if (_this.isRunning) {
                requestAnimationFrame(_this.gameLoop);
            }
        };
    }
    Game.prototype.processInput = function () {
        if (Key.isDown(Key.UP))
            this.world.player.goUp();
        if (Key.isDown(Key.LEFT))
            this.world.player.goLeft();
        if (Key.isDown(Key.DOWN))
            this.world.player.goDown();
        if (Key.isDown(Key.RIGHT))
            this.world.player.goRight();
        if (Key.isDown(Key.SPACE))
            this.shoot();
    };
    Game.prototype.update = function () {
        this.collisionDetection();
    };
    Game.prototype.render = function () {
        this.clear();
        for (var _i = 0, _a = this.world.drawables; _i < _a.length; _i++) {
            var drawable = _a[_i];
            drawable.draw(this.ctx);
        }
    };
    Game.prototype.shoot = function () {
        var bullet = new Bullet(this.world.player.x, this.world.player.y);
        this.world.drawables.push(bullet);
        this.world.bulletsOnScreen.push(bullet);
    };
    Game.prototype.collisionDetection = function () {
        for (var i = 0; i < this.world.enemiesOnScreen.length; i++) {
            var currentEnemy = this.world.enemiesOnScreen[i];
            if (this.world.player.collisionWith(currentEnemy)) {
                this.healthbar.decrement(6);
            }
            for (var _i = 0, _a = this.world.bulletsOnScreen; _i < _a.length; _i++) {
                var b = _a[_i];
                if (b.collisionWith(currentEnemy)) {
                    currentEnemy.isDead = true;
                    var enemyIndex = this.world.drawables.indexOf(currentEnemy);
                    this.world.drawables.splice(enemyIndex, 1);
                    this.world.enemiesOnScreen.splice(i, 1);
                }
            }
        }
    };
    Game.prototype.checkGameOver = function () {
        if (this.healthbar.isEmpty()) {
            this.ctx.font = "100px Arial";
            this.ctx.fillText("Game over", 350, 340);
            this.isRunning = false;
        }
    };
    Game.prototype.clear = function () {
        this.ctx.fillStyle = "lightgray";
        this.ctx.fillRect(0, 0, 1280, 720);
    };
    Game.prototype.init = function () {
        var canvas = document.getElementById('cnvs');
        this.ctx = canvas.getContext("2d");
        this.world = new World();
        this.world.addPlayer(new Player(400, 400));
        this.healthbar = new Healthbar(140, 650);
        this.world.addGUIelement(this.healthbar);
        for (var i = 0; i < this.world.currentLevel.enemies.length; i++) {
            this.world.currentLevel.enemies[i].RegisterObserver(this.world);
        }
        this.gameLoop();
    };
    return Game;
}());
window.onload = function () {
    window.addEventListener('keyup', function (event) { Key.onKeyup(event); }, false);
    window.addEventListener('keydown', function (event) { Key.onKeydown(event); }, false);
    var game = new Game();
    game.init();
};
var Drawable = (function () {
    function Drawable(x, y) {
        this.x = x;
        this.y = y;
    }
    Drawable.prototype.draw = function (ctx) { };
    Drawable.prototype.collisionWith = function (other) {
        if (this.x + this.size > other.x &&
            this.x < other.x + other.size) {
            if (this.y + this.size > other.y &&
                this.y < other.y + other.size) {
                return true;
            }
        }
        return false;
    };
    return Drawable;
}());
var Enemy = (function (_super) {
    __extends(Enemy, _super);
    function Enemy(x, y, sprite, text) {
        if (text === void 0) { text = ""; }
        var _this = _super.call(this, x, y) || this;
        _this.isDead = false;
        _this.id = 0;
        _this.speed = 2;
        _this.onscreen = false;
        _this.elapsedFrames = 0;
        _this.walk = function () {
            _this.y += _this.speed;
            _this.elapsedFrames++;
            if (!_this.onscreen && _this.elapsedFrames >= 60 && _this.y > 0) {
                _this.elapsedFrames = 0;
                _this.onscreen = true;
                _this.NotifyObservers();
            }
            requestAnimationFrame(_this.walk);
        };
        Enemy.enemyCount++;
        _this.id = Enemy.enemyCount;
        _this.size = 80;
        _this._observers = [];
        _this.sprite = new Image(_this.size, _this.size);
        _this.sprite.src = sprite;
        _this.text = text;
        _this.walk();
        return _this;
    }
    Enemy.prototype.draw = function (ctx) {
        if (!this.isDead) {
            ctx.drawImage(this.sprite, this.x, this.y, this.sprite.width, this.sprite.height);
            ctx.font = "20px Arial";
            ctx.fillText(this.text, this.x + 10, this.y + 90);
        }
    };
    Enemy.prototype.RegisterObserver = function (obs) {
        this._observers.push(obs);
    };
    Enemy.prototype.NotifyObservers = function () {
        for (var i = 0; i < this._observers.length; i++) {
            this._observers[i].ReceiveNotification(this);
        }
    };
    Enemy.enemyCount = 0;
    return Enemy;
}(Drawable));
var Goal = (function (_super) {
    __extends(Goal, _super);
    function Goal(x, y) {
        var _this = _super.call(this, x, y) || this;
        _this.walk = function () {
            if (_this.y < 300)
                _this.y += 2;
            requestAnimationFrame(_this.walk);
        };
        _this.walk();
        return _this;
    }
    Goal.prototype.draw = function (ctx) {
        ctx.fillStyle = "red";
        ctx.font = "40px Arial";
        ctx.fillText("TRYGG ARBETSPLATS UPPNADD", this.x, this.y);
    };
    return Goal;
}(Drawable));
var Healthbar = (function (_super) {
    __extends(Healthbar, _super);
    function Healthbar(x, y) {
        var _this = _super.call(this, x, y) || this;
        _this.health = 1000;
        _this.size = 200;
        return _this;
    }
    Healthbar.prototype.draw = function (ctx) {
        ctx.fillStyle = "red";
        ctx.fillRect(this.x, this.y, 1000, 60);
        ctx.fillStyle = "green";
        ctx.fillRect(this.x, this.y, this.health, 60);
    };
    Healthbar.prototype.decrement = function (amount) {
        this.health -= amount;
    };
    Healthbar.prototype.isEmpty = function () {
        return (this.health <= 0);
    };
    return Healthbar;
}(Drawable));
var Key = {
    _pressed: {},
    SPACE: 32,
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
    isDown: function (keyCode) {
        return this._pressed[keyCode];
    },
    onKeydown: function (event) {
        this._pressed[event.keyCode] = true;
    },
    onKeyup: function (event) {
        delete this._pressed[event.keyCode];
    }
};
var Level = (function () {
    function Level() {
        this.enemies = new Array();
    }
    return Level;
}());
var LevelManager = (function () {
    function LevelManager() {
        this.astroid = 'astroid.png';
        this.robber = 'robber.png';
        this.angel = 'angel.png';
        this.levels = new Array();
    }
    LevelManager.prototype.Createlevel = function (nr) {
        switch (nr) {
            case 1:
                return this.CreateLevel1();
            default:
                break;
        }
    };
    LevelManager.prototype.CreateLevel1 = function () {
        this.levels[1] = new Level();
        this.levels[1].enemies.push(new Enemy(700, 200, this.astroid));
        this.levels[1].enemies.push(new Enemy(200, 400, this.astroid));
        this.levels[1].enemies.push(new Enemy(900, 300, this.angel, "Student"));
        this.levels[1].enemies.push(new Enemy(400, 0, this.robber, "Mordare"));
        this.levels[1].enemies.push(new Enemy(600, -100, this.astroid));
        this.levels[1].enemies.push(new Enemy(1100, -150, this.astroid));
        this.levels[1].enemies.push(new Enemy(900, -200, this.angel, "Duktig pojke"));
        this.levels[1].enemies.push(new Enemy(300, -500, this.astroid));
        this.levels[1].enemies.push(new Enemy(500, -600, this.robber, "Narkotikabrott"));
        this.levels[1].enemies.push(new Enemy(400, -700, this.astroid));
        this.levels[1].enemies.push(new Enemy(800, -800, this.astroid));
        this.levels[1].enemies.push(new Enemy(100, -800, this.angel, "Byradirektor"));
        this.levels[1].enemies.push(new Enemy(1100, -850, this.angel, "VD"));
        this.levels[1].enemies.push(new Enemy(600, -850, this.astroid));
        this.levels[1].enemies.push(new Enemy(200, -900, this.robber, "Skattefuskare"));
        this.levels[1].enemies.push(new Enemy(400, -950, this.astroid));
        this.levels[1].enemies.push(new Enemy(800, -1100, this.angel, "Atlet"));
        this.levels[1].enemies.push(new Enemy(100, -1150, this.astroid));
        this.levels[1].enemies.push(new Enemy(1100, -1300, this.astroid));
        this.levels[1].enemies.push(new Enemy(600, -1300, this.astroid));
        this.levels[1].enemies.push(new Enemy(750, -1400, this.robber, "Valdtacktsman"));
        this.levels[1].enemies.push(new Enemy(400, -1450, this.angel, "Vanlig Svensson"));
        this.levels[1].enemies.push(new Enemy(800, -1600, this.astroid));
        this.levels[1].enemies.push(new Enemy(500, -1750, this.astroid));
        this.levels[1].enemies.push(new Enemy(1100, -1800, this.robber, "Drogkartell"));
        this.levels[1].enemies.push(new Enemy(150, -1900, this.astroid));
        this.levels[1].enemies.push(new Enemy(100, -2000, this.astroid));
        this.levels[1].enemies.push(new Enemy(300, -2100, this.astroid));
        this.levels[1].enemies.push(new Enemy(750, -2200, this.astroid));
        this.levels[1].enemies.push(new Enemy(400, -2300, this.astroid));
        this.levels[1].enemies.push(new Enemy(150, -2500, this.robber, "Jimmie Akesson"));
        this.levels[1].enemies.push(new Enemy(500, -2500, this.astroid));
        this.levels[1].enemies.push(new Enemy(800, -2500, this.astroid));
        this.levels[1].enemies.push(new Enemy(1100, -2500, this.astroid));
        this.levels[1].enemies.push(new Enemy(150, -2600, this.astroid));
        this.levels[1].enemies.push(new Enemy(500, -2600, this.astroid));
        this.levels[1].enemies.push(new Enemy(800, -2600, this.astroid));
        this.levels[1].enemies.push(new Enemy(1100, -2600, this.astroid));
        this.levels[1].enemies.push(new Enemy(150, -2700, this.astroid));
        this.levels[1].enemies.push(new Enemy(500, -2700, this.astroid));
        this.levels[1].enemies.push(new Enemy(800, -2700, this.astroid));
        this.levels[1].enemies.push(new Enemy(1100, -2700, this.astroid));
        this.levels[1].enemies.push(new Enemy(150, -2800, this.astroid));
        this.levels[1].enemies.push(new Enemy(500, -2800, this.astroid));
        this.levels[1].enemies.push(new Enemy(800, -2800, this.astroid));
        this.levels[1].enemies.push(new Enemy(1100, -2800, this.astroid));
        this.levels[1].enemies.push(new Enemy(150, -2900, this.astroid));
        this.levels[1].enemies.push(new Enemy(500, -2900, this.astroid));
        this.levels[1].enemies.push(new Enemy(800, -2900, this.astroid));
        this.levels[1].enemies.push(new Enemy(1100, -2900, this.astroid));
        this.levels[1].enemies.push(new Enemy(200, -3000, this.astroid));
        this.levels[1].enemies.push(new Enemy(550, -3000, this.astroid));
        this.levels[1].enemies.push(new Enemy(850, -3000, this.astroid));
        this.levels[1].enemies.push(new Enemy(1150, -3000, this.astroid));
        this.levels[1].enemies.push(new Enemy(250, -3100, this.astroid));
        this.levels[1].enemies.push(new Enemy(600, -3100, this.astroid));
        this.levels[1].enemies.push(new Enemy(900, -3100, this.astroid));
        this.levels[1].enemies.push(new Enemy(1200, -3100, this.astroid));
        this.levels[1].enemies.push(new Enemy(300, -3200, this.astroid));
        this.levels[1].enemies.push(new Enemy(650, -3200, this.astroid));
        this.levels[1].enemies.push(new Enemy(950, -3200, this.astroid));
        this.levels[1].enemies.push(new Enemy(1250, -3200, this.astroid));
        this.levels[1].enemies.push(new Enemy(350, -3300, this.astroid));
        this.levels[1].enemies.push(new Enemy(700, -3300, this.astroid));
        this.levels[1].enemies.push(new Enemy(1000, -3300, this.astroid));
        this.levels[1].enemies.push(new Enemy(1300, -3300, this.astroid));
        this.levels[1].enemies.push(new Enemy(400, -3400, this.astroid));
        this.levels[1].enemies.push(new Enemy(750, -3400, this.astroid));
        this.levels[1].enemies.push(new Enemy(1050, -3400, this.astroid));
        this.levels[1].enemies.push(new Enemy(1350, -3400, this.astroid));
        this.levels[1].enemies.push(new Enemy(350, -3500, this.astroid));
        this.levels[1].enemies.push(new Enemy(700, -3500, this.astroid));
        this.levels[1].enemies.push(new Enemy(1000, -3500, this.astroid));
        this.levels[1].enemies.push(new Enemy(1300, -3500, this.astroid));
        this.levels[1].enemies.push(new Enemy(300, -3600, this.astroid));
        this.levels[1].enemies.push(new Enemy(650, -3600, this.astroid));
        this.levels[1].enemies.push(new Enemy(950, -3600, this.astroid));
        this.levels[1].enemies.push(new Enemy(1250, -3600, this.astroid));
        this.levels[1].enemies.push(new Enemy(250, -3700, this.astroid));
        this.levels[1].enemies.push(new Enemy(600, -3700, this.astroid));
        this.levels[1].enemies.push(new Enemy(900, -3700, this.astroid));
        this.levels[1].enemies.push(new Enemy(1200, -3700, this.astroid));
        this.levels[1].enemies.push(new Enemy(200, -3800, this.astroid));
        this.levels[1].enemies.push(new Enemy(550, -3800, this.astroid));
        this.levels[1].enemies.push(new Enemy(850, -3800, this.astroid));
        this.levels[1].enemies.push(new Enemy(1150, -3800, this.astroid));
        this.levels[1].enemies.push(new Enemy(150, -3900, this.astroid));
        this.levels[1].enemies.push(new Enemy(500, -3900, this.astroid));
        this.levels[1].enemies.push(new Enemy(800, -3900, this.astroid));
        this.levels[1].enemies.push(new Enemy(1100, -3900, this.astroid));
        this.levels[1].enemies.push(new Enemy(150, -4000, this.astroid));
        this.levels[1].enemies.push(new Enemy(500, -4000, this.astroid));
        this.levels[1].enemies.push(new Enemy(800, -4000, this.astroid));
        this.levels[1].enemies.push(new Enemy(1100, -4000, this.astroid));
        this.levels[1].enemies.push(new Enemy(150, -4100, this.astroid));
        this.levels[1].enemies.push(new Enemy(500, -4100, this.astroid));
        this.levels[1].enemies.push(new Enemy(800, -4100, this.astroid));
        this.levels[1].enemies.push(new Enemy(1100, -4100, this.astroid));
        this.levels[1].enemies.push(new Enemy(150, -4200, this.astroid));
        this.levels[1].enemies.push(new Enemy(500, -4200, this.astroid));
        this.levels[1].enemies.push(new Enemy(800, -4200, this.astroid));
        this.levels[1].enemies.push(new Enemy(1100, -4200, this.astroid));
        this.levels[1].enemies.push(new Enemy(150, -4300, this.astroid));
        this.levels[1].enemies.push(new Enemy(500, -4300, this.astroid));
        this.levels[1].enemies.push(new Enemy(800, -4300, this.astroid));
        this.levels[1].enemies.push(new Enemy(1100, -4300, this.astroid));
        this.levels[1].goal = new Goal(100, -5000);
        return this.levels[1];
    };
    return LevelManager;
}());
var Bullet = (function (_super) {
    __extends(Bullet, _super);
    function Bullet(x, y) {
        var _this = _super.call(this, x, y) || this;
        _this.walk = function () {
            _this.y += -10;
            requestAnimationFrame(_this.walk);
        };
        _this.size = 8;
        _this.walk();
        return _this;
    }
    Bullet.prototype.draw = function (ctx) {
        ctx.fillStyle = "yellow";
        ctx.font = "100px Arial";
        ctx.fillText(".", this.x, this.y);
    };
    return Bullet;
}(Drawable));
var Player = (function (_super) {
    __extends(Player, _super);
    function Player(x, y) {
        var _this = _super.call(this, x, y) || this;
        _this.speed = 3;
        _this._observers = [];
        _this.size = 100;
        _this.sprite = new Image(_this.size, _this.size);
        _this.sprite.src = 'ship.png';
        return _this;
    }
    Player.prototype.draw = function (ctx) {
        ctx.drawImage(this.sprite, this.x, this.y, this.sprite.width, this.sprite.height);
    };
    Player.prototype.goRight = function () {
        this.x += this.speed;
    };
    Player.prototype.goLeft = function () {
        this.x -= this.speed;
    };
    Player.prototype.goUp = function () {
        this.y -= this.speed;
    };
    Player.prototype.goDown = function () {
        this.y += this.speed;
    };
    Player.prototype.RegisterObserver = function (obs) {
        this._observers.push(obs);
    };
    return Player;
}(Drawable));
var World = (function () {
    function World() {
        this.enemies = [];
        this.drawables = [];
        this.enemiesOnScreen = [];
        this.bulletsOnScreen = [];
        this.levelManager = new LevelManager();
        this.currentLevel = this.levelManager.Createlevel(1);
        this.enemies = this.currentLevel.enemies.slice();
        this.drawables = this.currentLevel.enemies.slice();
        this.drawables.push(this.currentLevel.goal);
    }
    World.prototype.addEnemy = function (e) {
        this.enemies.push(e);
    };
    World.prototype.addPlayer = function (p) {
        this.player = p;
        this.drawables.push(p);
    };
    World.prototype.addGUIelement = function (d) {
        this.drawables.push(d);
    };
    World.prototype.ReceiveNotification = function (Enemy) {
        this.enemiesOnScreen.push(Enemy);
        this.drawables.push(Enemy);
    };
    return World;
}());
//# sourceMappingURL=app.js.map