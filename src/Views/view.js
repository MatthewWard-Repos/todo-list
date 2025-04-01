export { view };

function view() {
  const displayMessage = function (message) {
    return console.log(message);
  };
  const displayList = function (list) {
    displayMessage(list.name);
    list.items.forEach((element) => {
      displayMessage(`-${element.name}`);
      displayMessage("");
    });
  };
  const displayLists = function (lists) {
    lists.forEach((element) => {
      displayList(element);
    });
  };

  return { displayMessage, displayList, displayLists };
}
