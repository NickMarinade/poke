import UI from './functions.js'
import * as dom from '/domObjects.js';

let u2 = new UI()
const fetchList = url => {
    fetch(url)
        .then(res => res.json())
        .then(data => {
            const { results, previous, next } = data;
            u2.prevUrl = previous;
            u2.nextUrl = next;


            for (let i = 0; i < dom.pokeListItems.length; i++) {
                const pokeListItem = dom.pokeListItems[i];
                const resultData = results[i];
                const { name, url } = resultData;
                const urlArray = url.split('/');
                const id = urlArray[urlArray.length - 2];

                if (resultData) {
                    pokeListItem.textContent = id + '. ' + u2.capitalize(name);
                } else {
                    pokeListItem.textContent = '';
                }
            }
        })
}

const handleLeftButtonClick = () => {
    if (u2.prevUrl) {
        fetchList(u2.prevUrl);
    }
};

const handleRightButtonClick = () => {
    if (u2.nextUrl) {
        fetchList(u2.nextUrl);
    }
};
fetchList('https://pokeapi.co/api/v2/pokemon?offset=0&limit=20');

export { handleLeftButtonClick, handleRightButtonClick }
