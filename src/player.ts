class Player extends Drawable{
    private speed: number = 3;

    public constructor(x: number, y:number){
        super(x, y);
        this.size = 100;
        this.sprite = new Image(this.size,this.size);
        this.sprite.src = 'ship.png';
    }

    public draw(ctx: CanvasRenderingContext2D) : void{
        // let img = new Image(this.size,this.size);
        // img.src = 'ship.png';
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
}

