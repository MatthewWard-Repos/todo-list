export { model };

const model = {
  lists: [],

  List: class List {
    constructor(name, items = [], data = {}) {
      this.name = name;
      this.items = items;
      Object.assign(this, data);
    }
  },

  Item: class Item {
    constructor(name = null, data = {}) {
      this.name = name;
      this.complete = false;
      Object.assign(this, data);
    }
  },

  createProp: {
    property(property, value) {
      this[`${property}`] = value;
    },
  },
};
Object.assign(model.List.prototype, model.createProp);
Object.assign(model.Item.prototype, model.createProp);
