class World implements Patterns.Interfaces.IObserver {
    public player: Player;
    public enemies: Enemy[];
    public enemiesOnScreen: Enemy[];
    public bulletsOnScreen: Bullet[];
    public drawables: Drawable[];
    public currentLevel: Level;
    private levelManager: LevelManager;

    constructor(){
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

    public addEnemy(e : Enemy){
        this.enemies.push(e);
    }

    public addPlayer(p : Player){
        this.player = p;
        this.drawables.push(p);
    }

    public addGUIelement(d : Drawable){
        this.drawables.push(d);
    }

    public ReceiveNotification(Enemy: Enemy) : void{
        this.enemiesOnScreen.push(Enemy);
        this.drawables.push(Enemy);
    }
}
