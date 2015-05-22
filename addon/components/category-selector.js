import Ember from 'ember';

export default Ember.Component.extend({
  // focusIn: function() {
  //   console.log('focus');
  // },
  // tagName: 'select'
  classNames: ['category-selector'],
  isOpen: false,
  searchString: '',
  selected: {},
  data: Em.A([]),

  click: function(e) {
    // console.log(e.target);
    // console.log(e.context);
  },
  focusOut: function(evt) {
    // this.sendAction('focus-out');
    // console.log('out');
    // console.log(Ember.$(this.element));
    // console.log(evt);
    // console.log(document.activeElement)
    // console.log(evt.relatedTarget);
    // console.log(evt.originalEvent)
    // console.log(Ember.$(this.element).find(evt.target))
    // let self = this;
    // Ember.run.later( function() {
    //   self.send('closeList');
    // }, 50);
    // let container = Ember.$(this.element);
    // if (!container.is(evt.target) // if the target of the click isn't the container...
    //   && container.has(evt.target).length === 0) // ... nor a descendant of the container
    // {
    //   self.send('closeList');
    // }

  //   if(this.get('isOpen')) {
  //     Em.run.later(this, function() {
  //       var focussedElement = document.activeElement;
  //       var isFocussedOut = this.$().has(focussedElement).length === 0 
  //               && !this.$().is(focussedElement);

  //       if(isFocussedOut) {
  //         // this.closeOptions({focus:false});
  //         this.send('closeList');
  //       }
  //     });
  //   }
  },

  // lostFocus: Em.on('focusOut', function() {
  //   if(this.get('isOpen')) {
  //     Em.run.later(this, function() {
  //       var focussedElement = document.activeElement;
  //       var target = this.$();
  //       if (target) {
  //         var isFocussedOut = target.has(focussedElement).length === 0 && !target.is(focussedElement);

  //         if(isFocussedOut) {
  //           console.log('..')
  //           this.send('closeList');
  //         }
  //       }
  //     }, 0);
  //   }
  // }),



  focusIn: function(){
    // this.sendAction('focus-in'); 
    // console.log('in');  
  },

  init: function() {
    console.log('.');

    // to be rewritten whith real data in main repo
    this.set('data', Em.A(this.get('fauxData')));
    this.set('filteredData', Em.A(this.get('data')));

    this._super();

    let self = this;
    Ember.$(window).on('click', function(e){
      let target = self.$(e.target)
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
      // console.log(e.target)
      // console.log(self.$(e.target));
      // console.log(Ember.$(self.element))
      // if (!(e.target)
      // console.log(e.toElement.parentElement);
      // console.log(Ember.$(self.element));
      // console.log(Ember.$(self.element).find(e.target).length);
      // if (self.$(e.target) )
    });
  },

  filterData: Ember.observer('searchString', function() {
    self = this;
    this.set('filteredData', Em.A(this.get('data').filter(function(item){
      let searchString = self.get('searchString');
      return item.text.includes(searchString);
    })));
  }),

  filteredData: Em.A([]),

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
    // changeData: function() {
    //   this.set('data', Em.A([{id:1, text:'other data'},{id:2,text:'some text'}]))
    // },
    itemClicked: function(item) {
      console.log('itemClicked', + item);
      // item = this.get('data').findBy('id', itemid);
      this.set('selected', item);
      this.set('searchString', item.text);
      // this.send('closeList');
    },
    testAction: function(e) {
      console.log('testAction');
      // console.log(e);
      // console.log(this.$('.category-selector__list li').size());
      if (this.$('.category-selector__list li').size() === 1) {
        console.log(this.$('.category-selector__list li:first').data('internalid'));
        let internalid = this.$('.category-selector__list li:first').data('internalid');
        let item = this.get('data').findBy('id', parseInt(internalid, 10));
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
      if (Ember.$(e.target).hasClass('category-selector__input')) {
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
    // console.log('.')
        // console.log(this.$('.category-selector__list li').size())

        let internalid = e.target.dataset.internalid;
        let item = this.get('data').findBy('id', parseInt(internalid, 10));
        this.set('selected', item);
        this.set('searchString', item.text);
        this.send('closeList');
        let self = this;
        Ember.run.later( function() {
          self.$('.category-selector__open-button').focus();
        });
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