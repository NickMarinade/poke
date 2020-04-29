class Pokemon {
  mainScreen = document.querySelector(".main-screen");
  pokeName = document.querySelector(".poke-name");
  pokeId = document.querySelector(".poke-id");
  pokeFrontImage = document.querySelector(".poke-front-image");
  pokeBackImage = document.querySelector(".poke-back-image");
  pokeTypeOne = document.querySelector(".poke-type-one");
  pokeTypeTwo = document.querySelector(".poke-type-two");
  pokeWeight = document.querySelector(".poke-weight");
  pokeHeight = document.querySelector(".poke-height");
  pokeListItems = document.querySelectorAll(".list-item");
  leftButton = document.querySelector(".left-button");
  rightButton = document.querySelector(".right-button");
  TYPES = [
    'normal', 'fighting', 'flying',
    'poison', 'ground', 'rock',
    'bug', 'ghost', 'steel',
    'fire', 'water', 'grass',
    'electric', 'psychic', 'ice',
    'dragon', 'dark', 'fairy'
  ];
  prevUrl = null;
  nextUrl = null;

  constructor(data) {
    this.dataTypes = data.types;
    this.dataName = data.name;
    this.dataId = data.id;
    this.dataWeight = data.weight;
    this.dataHeight = data.height;
    this.dataSpriteFront = data.sprites.front_default;
    this.dataSpriteBack = data.sprites.back_default;
    this.data = data;
  }

  

  capitalize(str) {
    str[0].toUpperCase() + str.substr(1);
  }

  resetScreen() {
    mainScreen.classList.remove("hide");
    for (const type of TYPES) {
      mainScreen.classList.remove(type);
    }
  }

  fetchPokeList(url) {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        const { results, previous, next } = this.data;
        prevUrl = previous;
        nextUrl = next;

        for (let i = 0; i < pokeListItems.length; i++) {
          const pokeListItem = pokeListItems[i];
          const resultData = results[i];

          if (resultData) {
            const { name, url } = resultData;
            const urlArray = url.split("/");
            const id = urlArray[urlArray.length - 2];
            pokeListItem.textContent = id + ". " + this.capitalize(name);
          } else {
            pokeListItem.textContent = "";
          }
        }
      });
  }

  fetchPokeData(id) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then((res) => res.json())
      .then((data) => {
        this.resetScreen();
        const dataTypes = this.dataTypes;
        const dataFirstType = dataTypes[0];
        const dataSecondType = dataTypes[1];
        pokeTypeOne.textContent = this.capitalize(dataFirstType["type"]["name"]);
        if (dataSecondType) {
          pokeTypeTwo.classList.remove("hide");
          pokeTypeTwo.textContent = this.capitalize(dataSecondType["type"]["name"]);
        } else {
          pokeTypeTwo.classList.add("hide");
          pokeTypeTwo.textContent = "";
        }
        mainScreen.classList.add(dataFirstType["type"]["name"]);

        pokeName.textContent = this.capitalize(this.dataName);
        pokeId.textContent = "#" + this.dataId.toString().padStart(3, "0");
        pokeWeight.textContent = this.dataWeight;
        pokeHeight.textContent = this.dataHeight;
        pokeFrontImage.src = this.dataSpriteFront || "";
        pokeBackImage.src = this.dataSpriteBack || "";
      });
  }

  handleLeftButtonClick() {
    if (prevUrl) {
      this.fetchPokeList(prevUrl);
    }
  }

  handleRightButtonClick() {
    if (nextUrl) {
      this.fetchPokeList(nextUrl);
    }
  }

  handleListItemClick(e) {
    if (!e.target) return;

    const listItem = e.target;
    if (!listItem.textContent) return;

    const id = listItem.textContent.split(".")[0];
    this.fetchPokeData(id);
  }
}
