document.addEventListener("DOMContentLoaded", () => {

  const home = document.getElementById("home");
  const game = document.getElementById("game");
  const startBtn = document.getElementById("startBtn");
  const homeBtn = document.getElementById("homeBtn");
  const resetBtn = document.getElementById("resetBtn");
  const banner = document.getElementById("banner");
  const cells = document.querySelectorAll("[data-cell]");

  let turn = "X";
  let running = true;

  // Winning combinations (indexes of cells)
  const wins = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  // START BUTTON → Go to game screen
  startBtn.onclick = () => {
    home.classList.remove("active");
    game.classList.add("active");
  };

  // HOME BUTTON → Back to home screen
  homeBtn.onclick = () => {
    game.classList.remove("active");
    home.classList.add("active");
    resetBoard();
  };

  // Handle each cell click
  cells.forEach(cell => {
    cell.onclick = () => {
      if (!running || cell.textContent !== "") return;

      cell.textContent = turn;
      cell.classList.add(turn.toLowerCase());

      checkWin();
      turn = turn === "X" ? "O" : "X"; // switch turn
    };
  });

  // Check if someone won or draw
  function checkWin() {
    const values = [...cells].map(c => c.textContent);

    for (let combo of wins) {
      const [a, b, c] = combo;
      if (values[a] && values[a] === values[b] && values[a] === values[c]) {
        showBanner(`${values[a]} Wins!`);
        running = false;
        return;
      }
    }

    if (!values.includes("")) {
      showBanner("Draw!");
      running = false;
    }
  }

  // Show banner message
  function showBanner(text) {
    banner.textContent = text;
    banner.style.display = "block";
  }

  // RESET BUTTON → reset board
  resetBtn.onclick = resetBoard;

  function resetBoard() {
    cells.forEach(cell => {
      cell.textContent = "";
      cell.classList.remove("x", "o");
    });

    banner.style.display = "none";
    turn = "X";
    running = true;
  }

});
