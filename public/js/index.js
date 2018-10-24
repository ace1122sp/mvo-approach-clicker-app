function showCat(cat) {

  // dom elements
  const div = document.getElementById('catSpace');
  const img = document.createElement('img');
  const nameLabel = document.createElement('label');
  const label = document.createElement('label');
  const span = document.createElement('span');

  // clear the cat space div
  div.innerHTML = '';

  // update dom elements
  img.src = cat.url;
  img.alt = 'cat image';

  nameLabel.innerHTML = cat.name;
  label.innerHTML = 'click counter:';
  span.innerHTML = cat.count;

  // add event listeners
  img.addEventListener('click', () => {
    cat.increaseCount();
    span.innerHTML = cat.count;
  });

  // append cat to dom
  div.appendChild(img);
  div.appendChild(nameLabel);
  div.appendChild(label);
  div.appendChild(span);
}

function createCats(catsObjects) {
  const cats = [];
  for (let cat in catsObjects) {
    let newCat = new Cat(catsObjects[cat].name, catsObjects[cat].url);
    cats.push(newCat);
  }

  return cats;
}

function createHtmlCatList(cats) {
  // get dom
  const aside = document.getElementsByTagName('aside')[0];
  const ul = document.createElement('ul');

  // add cats to html list
  cats.forEach(cat => {
    let li = document.createElement('li');
    li.innerHTML = cat.name;

    li.addEventListener('click', () => {
      showCat(cat);
    });

    ul.appendChild(li);
  });

  // update dom
  aside.appendChild(ul);
}

(() => {
  window.addEventListener('load', () => {
    const catsData = [
      {
        name: 'Tom',
        url: './img/cat.jpg'
      },
      {
        name: 'Garfield',
        url: './img/cat2.jpg'
      },
      {
        name: 'Joe',
        url: './img/cat.jpg'
      }, 
      {
        name: 'Jessi',
        url: './img/cat.jpg'
      }, 
      {
        name: 'Dave',
        url: './img/cat2.jpg'
      }
    ];

    const cats = createCats(catsData);
    showCat(cats[0]);
    createHtmlCatList(cats);
  });
})();
