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

  return { displayMessage, displayList, displayLists, displayProps };
}

const callView = view();
