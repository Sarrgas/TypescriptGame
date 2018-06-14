class World {
    public player: Player;
    public enemies: Enemy[] = new Array<Enemy>();
    public drawables: Drawable[] = new Array<Drawable>();
    public currentLevel: Level;
    private levelManager: LevelManager;

    constructor(){
        this.levelManager = new LevelManager();
        this.currentLevel = this.levelManager.Createlevel(1);
        this.enemies = this.currentLevel.enemies.slice();
        this.drawables = this.currentLevel.enemies.slice();
    }

    public addEnemy(e : Enemy){
        this.enemies.push(e);
        this.drawables.push(e);
    }

    public addPlayer(p : Player){
        this.player = p;
        this.drawables.push(p);
    }

    public addGUIelement(d : Drawable){
        this.drawables.push(d);
    }
}
