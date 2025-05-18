export { view };

const view = {
  displayMessage(message) {
    return console.log(message);
  },

  createDiv() {
    return document.createElement("div");
  },
  createBtn(text, className, type) {
    let btn = document.createElement("button");
    btn.textContent = text;
    btn.classList.add(className);
    btn.setAttribute("type", type);
    return btn;
  },
  createInput() {
    return document.createElement("input");
  },

  displayName(parent, obj, className) {
    let listContainer = parent.appendChild(this.createDiv());
    let listName = listContainer.appendChild(this.createDiv());
    listContainer.classList.add(className);
    listContainer.setAttribute("index", obj.index);
    listName.textContent = obj.name;
    listName.classList.add(`${className}-name`);
    listName.setAttribute("index", obj.index);

    this.createEditDeleteBtn(parent.lastChild);
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
  displayItemProp(item, data, property) {
    item.appendChild(this.createDiv());
    item.lastChild.textContent = `${data}`;
    item.lastChild.classList.add(`"item-${property}`);
  },
  displayItemProps(item, data) {
    item.textContent = "";
    item.classList.add(`${data.priority}`);
    this.displayItemProp(item, data.name, "name");
    this.displayItemProp(item, data.dueDate, "date");
    this.displayItemProp(item, data.priority, "priority");
    this.displayItemProp(item, data.description, "desc");
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
    if (!element) {
      return;
    }
    element.classList.toggle("hidden");
  },
  createEditDeleteBtn(parent) {
    parent.addEventListener("mouseenter", function (e) {
      view.toggleHidden(e.target.querySelector(".edit-delete"));
    });
    parent.addEventListener("mouseleave", function (e) {
      view.toggleHidden(e.target.querySelector(".edit-delete"));
    });
    let newDiv = parent.appendChild(this.createDiv());
    newDiv.classList.add("edit-delete");
    newDiv.classList.add("hidden");
    newDiv.appendChild(this.createBtn("✏️", "edit"));
    newDiv.appendChild(this.createBtn("X", "delete"));
  },
  createListInput(parent) {
    parent.appendChild(this.createInput());
    parent.lastChild.setAttribute("type", "text");
  },
  createSubmitCancel(parent) {
    let submitCancel = parent.appendChild(this.createDiv());
    submitCancel.appendChild(this.createBtn("✓", "btn-edit-yes", "submit"));
    submitCancel.appendChild(this.createBtn("X", "btn-edit-no", "button"));
  },
};
