export { callModel };

function model() {
  const lists = [];

  class List {
    constructor(name) {
      this.name = name;
      this.items = [];
    }
  }

  class Item {
    constructor(name = null) {
      this.name = name;
      this.complete = false;
    }
  }

  const createProp = {
    property(property, value) {
      this[`${property}`] = value;
    },
  };
  Object.assign(List.prototype, createProp);
  Object.assign(Item.prototype, createProp);

  return { lists, List, Item };
}
const callModel = model();
