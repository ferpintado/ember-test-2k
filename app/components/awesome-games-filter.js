import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    onChange(value, filter, event){
      if (event.currentTarget.checked){
        this.get('onAdd')(value,  filter)
      }else{
        this.get('onRemove')(value,  filter)
      }
    }
  }
});
