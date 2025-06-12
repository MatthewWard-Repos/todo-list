import pencilImg from "../img/pencil.png";
import minimizeImg from "../img/minimize.png";
import { createHoverListener } from "../Controllers/controller";
export { view };

const view = {
  render(lists) {
    this.displayLists(lists), this.displayItems(lists[0].items);
  },

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
    let nameContainer = parent.appendChild(this.createDiv());
    let objName = nameContainer.appendChild(this.createDiv());
    nameContainer.classList.add(className);
    nameContainer.setAttribute("index", obj.index);
    objName.textContent = obj.name;
    objName.classList.add(`${className}-name`);
    objName.setAttribute("index", obj.index);
    if (className === "item") {
      nameContainer.appendChild(this.createDiv());
      nameContainer.lastChild.classList.add("due-date");
      nameContainer.lastChild.textContent = `Due: ${obj.dueDate}`;
    }

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
      this.createCompleteInput(allItems.lastChild);
      if (item.complete) {
        this.toggleStruckThrough(allItems.lastChild);
        allItems.lastChild.querySelector(".complete-toggle").checked = true;
      }
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
    if (property === "priority") {
      item.lastChild.textContent =
        data.toString().toUpperCase().slice(0, 1) + data.toString().slice(1) + " Priority";
    } else {
      item.lastChild.textContent = `${data}`;
    }
    item.lastChild.classList.add(`"item-${property}`);
    item.lastChild.classList.add(`item-prop`);
  },
  displayItemProps(item, data) {
    item.textContent = "";
    item.classList.add(`${data.priority}`);
    item.classList.add("item-open");
    item.classList.remove("item");
    this.displayItemProp(item, data.name, "name");
    this.displayItemProp(item, data.dueDate, "date");
    this.displayItemProp(item, data.priority, "priority");
    this.createEditCloseButton(item);
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
  toggleStruckThrough(element) {
    element.classList.toggle("complete");
  },
  createCompleteInput(parent) {
    parent.prepend(this.createInput());
    parent.firstChild.setAttribute("type", "checkbox");
    parent.firstChild.classList.add("complete-toggle");
  },

  createImgBtn(div, className, imgName) {
    let image = document.createElement("img");
    image.src = imgName;
    image.classList.add("edit-img");
    div.classList.add(`${className}`);
    div.classList.add("hidden");
    div.appendChild(this.createBtn("", "edit"));
    div.lastChild.appendChild(image);
  },

  createEditDeleteBtn(parent) {
    createHoverListener(parent);
    let newDiv = parent.appendChild(this.createDiv());
    this.createImgBtn(newDiv, "edit-delete", pencilImg);
    newDiv.appendChild(this.createBtn("X", "delete"));
  },

  createEditCloseButton(parent) {
    let newDiv = parent.appendChild(this.createDiv());
    this.createImgBtn(newDiv, "edit-close", pencilImg);
    this.createImgBtn(newDiv, "edit-close", minimizeImg);
    newDiv.classList.remove("hidden");
  },
  createListInput(parent) {
    parent.appendChild(this.createInput());
    parent.lastChild.setAttribute("type", "text");
  },
  createSubmitCancel(parent) {
    let submitCancel = parent.appendChild(this.createDiv());
    submitCancel.classList.add("submit-cancel");
    submitCancel.appendChild(this.createBtn("✓", "btn-edit-yes", "submit"));
    submitCancel.appendChild(this.createBtn("X", "btn-edit-no", "button"));
  },
};
