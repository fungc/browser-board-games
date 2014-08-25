New.Router.map(function () {
  this.resource('games', function() {
    this.resource('sheep');
  });
});
