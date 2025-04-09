import { callModel } from "../Models/model";
import { callView } from "../Views/view";
import "../styles.css";

function controller() {
  const linkObjProp = (obj, key, val) => {
    obj.property(key, val);
  };

  const linkObjIndex = (obj, index) => {
    linkObjProp(obj, "index", index);
  };

  const createList = (name) => {
    let newList = new callModel.List(name);
    linkObjIndex(newList, callModel.lists.length);
    return newList;
  };
  const linkNewList = (name) => {
    callModel.lists.push(createList(name));
  };

  const readList = (listIndex) => {
    return callModel.lists[listIndex];
  };
  const readListItem = (listIndex, itemIndex) => {
    return callModel.lists[listIndex].items[itemIndex];
  };
  const createItem = (name, listIndex) => {
    let newItem = new callModel.Item(name);
    linkObjIndex(newItem, callModel.lists[listIndex].items.length);
    return newItem;
  };
  const linkItem = (item, listIndex) => {
    return callModel.lists[listIndex].items.push(item);
  };
  const linkNewItem = (name, listIndex = 0) => {
    return linkItem(createItem(name, listIndex), listIndex);
  };

  const linkItemDesc = (item, desc) => {
    linkObjProp(item, "description", desc);
  };
  const linkItemDueDate = (item, year, month, day) => {
    linkObjProp(item, "dueDate", new Date(year, month - 1, day));
  };
  const linkItemPriority = (item, priority) => {
    linkObjProp(item, "priority", priority);
  };

  const deleteList = (listIndex) => {
    callModel.lists.splice(listIndex, 1);
    callModel.lists.forEach((list) => {
      list.index = callModel.lists.length - 1;
    });
  };

  const deleteItem = (itemIndex, listIndex) => {
    callModel.lists[listIndex].items.splice(itemIndex, 1);
    callModel.lists[listIndex].items.forEach((item) => {
      item.index = callModel.lists[listIndex].items.length - 1;
    });
  };

  return {
    linkObjProp,
    linkNewList,
    readList,
    readListItem,
    linkNewItem,
    linkItemDesc,
    linkItemDueDate,
    linkItemPriority,
    deleteList,
    deleteItem,
  };
}

const callController = controller();

callController.linkNewList("My To-Do List");
callController.linkNewList("My Wish List");
callController.linkNewItem("Go upstairs");
callController.linkNewItem("Go downstairs");
callController.linkNewItem("A puppy", 1);

callController.linkItemDesc(callController.readListItem(1, 0), "Labrador");
callController.linkItemDueDate(callController.readListItem(1, 0), 2025, 12, 25);

callView.displayMessage(callModel.lists);
callView.displayLists(callModel.lists);
