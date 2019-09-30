const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://rickandmortyapi.com/api/character/';
// const API = 'https://us-central1-escuelajs-api.cloudfunctions.net/characters';
let counterPage = 0;

async function dataMaker(api) {
  try {
    const response = await fetch(api);
    const data = await response.json();
    const characters = await data.results;
          
    localStorage.setItem('next_fecth', data.info.next);
    if (data.info.next) {
      debugger
      let output = characters.map(character => {
        return `
      <article class="Card">
        <img src="${character.image}" />
        <h2>${character.name}<span>${character.species}</span></h2>
      </article>
    `
      }).join('');
      let newItem = document.createElement('section');
      newItem.classList.add('Items');
      newItem.innerHTML = output;
      $app.appendChild(newItem);
    } else {
      debugger
      let newItem = document.createElement('section');
      newItem.classList.add('Items');
      newItem.innerHTML = 'Ya no hay personajes ...';
      $app.appendChild(newItem);
      intersectionObserver.unobserve($observe);
    }
    
  } catch (error) {
    let newItem = document.createElement('section');
    newItem.classList.add('Items');
    newItem.innerHTML = 'OOOOOOOOOOOOPS!!!, OCURRIO UN ERROR';
    $app.appendChild(newItem);
  }
}

const getData = api => {
  const next_fecth = localStorage.getItem('next_fecth');
  if (next_fecth) {
    let api
    if (counterPage === 0) {
      api = API;
      localStorage.clear()
    } else {
      api = next_fecth;
    }

    dataMaker(api)
    counterPage++;
  } else {
    dataMaker(API);
    counterPage++;
  }

}

const loadData = async function() {
  getData(API);
}

const intersectionObserver = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting) {
    loadData();
  }
}, {
  rootMargin: '0px 0px 100% 0px',
});

intersectionObserver.observe($observe);
