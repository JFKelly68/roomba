/** CONSTRAINTS
 Roomba points into a direction
 Roomba cannot pass through the walls
 If Roomba hits a wall, Roomba will turn
*/

// CLASSES
// Roomba
  // turn
  // move


class Roomba {
  constructor () {
    this._directions = ['N', 'E', 'S', 'W'];
    this._count = 0;
    
    this.direction = this._directions[this._count];
    this.x = 0;
    this.y = 0;
  }

  turn () {
    // update direction
    this._count = (this._count + 1) % this._directions.length;
    const newDirection = this._directions[this._count]
    this.direction = newDirection;
  }

  move () {
    // determine direction
    switch (this.direction) {
      case 'N':
        this.y = this.y - 1;
      case 'E': 
        this.x = this.x + 1;
      case 'S': 
        this.y = this.y + 1;
      case 'W': 
        this.x = this.x - 1;
    }
  }
}

// Grid
class Grid {

  static createElement (classes) {
    const newEl = document.createElement('div');
    newEl.classList.add(...classes);
    return newEl;
  }

  constructor (size = 10) {
    let _size;
    try {
      _size = parseInt(size);
    } catch (e) {
      throw new Error('Size must be an integer');
    }

    this.element = document.querySelector('#grid');
    this.grid = this.createGrid(_size);
    this.size = _size;
  }

  createGrid (size) {
    const grid = [];
    for (let row = 0; row < size; row++) {
      grid[row] = [];
      const rowEl = this.constructor.createElement(['Column', `Column--${row}`]); // to match the provided HTML/CSS
      this.element.appendChild(rowEl);

      for (let col = 0; col < size; col++) {
        grid[row][col] = true;
        const cell = this.constructor.createElement(['Cell', `Cell--${row}_${col}`]);
        rowEl.appendChild(cell);
      }
    }

    return grid;
  }
  

}


// FUNCTIONS
// Initialize
  // create board
  // setupListeners
  // display

class App {
  constructor () {
    this.grid;

    this.x = 0;
    this.y = 0;

    this.initialize();
  }

  initialize () {
    // setup listeners
    this.grid = new Grid(10);
  }

  setupListeners () {
    // grab buttons, attach listeners
  }

  move () {
    // check roomba for direction
    // if position is moving off the board, turn() // this.move()
    // update position
  }

  turn () {
    // this.roomba.turn();
  }
}


const app = new App();