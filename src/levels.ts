class Level{
    enemies: Enemy[] = new Array<Enemy>();
    goal: Goal;
}

class LevelManager{
    astroid: string = 'astroid.png';
    robber: string = 'robber.png'
    angel: string = 'angel.png'

    levels: Level[] = new Array<Level>();

    public Createlevel(nr : number) : Level{
        switch (nr) {
            case 1:
                return this.CreateLevel1();
            default:
                break;
        }
    }

    private CreateLevel1() : Level{
        this.levels[1] = new Level();
        this.levels[1].enemies.push(new Enemy(700, 200, this.astroid));
        this.levels[1].enemies.push(new Enemy(200, 400, this.astroid));
        this.levels[1].enemies.push(new Enemy(900, 300, this.angel, "Student"));
        this.levels[1].enemies.push(new Enemy(400, 0, this.robber, "Mördare"));
        this.levels[1].enemies.push(new Enemy(600, -100, this.astroid));
        this.levels[1].enemies.push(new Enemy(1100, -150, this.astroid));
        this.levels[1].enemies.push(new Enemy(900, -200, this.angel, "Duktig pojke"));
        this.levels[1].enemies.push(new Enemy(300, -500, this.astroid));
        this.levels[1].enemies.push(new Enemy(500, -600, this.robber, "Narkotikabrott"));
        this.levels[1].enemies.push(new Enemy(400, -700, this.astroid));
        this.levels[1].enemies.push(new Enemy(800, -800, this.astroid));
        this.levels[1].enemies.push(new Enemy(100, -800, this.angel, "Byrådirektör"));
        this.levels[1].enemies.push(new Enemy(1100, -850, this.angel, "VD"));
        this.levels[1].enemies.push(new Enemy(600, -850, this.astroid));
        this.levels[1].enemies.push(new Enemy(200, -900, this.robber, "Skattefuskare"));
        this.levels[1].enemies.push(new Enemy(400, -950, this.astroid));
        this.levels[1].enemies.push(new Enemy(800, -1100, this.angel, "Atlet"));
        this.levels[1].enemies.push(new Enemy(100, -1150, this.astroid));
        this.levels[1].enemies.push(new Enemy(1100, -1300, this.astroid));
        this.levels[1].enemies.push(new Enemy(600, -1300, this.astroid));
        this.levels[1].enemies.push(new Enemy(750, -1400, this.robber, "Våldtäcktsman"));
        this.levels[1].enemies.push(new Enemy(400, -1450, this.angel, "Vanlig Svensson"));
        this.levels[1].enemies.push(new Enemy(800, -1600, this.astroid));
        this.levels[1].enemies.push(new Enemy(500, -1750, this.astroid));
        this.levels[1].enemies.push(new Enemy(1100, -1800, this.robber, "Drogkartell"));
        this.levels[1].enemies.push(new Enemy(150, -1900, this.astroid));
        this.levels[1].enemies.push(new Enemy(100, -2000, this.astroid));
        this.levels[1].enemies.push(new Enemy(300, -2100, this.robber, "Jimmie Åkesson"));
        this.levels[1].enemies.push(new Enemy(750, -2200, this.astroid));
        this.levels[1].enemies.push(new Enemy(400, -2300, this.astroid));
        this.levels[1].enemies.push(new Enemy(150, -2500, this.astroid));
        this.levels[1].enemies.push(new Enemy(500, -2500, this.astroid));
        this.levels[1].enemies.push(new Enemy(800, -2500, this.astroid));
        this.levels[1].enemies.push(new Enemy(1100, -2500, this.astroid));
        this.levels[1].enemies.push(new Enemy(150, -2600, this.astroid));
        this.levels[1].enemies.push(new Enemy(500, -2600, this.astroid));
        this.levels[1].enemies.push(new Enemy(800, -2600, this.astroid));
        this.levels[1].enemies.push(new Enemy(1100, -2600, this.astroid));
        this.levels[1].enemies.push(new Enemy(150, -2700, this.astroid));
        this.levels[1].enemies.push(new Enemy(500, -2700, this.astroid));
        this.levels[1].enemies.push(new Enemy(800, -2700, this.astroid));
        this.levels[1].enemies.push(new Enemy(1100, -2700, this.astroid));
        this.levels[1].enemies.push(new Enemy(150, -2800, this.astroid));
        this.levels[1].enemies.push(new Enemy(500, -2800, this.astroid));
        this.levels[1].enemies.push(new Enemy(800, -2800, this.astroid));
        this.levels[1].enemies.push(new Enemy(1100, -2800, this.astroid));
        this.levels[1].enemies.push(new Enemy(150, -2900, this.astroid));
        this.levels[1].enemies.push(new Enemy(500, -2900, this.astroid));
        this.levels[1].enemies.push(new Enemy(800, -2900, this.astroid));
        this.levels[1].enemies.push(new Enemy(1100, -2900, this.astroid));
        this.levels[1].enemies.push(new Enemy(200, -3000, this.astroid));
        this.levels[1].enemies.push(new Enemy(550, -3000, this.astroid));
        this.levels[1].enemies.push(new Enemy(850, -3000, this.astroid));
        this.levels[1].enemies.push(new Enemy(1150, -3000, this.astroid));
        this.levels[1].enemies.push(new Enemy(250, -3100, this.astroid));
        this.levels[1].enemies.push(new Enemy(600, -3100, this.astroid));
        this.levels[1].enemies.push(new Enemy(900, -3100, this.astroid));
        this.levels[1].enemies.push(new Enemy(1200, -3100, this.astroid));
        this.levels[1].enemies.push(new Enemy(300, -3200, this.astroid));
        this.levels[1].enemies.push(new Enemy(650, -3200, this.astroid));
        this.levels[1].enemies.push(new Enemy(950, -3200, this.astroid));
        this.levels[1].enemies.push(new Enemy(1250, -3200, this.astroid));
        this.levels[1].enemies.push(new Enemy(350, -3300, this.astroid));
        this.levels[1].enemies.push(new Enemy(700, -3300, this.astroid));
        this.levels[1].enemies.push(new Enemy(1000, -3300, this.astroid));
        this.levels[1].enemies.push(new Enemy(1300, -3300, this.astroid));
        this.levels[1].enemies.push(new Enemy(400, -3400, this.astroid));
        this.levels[1].enemies.push(new Enemy(750, -3400, this.astroid));
        this.levels[1].enemies.push(new Enemy(1050, -3400, this.astroid));
        this.levels[1].enemies.push(new Enemy(1350, -3400, this.astroid));
        this.levels[1].enemies.push(new Enemy(350, -3500, this.astroid));
        this.levels[1].enemies.push(new Enemy(700, -3500, this.astroid));
        this.levels[1].enemies.push(new Enemy(1000, -3500, this.astroid));
        this.levels[1].enemies.push(new Enemy(1300, -3500, this.astroid));
        this.levels[1].enemies.push(new Enemy(300, -3600, this.astroid));
        this.levels[1].enemies.push(new Enemy(650, -3600, this.astroid));
        this.levels[1].enemies.push(new Enemy(950, -3600, this.astroid));
        this.levels[1].enemies.push(new Enemy(1250, -3600, this.astroid));
        this.levels[1].enemies.push(new Enemy(250, -3700, this.astroid));
        this.levels[1].enemies.push(new Enemy(600, -3700, this.astroid));
        this.levels[1].enemies.push(new Enemy(900, -3700, this.astroid));
        this.levels[1].enemies.push(new Enemy(1200, -3700, this.astroid));
        this.levels[1].enemies.push(new Enemy(200, -3800, this.astroid));
        this.levels[1].enemies.push(new Enemy(550, -3800, this.astroid));
        this.levels[1].enemies.push(new Enemy(850, -3800, this.astroid));
        this.levels[1].enemies.push(new Enemy(1150, -3800, this.astroid));
        this.levels[1].enemies.push(new Enemy(150, -3900, this.astroid));
        this.levels[1].enemies.push(new Enemy(500, -3900, this.astroid));
        this.levels[1].enemies.push(new Enemy(800, -3900, this.astroid));
        this.levels[1].enemies.push(new Enemy(1100, -3900, this.astroid));
        this.levels[1].enemies.push(new Enemy(150, -4000, this.astroid));
        this.levels[1].enemies.push(new Enemy(500, -4000, this.astroid));
        this.levels[1].enemies.push(new Enemy(800, -4000, this.astroid));
        this.levels[1].enemies.push(new Enemy(1100, -4000, this.astroid));
        this.levels[1].enemies.push(new Enemy(150, -4100, this.astroid));
        this.levels[1].enemies.push(new Enemy(500, -4100, this.astroid));
        this.levels[1].enemies.push(new Enemy(800, -4100, this.astroid));
        this.levels[1].enemies.push(new Enemy(1100, -4100, this.astroid));
        this.levels[1].enemies.push(new Enemy(150, -4200, this.astroid));
        this.levels[1].enemies.push(new Enemy(500, -4200, this.astroid));
        this.levels[1].enemies.push(new Enemy(800, -4200, this.astroid));
        this.levels[1].enemies.push(new Enemy(1100, -4200, this.astroid));
        this.levels[1].enemies.push(new Enemy(150, -4300, this.astroid));
        this.levels[1].enemies.push(new Enemy(500, -4300, this.astroid));
        this.levels[1].enemies.push(new Enemy(800, -4300, this.astroid));
        this.levels[1].enemies.push(new Enemy(1100, -4300, this.astroid));
        this.levels[1].goal = new Goal(300, -4500);
        return this.levels[1];
    }
}