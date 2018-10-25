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
          octopus.setActiveCat(cat[1]);
        });

        ul.appendChild(li);
      });

      // update existing dom
      aside.appendChild(ul);
    },
    render: () => {

      // get dom
      const list = document.getElementsByTagName('li');

      // get data
      const cats = octopus.getCatList();

      // update dom
      const length = list.length;
      for (let i = 0; i < length; i++) {
        list[i].innerHTML = cats[i][0];
      }
    }
  };
  
  let viewCatArea = {
    init: () => {
      
      // dom elements
      const div = document.getElementById('catSpace');
      const nameHeading = document.createElement('h2');
      const img = document.createElement('img');
      const label = document.createElement('label');
      const span = document.createElement('span');

      // add attributes and common content to html elements 
      img.src = '';
      img.alt = 'cat image';
      nameHeading.setAttribute('id', 'nameHeading');
      label.innerHTML = 'click counter:';    

      // add event listener
      img.addEventListener('click', function() {
        octopus.clickCat();
      });

      // update existing dom
      const domElementsToAdd = [nameHeading, img, label, span];
      domElementsToAdd.forEach(elm => {
        div.append(elm);
      }); 
    },
    render: () => {

      // get cat
      const cat = octopus.getActiveCat();

      // get dom
      const img = document.getElementsByTagName('img')[0];
      const nameHeading = document.getElementById('nameHeading');
      const span = document.getElementsByTagName('span')[0];

      // update dom elements 
      img.src = cat.url;
      nameHeading.innerHTML = cat.name;
      span.innerHTML = cat.clicks;  
    }
  };

  let viewAdminArea = {
    render: () => {
      
      // get active cat data
      let activeCat = octopus.getActiveCat();
      
      // get dom
      const form = document.getElementsByTagName('form')[0];
      
      // update input values 
      form.name.value = activeCat.name;
      form.url.value = activeCat.url;
      form.clicks.value = activeCat.clicks;
    },

    toggleAdmin: visibility => {

      // get dom 
      const formDiv = document.getElementsByClassName('form-div')[0];
      const adminButton = document.getElementById('adminButton');

      // update dom 
      if (visibility) {
        adminButton.style.display = 'none';
        formDiv.style.display = 'initial';
      } else {
        formDiv.style.display = 'none';
        adminButton.style.display = 'initial';
      }
    }, 

    init: function () {      

      // get dom 
      const adminButton = document.getElementById('adminButton');
      const cancelButton = document.getElementById('cancelButton');
      const saveButton = document.getElementById('saveButton');
      const formDiv = document.getElementsByClassName('form-div')[0];
      const form = document.getElementsByTagName('form')[0];

      // add event listeners
      const buttons = [cancelButton, saveButton];
      
      buttons.forEach(button => {
        button.addEventListener('click', () => {
          this.toggleAdmin(false);
        });
      });

      adminButton.addEventListener('click', () => {
        this.toggleAdmin(true);
        this.render();
      });

      form.addEventListener('submit', e => {
        e.preventDefault();
        const updatedCat = {
          name: e.target.name.value,
          url: e.target.url.value,
          clicks: e.target.clicks.value
        }

        octopus.adminCatUpdate(updatedCat);

      });

      // hide form on start
      formDiv.style.display = 'none';
    }
  }

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
    setActiveCat: catIndex => {
      localStorage.setItem('activeCat', catIndex);
    },
    getActiveCat: () => localStorage.getItem('activeCat'),
    getCatList: () => JSON.parse(localStorage.getItem('cats')).map((cat, index) => [cat.name, index]),
    getCat: catIndex => {
      const cats = JSON.parse(localStorage.getItem('cats'));    
      return cats[catIndex];
    },
    clickCat: catIndex => {
      const cats = JSON.parse(localStorage.getItem('cats'));
      cats[catIndex].clicks = parseInt(cats[catIndex].clicks) + 1;
      localStorage.setItem('cats', JSON.stringify(cats));      
    },
    adminCatUpdate: (catIndex, updatedCat) => {
      const cats = JSON.parse(localStorage.getItem('cats'));
      
      cats[catIndex] = { ...updatedCat };
      localStorage.setItem('cats', JSON.stringify(cats));
    }
  };
  
  let octopus = {
    init: function () {
      model.init();
      viewCatList.init();
      viewCatArea.init();
      this.setActiveCat(0);
      viewAdminArea.init();
    }, 
    getCatList: () => model.getCatList(),
    getActiveCat: () => {
      const activeCat = model.getActiveCat();
      
      return model.getCat(parseInt(activeCat));
    },
    setActiveCat: catIndex => {
      model.setActiveCat(catIndex);
      viewCatArea.render();
      viewAdminArea.render();
    },
    clickCat: () => {
      const index = parseInt(model.getActiveCat());

      model.clickCat(index);
      viewCatArea.render();
    },
    adminCatUpdate: updatedCat => {
      const catIndex = parseInt(model.getActiveCat());

      model.adminCatUpdate(catIndex, updatedCat);
      viewCatList.render();
      viewCatArea.render();
    }
  };
  
  octopus.init();
})();

