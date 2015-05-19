import Ember from 'ember';

export default Ember.Component.extend({
  // tagName: 'select'
  isOpen: false,
  searchString: '',
  selected: {},
  data: Em.A([]),

  filterData: Ember.observer('searchString', function() {
    console.log(this.get('searchString'));
    self = this
    this.set('filteredData', Em.A(this.get('fauxData').filter(function(item){
      let searchString = self.get('searchString');
      console.log(item);
      return item.text.includes(searchString);
    })))
  }),

  filteredData: Em.A([]),

  actions: {
    openList: function() {
      this.set('isOpen', true);
    },
    closeList: function() {
      this.set('isOpen', false);
    },
    changeData: function() {
      this.set('fauxData', Em.A([{id:1, text:'other data'},{id:2,text:'some text'}]))
    },
    itemClicked: function(item) {
      console.log('click id: ' + item.id);
      this.set('selected', item)
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