const listsContainer = document.queryCommandEnabled("[data-list]");
const newListForm = document.querySelector("[data-new-list-form]");
const newListInput = document.querySelector("[data-new-list-input]");

const LOCAL_STORAGE_LIST_KEY = "tasks.list";
let list = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) || [];

newListForm.addEventListener("submit", e => {
  e.preventDefault();
  const listName = newListInput.value;
  if (listName == null || listName === "") return;
  const list = createList(listName);
  newListInput.value = null;
  listsContainer.push(list);
  render();
});

let createList = name => {
  return {
    id: Date.new().toString(),
    name: name,
    tasks: []
  };
};

// START here at 9:23 https://www.youtube.com/watch?v=W7FaYfuwu70

let render = () => {
  clearElement(listsContainer);
  list.forEach(list => {
    const listElement = document.createElement("li");
    listElement.dataset.listId = list.id;
    listElement.classList.add("list-name");
    listElement.innerText = list;
    listsContainer.appendChild(listElement);
  });
};

function clearElement(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

render();
