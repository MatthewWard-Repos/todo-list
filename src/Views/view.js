export { view };

const view = {
  displayMessage(message) {
    return console.log(message);
  },

  createDiv() {
    return document.createElement("div");
  },

  displayName(parent, obj, cls) {
    parent.appendChild(this.createDiv());
    parent.lastChild.classList.add(cls);
    parent.lastChild.textContent = obj.name;
    parent.lastChild.setAttribute("index", obj.index);
  },

  getAllLists() {
    const allLists = document.querySelector(".lists");
    return allLists;
  },

  displayLists(lists) {
    lists.forEach((list) => {
      this.displayName(this.getAllLists(), list, "list");
    });
  },

  getElement(selector) {
    const element = document.querySelector(selector);
    return element;
  },

  displayItems(items) {
    const allItems = document.querySelector(".items");
    items.forEach((item) => {
      this.displayName(allItems, item, "item");
    });
  },

  displayProps(item) {
    Object.entries(item).forEach(([key, val]) => {
      displayMessage(`${key}: ${val}`);
    });
    displayMessage("");
  },

  deleteChildDivs(parent) {
    while (parent.firstChild) {
      parent.firstChild.remove();
    }
  },

  addGlobalEventListener(type, selector, callback) {
    document.addEventListener(type, function (e) {
      if (e.target.classList.contains(selector)) callback(e);
    });
  },

  toggleHidden(element) {
    element.classList.toggle("hidden");
  },
};
