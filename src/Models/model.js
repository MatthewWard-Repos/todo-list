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

  return { lists, List, Item };
}
const callModel = model();
