import Ember from 'ember';

export default Ember.Route.extend({
  model(){
    return Ember.$.getJSON('/data.json').then(function(data){
      return data.games;
    });
  }
});
