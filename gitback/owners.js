{
  schema: {
    type: "object",
    properties: {
      name: {type: "string"},
      password: {type: "string"},
    }
  },
  access: {
    get: "all",
    post: "all",
    "patch|put": function(owner, user) {
      return user.admin || user.id === owner.id;
    },
  },
  read: function(owner) {
    owner.pets = Collections.pets.get().filter(function(pet) {
      return pet.owners.indexOf(owner.id) !== -1;
    })
  },
  write: function(owner) {
    owner.password = Utils.hash(owner.password);
  }
}
