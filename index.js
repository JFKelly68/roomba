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

// Cell

// Grid
  // cells

class Grid {
  
  static createRow (row, size) {
    // create element
    const newEl = document.createElement('div');
    newEl.classList.add(`Row`, `Row__${row}`);
    
    for (let i = 0; i < size; i++) {
      const cell = this.createCell(i);
      newEl.appendChild(cell);
    }
    return newEl;
  }

  static createCell (num) {
    const newEl = document.createElement('div');
    newEl.classList.add(`Cell`, `Cell__${num}`);
    return newEl;
  }

  constructor (size = 10) {
    let _size;
    try {
      _size = parseInt(size);
    } catch (e) {
      console.error('Size must be an integer');
    }

    this.element = document.querySelector('#grid');
    this.size = _size;
    this.grid = [];

    this.initialize();
  }

  initialize () {
    this.createGrid();
  }

  createGrid () {
    const size = this.size;

    for (let row = 0; row < size; row++) {
      this.grid.push(Array(size));
      const rowEl = this.constructor.createRow(row, size);
      this.element.appendChild(rowEl);
    }
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
    this.roomba.turn();
  }
}


const app = new App();