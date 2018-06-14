class Enemy extends Drawable{
    private speed = 2;

    public constructor(x: number, y:number){
        super(x, y);
        this.size = 80;

        this.sprite = new Image(this.size,this.size);
        this.sprite.src = 'astroid.png';

        this.walk();
    }

    private walk = () => {
        this.y += this.speed;
        requestAnimationFrame(this.walk);
    }

    public draw(ctx: CanvasRenderingContext2D) : void{
        ctx.drawImage(this.sprite,this.x, this.y, this.sprite.width, this.sprite.height);
    }
}