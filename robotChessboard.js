class RobotChessboard {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.directions = ['NORTH', 'EAST', 'SOUTH', 'WEST'];
        this.currentDirection = 'SOUTH';
    }

    place(x, y, direction) {
        if (this.isValidPosition(x, y) && this.directions.includes(direction)) {
            this.x = x;
            this.y = y;
            this.currentDirection = direction;
        }
    }

    move() {
        if (this.currentDirection === 'NORTH' && this.y < 4) {
            this.y++;
        } else if (this.currentDirection === 'SOUTH' && this.y > 0) {
            this.y--;
        } else if (this.currentDirection === 'EAST' && this.x < 4) {
            this.x++;
        } else if (this.currentDirection === 'WEST' && this.x > 0) {
            this.x--;
        }
    }

    left() {
        const currentIndex = this.directions.indexOf(this.currentDirection);
        this.currentDirection = this.directions[(currentIndex + 3) % 4];
    }

    right() {
        const currentIndex = this.directions.indexOf(this.currentDirection);
        this.currentDirection = this.directions[(currentIndex + 1) % 4];
    }

    report() {
        return `Robot is at position (${this.x}, ${this.y}) facing ${this.currentDirection}`;
    }

    isValidPosition(x, y) {
        return x >= 0 && x < 5 && y >= 0 && y < 5;
    }
}


const fs = require('fs');

function executeCommands(filePath) {
    const chessboard = new RobotChessboard();
    const commands = fs.readFileSync(filePath, 'utf-8').split('\n');

    commands.forEach(command => {
        const [action, ...args] = command.trim().split(' ');

        switch (action) {
            case 'PLACE':
                const [x, y, direction] = args;
                chessboard.place(parseInt(x), parseInt(y), direction);
                break;
            case 'MOVE':
                chessboard.move();
                break;
            case 'LEFT':
                chessboard.left();
                break;
            case 'RIGHT':
                chessboard.right();
                break;
            case 'REPORT':
                console.log(chessboard.report());
                break;
        }
    });
}


executeCommands('commands.txt');