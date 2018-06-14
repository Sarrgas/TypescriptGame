class Enemy extends Drawable implements Patterns.Interfaces.IObservable{
    private speed = 2;
    private onscreen: boolean = false;
    private elapsedFrames: number = 0;
    private _observers: Patterns.Interfaces.IObserver[];

    public constructor(x: number, y:number){
        super(x, y);
        this.size = 80;
        this._observers = [];
        this.sprite = new Image(this.size,this.size);
        this.sprite.src = 'astroid.png';

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
        ctx.drawImage(this.sprite,this.x, this.y, this.sprite.width, this.sprite.height);
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