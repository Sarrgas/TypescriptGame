class Enemy extends Drawable implements Patterns.Interfaces.IObservable{
    static enemyCount: number = 0;

    public isDead: boolean = false;
    public isDestroyable: boolean = false;

    private id: number = 0;
    private text: string;
    private speed = 2;
    private onscreen: boolean = false;
    private elapsedFrames: number = 0;
    private _observers: Patterns.Interfaces.IObserver[];

    public constructor(x: number, y:number, sprite: string, text: string = ""){
        super(x, y);
        Enemy.enemyCount++;
        this.id = Enemy.enemyCount;
        this.size = 80;
        this._observers = [];
        this.sprite = new Image(this.size,this.size);
        this.sprite.src = sprite
        this.text = text;
        this.isDestroyable = text != "";

        this.walk();
    }


    private walk = () => {
        this.y += this.speed;
        this.elapsedFrames++;
        if (!this.onscreen && this.elapsedFrames >= 60 && this.y > 0) {
            this.elapsedFrames = 0;
            this.onscreen = true;
            this.NotifyObservers();
        }

        requestAnimationFrame(this.walk);
    }

    public draw(ctx: CanvasRenderingContext2D) : void{
        if(!this.isDead){
            ctx.drawImage(this.sprite,this.x, this.y, this.sprite.width, this.sprite.height);
            ctx.font = "20px Arial";
            ctx.fillText(this.text,this.x+10,this.y+90);
        }
    }

    
    public RegisterObserver(obs: Patterns.Interfaces.IObserver){
        this._observers.push(obs);
    }

    public NotifyObservers(){
        for (let i = 0; i < this._observers.length; i++) {
            this._observers[i].ReceiveNotification(this);
        }
    }
}