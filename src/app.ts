class Game{
    private ctx: CanvasRenderingContext2D;
    private healthbar: Healthbar;
    private score: ScoreCounter;
    private isRunning: boolean = true;
    private world: World;
    private isMusicPlaying: boolean = false;
    private audio = new Audio("music.mp3");
 
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
        if (Key.isDown(Key.SPACE)) this.shoot();    
        if(!this.isMusicPlaying) this.audio.play(); 
    }

    private update() : void{
        this.collisionDetection();
    }

    private render() : void {
        this.clear();
        for (const drawable of this.world.drawables) {
            drawable.draw(this.ctx);
        }

        for (const guiElement of this.world.guiElements) {
            guiElement.draw(this.ctx);
        }
    }

    private shoot() : void {
        let bullet = new Bullet(this.world.player.x, this.world.player.y);
        this.world.drawables.push(bullet)
        this.world.bulletsOnScreen.push(bullet)
    }

    private collisionDetection() : void{
       
        for (let i = 0; i < this.world.enemiesOnScreen.length; i++) {
            let currentEnemy = this.world.enemiesOnScreen[i];
            if(this.world.player.collisionWith(currentEnemy)){
                this.healthbar.decrement(6);
            }

            if(currentEnemy.isDestroyable){
                for(const b of this.world.bulletsOnScreen) {
                    if(b.collisionWith(currentEnemy)){
                        console.log(currentEnemy.spriteSrc)
                        if(currentEnemy.spriteSrc == "robber.png"){
                            this.score.increment(50)
                        }
                        else{
                            this.score.decrement(50)
                        }
                        currentEnemy.isDead = true;
                        var enemyIndex = this.world.drawables.indexOf(currentEnemy)
                        this.world.drawables.splice(enemyIndex,1)
                        this.world.enemiesOnScreen.splice(i,1)
                    }
                }
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

        this.score = new ScoreCounter();
        this.world.addGUIelement(this.score)

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