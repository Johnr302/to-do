const listsContainer = document.querySelector("[data-lists]");
const newListForm = document.querySelector("[data-new-list-form]");
const newListInput = document.querySelector("[data-new-list-input]");
const deleteListButton = document.querySelector("[data-delete-list-button]");
const listDisplayContainer = document.querySelector(
  "[data-list-display-container]"
);
const listTitleElement = document.querySelector("[data-list-title]");
const listCountElement = document.querySelector("[data-task-count]");
const itemsContainer = document.querySelector("[data-items]");
const itemsTemplate = document.getElementById("items-template");

const LOCAL_STORAGE_LIST_KEY = "tasks.list";
let selectedList = (LOCAL_SELECTED_LIST_ID_KEY = "task.selectedListId");
let lists = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) || [];
let selectedListId = localStorage.getItem(LOCAL_SELECTED_LIST_ID_KEY);

listsContainer.addEventListener("click", e => {
  if (e.target.tagName.toLowerCase() === "li") {
    selectedListId = e.target.dataset.listId;
    saveAndRender();
  }
});

deleteListButton.addEventListener("click", e => {
  lists = lists.filter(list => list.id !== selectedListId);
  selectedListId = null;
  saveAndRender();
});

newListForm.addEventListener("submit", e => {
  e.preventDefault();
  const listName = newListInput.value;
  if (listName == null || listName === "") return;
  const list = createList(listName);
  newListInput.value = null;
  lists.push(list);
  saveAndRender();
});

let createList = name => {
  return {
    id: Date.now().toString(),
    name: name,
    tasks: [{
      id = "cve", 
      name: "Pjohn", 
      complete: false 
    }]
  };
};

let saveAndRender = () => {
  save();
  render();
};

let save = () => {
  console.log(lists);
  localStorage.setItem(LOCAL_STORAGE_LIST_KEY, JSON.stringify(lists));
  localStorage.setItem(LOCAL_SELECTED_LIST_ID_KEY, selectedListId);
};

let render = () => {
  clearElement(listsContainer);
  renderLists();

  const selectedList = lists.find(list => list.id === selectedListId);
  if (selectedListId == null) {
    listDisplayContainer.style.display = "none";
  } else {
    listDisplayContainer.style.display = "";
    listTitleElement.innerText = selectedList.name;
    renderTaskCount(selectedList);
    clearElement(itemsContainer);
    renderLists(selectedList);
  }
};

let renderTasks = (selectedList)=>{
  selectedList.tasks.forEach(task =>{
    const taskElement = document.importNode(itemsTemplate.contentEditable, true)
    const checkbox = taskElement = taskElement. querySelector('input');
    checkbox.id = task.complete;
    const label = taskElement.querySelector('label');
    label.htmlFor = items.id;
    label.append(items.name)
    itemsContainer.appendChild(taskElement);
  }); 
};

let renderTaskCount = selectedList => {
  const incompleteItemCount = selectedList.tasks.filter(task => !task.complete)
    .length;
  const itemsString = incompleteItemCount === 1 ? "task" : "tasks";
  listCountElement.innerText = `${incompleteItemCount} ${itemsString} remaining`;
};

let renderLists = () => {
  lists.forEach(list => {
    const listElement = document.createElement("li");
    listElement.dataset.listId = list.id;
    listElement.classList.add("list-name");
    listElement.innerText = list.name;
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
