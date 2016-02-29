Meteor.publish( 'partite', function() {
  return Partite.find( { 'owner': this.userId }, { fields: { 'owner': 1 } } );
});
