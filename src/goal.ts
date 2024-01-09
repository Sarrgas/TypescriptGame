class Goal extends Drawable{

    public constructor(x: number, y:number){
        super(x, y);
        // this.sprite = new Image(this.size,this.size);
        // this.sprite.src = 'astroid.png';

        this.walk();
    }

    public draw(ctx: CanvasRenderingContext2D) : void{

        // ctx.drawImage(this.sprite,this.x, this.y, this.sprite.width, this.sprite.height);
        ctx.fillStyle = "red";
        ctx.font = "100px Arial";
        ctx.fillText("TRYGG ARBETSPLATS UPPNÅDD",this.x,this.y);
    }

    private walk = () => {
        this.y += 2

        requestAnimationFrame(this.walk);
    }
}