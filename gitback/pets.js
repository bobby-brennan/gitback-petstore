{
  id: "name",
  schema: {
    type: "object",
    properties: {
      name: {type: "string"},
      age: {type: "number"},
      type: {type: "string"},
    }
  },
  access: {
    get: "all",
    post: "all",
    "patch|put": function(pet, owner) {
      return user.admin || pet.owners.indexOf(owner.id) !== -1;
    },
  },
  read: function(pet) {
    var self = this;
    pet.owners = pet.owners.map(function(owner) {
      return self.collections.owners.get(owner);
    });
    return pet;
  },
  write: function(pet) {
    pet.type = pet.type || "unknown";
    if (allowedTypes.indexOf(pet.type) !== -1) throw new Error("Type " + pet.type + " not allowed");
    return pet;
  },
  variables: {
    allowedTypes: ["cat", "dog", "unknown"]
  },
}
