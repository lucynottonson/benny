const roomInfo = document.getElementById('room-info');
const roomVisual = document.getElementById('room-visual');
const navButtons = document.getElementById('nav-buttons');
const minimap = document.getElementById('minimap');

const size = 5;

const maze = [
  [{e:1},{w:1,e:1},{w:1,e:1},{w:1,e:1},{w:1,s:1}],
  [{n:1,s:1},{n:1},{},{},{n:1,s:1}],
  [{n:1,s:1},{e:1},{w:1,e:1},{w:1,e:1},{n:1,s:1}],
  [{n:1,s:1},{n:1},{},{},{n:1,s:1}],
  [{n:1},{},{},{},{n:1}]
];

const descriptions = [
  { text: "Use the directions available to move through the maze", color: "#868" },
  { text: "You have a little map so you can see where you are in the maze", color: "#44f" },
  { text: "You're getting closer.", color: "#6ff" },
  { text: "Almost there.", color: "#f6f" },
  { text: "It's a maze if you believe it's a maze.", color: "#4f4" },
  { text: "You're getting warmer.", color: "#f44" },
  { text: "This isn't really a maze. You don't have many options, unless you want to go back for fun.", color: "#ff0" },
  { text: "Almost!.", color: "#0ff" },
  { text: "So close.", color: "#f90" },
  { text: "Isn't this a cool maze. I think so.", color: "#f66" }
];

let pos = { x: 0, y: 0 };
let visited = new Set();
let smileyPos = null;
let hasWon = false;

function maybeMoveSmiley() {
  const visitedArray = Array.from(visited).filter(coord => coord !== `${pos.x},${pos.y}`);
  if (visitedArray.length < 2) {
    smileyPos = null;
    return;
  }
  if (Math.random() < 0.5) {
    const newCoord = visitedArray[Math.floor(Math.random() * visitedArray.length)];
    const [x, y] = newCoord.split(',').map(Number);
    smileyPos = { x, y };
  } else {
    smileyPos = null;
  }
}

function updateUI() {
  const cell = maze[pos.y][pos.x];
  roomInfo.textContent = `Room [${pos.x}, ${pos.y}]`;

  const desc = descriptions[(pos.x + pos.y * size) % descriptions.length];
  roomVisual.textContent = desc.text;
  roomVisual.style.color = desc.color;

  visited.add(`${pos.x},${pos.y}`);

  navButtons.innerHTML = '';
  for (const dir in cell) {
    if (cell[dir]) {
      const btn = document.createElement('button');
      btn.textContent = dir.toUpperCase();
      btn.addEventListener('click', () => move(dir));
      navButtons.appendChild(btn);
    }
  }

  maybeMoveSmiley();
  minimap.innerHTML = '';
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const cellDiv = document.createElement('div');
      cellDiv.classList.add('minimap-cell');
      cellDiv.style.width = '30px';
      cellDiv.style.height = '30px';
      if (pos.x === x && pos.y === y) {
        cellDiv.classList.add('current');
      } else if (smileyPos && smileyPos.x === x && smileyPos.y === y) {
        cellDiv.textContent = '🙂';
      } else if (visited.has(`${x},${y}`)) {
        cellDiv.classList.add('visited');
      }
      minimap.appendChild(cellDiv);
    }
  }

  if (!hasWon && pos.x === 4 && pos.y === 4) {
    hasWon = true;
    roomVisual.textContent = "You made it to the final room. You will be moved along now.";
    navButtons.innerHTML = '';
    setTimeout(() => {
      window.location.href = "scene3.html";
    }, 2000);
  }
}

function move(dir) {
  const cell = maze[pos.y][pos.x];
  if (!cell[dir]) return;

  switch (dir) {
    case 'n': pos.y--; break;
    case 's': pos.y++; break;
    case 'e': pos.x++; break;
    case 'w': pos.x--; break;
  }
  updateUI();
}

updateUI();
