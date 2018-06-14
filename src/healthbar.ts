class Healthbar extends Drawable{
    private health: number = 1000;
    public constructor(x: number, y:number){
        super(x, y);
        this.size = 200;
    }

    public draw(ctx: CanvasRenderingContext2D) : void{
        ctx.fillStyle = "red";
        ctx.fillRect(this.x, this.y, 1000, 60);

        ctx.fillStyle = "green";
        ctx.fillRect(this.x, this.y, this.health, 60);
    }

    public decrement(amount: number) : void{
        this.health -= amount;
    }

    public isEmpty() : boolean{
        return (this.health <= 0);
    }
}