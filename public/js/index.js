(() => {
  let viewCatList = {
    init: () => {

      // get data
      const cats = octopus.getCatList();
      
      // get dom
      const aside = document.getElementsByTagName('aside')[0];
      const ul = document.createElement('ul');

      // add cats to ul list
      cats.forEach(cat => {
        let li = document.createElement('li');
        li.setAttribute('id', cat[1]);
        li.innerHTML = cat[0];

        li.addEventListener('click', () => {
          octopus.chooseCat(cat[1]);
        });

        ul.appendChild(li);
      });

      // update existing dom
      aside.appendChild(ul);
    }
  };
  let viewCatArea = {
    init: () => {
      
      // dom elements
      const div = document.getElementById('catSpace');
      const img = document.createElement('img');
      const nameLabel = document.createElement('label');
      const label = document.createElement('label');
      const span = document.createElement('span');

      // add attributes and common content to html elements 
      img.src = '';
      img.alt = 'cat image';
      img.name = '';
      nameLabel.setAttribute('id', 'nameLabel');
      label.innerHTML = 'click counter:';    

      // add event listener
      img.addEventListener('click', function() {
        octopus.clickCat(this.name);
      });

      // update existing dom
      const domElementsToAdd = [img, nameLabel, label, span];
      domElementsToAdd.forEach(elm => {
        div.append(elm);
      }); 
    },
    render: catIndex => {

      // get cat
      const cat = octopus.getCat(catIndex);

      // get dom
      const img = document.getElementsByTagName('img')[0];
      const nameLabel = document.getElementById('nameLabel');
      const span = document.getElementsByTagName('span')[0];

      // update dom elements 
      img.src = cat.url;
      img.setAttribute('name', catIndex);
      nameLabel.innerHTML = cat.name;
      span.innerHTML = cat.clicks;  
    }
  };
  let model = {
    init: () => {
      if (!localStorage.getItem('cats')) {

        // initial data
        const img1 = '../img/cat.jpg';
        const img2 = '../img/cat2.jpg';    
        const cats = [{
            name: 'Tom',
            url: img1,
            clicks: 0
          }, {
            name: 'Joe',
            url: img2,
            clicks: 0
          }, {
            name: 'Sam',
            url: img1,
            clicks: 0
          }, {
            name: 'Snitch',
            url: img2,
            clicks: 0
          }, {
            name: 'Ralph',
            url: img1,
            clicks: 0
          }];

        localStorage.setItem('cats', JSON.stringify(cats));
      }
    },
    getCatList: () => JSON.parse(localStorage.getItem('cats')).map((cat, index) => [cat.name, index]),
    getCat: catIndex => {
      const cats = JSON.parse(localStorage.getItem('cats'));    
      return cats[catIndex];
    },
    clickCat: catIndex => {
      const cats = JSON.parse(localStorage.getItem('cats'));
      cats[catIndex].clicks = parseInt(cats[catIndex].clicks) + 1;
      localStorage.setItem('cats', JSON.stringify(cats));      
    }
  };
  let octopus = {
    init: () => {
      model.init();
      viewCatList.init();
      viewCatArea.init();
      viewCatArea.render(0);
    }, 
    getCatList: () => model.getCatList(),
    getCat: catIndex => model.getCat(parseInt(catIndex)), 
    chooseCat: catIndex => viewCatArea.render(catIndex),
    clickCat: catIndex => {
      const index = parseInt(catIndex);
      model.clickCat(index);
      viewCatArea.render(index);
    }
  };
  
  octopus.init();
})();

