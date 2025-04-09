export { callView };

function view() {
  const displayMessage = (message) => {
    return console.log(message);
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

  const displayName = (parent, obj) => {
    parent.appendChild(createDiv());
    parent.lastChild.textContent = obj.name;
    parent.lastChild.setAttribute("index", obj.index);
  };
  const displayLists = (lists) => {
    const allLists = document.querySelector(".lists");
    lists.forEach((list) => {
      displayName(allLists, list);
    });
  };
  const displayItems = (items) => {
    const allItems = document.querySelector(".items");
    items.forEach((item) => {
      displayName(allItems, item);
    });
  };

  const displayProps = (item) => {
    Object.entries(item).forEach(([key, val]) => {
      displayMessage(`${key}: ${val}`);
    });
    displayMessage("");
  };

  const addGlobalEventListener = (type, selector, callback) => {
    document.addEventListener(type, function (e) {
      if (e.target.matches(selector)) callback(e);
    });
  };

  return {
    displayMessage,
    displayName,
    displayLists,
    displayItems,
    displayProps,
    displayPage,
    addGlobalEventListener,
  };
}

const callView = view();
