class Drawable{
    public x: number;
    public y: number;
    protected size: number;
    public sprite: HTMLImageElement;

    public draw(ctx: CanvasRenderingContext2D) : void{}

    public constructor(x: number, y:number){
        this.x = x;
        this.y = y;
    }

    public collisionWith(other: Drawable): boolean{
        //Check X-axis collision
        if (this.x + this.size > other.x &&
            this.x < other.x + other.size) 
        {
            //Check Y-axis collision
            if (this.y + this.size > other.y &&
                this.y < other.y + other.size) {
                return true;
            }
        }

        return false;
    }
}