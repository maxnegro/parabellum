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
    label: "Creatore della partita.",
    autoValue: function () {
      if (this.isInsert) {
        return Meteor.userId();
      }
    }
  },
  "maxplayers": {
    type: Number,
    label: "Numero massimo giocatori.",
    min: 2,
    max: 6
  }
});

Partite.attachSchema( PartiteSchema );
