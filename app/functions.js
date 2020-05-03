import * as dom from '../domObjects.js';

class UI {

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

    constructor() {

    }

    resetScreen() {
        dom.mainScreen.classList.remove('hide');
        for (this.type of this.TYPES) {
            dom.mainScreen.classList.remove(this.type)
        }
    }

    capitalize(str) {
        return str[0].toUpperCase() + str.substr(1);
    }
}

export default UI