import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['category-selector'],
  isOpen: false,
  searchString: '',
  selected: {},
  // content: [],
  // value: {},
  data: Em.A([]),
  filteredData: Em.A([]),


  init: function() {
    console.log('.');
    // to be rewritten whith real data in main repo
    // this.set('data', Em.A(this.get('fauxData')));
    this.set('filteredData', Em.A(this.get('data')));

    this._super();

    let self = this;
    Ember.$(window).on('click', function(e){
      let target = self.$(e.target);
      let internalid = e.target.dataset.internalid;
      if (internalid) {
        let item = self.get('data').findBy('id', parseInt(internalid, 10));
        self.set('selected', item);
        self.set('searchString', item.text);
        self.send('closeList');
      }
      else if (
          target.hasClass('category-selector__selected') ||
          target.hasClass('category-selector__input')  ||
          target.hasClass('category-selector__new-button') ||
          target.hasClass('category-selector__input') ||
          target.hasClass('category-selector__open-button')
          ) {
        //do nothing
      } else {
        self.send('closeList');
      }
    });
  },

  filterData: Ember.observer('searchString', function() {
    let self = this;
    this.set('filteredData', Em.A(this.get('data').filter(function(item){
      let searchString = self.get('searchString');
      return item.text.includes(searchString);
    })));
  }),


  actions: {
    openList: function() {
      this.set('isOpen', true);
      this.set('searchString', '');
      let self = this;
      Ember.run.later( function() {
        self.$('input').focus();
      });
    },
    closeList: function() {
      this.set('isOpen', false);
    },
    itemClicked: function(item) {
      this.set('selected', item);
      this.set('searchString', item.text);
    },
    inputSelect: function(e) { // select item if there is only one left in the list
      if (this.$('.category-selector__list li').size() === 1) {
        let internalid = this.$('.category-selector__list li:first').data('internalid');
        let item = this.get('data').findBy('id', internalid);
        this.set('selected', item);
        this.set('searchString', item.text);
        this.send('closeList');
      }
    }
  },
  keyDown(e) {
    switch(e.keyCode) {
    case 38: //up
      e.preventDefault();
      if (e.target.previousElementSibling === null) {
        this.$('.category-selector__input').focus();
      } else {
        this.$(e.target.previousElementSibling).focus();
      }
      break;
    case 40: //down
      e.preventDefault();
      if (Ember.$(e.target).hasClass('category-selector__input') ||
        (Ember.$(e.target).hasClass('category-selector__new-button'))) {
        this.$('li:first').focus();
      } else {
        this.$(e.target.nextElementSibling).focus();
      }
      break;
    case 37: //left
      if ( (e.target.previousElementSibling === null) && !Ember.$(e.target).hasClass('category-selector__input') ) {
        this.$('.category-selector__new-button').focus();
      } else {
        this.$(e.target.previousElementSibling).focus();
      }
      break;
    case 39: //right
      if (Ember.$(e.target).hasClass('category-selector__new-button')) {
        this.$('li:first').focus();
      } else {
        this.$(e.target.nextElementSibling).focus();
      }
      break;
    }
  },
  keyUp(e) {
    switch(e.keyCode) {
    case 13: // enter
        let self = this;
        let internalid = e.target.dataset.internalid;
        if (internalid) {
          let item = this.get('data').findBy('id', internalid);
          this.set('selected', item);
          this.set('searchString', item.text);
          this.send('closeList');
          Ember.run.later( function() {
            self.$('.category-selector__open-button').focus();
          });
        }
        break;
    case 27: // esc
        this.send('closeList');
        break;
    }
  },
  fauxData: Em.A(
    [
      {
        id: 1,
        text: 'a pizza'
      },
      {
        id: 2,
        text: 'burger'
      },
      {
        id: 3,
        text: 'sushi'
      },
      {
        id: 4,
        text: 'another pizza'
      },
      {
        id: 5,
        text: 'some more stuff'
      },
      {
        id: 8,
        text: 'even more stuff'
      },
      {
        id: 9,
        text: 'better have some very very very very very very very very very very very long text or somthing that just goes on and on and on and on'
      },
      {
        id: 10,
        text: 'the moon'
      },
      {
        id: 11,
        text: 'more pizza'
      }
    ]
  )
});