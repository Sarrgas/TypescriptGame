class Bullet extends Drawable{

    public constructor(x: number, y:number){
        super(x, y);


        this.walk();
    }

    public draw(ctx: CanvasRenderingContext2D) : void{

        // ctx.drawImage(this.sprite,this.x, this.y, this.sprite.width, this.sprite.height);
        ctx.fillStyle = "yellow";
        ctx.font = "100px Arial";
        ctx.fillText(".",this.x,this.y);
    }

    private walk = () => {
        this.y += -10

        requestAnimationFrame(this.walk);
    }
}