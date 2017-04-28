import Ember from 'ember';

export default Ember.Component.extend({
  classNameBindings: ['isOpen'],
  isOpen: false,
  filtersCount: null,

  init(){
    this._super(...arguments);
    this.set('filtersCount', []);
  },

  filteredText: Ember.computed('filteredText', function(){
    if (this.get('filtersCount').length === 0){
      return "All " + this.get('title');
    }else{
      return "Filtered..."
    }
  }).property('filtersCount.@each'),
  iconClass: Ember.computed('isOpen', function(){
    if (!this.get('isOpen')){
      return 'fa-arrow-down';
    }else{
      return 'fa-arrow-up';
    }
  }).property('isOpen'),
  mouseLeave(){
    return this.set('isOpen', false);
  },
  actions: {
    onChange(value, filter, event){
      if (event.currentTarget.checked){
        this.get('onAdd')(value,  filter);
        this.get('filtersCount').pushObject(value);
      }else{
        this.get('onRemove')(value,  filter)
        this.get('filtersCount').removeObject(value);
      }
    },
    toggleOpen() {
      return this.toggleProperty('isOpen');
    }
  }
});
