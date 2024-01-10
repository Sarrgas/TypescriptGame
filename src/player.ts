class Player extends Drawable{
    private _observers: Patterns.Interfaces.IObserver[];
    private speed: number = 3;

    public constructor(x: number, y:number){
        super(x, y);
        this._observers = [];
        this.size = 100;
        this.sprite = new Image(this.size*0.7,this.size);
        this.sprite.src = 'teamrocket.png';
        // this.sprite.src = 'ship.png';
    }

    public draw(ctx: CanvasRenderingContext2D) : void{
        ctx.drawImage(this.sprite,this.x, this.y, this.sprite.width, this.sprite.height);
    }

    public goRight() : void{
        this.x += this.speed;
    }

    public goLeft() : void{
        this.x -= this.speed;
    }

    public goUp() : void{
        this.y -= this.speed;
    }

    public goDown() : void{
        this.y += this.speed;
    }

    public RegisterObserver(obs: Patterns.Interfaces.IObserver){
        this._observers.push(obs);
    }
}

