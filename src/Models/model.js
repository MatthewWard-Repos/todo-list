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
  demoLists: [
    {
      name: "My To-Do List",
      items: [
        {
          name: "Go upstairs",
          complete: false,
          index: 0,
          description: "...duh",
          dueDate: "12:56 15 May 2025",
          priority: "low",
        },
        {
          name: "Go downstairs",
          complete: false,
          index: 1,
          description: "...duh",
          dueDate: "12:56 15 May 2025",
          priority: "low",
        },
      ],
      index: 0,
    },
    {
      name: "My Wish List",
      items: [
        {
          name: "A puppy",
          complete: false,
          index: 0,
          description: "Labrador",
          dueDate: "12:56 15 May 2025",
          priority: "high",
        },
      ],
      index: 1,
    },
  ],
};

Object.assign(model.List.prototype, model.createProp);
Object.assign(model.Item.prototype, model.createProp);
