"authentication": {
  "users": "owners",
  "strategies": {
    "basic": {
      "name": "api_key",
      "in": "header"
    }
  }
},
"collections":
  "pets": {
    "id": "name",
    "access": {
      "get": "all",
      "post": "all",
      "patch|put": function(pet, owner) {
        return user.admin || pet.owners.indexOf(owner.id) !== -1;
      },
    },
    "resolve": {
      "owners": function(owners) {
         return owners.map(function(owner) {
           Collections.owners.get(owner);
         })
      }
    }
  }
}
