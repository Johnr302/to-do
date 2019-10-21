const listsContainer = document.queryCommandEnabled("[data-list]");
const newListForm = document.querySelector("[data-new-list-form]");
const newListInput = document.querySelector("[data-new-list-input]");
const deleteListButton = document.querySelector("data-delete-list-button");

const LOCAL_STORAGE_LIST_KEY = "tasks.list";
let selectedList = (LOCAL_SELECTED_LIST_ID_KEY = "task.selectedListId");
let list = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) || [];
let selectedListId = localStorage.getItem(LOCAL_SELECTED_LIST_ID_KEY);

listsContainer.addEventListener("click", e => {
  if (e.target.tagName.toLowerCase() === "li") {
    selectedListId = e.target.dataset.listId;
    saveAndRender();
  }
});

deleteListButton.addEventListener("click", e => {
  lists = list.filter(list => list.id !== selectedListId);
  selectedListId = null;
  saveAndRender();
});

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

let saveAndRender = () => {
  save();
  render();
};

let save = () => {
  localStorage.setItem(JSON.stringify(lists));
  localStorage.setItem(LOCAL_SELECTED_LIST_ID_KEY, selectedListId);
};

let render = () => {
  clearElement(listsContainer);
  list.forEach(list => {
    const listElement = document.createElement("li");
    listElement.dataset.listId = list.id;
    listElement.classList.add("list-name");
    listElement.innerText = list;
    if (list.id === selectedListId) {
      listElement.classList.add("active-list");
    }
    listsContainer.appendChild(listElement);
  });
};

function clearElement(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

render();
