//#1
//Check alle popstates og tilføj ved load for at have dynamisk url!

//#6 - dices

let allGames = []; // Declare allGames globally to access it in displayDrawer
let resultater = document.getElementById("results");
const locationData = document.getElementById("locationData");
const locationsForm = document.querySelector(".locationsForm");
const playersForm = document.querySelector(".playersForm");
const timeForm = document.querySelector(".timeForm");
const difficultyForm = document.querySelector(".difficultyForm");
const genreForm = document.querySelector(".genreForm");
const sortForm = document.querySelector(".sortForm");
const mainHolder = document.querySelector("main");

const radioInputs = document.querySelectorAll('input[type="radio"]');
        const underline = document.querySelector('.underline');
        
        function moveUnderline() {
            const checked = document.querySelector('input[type="radio"]:checked');
            const label = document.querySelector(`label[for="${checked.id}"]`);
            const container = document.querySelector('.radio-group');
            
            const labelRect = label.getBoundingClientRect();
            const containerRect = container.getBoundingClientRect();
            const leftPos = labelRect.left - containerRect.left;
            
            underline.style.width = labelRect.width + 'px';
            underline.style.transform = `translateX(${leftPos}px)`;
        }
        
        radioInputs.forEach(input => {
            input.addEventListener('change', moveUnderline);
        });
        
        // Initialize position
        moveUnderline();

async function getGames() {
  try {
    // console.log("🌐 Henter alle spil fra JSON...");
    const response = await fetch("./assets/games/games.json");

    if (!response.ok) {
      throw new Error(`HTTP ${response.status} ${response.statusText}`);
    }
    // console.log(`📊 JSON data modtaget: ${allGames.length} games`);

    allGames = await response.json();
    // populateGenreDropdown();
    // filterMovies();
    // console.log(allGames);

    displayGames(allGames);
  } catch (error) {
    console.error("❌ Kunne ikke hente games:", error);
    resultater.innerHTML =
      '<div class="game-list-empty"><p>🚨 Kunne ikke hente Games.</p></div>';
  } finally {
    console.log("first allGames in finally line 66");
  }
}

function closeShakeAndEnableMotion() {
  closeShakePopup();
  enableShakeDetection();
}

// #3: Render all movies in the grid
function displayGames(games) {
  resultater.innerHTML = "";

  if (!games.length) {
    resultater.insertAdjacentHTML(
      "beforeend",
      '<div class="game-list-empty"><p>Ingen spil matchede dine filtre...</p></div>'
    );
    return;
  }

  console.log(`🎬 Viser ${games.length} game`);
  document.getElementById(
    "chip-info"
  ).innerText = `${games.length} / ${allGames.length} spil`;

  for (const game of games) {
    displayGame(game);
  }
}

// #4: Render a single movie card
function displayGame(game) {
  const gameHTML = `
    <div class="card" onclick="displayDrawer(${game.id})">
	<div class="card__imageHolder">
		<div class="card__rating">
			<svg width="16" height="14" viewBox="0 0 8 7" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2.06919 6.79995L2.66502 4.35969L0.666687 2.71837L3.30669 2.50127L4.33335 0.199951L5.36002 2.50127L8.00002 2.71837L6.00169 4.35969L6.59752 6.79995L4.33335 5.506L2.06919 6.79995Z" fill="#F2CE17"/>
</svg>
            ${game.rating}

		</div>

		<img src="${game.image}" alt="billed af ${game.title}">
	</div>

	<h2>${game.title}</h2>

	<div class="card__info">
		<div class="card__infoTAG"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-users-icon lucide-users"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><path d="M16 3.128a4 4 0 0 1 0 7.744"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><circle cx="9" cy="7" r="4"/></svg> ${game.players.min}-${game.players.max}</div>
		<div class="card__infoTAG"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-clock-icon lucide-clock"><path d="M12 6v6l4 2"/><circle cx="12" cy="12" r="10"/></svg> ${game.playtime} m.</div>
    </div>
    </div>
    `;
  // <div class="card__infoTAG"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user-icon lucide-user"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> ${game.age}+</div>

  resultater.insertAdjacentHTML("beforeend", gameHTML);
}

getGames();
//filterGames()

let drawHolder = document.getElementById("drawHolder");

function addToFavorites(id) {
  console.log(`Tilføj til favoritter: Game ID ${id}`);
  localStorage.setItem(`favorite_game_${id}`, "true");
  console.log("Tilføjet til favoritter");
}

function displayDrawer(id) {
  console.log(id);

  // Find the game by id
  const game = allGames.find((game) => game.id === id);

  if (!game) {
    console.error(`Game with id ${id} not found.`);
    return;
  }

  //try dialog here now!!

  drawHolder.innerHTML = `
    <div class="overlay" id="overlay">
      <div class="overlay__header">
        <div class="close" onclick="closeDrawer()">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18 6L6 18" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M6 6L18 18" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </div>
        <div class="card__rating">
          <svg width="15" height="13" viewBox="0 0 8 7" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.06919 6.79995L2.66502 4.35969L0.666687 2.71837L3.30669 2.50127L4.33335 0.199951L5.36002 2.50127L8.00002 2.71837L6.00169 4.35969L6.59752 6.79995L4.33335 5.506L2.06919 6.79995Z" fill="#F2CE17"/></svg>
          ${game.rating}
        </div>
      </div>
      <div class="overlay__main">
        <div class="topInfo">
          <div class="gameinfo">
            <div>
              <div class="title"><h2>${game.title}</h2></div>
              <div class="shortDesc">${game.description}</div>
            </div>
          </div>
          <img src="${game.image}" alt="billede af ${game.title}">
        </div>
        <div class="info">
          <div class="boks">Type: <span>${game.genre}</span></div>
          <div class="boks">Sværhedsgrad: <span>
            ${renderRatingStars(
              game.difficulty === "Let"
                ? 2
                : game.difficulty === "Mellem"
                ? 4
                : 6
            )}
          </span></div>
          <div class="boks">Spilletid: <span>${game.playtime} min</span></div>
          <div class="boks">Antal spillere: <span>${game.players.min}-${
    game.players.max
  }</span></div>
          <div class="boks">Alder: <span>+${game.age}</span></div>
          <div class="boks">Hylde: <span>${game.shelf}</span></div>
        </div>
      </div>
      <div class="drawer" onclick="toggleDrawer()">
        <div class="drawHandle"></div>
        <p>${game.rules}</p>
      </div>
    </div>
  `;
  // Add overlay--active class after rendering for animation
  setTimeout(() => {
    const overlay = document.getElementById("overlay");
    if (overlay) overlay.classList.add("overlay--active");
  }, 10);
}

function toggleDrawer() {
  const drawer = document.querySelector(".drawer");
  if (drawer) drawer.classList.toggle("open");
}

function renderRatingStars(rating) {
  let starsHTML = '<div class="rating-dices">';

  starsHTML += `
  <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2.27778 0H14.7222C15.1937 0 15.6459 0.187301 15.9793 0.520699C16.3127 0.854097 16.5 1.30628 16.5 1.77778V14.2222C16.5 14.6937 16.3127 15.1459 15.9793 15.4793C15.6459 15.8127 15.1937 16 14.7222 16H2.27778C1.80628 16 1.3541 15.8127 1.0207 15.4793C0.687301 15.1459 0.5 14.6937 0.5 14.2222V1.77778C0.5 1.30628 0.687301 0.854097 1.0207 0.520699C1.3541 0.187301 1.80628 0 2.27778 0ZM8.5 6.22222C8.0285 6.22222 7.57632 6.40952 7.24292 6.74292C6.90952 7.07632 6.72222 7.5285 6.72222 8C6.72222 8.4715 6.90952 8.92368 7.24292 9.25708C7.57632 9.59048 8.0285 9.77778 8.5 9.77778C8.9715 9.77778 9.42368 9.59048 9.75708 9.25708C10.0905 8.92368 10.2778 8.4715 10.2778 8C10.2778 7.5285 10.0905 7.07632 9.75708 6.74292C9.42368 6.40952 8.9715 6.22222 8.5 6.22222Z" fill="${
      rating >= 1 ? "black" : "#9F9F9F"
    }"/>
  </svg>

<svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2.27778 0H14.7222C15.1937 0 15.6459 0.187301 15.9793 0.520699C16.3127 0.854097 16.5 1.30628 16.5 1.77778V14.2222C16.5 14.6937 16.3127 15.1459 15.9793 15.4793C15.6459 15.8127 15.1937 16 14.7222 16H2.27778C1.80628 16 1.3541 15.8127 1.0207 15.4793C0.687301 15.1459 0.5 14.6937 0.5 14.2222V1.77778C0.5 1.30628 0.687301 0.854097 1.0207 0.520699C1.3541 0.187301 1.80628 0 2.27778 0ZM4.05556 1.77778C3.58406 1.77778 3.13187 1.96508 2.79848 2.29848C2.46508 2.63187 2.27778 3.08406 2.27778 3.55556C2.27778 4.02705 2.46508 4.47924 2.79848 4.81263C3.13187 5.14603 3.58406 5.33333 4.05556 5.33333C4.52705 5.33333 4.97924 5.14603 5.31263 4.81263C5.64603 4.47924 5.83333 4.02705 5.83333 3.55556C5.83333 3.08406 5.64603 2.63187 5.31263 2.29848C4.97924 1.96508 4.52705 1.77778 4.05556 1.77778ZM12.9444 10.6667C12.4729 10.6667 12.0208 10.854 11.6874 11.1874C11.354 11.5208 11.1667 11.9729 11.1667 12.4444C11.1667 12.9159 11.354 13.3681 11.6874 13.7015C12.0208 14.0349 12.4729 14.2222 12.9444 14.2222C13.4159 14.2222 13.8681 14.0349 14.2015 13.7015C14.5349 13.3681 14.7222 12.9159 14.7222 12.4444C14.7222 11.9729 14.5349 11.5208 14.2015 11.1874C13.8681 10.854 13.4159 10.6667 12.9444 10.6667Z" fill="${
    rating >= 2 ? "black" : "#9F9F9F"
  }"/>
</svg>

<svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2.27778 0H14.7222C15.1937 0 15.6459 0.187301 15.9793 0.520699C16.3127 0.854097 16.5 1.30628 16.5 1.77778V14.2222C16.5 14.6937 16.3127 15.1459 15.9793 15.4793C15.6459 15.8127 15.1937 16 14.7222 16H2.27778C1.80628 16 1.3541 15.8127 1.0207 15.4793C0.687301 15.1459 0.5 14.6937 0.5 14.2222V1.77778C0.5 1.30628 0.687301 0.854097 1.0207 0.520699C1.3541 0.187301 1.80628 0 2.27778 0ZM8.5 6.22222C8.0285 6.22222 7.57632 6.40952 7.24292 6.74292C6.90952 7.07632 6.72222 7.5285 6.72222 8C6.72222 8.4715 6.90952 8.92368 7.24292 9.25708C7.57632 9.59048 8.0285 9.77778 8.5 9.77778C8.9715 9.77778 9.42368 9.59048 9.75708 9.25708C10.0905 8.92368 10.2778 8.4715 10.2778 8C10.2778 7.5285 10.0905 7.07632 9.75708 6.74292C9.42368 6.40952 8.9715 6.22222 8.5 6.22222ZM4.05556 1.77778C3.58406 1.77778 3.13187 1.96508 2.79848 2.29848C2.46508 2.63187 2.27778 3.08406 2.27778 3.55556C2.27778 4.02705 2.46508 4.47924 2.79848 4.81263C3.13187 5.14603 3.58406 5.33333 4.05556 5.33333C4.52705 5.33333 4.97924 5.14603 5.31263 4.81263C5.64603 4.47924 5.83333 4.02705 5.83333 3.55556C5.83333 3.08406 5.64603 2.63187 5.31263 2.29848C4.97924 1.96508 4.52705 1.77778 4.05556 1.77778ZM12.9444 10.6667C12.4729 10.6667 12.0208 10.854 11.6874 11.1874C11.354 11.5208 11.1667 11.9729 11.1667 12.4444C11.1667 12.9159 11.354 13.3681 11.6874 13.7015C12.0208 14.0349 12.4729 14.2222 12.9444 14.2222C13.4159 14.2222 13.8681 14.0349 14.2015 13.7015C14.5349 13.3681 14.7222 12.9159 14.7222 12.4444C14.7222 11.9729 14.5349 11.5208 14.2015 11.1874C13.8681 10.854 13.4159 10.6667 12.9444 10.6667Z" fill="${
    rating >= 3 ? "black" : "#9F9F9F"
  }"/>
</svg>


<svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2.27778 0H14.7222C15.1937 0 15.6459 0.187301 15.9793 0.520699C16.3127 0.854097 16.5 1.30628 16.5 1.77778V14.2222C16.5 14.6937 16.3127 15.1459 15.9793 15.4793C15.6459 15.8127 15.1937 16 14.7222 16H2.27778C1.80628 16 1.3541 15.8127 1.0207 15.4793C0.687301 15.1459 0.5 14.6937 0.5 14.2222V1.77778C0.5 1.30628 0.687301 0.854097 1.0207 0.520699C1.3541 0.187301 1.80628 0 2.27778 0ZM4.05556 1.77778C3.58406 1.77778 3.13187 1.96508 2.79848 2.29848C2.46508 2.63187 2.27778 3.08406 2.27778 3.55556C2.27778 4.02705 2.46508 4.47924 2.79848 4.81263C3.13187 5.14603 3.58406 5.33333 4.05556 5.33333C4.52705 5.33333 4.97924 5.14603 5.31263 4.81263C5.64603 4.47924 5.83333 4.02705 5.83333 3.55556C5.83333 3.08406 5.64603 2.63187 5.31263 2.29848C4.97924 1.96508 4.52705 1.77778 4.05556 1.77778ZM12.9444 10.6667C12.4729 10.6667 12.0208 10.854 11.6874 11.1874C11.354 11.5208 11.1667 11.9729 11.1667 12.4444C11.1667 12.9159 11.354 13.3681 11.6874 13.7015C12.0208 14.0349 12.4729 14.2222 12.9444 14.2222C13.4159 14.2222 13.8681 14.0349 14.2015 13.7015C14.5349 13.3681 14.7222 12.9159 14.7222 12.4444C14.7222 11.9729 14.5349 11.5208 14.2015 11.1874C13.8681 10.854 13.4159 10.6667 12.9444 10.6667ZM12.9444 1.77778C12.4729 1.77778 12.0208 1.96508 11.6874 2.29848C11.354 2.63187 11.1667 3.08406 11.1667 3.55556C11.1667 4.02705 11.354 4.47924 11.6874 4.81263C12.0208 5.14603 12.4729 5.33333 12.9444 5.33333C13.4159 5.33333 13.8681 5.14603 14.2015 4.81263C14.5349 4.47924 14.7222 4.02705 14.7222 3.55556C14.7222 3.08406 14.5349 2.63187 14.2015 2.29848C13.8681 1.96508 13.4159 1.77778 12.9444 1.77778ZM4.05556 10.6667C3.58406 10.6667 3.13187 10.854 2.79848 11.1874C2.46508 11.5208 2.27778 11.9729 2.27778 12.4444C2.27778 12.9159 2.46508 13.3681 2.79848 13.7015C3.13187 14.0349 3.58406 14.2222 4.05556 14.2222C4.52705 14.2222 4.97924 14.0349 5.31263 13.7015C5.64603 13.3681 5.83333 12.9159 5.83333 12.4444C5.83333 11.9729 5.64603 11.5208 5.31263 11.1874C4.97924 10.854 4.52705 10.6667 4.05556 10.6667Z" fill="${
    rating >= 4 ? "black" : "#9F9F9F"
  }"/>
</svg>


<svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2.27778 0H14.7222C15.1937 0 15.6459 0.187301 15.9793 0.520699C16.3127 0.854097 16.5 1.30628 16.5 1.77778V14.2222C16.5 14.6937 16.3127 15.1459 15.9793 15.4793C15.6459 15.8127 15.1937 16 14.7222 16H2.27778C1.80628 16 1.3541 15.8127 1.0207 15.4793C0.687301 15.1459 0.5 14.6937 0.5 14.2222V1.77778C0.5 1.30628 0.687301 0.854097 1.0207 0.520699C1.3541 0.187301 1.80628 0 2.27778 0ZM4.05556 1.77778C3.58406 1.77778 3.13187 1.96508 2.79848 2.29848C2.46508 2.63187 2.27778 3.08406 2.27778 3.55556C2.27778 4.02705 2.46508 4.47924 2.79848 4.81263C3.13187 5.14603 3.58406 5.33333 4.05556 5.33333C4.52705 5.33333 4.97924 5.14603 5.31263 4.81263C5.64603 4.47924 5.83333 4.02705 5.83333 3.55556C5.83333 3.08406 5.64603 2.63187 5.31263 2.29848C4.97924 1.96508 4.52705 1.77778 4.05556 1.77778ZM12.9444 10.6667C12.4729 10.6667 12.0208 10.854 11.6874 11.1874C11.354 11.5208 11.1667 11.9729 11.1667 12.4444C11.1667 12.9159 11.354 13.3681 11.6874 13.7015C12.0208 14.0349 12.4729 14.2222 12.9444 14.2222C13.4159 14.2222 13.8681 14.0349 14.2015 13.7015C14.5349 13.3681 14.7222 12.9159 14.7222 12.4444C14.7222 11.9729 14.5349 11.5208 14.2015 11.1874C13.8681 10.854 13.4159 10.6667 12.9444 10.6667ZM12.9444 1.77778C12.4729 1.77778 12.0208 1.96508 11.6874 2.29848C11.354 2.63187 11.1667 3.08406 11.1667 3.55556C11.1667 4.02705 11.354 4.47924 11.6874 4.81263C12.0208 5.14603 12.4729 5.33333 12.9444 5.33333C13.4159 5.33333 13.8681 5.14603 14.2015 4.81263C14.5349 4.47924 14.7222 4.02705 14.7222 3.55556C14.7222 3.08406 14.5349 2.63187 14.2015 2.29848C13.8681 1.96508 13.4159 1.77778 12.9444 1.77778ZM8.5 6.22222C8.0285 6.22222 7.57632 6.40952 7.24292 6.74292C6.90952 7.07632 6.72222 7.5285 6.72222 8C6.72222 8.4715 6.90952 8.92368 7.24292 9.25708C7.57632 9.59048 8.0285 9.77778 8.5 9.77778C8.9715 9.77778 9.42368 9.59048 9.75708 9.25708C10.0905 8.92368 10.2778 8.4715 10.2778 8C10.2778 7.5285 10.0905 7.07632 9.75708 6.74292C9.42368 6.40952 8.9715 6.22222 8.5 6.22222ZM4.05556 10.6667C3.58406 10.6667 3.13187 10.854 2.79848 11.1874C2.46508 11.5208 2.27778 11.9729 2.27778 12.4444C2.27778 12.9159 2.46508 13.3681 2.79848 13.7015C3.13187 14.0349 3.58406 14.2222 4.05556 14.2222C4.52705 14.2222 4.97924 14.0349 5.31263 13.7015C5.64603 13.3681 5.83333 12.9159 5.83333 12.4444C5.83333 11.9729 5.64603 11.5208 5.31263 11.1874C4.97924 10.854 4.52705 10.6667 4.05556 10.6667Z" fill="${
    rating >= 5 ? "black" : "#9F9F9F"
  }"/>
</svg>


<svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2.27778 0H14.7222C15.1937 0 15.6459 0.187301 15.9793 0.520699C16.3127 0.854097 16.5 1.30628 16.5 1.77778V14.2222C16.5 14.6937 16.3127 15.1459 15.9793 15.4793C15.6459 15.8127 15.1937 16 14.7222 16H2.27778C1.80628 16 1.3541 15.8127 1.0207 15.4793C0.687301 15.1459 0.5 14.6937 0.5 14.2222V1.77778C0.5 1.30628 0.687301 0.854097 1.0207 0.520699C1.3541 0.187301 1.80628 0 2.27778 0ZM4.05556 1.77778C3.58406 1.77778 3.13187 1.96508 2.79848 2.29848C2.46508 2.63187 2.27778 3.08406 2.27778 3.55556C2.27778 4.02705 2.46508 4.47924 2.79848 4.81263C3.13187 5.14603 3.58406 5.33333 4.05556 5.33333C4.52705 5.33333 4.97924 5.14603 5.31263 4.81263C5.64603 4.47924 5.83333 4.02705 5.83333 3.55556C5.83333 3.08406 5.64603 2.63187 5.31263 2.29848C4.97924 1.96508 4.52705 1.77778 4.05556 1.77778ZM12.9444 10.6667C12.4729 10.6667 12.0208 10.854 11.6874 11.1874C11.354 11.5208 11.1667 11.9729 11.1667 12.4444C11.1667 12.9159 11.354 13.3681 11.6874 13.7015C12.0208 14.0349 12.4729 14.2222 12.9444 14.2222C13.4159 14.2222 13.8681 14.0349 14.2015 13.7015C14.5349 13.3681 14.7222 12.9159 14.7222 12.4444C14.7222 11.9729 14.5349 11.5208 14.2015 11.1874C13.8681 10.854 13.4159 10.6667 12.9444 10.6667ZM12.9444 6.22222C12.4729 6.22222 12.0208 6.40952 11.6874 6.74292C11.354 7.07632 11.1667 7.5285 11.1667 8C11.1667 8.4715 11.354 8.92368 11.6874 9.25708C12.0208 9.59048 12.4729 9.77778 12.9444 9.77778C13.4159 9.77778 13.8681 9.59048 14.2015 9.25708C14.5349 8.92368 14.7222 8.4715 14.7222 8C14.7222 7.5285 14.5349 7.07632 14.2015 6.74292C13.8681 6.40952 13.4159 6.22222 12.9444 6.22222ZM12.9444 1.77778C12.4729 1.77778 12.0208 1.96508 11.6874 2.29848C11.354 2.63187 11.1667 3.08406 11.1667 3.55556C11.1667 4.02705 11.354 4.47924 11.6874 4.81263C12.0208 5.14603 12.4729 5.33333 12.9444 5.33333C13.4159 5.33333 13.8681 5.14603 14.2015 4.81263C14.5349 4.47924 14.7222 4.02705 14.7222 3.55556C14.7222 3.08406 14.5349 2.63187 14.2015 2.29848C13.8681 1.96508 13.4159 1.77778 12.9444 1.77778ZM4.05556 6.22222C3.58406 6.22222 3.13187 6.40952 2.79848 6.74292C2.46508 7.07632 2.27778 7.5285 2.27778 8C2.27778 8.4715 2.46508 8.92368 2.79848 9.25708C3.13187 9.59048 3.58406 9.77778 4.05556 9.77778C4.52705 9.77778 4.97924 9.59048 5.31263 9.25708C5.64603 8.92368 5.83333 8.4715 5.83333 8C5.83333 7.5285 5.64603 7.07632 5.31263 6.74292C4.97924 6.40952 4.52705 6.22222 4.05556 6.22222ZM4.05556 10.6667C3.58406 10.6667 3.13187 10.854 2.79848 11.1874C2.46508 11.5208 2.27778 11.9729 2.27778 12.4444C2.27778 12.9159 2.46508 13.3681 2.79848 13.7015C3.13187 14.0349 3.58406 14.2222 4.05556 14.2222C4.52705 14.2222 4.97924 14.0349 5.31263 13.7015C5.64603 13.3681 5.83333 12.9159 5.83333 12.4444C5.83333 11.9729 5.64603 11.5208 5.31263 11.1874C4.97924 10.854 4.52705 10.6667 4.05556 10.6667Z" fill="${
    rating >= 6 ? "black" : "#9F9F9F"
  }"/>
</svg>

`;

  starsHTML += "</div>";

  return starsHTML;
}

function closeDrawer() {
  console.log("closeDrawer");
  const overlay = document.getElementById("overlay");
  if (overlay) {
    overlay.classList.remove("overlay--active");
    // Remove overlay from DOM after transition
    setTimeout(() => {
      if (overlay.parentNode) overlay.parentNode.innerHTML = "";
    }, 400); // match CSS transition duration
  }
}

function filterGames() {
  let filteredGames = [...allGames];

  Object.keys(selected).forEach((filter) => {
    const value = selected[filter];
    if (!value) return;

    switch (filter) {
      case "sort":
        // Apply sort based on the sort value
        switch (value) {
          case "A-Z":
            filteredGames.sort((a, b) => a.title.localeCompare(b.title));
            break;
          case "Z-A":
            filteredGames.sort((a, b) => b.title.localeCompare(a.title));
            break;
          case "Rating":
            filteredGames.sort((a, b) => b.rating - a.rating);
            break;
          case "År":
            // Sort by year (assuming there's a year property or using release year)
            filteredGames.sort((a, b) => (b.year || 0) - (a.year || 0));
            break;
        }
        break;
      case "genre": {
        const genre = Array.isArray(value) ? value : [value];

        filteredGames = filteredGames.filter((game) =>
          genre.includes(game.genre)
        );
        break;
      }

      case "difficulty":
        filteredGames = filteredGames.filter(
          (game) => game.difficulty === value
        );
        break;
      case "players":
        const players = Number(value);
        filteredGames = filteredGames.filter(
          (game) => game.players.min <= players && game.players.max >= players
        );
        break;
      case "time":
        const time = parseInt(value, 10);
        filteredGames = filteredGames.filter((game) => game.playtime <= time);
        break;
      case "search":
        const searchTerm = value.toLowerCase();
        filteredGames = filteredGames.filter((game) =>
          game.title.toLowerCase().includes(searchTerm)
        );
        break;
      case "location":
        filteredGames = filteredGames.filter((game) => game.location === value);
        break;
    }
  });

  //ADD TO SWITCH POPULARITY

  /*
  case "popularity" allGames where in localstorage and array? :)
  */

  displayGames(filteredGames);
}

function renderSubChips(filter) {
  //   console.log("Rendering sub-chips for filter:", filter);
  //   console.log("Available options:", filters[filter]);

  // const activeChip = document.querySelector(`.chip[data-filter="${filter}"]`);
  // const chipRect = activeChip.getBoundingClientRect();

  hideAllSubForms();

  if (filter === "location" && locationsForm) {
    locationsForm.style.display = "flex";
    console.log("[DEBUG] Opening location filter. window.map exists?", !!window.map);
    // If map hasn't been created yet, initialize it lazily. Otherwise invalidate size.
    if (!window.map && typeof window.makeMap === "function") {
      console.log("[DEBUG] Initializing map lazily...");
      // default center for init (Aarhus-ish)
      window.makeMap(56.4, 10.203921, 13);
      // give Leaflet a moment to render tiles
      setTimeout(() => {
        if (window.map && typeof window.map.invalidateSize === "function") {
          console.log("[DEBUG] Calling invalidateSize after init");
          window.map.invalidateSize();
        }
      }, 200);
    } else if (window.map && typeof window.map.invalidateSize === "function") {
      console.log("[DEBUG] Map exists, calling invalidateSize");
      setTimeout(() => window.map.invalidateSize(), 100);
    } else {
      console.log("[DEBUG] Map not found and makeMap not available!");
    }
  }

if (!filters[filter] && filter !== "location") {
  subChipsContainer.style.display = "none";
  return;
}

  if (filter == "players") {
    playersForm.style.height = "flex";
  } else {
    playersForm.style.height = "0px";
  }

  if (filter == "difficulty") {
    difficultyForm.style.display = "flex";
  } else {
    difficultyForm.style.height = "0px";
  }

  if (filter == "time") {
    timeForm.style.display = "flex";
  } else {
    timeForm.style.height = "0px";
  }

  if (filter == "genre") {
    genreForm.style.display = "flex";
  } else {
    genreForm.style.height = "0px";
  }

  if (filter == "sort") {
    sortForm.style.display = "flex";
  } else {
    sortForm.style.height = "0px";
  }

  // subChipsContainer.style.display = "flex";
  // subChipsContainer.style.position = "absolute";
  // subChipsContainer.style.top = `${chipRect.bottom + window.scrollY}px`;
  // subChipsContainer.style.left = `${chipRect.left + window.scrollX + 40}px`;

  // subChipsContainer.innerHTML = filters[filter]
  //   .map(
  //     (opt) => `
  //     <div 
  //       class="sub-chip ${selected[filter] === opt ? "active" : ""}" 
  //       data-option="${opt}"
  //     >${opt}</div>
  //   `
  //   )
  //   .join("");

  // // Add listener for sub-chip clicks
  // subChipsContainer.onclick = (e) => {
  //   const opt = e.target.closest(".sub-chip");
  //   if (!opt) return;
  //   selected[filter] = opt.dataset.option;
  //   console.log("Selected option:", selected[filter]);
  //   renderSubChips(filter);

  //   // Optionally sync with URL
  //   const params = new URLSearchParams(selected);
  //   history.replaceState({}, "", "?" + params.toString());

  //   // Trigger filtering
  //   filterGames();
  //   updateSelectedChips();
  //   subChipsContainer.style.display = "none";
  // };
}

const filters = {
  players: ["2", "4", "6", "8", "10"],
  genre: ["Familiespil", "Quiz", "Strategi", "Terninger", "Kortspil"],
  difficulty: ["Let", "Mellem", "Svær"],
  time: ["20 min.", "30 min.", "60 min.", "120 min."],
  sort: ["A-Z", "Z-A", "År", "Rating"],
  // location: [
  //   "Vestergade",
  //   "Fredensgade",
  //   "Aalborg",
  //   "Kolding",
  //   "auto",
  //   "other",
  // ],
};

let activeFilter = null;
let selected = {};

const filtersContainer = document.querySelector(".filters");
const subChipsContainer = document.querySelector(".sub-filters");
const subFiltersUnder = document.querySelector(".sub-filters-under");

filtersContainer.addEventListener("click", (e) => {
  const chip = e.target.closest(".chip");
  if (!chip) return;

  const filter = chip.dataset.filter;

  // remove active from all filter chips first (so only the opened one is active)
  filtersContainer.querySelectorAll(".chip").forEach((c) => c.classList.remove("active"));

  if (activeFilter === filter) {
    activeFilter = null;
    hideAllSubForms();
    return;
  }

  activeFilter = filter;
  chip.classList.add("active"); // mark the opened chip as active
  renderSubChips(filter);
});

function hideAllSubForms() {
  if (locationsForm) locationsForm.style.display = "none";
  if (playersForm) playersForm.style.display = "none";
  if (difficultyForm) difficultyForm.style.display = "none";
  if (timeForm) timeForm.style.display = "none";
  if (genreForm) genreForm.style.display = "none";
  if (sortForm) sortForm.style.display = "none";

  // also clear active state from filter chips when hiding
  // if (filtersContainer) {
  //   filtersContainer.querySelectorAll(".chip").forEach((c) => c.classList.remove("active"));
  // }
}



playersForm.addEventListener("change", (e) => {
  const input = e.target;
  if (input.name !== "players") return;

  const players = Number(input.value);

  // State
  selected.players = players;

  // URL
  const params = new URLSearchParams(selected);
  history.replaceState({}, "", "?" + params.toString());

  // Filter
  filterGames();
});

timeForm.addEventListener("change", (e) => {
  if (e.target.name !== "time") return;

  selected.time = Number(e.target.value);

  const params = new URLSearchParams(selected);
  history.replaceState({}, "", "?" + params.toString());

  filterGames();
});

difficultyForm.addEventListener("change", (e) => {
  if (e.target.name !== "difficulty") return;

  selected.difficulty = e.target.value;

  const params = new URLSearchParams(selected);
  history.replaceState({}, "", "?" + params.toString());

  filterGames();
});

genreForm.addEventListener("click", (e) => {
  const chip = e.target.closest(".chip");
  if (!chip) return;

  const genre = chip.dataset.genre;

  // Init
  if (!Array.isArray(selected.genre)) {
    selected.genre = [];
  }

  // Toggle
  if (selected.genre.includes(genre)) {
    selected.genre = selected.genre.filter(g => g !== genre);
    chip.classList.remove("active");
  } else {
    selected.genre.push(genre);
    chip.classList.add("active");
  }

  // URL
  const params = new URLSearchParams(selected);
  params.set("genre", selected.genre.join(","));
  history.replaceState({}, "", "?" + params.toString());

  filterGames();
  //updateSelectedChips();
});

sortForm.addEventListener("click", e => {
  const chip = e.target.closest(".chip");
  if (!chip) return;

  const sort = chip.dataset.sort;
  //const sort = chip.dataset.option;


  selected.sort = sort;

  sortForm.querySelectorAll(".chip")
    .forEach(c => c.classList.remove("active"));

  chip.classList.add("active");

  const params = new URLSearchParams(selected);
  history.replaceState({}, "", "?" + params.toString());

  filterGames();
});


function addSelectedChip(contextStore, filter, option) {
  const chipHTML = `
    <div class="sub-chip" data-option="${option}">
      ${filter}: ${option}
      <button class="remove-chip" onclick="removeChip('${contextStore}', '${filter}')">
        <img src="./assets/img/close-icon.svg" alt="Remove" width="16" height="16">
      </button>
    </div>
  `;
  subChipsContainer.insertAdjacentHTML("beforeend", chipHTML);
}

function removeChip(contextStore, filter) {
  contextStore[filter] = null;
  document.querySelectorAll(`.sub-chip[data-option]`).forEach((chip) => {
    if (chip.dataset.option === contextStore[filter]) {
      chip.remove();
    }
  });
}

function updateSelectedChips() {
  const selectedChipsContainer = document.querySelector(".selected-chips");
  selectedChipsContainer.innerHTML = "";

  Object.keys(selected).forEach((filter) => {
    const value = selected[filter];
    if (!value) return;

    const chipHTML = `
      <div class="selected-chip" data-filter="${filter}" data-option="${value}">
        ${filter}: ${value}
        <div class="remove-chip" onclick="removeChip('${filter}')">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-x-icon lucide-circle-x"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>
        </div>
      </div>
    `;
    selectedChipsContainer.insertAdjacentHTML("beforeend", chipHTML);
  });
}

function removeChip(filter) {
  delete selected[filter];
  //updateSelectedChips();
  filterGames();

  // Update URL parameters
  const params = new URLSearchParams(selected);
  history.replaceState({}, "", "?" + params.toString());
}

/* 
Hej kære lærer, kom i også så dybt ned i koden?
Sig skål til en af os (Simon, Mathilde, Oliver eller Jacob)
Så udløser i en øl i basement, fordi i fandt vores easter egg!
*/
function shakeItToTheMax() {
  console.log("Shake it to the max!");

  closeShakePopup();

  function playSound() {
    const audio = new Audio("./assets/audio/shake.mp3");
    audio.play();

    navigator.vibrate(100);
    navigator.vibrate(400);
    navigator.vibrate(200);
  }
  playSound();

  // Add shake animation
  document.body.classList.add("shake");
  setTimeout(() => {
    document.body.classList.remove("shake");
  }, 2000);
}

function closeShakePopup() {
  const popup = document.getElementById("shakePopup");
  popup.style.display = "none";
}

function openShakePopup() {
  const popup = document.getElementById("shakePopup");
  popup.style.display = "flex";
}

window.addEventListener("popstate", () => {
  // So there most be one for pushstate, a listener too ahhh.. :D Or another way to make url query work.

  const params = new URLSearchParams(window.location.search);
  const contextStore = {};

  // Update contextStore based on URL parameters
  params.forEach((value, key) => {
    contextStore[key] = value;
  });

  // Apply filtering based on updated contextStore
  let filteredGames = [...allGames];

  if (contextStore.genre) {
    const genre = contextStore.genre.split(",");
    selected.genre = genre;

    document.querySelectorAll(".genreForm .chip").forEach((chip) => {
      chip.classList.toggle("active", genre.includes(chip.dataset.genre));
    });
  }

  if (contextStore.difficulty) {
    filteredGames = filteredGames.filter(
      (game) => game.difficulty === contextStore.difficulty
    );
  }

  if (contextStore.players) {
    const players = Number(contextStore.players);
    filteredGames = filteredGames.filter(
      (game) => game.players.min <= players && game.players.max >= players
    );
  }

  if (contextStore.time) {
    const time = parseInt(contextStore.time, 10);
    filteredGames = filteredGames.filter((game) => game.playtime <= time);
  }

  if (contextStore.search) {
    const searchTerm = contextStore.search.toLowerCase();
    filteredGames = filteredGames.filter((game) =>
      game.title.toLowerCase().includes(searchTerm)
    );
  }

  if (contextStore.location) {
    filteredGames = filteredGames.filter(
      (game) => game.location === contextStore.location
    );
  }

  if (contextStore.location) {
    flyToLocation(contextStore.location);
  }

  displayGames(filteredGames);
});

document.body.insertAdjacentHTML(
  "beforeend",
  `
  <div id="overlay" style="display:none;">
    <div class="game-card" id="gameCard"></div>
  </div>
  <canvas id="confettiCanvas" style="position:fixed; inset:0; pointer-events:none; z-index:10000;"></canvas>
`
);

let lastX = 0,
  lastY = 0,
  lastZ = 0;
let lastUpdate = 0;
let lastShake = 0;
const SHAKE_THRESHOLD = 700;
const COOLDOWN = 1000;

window.handleMotion = function handleMotion(e) {
  const acc = e.accelerationIncludingGravity;
  if (!acc) return;

  const curTime = Date.now();

  if (curTime - lastUpdate > 100) {
    const diffTime = curTime - lastUpdate;
    lastUpdate = curTime;

    const { x, y, z } = acc;
    const speed =
      (Math.abs(x + y + z - lastX - lastY - lastZ) / diffTime) * 10000;

    // console.log(`📈 x=${x.toFixed(2)}, y=${y.toFixed(2)}, z=${z.toFixed(2)} ⚡ speed=${speed.toFixed(1)}`);

    if (speed > SHAKE_THRESHOLD && curTime - lastShake > COOLDOWN) {
      if (!allGames.length) {
        console.warn("⚠️ No games loaded yet — ignoring shake");
        return;
      }

      lastShake = curTime;
      // console.log("💥 SHAKE DETECTED! speed:", speed);

      const randomGame = allGames[Math.floor(Math.random() * allGames.length)];

      // alert("Shake triggered!"); // quick test
      shakeItToTheMax();
      startConfetti();
      displayDrawer(randomGame.id);
    }

    lastX = x;
    lastY = y;
    lastZ = z;
  }
};

function testForIphone() {
  // For testing on iPhone Safari
  closeShakePopup();

  const randomGame2 = allGames[Math.floor(Math.random() * allGames.length)];

  // alert("Shake triggered!"); // quick test
  shakeItToTheMax();
  startConfetti();
  displayDrawer(randomGame2.id);
}

function showGame(game) {
  const overlay = document.getElementById("overlay");
  const card = document.getElementById("gameCard");

  card.innerHTML = `
    <button class="close">&times;</button>
    <div class="rating">⭐ ${game.rating}</div>
    <img class="game-img" src="${game.image}" alt="${game.title}">
    <h2>${game.title.toUpperCase()}</h2>
    <p class="desc">${game.description}</p>
    <div class="grid">
      <div><strong>Type:</strong> ${game.genre}</div>
      <div><strong>Sværhedsgrad:</strong> ${game.difficulty}</div>
      <div><strong>Spilletid:</strong> ${game.playtime} min</div>
      <div><strong>Antal spillere:</strong> ${game.players.min}–${
    game.players.max
  }</div>
      <div><strong>Alder:</strong> +${game.age}</div>
      <div><strong>Hylde:</strong> ${game.shelf}</div>
    </div>
    <h3>Regler:</h3>
    <p class="rules">${game.rules}</p>
  `;

  overlay.style.display = "flex";
  card.querySelector(".close").onclick = () => (overlay.style.display = "none");
}

document.addEventListener("click", (e) => {
  const overlay = document.getElementById("overlay");
  if (e.target === overlay) overlay.style.display = "none";
});

// Only attach devicemotion after permission is granted (for iOS)
function enableShakeDetection() {
  console.log("🔧 Attempting to enable shake detection...");
  window.removeEventListener("devicemotion", handleMotion);

  // 🔍 Check if iOS with permission requirement
  if (
    typeof DeviceMotionEvent !== "undefined" &&
    typeof DeviceMotionEvent.requestPermission === "function"
  ) {
    console.log("🍏 iOS detected — requesting motion permission...");
    DeviceMotionEvent.requestPermission()
      .then((response) => {
        console.log("📱 Motion permission response:", response);
        if (response === "granted") {
          console.log(
            "✅ Permission granted — adding devicemotion listener..."
          );
          window.addEventListener("devicemotion", handleMotion, true);
          console.log("🟢 Listener attached successfully on iOS!");
        } else {
          alert("⚠️ Du skal give tilladelse til bevægelse for at ryste!");
        }
      })
      .catch((err) => {
        console.error("❌ Motion permission request failed:", err);
      });
  } else {
    // ✅ Android, desktop, etc.
    console.log("🤖 Non-iOS device — adding listener directly...");
    window.addEventListener("devicemotion", handleMotion, true);
    console.log("🟢 Listener attached successfully (non-iOS)!");
  }
}

function closeShakeAndEnableMotion() {
  closeShakePopup();
  // Call directly from the button click (user gesture!)
  enableShakeDetection();
}

// 🎉 Confetti effect — now in front of everything
function startConfetti() {
  const canvas = document.getElementById("confettiCanvas");
  const ctx = canvas.getContext("2d");
  const W = (canvas.width = window.innerWidth);
  const H = (canvas.height = window.innerHeight);

  const pieces = [];
  const colors = ["#ff0", "#f0f", "#0ff", "#f55", "#5f5", "#55f"];

  for (let i = 0; i < 777; i++) {
    pieces.push({
      x: Math.random() * W,
      y: (Math.random() * -H) / 2,
      w: 1 + Math.random() * 6,
      h: 1 + Math.random() * 6,
      color: colors[Math.floor(Math.random() * colors.length)],
      speed: 2 + Math.random() * 4,
      tilt: Math.random() * 10,
    });
  }

  let duration = 7000;
  let start = null;

  function drawConfetti(ts) {
    if (!start) start = ts;
    const progress = ts - start;
    ctx.clearRect(0, 0, W, H);

    pieces.forEach((p) => {
      p.y += p.speed;
      p.x += Math.sin(p.tilt / 10);
      p.tilt += 0.5;
      ctx.fillStyle = p.color;
      ctx.fillRect(p.x, p.y, p.w, p.h);
    });

    if (progress < duration) {
      requestAnimationFrame(drawConfetti);
    } else {
      ctx.clearRect(0, 0, W, H);
    }
  }

  requestAnimationFrame(drawConfetti);
}

document.getElementById("searchInput").addEventListener("input", (e) => {
  console.log("first");
  selected.search = e.target.value;

  // Pause all currently playing audios if not matching
  const audios = document.querySelectorAll("audio");
  audios.forEach((a) => {
    if (
      (e.target.value.toLowerCase() !== "maui" && a.src.includes("maui.mp3")) ||
      (e.target.value.toLowerCase() !== "spaces" &&
        a.src.includes("spaces.mp3")) ||
      (e.target.value.toLowerCase() !== "shake" &&
        a.src.includes("shakeittothemax.mp3"))
    ) {
      a.pause();
      a.currentTime = 0;
    }
  });

  if (e.target.value.toLowerCase() == "maui") {
    const audio = new Audio("./assets/audio/maui.mp3");
    audio.play();
    document.body.appendChild(audio);
  }

  if (e.target.value.toLowerCase() == "spaces") {
    const audio = new Audio("./assets/audio/spaces.mp3");
    audio.play();
    document.body.appendChild(audio);
  }

  if (e.target.value.toLowerCase() == "shake") {
    const audio = new Audio("./assets/audio/shakeittothemax.mp3");
    audio.play();
    document.body.appendChild(audio);
  }

  //plads til en sang mere??? :D

  filterGames();
});

// document.getElementById("locationButton").addEventListener("click", () => {
//   const dropdown = document.getElementById("locationDropdown");
//   dropdown.style.display = dropdown.style.display === "none" ? "block" : "none";
// });

// Add event listener for dropdown items
// const locationDropdown = document.getElementById("locationDropdown");
// locationDropdown.addEventListener("click", (e) => {
//   const item = e.target.closest(".dropdown-item");

//   if (!item) return;

//   if (item == "all") return; //then none is choosen so give all locations

//   const location = item.dataset.location;
//   selected.location = location;

//   // If "auto" is selected, request GPS permission
//   if (location === "auto") {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition((position) => {
//         const { latitude, longitude } = position.coords;
//         console.log("User's location:", latitude, longitude);

//         const locations = [
//           { name: "Aalborg", lat: 57.0488, lon: 9.9217 },
//           { name: "Vestergade", lat: 56.162939, lon: 10.203921 },
//           { name: "Fredensgade", lat: 56.162939, lon: 10.203921 },
//           { name: "Kolding", lat: 55.4904, lon: 9.4722 },
//         ];

//         let closestLocation = locations[0];
//         let minDistance = Number.MAX_VALUE;

//         locations.forEach((loc) => {
//           const distance = Math.sqrt(
//             Math.pow(latitude - loc.lat, 2) + Math.pow(longitude - loc.lon, 2)
//           );
//           if (distance < minDistance) {
//             minDistance = distance;
//             closestLocation = loc;
//           }
//         });

//         selected.location = closestLocation.name;
//         console.log("Closest location:", selected.location);
//         filterGames();
//       });
//     } else {
//       console.error("Geolocation is not supported by this browser.");
//     }
//   } else {
//     filterGames();
//   }

//   // Hide dropdown after selection
//   locationDropdown.style.display = "none";
// });
const locationCoords = {
  "aarhus-fredensgade": { lat: 56.16294, lng: 10.20392, zoom: 15 },
  "aarhus-vestergade": { lat: 56.1589, lng: 10.2046, zoom: 15 },
  odense: { lat: 55.4038, lng: 10.4024, zoom: 13 },
  kolding: { lat: 55.4904, lng: 9.4722, zoom: 13 },
  aalborg: { lat: 57.0488, lng: 9.9217, zoom: 13 },
  alle: { lat: 56.4, lng: 10.2039, zoom: 6 },  
};


function flyToLocation(locationKey) {
  const loc = locationCoords[locationKey];
  locationData.innerText = locationKey
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

  if (!loc) return;

  // If map not ready yet, retry shortly (handles mobile load/timing differences)
  if (!window.map) {
    console.warn("Map not ready yet — retrying flyTo in 300ms");
    setTimeout(() => flyToLocation(locationKey), 300);
    return;
  }

  // Ensure map size is recalculated (fixes mobile / hidden-container issues)
  if (typeof map.invalidateSize === "function") {
    // small delay lets layout settle on mobile before invalidating
    setTimeout(() => map.invalidateSize(), 120);
  }

  map.flyTo([loc.lat, loc.lng], loc.zoom, {
    animate: true,
    duration: 2,
    keepBuffer: 6,        // more tiles outside view
    updateWhenIdle: false,
    updateWhenZooming: false
  });

  
}
// ...existing code...
// keep map responsive on orientation change
window.addEventListener("orientationchange", () => {
  if (window.map && typeof map.invalidateSize === "function") {
    setTimeout(() => map.invalidateSize(), 250);
  }
});

// #1 LOCATION FILTER + MAP FLY
locationsForm.addEventListener("click", (e) => {
  const chip = e.target.closest(".chip");
  if (!chip) return;

  const location = chip.dataset.location;

  // UI
  locationsForm
    .querySelectorAll(".chip")
    .forEach((c) => c.classList.remove("active"));
  chip.classList.add("active");

  // State
  selected.location = location;

  if(selected.location == "alle"){
    selected.location = null;
  }



  // ✅ MAP
  flyToLocation(location);

  // URL
  const params = new URLSearchParams(selected);
  history.replaceState({}, "", "?" + params.toString());

  // Filter
  filterGames();
});


// Keep label.chip in the difficulty group in sync with the checked radio
function syncDifficultyActive() {
  if (!difficultyForm) return;
  // remove active from all chips in this form
  difficultyForm.querySelectorAll("label.chip").forEach((l) => {l.classList.remove("active");l.classList.remove("rating-dices")});
  const checked = document.querySelector('input[name="difficulty"]:checked');
  if (!checked) return;
  const label = difficultyForm.querySelector(`label[for="${checked.id}"]`);
  if (label) label.classList.add("active");
  if (label) label.classList.add("rating-dices");
  
}

// Initialize state on load
syncDifficultyActive();

// Update when a radio changes (clicking label will check the radio and trigger change)
difficultyForm.addEventListener("change", (e) => {
  if (e.target && e.target.name === "difficulty") syncDifficultyActive();
});

