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
  const createInput = () => {
    return document.createElement("input");
  };

  const createForm = () => {
    return document.createElement("form");
  };

  const displayPage = () => {
    const container = document.querySelector(".container");
    container.appendChild(createDiv());
    container.lastChild.classList.add("sidebar");
    container.appendChild(createDiv());
    container.lastChild.classList.add("main-body");

    const sidebar = document.querySelector(".sidebar");

    sidebar.appendChild(createDiv());
    sidebar.lastChild.classList.add("lists");
    sidebar.appendChild(createButton());
    sidebar.lastChild.classList.add("btn-list");
    sidebar.lastChild.textContent = "Add List";

    const mainBody = document.querySelector(".main-body");
    mainBody.appendChild(createDiv());
    mainBody.lastChild.classList.add("items");
    mainBody.appendChild(createButton());
    mainBody.lastChild.classList.add("btn-item");
    mainBody.lastChild.textContent = "Add Item";

    sidebar.appendChild(createForm());
    toggleHidden(sidebar.lastChild);
    sidebar.lastChild.classList.add("list-form");

    getListForm().appendChild(createInput());
    getListForm().lastChild.classList.add("list-input");

    getListInput().setAttribute("type", "text");
    getListInput().setAttribute("placeholder", "My To-Do List...");
    getListForm().appendChild(createButton());
    getListForm().lastChild.classList.add("btn-input-yes");
    getListForm().lastChild.textContent = "✓";
    getListForm().lastChild.setAttribute("type", "submit");
    getListForm().appendChild(createButton());
    getListForm().lastChild.classList.add("btn-input-no");
    getListForm().lastChild.textContent = "𐄂";
  };

  const displayName = (parent, obj, cls) => {
    parent.appendChild(createDiv());
    parent.lastChild.classList.add(cls);
    parent.lastChild.textContent = obj.name;
    parent.lastChild.setAttribute("index", obj.index);
  };

  const getAllLists = () => {
    const allLists = document.querySelector(".lists");
    return allLists;
  };

  const displayLists = (lists) => {
    lists.forEach((list) => {
      displayName(getAllLists(), list, "list");
    });
  };

  const getListForm = () => {
    const listform = document.querySelector(".list-form");
    return listform;
  };
  const getListInput = () => {
    const listInput = document.querySelector(".list-input");
    return listInput;
  };

  const displayItems = (items) => {
    const allItems = document.querySelector(".items");
    items.forEach((item) => {
      displayName(allItems, item, "item");
    });
  };

  const displayProps = (item) => {
    Object.entries(item).forEach(([key, val]) => {
      displayMessage(`${key}: ${val}`);
    });
    displayMessage("");
  };

  const deleteChildDivs = (parent) => {
    while (parent.firstChild) {
      parent.firstChild.remove();
    }
  };

  const addGlobalEventListener = (type, selector, callback) => {
    document.addEventListener(type, function (e) {
      if (e.target.classList.contains(selector)) callback(e);
    });
  };

  const toggleHidden = (element) => {
    element.classList.toggle("hidden");
  };

  return {
    displayMessage,
    displayName,
    displayLists,
    getAllLists,
    getListForm,
    getListInput,
    displayItems,
    displayProps,
    displayPage,
    deleteChildDivs,
    addGlobalEventListener,
    toggleHidden,
  };
}

const callView = view();
