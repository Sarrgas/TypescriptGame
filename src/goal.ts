class Goal extends Drawable{

    public constructor(x: number, y:number){
        super(x, y);

        this.walk();
    }

    public draw(ctx: CanvasRenderingContext2D) : void{
        ctx.fillStyle = "red";
        ctx.font = "40px Arial";
        ctx.fillText("TRYGG ARBETSPLATS UPPNADD",this.x,this.y);
    }

    private walk = () => {
        if(this.y < 300)
            this.y += 2

        requestAnimationFrame(this.walk);
    }
}