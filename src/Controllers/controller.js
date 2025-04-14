import { model } from "../Models/model";
import { view } from "../Views/view";
import "../styles.css";

const controller = {
  linkObjProp(obj, key, val) {
    obj.property(key, val);
  },

  linkObjIndex(obj, index) {
    this.linkObjProp(obj, "index", index);
  },

  createList(name) {
    let newList = new model.List(name);
    this.linkObjIndex(newList, model.lists.length);
    return newList;
  },
  linkNewList(name) {
    model.lists.push(this.createList(name));
  },

  readList(listIndex) {
    return model.lists[listIndex];
  },
  readListItem(listIndex, itemIndex) {
    return model.lists[listIndex].items[itemIndex];
  },
  createItem(name, listIndex) {
    let newItem = new model.Item(name);
    this.linkObjIndex(newItem, model.lists[listIndex].items.length);
    return newItem;
  },
  linkItem(item, listIndex) {
    return model.lists[listIndex].items.push(item);
  },
  linkNewItem(name, listIndex = 0) {
    return this.linkItem(this.createItem(name, listIndex), listIndex);
  },

  linkItemDesc(item, desc) {
    this.linkObjProp(item, "description", desc);
  },
  linkItemDueDate(item, year, month, day) {
    this.linkObjProp(item, "dueDate", new Date(year, month - 1, day));
  },
  linkItemPriority(item, priority) {
    this.linkObjProp(item, "priority", priority);
  },

  deleteList(listIndex) {
    model.lists.splice(listIndex, 1);
    model.lists.forEach((list) => {
      list.index = model.lists.length - 1;
    });
  },

  deleteItem(itemIndex, listIndex) {
    model.lists[listIndex].items.splice(itemIndex, 1);
    model.lists[listIndex].items.forEach((item) => {
      item.index = model.lists[listIndex].items.length - 1;
    });
  },
};

const eventListeners = {
  listenList() {
    view.addGlobalEventListener("click", "list", (e) => {
      view.deleteChildDivs(document.querySelector(".items"));
      view.displayItems(model.lists[e.target.getAttribute("index")].items);
    });
  },

  listenOpenForm() {
    view.addGlobalEventListener("click", "btn-list", (e) => {
      view.toggleHidden(view.getListForm());
    });
  },
  listenAddList() {
    view.addGlobalEventListener("submit", "list-form", (e) => {
      e.preventDefault();
      controller.linkNewList(view.getListInput().value);
      view.toggleHidden(view.getListForm());
      view.getListForm().reset();
      view.deleteChildDivs(view.getAllLists());
      view.displayLists(model.lists);
    });
  },
  listenCloseList() {
    view.addGlobalEventListener("click", "btn-input-no", (e) => {
      console.log(e.target);
      view.toggleHidden(view.getListForm());
      view.getListForm().reset();
    });
  },
  listenAll() {
    this.listenList();
    this.listenOpenForm();
    this.listenAddList();
    this.listenCloseList();
  },
};
eventListeners.listenAll();

const demoLists = () => {
  controller.linkNewList("My To-Do List");
  controller.linkNewList("My Wish List");
  controller.linkNewItem("Go upstairs");
  controller.linkNewItem("Go downstairs");
  controller.linkNewItem("A puppy", 1);
  controller.linkItemDesc(controller.readListItem(1, 0), "Labrador");
  controller.linkItemDueDate(controller.readListItem(1, 0), 2025, 12, 25);
  controller.linkItemPriority(controller.readListItem(1, 0), "high");
};
demoLists();

view.displayMessage(model.lists);
view.displayLists(model.lists);
view.displayMessage(model.lists[0].items);
view.displayItems(model.lists[0].items);

view.displayMessage(model.lists);
