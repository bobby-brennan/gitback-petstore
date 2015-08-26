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
    pet.owners = pet.owners.map(function(owner) {
      return Collections.owners.get(owner);
    });
    return pet;
  },
  write: function(pet) {
    pet.type = pet.type || "unknown";
    if (allowedTypes.indexOf(pet.type) !== -1) return null;
    return pet;
  },
  variables: {
    allowedTypes: ["cat", "dog", "unknown"]
  },
}
