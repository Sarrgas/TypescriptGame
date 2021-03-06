class Game{
    private ctx: CanvasRenderingContext2D;
    private healthbar: Healthbar;
    private isRunning: boolean = true;
    private world: World;
 
    private gameLoop = () => {
        this.processInput();
        this.update();
        this.render();
        this.checkGameOver();
        
        if (this.isRunning) {
            requestAnimationFrame(this.gameLoop);
        }
    }

    private processInput() : void{
        if (Key.isDown(Key.UP)) this.world.player.goUp();
        if (Key.isDown(Key.LEFT)) this.world.player.goLeft();
        if (Key.isDown(Key.DOWN)) this.world.player.goDown();
        if (Key.isDown(Key.RIGHT)) this.world.player.goRight();     
    }

    private update() : void{
        this.collisionDetection();
    }

    private render() : void {
        this.clear();
        for (const drawable of this.world.drawables) {
            drawable.draw(this.ctx);
        }
    }

    private collisionDetection() : void{
       
        for (const e of this.world.enemiesOnScreen) {
            if(this.world.player.collisionWith(e)){
                this.healthbar.decrement(6);
            }
        }
    }

    private checkGameOver() : void{
        if (this.healthbar.isEmpty()) {
            this.ctx.font = "100px Arial";
            this.ctx.fillText("Game over",350,340);
            this.isRunning = false;
        }
    }

     private clear() : void{
        this.ctx.fillStyle = "lightgray";
        this.ctx.fillRect(0, 0, 1280, 720);
     }

     public init() : void {
        let canvas = <HTMLCanvasElement>document.getElementById('cnvs');
        this.ctx = canvas.getContext("2d");

        this.world = new World();
        this.world.addPlayer(new Player(400, 400));

        this.healthbar = new Healthbar(140,650);
        this.world.addGUIelement(this.healthbar);

        for (let i = 0; i < this.world.currentLevel.enemies.length; i++) {
            this.world.currentLevel.enemies[i].RegisterObserver(this.world);
        }

        this.gameLoop();
     }
}




 window.onload = () => {
    window.addEventListener('keyup', function(event) { Key.onKeyup(event); }, false);
    window.addEventListener('keydown', function(event) { Key.onKeydown(event); }, false);
    let game = new Game();
    game.init();
    
 }