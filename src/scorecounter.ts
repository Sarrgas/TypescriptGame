class ScoreCounter extends Drawable{
    private score: number = 0;
    public constructor(){
        super(20, 20);
        this.size = 200;
    }

    public draw(ctx: CanvasRenderingContext2D) : void{
        ctx.font = "20px Arial";
        ctx.fillText(`Score: ${this.score}`,20,20);
    }

    public decrement(amount: number) : void{
        this.score -= amount;
    }

    public increment(amount: number) : void{
        this.score += amount;
    }
}