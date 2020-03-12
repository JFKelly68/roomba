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

  static get directionsDelta () {
    return {
      'N': [0, -1],
      'E': [1, 0],
      'S': [0, 1],
      'W': [-1, 0]
    }
  }
  
  static get directions () {
    return ['E', 'S', 'W', 'N'];
  }

  constructor () {
    this._count = 0;
    
    this.x = 0;
    this.y = 0;
  }

  get direction () {
    return Roomba.directions[this._count];
  }

  set direction (val) {
    throw new Error(`'direction' is read-only`);
  }

  turn () {
    // update direction by incrementing the count
    const count = this._count + 1;
    this._count = (count) % this.constructor.directions.length; // cycle the count
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
    this.activeCell = null
  }

  createGrid (size) {
    const grid = [];
    for (let col = 0; col < size; col++) {
      grid[col] = [];
      const colEl = this.constructor.createElement(['Column', `Column--${col}`]); // to match the provided HTML/CSS
      this.element.appendChild(colEl);

      for (let cell = 0; cell < size; cell++) {
        grid[col][cell] = true;
        const cellEl = this.constructor.createElement(['Cell', `Cell--${col}_${cell}`]);
        colEl.appendChild(cellEl);
      }
    }

    return grid;
  }
  
  activateCell (x, y) {
    if (this.activeCell !== null) {
      this.deactivateCell();
    }
    
    const cellEl = this.element.querySelector(`.Cell--${x}_${y}`);
    if (cellEl) {
      cellEl.classList.add('active');
      this.activeCell = cellEl;
    }
  }

  deactivateCell (cell = null) {
    const active = cell || this.activeCell;

    active.classList.remove('active');
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
    this.x;
    this.y;
    this.btnMove;
    this.btnTurn;
    this.warningEl;
    
    this.initialize();
    this.setupListeners();
  }

  initialize () {
    this.grid = new Grid(10);
    this.roomba = new Roomba();
    this.x = 0;
    this.y = 0;
    
    // elements
    this.btnMove = document.querySelector('#btnMove');
    this.btnTurn = document.querySelector('#btnTurnRight');
    this.warningEl = document.querySelector('#warning');

    this._updatePosition([this.x, this.y]);
  }

  setupListeners () {
    // grab buttons, attach listeners
    this.move = this.move.bind(this);
    this.turn = this.turn.bind(this);

    this.btnMove.addEventListener('click', this.move);
    this.btnTurn.addEventListener('click', this.turn);
  }

  _calculateNewPosition (dir) {
    const [dx, dy] = Roomba.directionsDelta[dir];
    return [this.x + dx, this.y + dy];
  }

  isValid ([ x, y ]) {
    return (
      (x >= 0 && x < this.grid.size) &&
      (y >= 0 && y < this.grid.size)
    )
  }

  invalidMove () {
    this.warningEl.classList.add('show');
    
    return setTimeout(() => {
      this.warningEl.classList.remove('show');
    }, 3000);
  }

  _updatePosition ([x, y]) {
    if (!this.isValid([x, y])) {
      return this.invalidMove();
    }

    this.x = x;
    this.y = y;
    this.grid.activateCell(x, y);
  }

  move () {
    // check roomba for direction
    const direction = this.roomba.direction;
    // calculate next move
    const nextPos = this._calculateNewPosition(direction);
    // update position
    this._updatePosition(nextPos);
  }

  turn () {
    this.roomba.turn();
  }
}


const app = new App();