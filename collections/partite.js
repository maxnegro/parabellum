Partite = new Meteor.Collection( 'partite' );

Partite.allow({
  insert: () => false,
  update: () => false,
  remove: () => false
});

Partite.deny({
  insert: () => true,
  update: () => true,
  remove: () => true
});

let PartiteSchema = new SimpleSchema({
  "owner": {
    type: String,
    label: "Creatore della partita."
  },
  "maxplayers": {
    type: Number,
    label: "Numero massimo giocatori.",
    min: 2,
    max: 6
  }
});

Collection.attachSchema( PartiteSchema );
