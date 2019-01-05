/* Game.prototype.run
display initial tower
prompt user for their move
verify move is valid
complete move
display current state of towers
rinse repeat until game over? */

class Game {
  constructor() {
    this.towers = [[3,2,1], [], []];
  }

  isValidMove(startIdx, endIdx) {
    const start = this.towers[startIdx];
    const end = this.towers[endIdx];

    if (start.length === 0) {
      return false;
    } else if (end.length == 0) {
      return true;
    } else {
      const startDisc = start[start.length - 1];
      const endDisc = end[end.length - 1];
      return startDisc < endDisc;
    }
  }

  gameOver() {
    return (this.towers[2].length === 3) || (this.towers[3].length === 3)
  }

  move(start, end) {
    if (this.isValidMove(start, end)) {
      this.towers[end].push(this.towers[start].pop());
      return true;
    } else {
      return false;
    }
  }

  print() {
    console.log(this.towers)
  }

  promptMove(reader, cb) {
    this.print();
    reader.question("Pick a tower to remove disc from: ", start => {
      const startIdx = parseInt(start);
      reader.question("Pick a tower to place disc on: ", end => {
        const endIdx = parseInt(end);
        cb(startIdx, endIdx);
      });
    });
  }

  run(reader, completionCallback) {
    this.promptMove(reader, (startIdx, endIdx) => {
      if(!this.move(startIdx, endIdx)) {
        console.log("invalid move");
      }

      if(!this.gameOver()) {
        this.run(reader, completionCallback);
      } else {
        this.print();
        console.log("you won!");
        completionCallback();
      }
    });
  }

}