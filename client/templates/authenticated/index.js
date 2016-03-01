Template.index.onCreated( () => {
  Template.instance().subscribe( 'partite' );
});
Template.index.helpers( {
  listaPartite: function() {
    return Partite.find({}, {
      sort: { 'maxplayers': 1 }
    });
  }
});
