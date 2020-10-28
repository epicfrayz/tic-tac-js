"use strict"

let Game = {
	levels: {
		menu: levelMenu,
		game: levelGame
	},
	state: {
		gameContainer: undefined,
		score: {
			player1: 0,
			player2: 0
		}
	},
	map:  [ "", "", "",
	 		"", "", "",
			"", "", "" ],
	control: [],
	nowLevel: undefined,
	movePlayer: true,
	clearMap: function () {
		this.map = 	  [ "", "", "",
				 		"", "", "",
						"", "", "" ];
	}
}

window.addEventListener("load", function() {
	initGame("body");
	loadLevel();
});


function initGame(parent) {
	Game.nowLevel = Game.levels.menu;

	Game.state.gameContainer = document.createElement("div");
	Game.state.gameContainer.classList.add("game");
	document.querySelector(parent).append( Game.state.gameContainer );
}

function levelMenu() {
	loadGame();

	let gameContainer 	= createEl("div", ["game-container"]);
	let gameState		= createEl("table", ["game-state"]);
	let gameStateTr1	= createEl("tr", []);
	let gameStateTd1	= createEl("td", []);
	let gameStateTd2	= createEl("td", ["color-gamewin"]);
	let gameStateTr2	= createEl("tr", []);
	let gameStateTd3	= createEl("td", []);
	let gameStateTd4	= createEl("td", ["color-gameover"]);

	gameStateTd4.innerHTML = Game.state.score.player2;
	gameStateTd3.innerHTML = "Игрок 2:";
	gameStateTr2.append(gameStateTd3);
	gameStateTr2.append(gameStateTd4);

	gameStateTd2.innerHTML = Game.state.score.player1;
	gameStateTd1.innerHTML = "Игрок 1:";
	gameStateTr1.append(gameStateTd1);
	gameStateTr1.append(gameStateTd2);



	gameState.append(gameStateTr1);
	gameState.append(gameStateTr2);

	gameContainer.append(gameState);

	// кнопка для старта
	let btnRefresh = createBtn(["btn", "btn-refresh"],"", () => {
		startGame();
	});

	gameContainer.append(btnRefresh);

	Game.state.gameContainer.append(gameContainer);
}

function levelGame() {
	let gameContainer 	= createEl("div", ["game-container", "game-container-grid"]);
	for(let i = 0; i < 9; i++) {
		let btn = createBtn(["btn"], "", (e) => {
			if( Game.movePlayer ) {
				Game.map[i] = "x";
				Game.control[`btn${i}`].classList.add("btn-x");
			} else {
				Game.map[i] = "0";
				Game.control[`btn${i}`].classList.add("btn-o");
			}

			Game.movePlayer = !Game.movePlayer;

			checkMap();
		});
		
		Game.control[`btn${i}`] = btn;

		gameContainer.append(btn);
	}

	Game.state.gameContainer.append(gameContainer);
}

function checkMap() {
	if ( Game.map[0] == "x" && Game.map[1] == 'x' && Game.map[2] == 'x' ||
		 Game.map[3] == "x" && Game.map[4] == 'x' && Game.map[5] == 'x' ||
		 Game.map[6] == "x" && Game.map[7] == 'x' && Game.map[8] == 'x' ||
		 Game.map[0] == "x" && Game.map[3] == 'x' && Game.map[6] == 'x' ||
		 Game.map[1] == "x" && Game.map[4] == 'x' && Game.map[7] == 'x' ||
		 Game.map[2] == "x" && Game.map[5] == 'x' && Game.map[8] == 'x' ||
		 Game.map[0] == "x" && Game.map[4] == 'x' && Game.map[8] == 'x' ||
		 Game.map[6] == "x" && Game.map[4] == 'x' && Game.map[2] == 'x' ) {
			 Game.state.score.player1 += 1;
			 startMenu();
	}
	if ( Game.map[0] == "0" && Game.map[1] == '0' && Game.map[2] == '0' ||
		 Game.map[3] == "0" && Game.map[4] == '0' && Game.map[5] == '0' ||
		 Game.map[6] == "0" && Game.map[7] == '0' && Game.map[8] == '0' ||
		 Game.map[0] == "0" && Game.map[3] == '0' && Game.map[6] == '0' ||
		 Game.map[1] == "0" && Game.map[4] == '0' && Game.map[7] == '0' ||
		 Game.map[2] == "0" && Game.map[5] == '0' && Game.map[8] == '0' ||
		 Game.map[0] == "0" && Game.map[4] == '0' && Game.map[8] == '0' ||
		 Game.map[6] == "0" && Game.map[4] == '0' && Game.map[2] == '0' ) {
			Game.state.score.player2 += 1;
			startMenu();
	}
}

function startGame() {
	Game.nowLevel = Game.levels.game;
	levelClear();
	loadLevel();
}

function startMenu() {
	saveGame();
	Game.clearMap();

	Game.nowLevel = Game.levels.menu;
	levelClear();
	loadLevel();
}

function saveGame() {
	localStorage.setItem("stateScore", JSON.stringify(Game.state.score));
}

function loadGame() {
	if (localStorage.getItem('stateScore') !== null) {
		Game.state.score = JSON.parse( localStorage.getItem("stateScore") );
	}
}

function createEl(el, classList) {
	let element = document.createElement(el);
	element.classList.add(...classList);
	return element;
}

function createBtn(classBtn, contentBtn, handler) {
	let btn = document.createElement("button");
	btn.classList.add(...classBtn);
	btn.innerHTML = contentBtn;
	btn.addEventListener("click", handler, {once: true});

	return btn;
}

function loadLevel() {
	Game.nowLevel();
}

function levelClear() {
	document.querySelector(".game").innerHTML = "";
}
