export default class Robot {
    coordinates: number[];
    bearing: string;

    constructor() {
        this.coordinates = [0, 0];
        this.bearing = 'north';
    }

    at(xcoord: number, ycoord: number) {
        this.coordinates = [xcoord, ycoord];
    }

    orient(direction: string) {
        this.bearing = direction;
        return `The robot is pointed ${direction}`;
    }

    advance() {
        if (this.bearing === 'north') {
            this.coordinates[1] += 1;
        } else if (this.bearing === 'south') {
            this.coordinates[1] -= 1;
        } else if (this.bearing === 'east') {
            this.coordinates[0] += 1;
        } else if (this.bearing === 'west') {
            this.coordinates[0] -= 1;
        }
    }

    turnLeft() {
        if (this.bearing === 'north') {
            this.orient('west');
        } else if (this.bearing === 'south') {
            this.orient('east');
        } else if (this.bearing === 'east') {
            this.orient('north');
        } else if (this.bearing === 'west') {
            this.orient('south');
        }
    }

    turnRight() {
        if (this.bearing === 'north') {
            this.orient('east');
        } else if (this.bearing === 'south') {
            this.orient('west');
        } else if (this.bearing === 'east') {
            this.orient('south');
        } else if (this.bearing === 'west') {
            this.orient('north');
        }
    }

    instructions(s: string) {
        return [...s].map((character: string) => {
            if (character === 'L') {
                return 'turnLeft';
            } else if (character === 'R') {
                return 'turnRight';
            } else if (character === 'A') {
                return 'advance';
            }
            return '';
        });
    }

    place(args: { x: number, y: number, direction: string }) {
        this.coordinates = [args.x, args.y];
        this.bearing = args.direction;
    }

    evaluate(s: string) {
        this.instructions(s).forEach((instruction: string) => {
            switch (instruction) {
                case 'turnLeft':
                    return this.turnLeft();
                case 'turnRight':
                    return this.turnRight();
                case 'advance':
                    return this.advance();
                case '':
                    return;
            }
        });
    }

}
