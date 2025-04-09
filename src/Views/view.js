export { callView };

function view() {
  const displayMessage = function (message) {
    return console.log(message);
  };
  const displayList = function (list) {
    displayMessage(list.name);
    list.items.forEach((element) => {
      displayMessage(`-${element.name}`);
    });
    displayMessage("");
  };
  const displayLists = function (lists) {
    lists.forEach((element) => {
      displayList(element);
    });
  };
  const displayProps = function (item) {
    Object.entries(item).forEach(([key, val]) => {
      displayMessage(`${key}: ${val}`);
    });
    displayMessage("");
  };

  const createDiv = () => {
    return document.createElement("div");
  };
  const createButton = () => {
    return document.createElement("button");
  };

  const displayPage = () => {
    const container = document.querySelector(".container");
    container.appendChild(createDiv());
    container.lastChild.classList.add("sidebar");
    container.appendChild(createDiv());
    container.lastChild.classList.add("items");

    const sidebar = document.querySelector(".sidebar");
    sidebar.appendChild(createButton());
    sidebar.lastChild.classList.add("btn-list");
    sidebar.lastChild.textContent = "Add List";
    sidebar.appendChild(createDiv());
    sidebar.lastChild.classList.add("lists");
  };

  return { displayMessage, displayList, displayLists, displayProps, displayPage };
}

const callView = view();
