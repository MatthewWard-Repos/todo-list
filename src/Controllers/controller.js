import { model } from "../Models/model";
import { view } from "../Views/view";
const controlModel = model();
const controlView = view();

function controller() {
  const createList = (name) => {
    return new controlModel.List(name);
  };
  const linkNewList = (name) => {
    controlModel.lists.push(createList(name));
  };

  const createItem = (name) => {
    return new controlModel.Item(name);
  };
  const LinkItem = (item, listIndex) => {
    return controlModel.lists[listIndex].items.push(item);
  };
  const linkNewItem = (name, listIndex = 0) => {
    return LinkItem(createItem(name), listIndex);
  };
  return { linkNewList, linkNewItem };
}

const controlController = controller();

controlController.linkNewList("My To-Do List");
controlController.linkNewList("My Wish List");
controlController.linkNewItem("Go upstairs");
controlController.linkNewItem("A puppy", 1);
controlView.displayMessage(controlModel.lists);
controlView.displayLists(controlModel.lists);

window.controlController = controlController;

// linkNewList("initial");
// linkNewItem(["todo"]);
// linkNewItem(["test"]);
// linkNewItem(["bob"]);
// linkNewList("list 2");
// linkNewItem(["todo"], 1);
// linkNewItem(["test"], 1);
// linkNewItem(["bob"], 1);
// window.displayList = displayList;
// window.displayLists = displayLists;
// window.lists = lists;
// window.linkNewList = linkNewList;
// window.linkNewItem = linkNewItem;
