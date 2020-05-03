import UI from './functions.js'
import * as dom from '../domObjects.js';

let u1 = new UI();

const fetchPokemon = id => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then(res => res.json())
        .then(data => {
            u1.resetScreen();
            const dataFirstType = data.types[0];
            const dataSecondType = data.types[1];
            dom.pokeTypeOne.textContent = u1.capitalize(dataFirstType.type.name)
            if (dataSecondType) {
                dom.pokeTypeTwo.classList.remove('hide');
                dom.pokeTypeTwo.textContent = u1.capitalize(dataSecondType.type.name)
            } else {
                dom.pokeTypeTwo.classList.add('hide');
                dom.pokeTypeTwo.textContent = '';
            }
            dom.mainScreen.classList.add(dataFirstType.type.name);


            dom.pokeName.textContent = u1.capitalize(data.name);
            dom.pokeId.textContent = '#' + data.id.toString().padStart(3, '0');
            dom.pokeWeight.textContent = data.weight;
            dom.pokeHeight.textContent = data.height;
            dom.pokeFrontImage.src = data.sprites.front_default || '';
            dom.pokeBackImage.src = data.sprites.back_default || '';
        })
}

export { fetchPokemon }