import { model } from "../Models/model";
import { view } from "../Views/view";
import "../styles.css";
import { format } from "date-fns";

const controller = {
  getLocalStorage() {
    if (
      localStorage.getItem("lists-local") &&
      JSON.parse(localStorage.getItem("lists-local")).length !== 0
    ) {
      JSON.parse(localStorage.getItem("lists-local")).forEach((list) => {
        model.lists.push(list);
      });
    } else {
      localStorage.setItem("lists-local", JSON.stringify(model.lists));
      model.demoLists.forEach((list) => {
        model.lists.push(list);
      });
    }
    view.render(model.lists);
  },

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
    this.linkItem(this.createItem(name, listIndex), listIndex);
  },

  linkItemDesc(item, desc) {
    this.linkObjProp(item, "description", desc);
  },
  linkItemDueDate(item, date) {
    this.linkObjProp(item, "dueDate", format(new Date(date), "hh:mm dd LLL yyyy"));
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
  getItem(itemIndex, listIndex) {
    return model.lists[listIndex].items[e.target.getAttribute(itemIndex)];
  },
};

const eventListeners = {
  activeList: 0,
  listForm: view.getElement(".list-form"),
  listInput: view.getElement(".list-input"),
  itemForm: view.getElement(".item-form"),
  itemName: view.getElement(".item-name-input"),
  itemDate: view.getElement(".item-date-input"),
  itemPriority: view.getElement(".item-priority-input"),
  itemDesc: view.getElement(".item-desc-textarea"),
  curName: null,

  toggleEditDelete(parent) {
    view.toggleHidden(parent.querySelector(".edit-delete"));
  },
  createHoverListener(parent) {
    parent.addEventListener("mouseenter", (e) => eventListeners.toggleEditDelete(parent));
    parent.addEventListener("mouseleave", (e) => eventListeners.toggleEditDelete(parent));
  },

  openForm(formType, btnType, focusOn) {
    view.toggleHidden(view.getElement(`.btn-${btnType}`));
    view.toggleHidden(formType);
    focusOn.focus();
  },

  closeForm(formType, btnType) {
    view.toggleHidden(formType);
    formType.reset();
    view.toggleHidden(view.getElement(`.btn-${btnType}`));
  },

  listenList() {
    view.addGlobalEventListener("click", "list-name", (e) => {
      this.activeList = e.target.getAttribute("index");
      view.deleteChildDivs(view.getElement(".items"));
      view.displayItems(model.lists[this.activeList].items);
    });
  },

  listenOpenForm() {
    view.addGlobalEventListener("click", "btn-open", (e) => {
      if (e.target.closest(".sidebar")) {
        this.openForm(this.listForm, "list", this.listInput);
      } else if (model.lists.length > 0) {
        this.openForm(this.itemForm, "item", this.itemName);
      }
    });
  },
  listenAddList() {
    view.addGlobalEventListener("submit", "list-form", (e) => {
      e.preventDefault();
      controller.linkNewList(this.listInput.value);
      this.closeForm(this.listForm, "list");
      view.deleteChildDivs(view.getElement(".lists"));
      view.displayLists(model.lists);
      localStorage.setItem("lists-local", JSON.stringify(model.lists));
    });
  },
  listenCloseForm() {
    view.addGlobalEventListener("click", "btn-input-no", (e) => {
      if (e.target.closest(".sidebar")) {
        this.closeForm(this.listForm, "list");
      } else {
        this.closeForm(this.itemForm, "item");
      }
    });
  },

  listenAddItem() {
    view.addGlobalEventListener("submit", "item-form", (e) => {
      e.preventDefault();
      if (this.itemName.value === "") {
        return;
      }
      controller.linkNewItem(this.itemName.value, this.activeList);

      controller.linkItemDueDate(
        controller.readListItem(this.activeList, model.lists[this.activeList].items.length - 1),
        this.itemDate.value
      );

      controller.linkItemPriority(
        controller.readListItem(this.activeList, model.lists[this.activeList].items.length - 1),
        this.itemPriority.value
      );

      controller.linkItemDesc(
        controller.readListItem(this.activeList, model.lists[this.activeList].items.length - 1),
        this.itemDesc.value
      );

      this.closeForm(this.itemForm, "item");
      view.deleteChildDivs(view.getElement(".items"));
      view.displayItems(model.lists[this.activeList].items);
      localStorage.setItem("lists-local", JSON.stringify(model.lists));
    });
  },

  listenOpenItem() {
    view.addGlobalEventListener("click", "item-name", (e) => {
      if (e.target.classList.contains("complete")) {
        return;
      }
      view.displayItemProps(
        e.target.parentElement,
        model.lists[this.activeList].items[e.target.getAttribute("index")]
      );
    });
  },
  listenCloseItem() {
    view.addGlobalEventListener("click", "close", (e) => {
      view.deleteChildDivs(e.target.closest(".items"));
      view.displayItems(model.lists[this.activeList].items);
    });
  },

  listenDelete() {
    view.addGlobalEventListener("click", "delete", (e) => {
      if (e.target.closest(".list")) {
        controller.deleteList(e.target.closest("[index]").getAttribute("index"));
        view.deleteChildDivs(view.getElement(".lists"));
        view.displayLists(model.lists);
        this.activeList = 0;
        view.deleteChildDivs(view.getElement(".items"));
        if (model.lists.length > 0) {
          view.displayItems(model.lists[0].items);
        }
      } else {
        controller.deleteItem(e.target.closest("[index]").getAttribute("index"), this.activeList);
        view.deleteChildDivs(view.getElement(".items"));
        view.displayItems(model.lists[this.activeList].items);
      }
      localStorage.setItem("lists-local", JSON.stringify(model.lists));
    });
  },
  listenEditName() {
    view.addGlobalEventListener("click", "edit-img", (e) => {
      let targetName = null;
      let type = null;
      if (e.target.closest(".list")) {
        type = "list";
        targetName = e.target.closest(".list");
        this.curName = model.lists[targetName.getAttribute("index")].name;
      } else {
        type = "item";
        targetName = e.target.closest(".item");
        this.curName = model.lists[this.activeList].items[targetName.getAttribute("index")].name;
      }
      view.deleteChildDivs(targetName);
      view.createListInput(targetName);
      targetName.firstChild.value = this.curName;
      targetName.firstChild.classList.add(`${type}-input`);
      targetName.firstChild.focus();
      view.createSubmitCancel(targetName);
    });
  },
  listenSubmitEdit() {
    view.addGlobalEventListener("click", "btn-edit-yes", (e) => {
      let targetName = e.target.parentElement.parentElement;
      if (e.target.closest(".list")) {
        model.lists[targetName.getAttribute("index")].name =
          targetName.closest(".list").firstChild.value;
        view.deleteChildDivs(targetName.parentElement);
        view.displayLists(model.lists);
      } else {
        model.lists[this.activeList].items[targetName.getAttribute("index")].name =
          targetName.closest(".item").firstChild.value;
        view.deleteChildDivs(targetName.parentElement);
        view.displayItems(model.lists[this.activeList].items);
      }
      localStorage.setItem("lists-local", JSON.stringify(model.lists));
    });
  },
  listenCancelEdit() {
    view.addGlobalEventListener("click", "btn-edit-no", (e) => {
      let targetName = e.target.parentElement.parentElement;
      if (e.target.closest(".list")) {
        view.deleteChildDivs(targetName.parentElement);
        view.displayLists(model.lists);
      } else {
        view.deleteChildDivs(targetName.parentElement);
        view.displayItems(model.lists[this.activeList].items);
      }
    });
  },
  listenChecked() {
    view.addGlobalEventListener("change", "complete-toggle", (e) => {
      let checkedItem =
        model.lists[this.activeList].items[e.target.parentElement.getAttribute("index")];
      if (checkedItem.complete) {
        checkedItem.complete = false;
        view.deleteChildDivs(e.target.closest(".items"));
        view.displayItems(model.lists[this.activeList].items);
      } else {
        checkedItem.complete = true;
        e.target.parentElement.removeChild(e.target.parentElement.lastChild);
      }

      view.toggleStruckThrough(e.target.parentElement.querySelector(".item-name"));

      view.toggleStruckThrough(e.target.parentElement.querySelector(".due-date"));
    });
  },
  listenAll() {
    this.listenList();
    this.listenOpenForm();
    this.listenAddList();
    this.listenCloseForm();
    this.listenAddItem();
    this.listenOpenItem();
    this.listenCloseItem();
    this.listenDelete();
    this.listenEditName();
    this.listenSubmitEdit();
    this.listenCancelEdit();
    this.listenChecked();
  },
};
eventListeners.listenAll();

export const { createHoverListener } = eventListeners;

controller.getLocalStorage();
