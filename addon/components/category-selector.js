import Ember from 'ember';

export default Ember.Component.extend({
  // tagName: 'select'
  isOpen: false,
  actions: {
    openList: function() {
      this.set('isOpen', true)
    },
    closeList: function() {
      this.set('isOpen', false)
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
    }
  ]
  )
});