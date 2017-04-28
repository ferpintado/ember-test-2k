import Ember from 'ember';
import _ from 'underscore';

export default Ember.Component.extend({
  filtered_platforms: [],
  filtered_years: [],

  years: Ember.computed('years',function(){
    let years = [];
    this.get('games').map((game) => {
      if (years.indexOf(game.release_year) === -1)
       years.push(game.release_year);
    });
    return years.sort().reverse();
  }),

  platforms: Ember.computed('platforms',function(){
    const platforms = this.get('games').map((game) => (game.platforms));
    return _.unique(_.flatten(platforms)).sort().reverse();
  }),

  filteredGames: Ember.computed('filtered_years', function(){
    if (this.get('filtered_years').length === 0 && this.get('filtered_platforms').length === 0){
      return this.get('games');
    }else{
      let self = this;
      let filtered = _.filter(this.get('games'), function(game) {
        if(self.get('filtered_years').length > 0 && self.get('filtered_platforms').length === 0){
          return _.contains(self.get('filtered_years'), game.release_year)
        }else if (self.get('filtered_years').length === 0 && self.get('filtered_platforms').length > 0){
          return _.intersection(self.get('filtered_platforms'), game.platforms).length > 0;
        }else{
          return _.contains(self.get('filtered_years'), game.release_year) && _.intersection(self.get('filtered_platforms'), game.platforms).length > 0;
        }
      });
      return filtered;
    }
  }).property('filtered_years.@each,filtered_platforms.@each'),


  actions: {
    addFilter: function(value, filter){
      this.get('filtered_' + filter ).pushObject(value);
    },
    removeFilter: function(value, filter){
      this.get('filtered_' + filter ).removeObject(value);
    }
  }
});
