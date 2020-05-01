import * as dom from '/domObjects.js';
import { fetchPokemon } from './app/fPokemon.js'
import { handleLeftButtonClick, handleRightButtonClick } from './app/fList.js'

dom.leftButton.addEventListener('click', handleLeftButtonClick);
dom.rightButton.addEventListener('click', handleRightButtonClick);

for (const pokeListItem of dom.pokeListItems) {
    pokeListItem.addEventListener('click', (e) => {
        if (!e.target) return;

        const listItem = e.target;
        if (!listItem.textContent) return;

        const id = listItem.textContent.split('.')[0];
        fetchPokemon(id)
    })
}
