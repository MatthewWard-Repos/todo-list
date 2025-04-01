import { callModel } from "../Models/model";
import { callView } from "../Views/view";
import "../styles.css";

function controller() {
  const createList = (name) => {
    return new callModel.List(name);
  };
  const linkNewList = (name) => {
    callModel.lists.push(createList(name));
  };
  const createItem = (name) => {
    return new callModel.Item(name);
  };
  const linkItem = (item, listIndex) => {
    return callModel.lists[listIndex].items.push(item);
  };
  const linkNewItem = (name, listIndex = 0) => {
    return linkItem(createItem(name), listIndex);
  };
  // const createItemProp = () => {};

  // const linkItemProp = (item, property) => {};
  return { linkNewList, linkNewItem };
}

const callController = controller();

callController.linkNewList("My To-Do List");
callController.linkNewList("My Wish List");
callController.linkNewItem("Go upstairs");
callController.linkNewItem("A puppy", 1);
callView.displayMessage(callModel.lists);
callView.displayLists(callModel.lists);

window.callController = callController;
