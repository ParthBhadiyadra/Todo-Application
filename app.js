const form = document.getElementById("itemform");
const TodoItem = document.getElementById("itemvalue");
const ItemList = document.getElementById("itemlist");
const ClearAll = document.getElementById("clear-list");

let TaskList = [];
// check input filed is empty if yes the show alert message other wise add item in the local storage
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const inputValue = TodoItem.value;
    if (inputValue.length === 0) {
        swal("Error", "Enter The value !", "error");
    } else {
        TaskList.push(inputValue); // add input value into TaskList array
        addTOLoaclStorage(TaskList); // call function to stored value
        getList(TaskList); // call function to show list in borwser
    }
    TodoItem.value = "";
});

// To stored Task Into Local Storage of Browser
const addTOLoaclStorage = (MyList) => {
    localStorage.setItem("TaskList", JSON.stringify(MyList));
};

// get List of Task
const getList = (MyList) => {
    ItemList.innerHTML = "";

    MyList.forEach((Item) => {
        const MyListAttributes = `<div class="row border border-dark m-1" id="item">
            <div class="col-8 ps-5 pt-2">
               <h5 id="item-name" class="text-start text-capitalize">${Item}</h5>
            </div>
            <div class="col-3">
             <a href="#" id="edit-item"><i class="far fa-edit text-primary icon "></i></a>
             <a href="#" id="delete-item"> <i class="far fa-times-circle text-danger icon" aria-hidden="true"></i></a>
            </div>
         </div>`;

        ItemList.insertAdjacentHTML("beforeend", MyListAttributes);
        handleTaskAction(Item);
    });
};

// Action handler function for edit and delete
const handleTaskAction = (taskValue) => {
    const items = document.querySelectorAll("#item");
    // console.log(items);
    items.forEach((item) => {
        if (item.querySelector("#item-name").textContent === taskValue) {
            item.querySelector("#edit-item").addEventListener("click", () => {
                TodoItem.value = taskValue;
                ItemList.removeChild(item);
                TaskList = TaskList.filter((temp) => {
                    return temp !== taskValue;
                });
            });
            item.querySelector("#delete-item").addEventListener("click", () => {
                ItemList.removeChild(item);
                TaskList = TaskList.filter((temp) => {
                    return temp !== taskValue;
                });
            });
        }
    });
};

const showStoredTask = () => {
    const LocatStorage = localStorage.getItem("TaskList");
    if (LocatStorage === 'undefined' || LocatStorage === null) {
        TaskList = [];
    } else {
        TaskList = JSON.parse(LocatStorage);
        getList(TaskList);
    }

};
showStoredTask();

const ClearAllTast =
    ClearAll.addEventListener("click", () => {
        TaskList = [];
        localStorage.clear();
        getList(TaskList);
    });