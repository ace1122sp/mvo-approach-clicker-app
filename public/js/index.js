(() => {
  let viewCatList = {
    init: function () {

      // get data
      const cats = octopus.getCatList();
      
      // get dom
      this.aside = document.getElementsByTagName('aside')[0];
      this.ul = document.createElement('ul');

      // add cats to ul list
      cats.forEach(cat => {
        let li = document.createElement('li');
        li.setAttribute('id', cat[1]);
        li.innerHTML = cat[0];

        li.addEventListener('click', () => {
          octopus.setActiveCat(cat[1]);
        });

        this.ul.appendChild(li);
      });

      // update existing dom
      this.aside.appendChild(this.ul);
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
    init: function () {
      
      // dom elements
      this.div = document.getElementById('catSpace');
      this.nameHeading = document.createElement('h2');
      this.img = document.createElement('img');
      this.label = document.createElement('label');
      this.span = document.createElement('span');

      // add attributes and common content to html elements 
      this.img.src = '';
      this.img.alt = 'cat image';
      this.nameHeading.setAttribute('id', 'nameHeading');
      this.label.innerHTML = 'click counter:';    

      // add event listener
      this.img.addEventListener('click', function() {
        octopus.clickCat();
      });

      // update existing dom
      const domElementsToAdd = [this.nameHeading, this.img, this.label, this.span];
      domElementsToAdd.forEach(elm => {
        this.div.append(elm);
      }); 
    },
    render: function () {

      // get cat
      const cat = octopus.getActiveCat();

      // update dom elements 
      this.img.src = cat.url;
      this.nameHeading.innerHTML = cat.name;
      this.span.innerHTML = cat.clicks;  
    }
  };

  let viewAdminArea = {
    init: function () {

      // get dom 
      this.adminButton = document.getElementById('adminButton');
      this.cancelButton = document.getElementById('cancelButton');
      this.saveButton = document.getElementById('saveButton');
      this.formDiv = document.getElementsByClassName('form-div')[0];
      this.form = document.getElementsByTagName('form')[0];

      // add event listeners
      const buttons = [this.cancelButton, this.saveButton];

      buttons.forEach(button => {
        button.addEventListener('click', () => {
          this.toggleAdmin(false);
        });
      });

      this.adminButton.addEventListener('click', () => {
        this.toggleAdmin(true);
        this.render();
      });

      this.form.addEventListener('submit', e => {
        e.preventDefault();
        const updatedCat = {
          name: e.target.name.value,
          url: e.target.url.value,
          clicks: e.target.clicks.value
        }

        octopus.adminCatUpdate(updatedCat);

      });

      // hide form on start
      this.formDiv.style.display = 'none';
    },

    render: function () {
      
      // get active cat data
      let activeCat = octopus.getActiveCat();
  
      // update input values 
      this.form.name.value = activeCat.name;
      this.form.url.value = activeCat.url;
      this.form.clicks.value = activeCat.clicks;
    },

    toggleAdmin: function (visibility) {
    
      // update dom 
      if (visibility) {
        this.adminButton.style.display = 'none';
        this.formDiv.style.display = 'initial';
      } else {
        this.formDiv.style.display = 'none';
        this.adminButton.style.display = 'initial';
      }
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
      viewAdminArea.init();
      this.setActiveCat(0);
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

