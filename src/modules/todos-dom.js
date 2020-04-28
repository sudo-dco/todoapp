import * as todos from './todos.js';
import { main } from '../index.js'
import { parseISO, format } from 'date-fns';

const func = (() => {
    const _todosListDiv = document.getElementById("todoslist");

    const todoHTMLTemplate = (obj) => {
        // div for todo and description
        let newTodoContainer = document.createElement("div");
        newTodoContainer.classList.add("todo-containers");

        let newTodo = document.createElement("div");
        newTodo.id = `todo-${obj.id}`;
        newTodo.classList.add("todo-titles");

        const title = document.createElement("h3");
        title.id = `todo-html-title-${obj.id}`;
        title.classList.add("todo-html-titles");
        title.innerText = `${obj.title}`;
        newTodo.append(title);

        newTodo.innerHTML += `
            <p id="todo-html-dueDate-${obj.id}" class="todo-html-dueDates">${formatDate(obj.dueDate)}</p>
            <p id="todo-html-priority-${obj.id}" class="todo-html-priorities">${obj.priority}</p>
        `

        const expandBtn = document.createElement("span");
        expandBtn.id = `todo-expand-btn-${obj.id}`
        expandBtn.setAttribute("class", "far fa-edit");
        expandBtn.classList.add("todo-expand-btns");
        expandBtn.addEventListener("click", function (e) {
            // open todo add form with info filled in from todo
            expandTodo(e);
        })
        newTodo.append(expandBtn);

        const deleteBtn = document.createElement("span");
        deleteBtn.id = `todo-delete-btn-${obj.id}`
        deleteBtn.setAttribute("class", "far fa-trash-alt");
        deleteBtn.classList.add("todo-delete-btns");
        deleteBtn.addEventListener("click", function (e) {
            // delete todo from obj array
            deleteTodo(e);
        })
        newTodo.append(deleteBtn);

        const checkbox = document.createElement("input");
        checkbox.id = `checkbox-${obj.id}`;
        checkbox.type = "checkbox";
        checkbox.classList.add("todo-checkboxes");
        checkbox.addEventListener("change", function () {
            if (checkbox.checked) {
                document.getElementById(`todo-html-title-${obj.id}`).classList.add("strike-out");
            }
            else {
                document.getElementById(`todo-html-title-${obj.id}`).classList.remove("strike-out");
            }
        })

        // change checkbox color to priority color
        if (obj.priority == "low") {
            checkbox.classList.add("todo-low");
        }
        else if (obj.priority == "normal") {
            checkbox.classList.add("todo-normal");
        }
        else {
            checkbox.classList.add("todo-high");
        }

        newTodo.append(checkbox);

        const desc = document.createElement("p");
        desc.id = `todo-html-desc-${obj.id}`;
        desc.classList.add("todo-html-descs");
        desc.innerText = obj.desc;

        newTodoContainer.append(newTodo);
        newTodoContainer.append(desc);

        

        return newTodoContainer;
    }

    // show todo list in div
    const createTodoList = (arr) => { // takes in project todo array
            let listContainer = document.createElement("div");
            listContainer.id = "todolist-container";

            // btn for toggling add form div
            const showFormBtn = document.createElement("span");
            showFormBtn.id = "show-form-btn";
            showFormBtn.setAttribute("class", "far fa-plus-square");
            showFormBtn.addEventListener("click", function() {
                clearFields();
                toggleAddForm();
                toggleEditBtn();
            });
            _todosListDiv.append(showFormBtn);

            _todosListDiv.append(listContainer);
        

        if (arr) {
            populateTodoList(arr, listContainer);
        }
    }

    const populateTodoList = (arr, dom) => { // takes in project todo array
        arr.forEach((obj) => {
            dom.append(todoHTMLTemplate(obj));
        })
    }

    const formatDate = (date) => {
        return format(parseISO(date), 'MMMM do');
    }

    const toggleAddForm = (action) => {
        const addForm = document.getElementById("todo-add-form-div");

        if (addForm.style.display == "block" || action == "close") {
            addForm.style.display = "none";
        }
        else if (action == "open") {
            addForm.style.display = "block";
        }
        else {
            addForm.style.display = "block";
        }
    }

    // const showAddForm = () => {
    //     const showFormBtn = document.createElement("button");
    //     showFormBtn.id = "show-form-btn";
    //     showFormBtn.innerText = "Add";
    //     showFormBtn.addEventListener("click", function() {
    //         clearFields();
    //         toggleAddForm();
    //     });
    //     _todosListDiv.append(showFormBtn);
    // };

    // show todo add box
    const createAddForm = () => {
        const todoAddFormDiv = document.createElement("div");
        todoAddFormDiv.id = "todo-add-form-div";

        const addForm = document.createElement("form");
        addForm.id = "todo-addformcontainer";
        addForm.innerHTML = `
                <h3>Add New Todo</h3>
                <label for="todo-title">Title:</label>
                <input type="text" id="todo-title">

                <label for="todo-desc">Description:</label>
                <input type="text" id="todo-desc">

                <label for="todo-date">Date:</label>
                <input type="date" id="todo-dueDate" value=${format(new Date(), "yyyy-MM-dd")}>
                
                <label for="todo-priority">Priority:</label>
                <select id="todo-priority">
                    <option value="high" selected>High</option>
                    <option value="normal">Normal</option>
                    <option value="low">Low</option>
                </select>

                <label for="todo-notes">Notes:</label>
                <textarea id="todo-notes" cols="30" rows="7">Write a note</textarea>
        `

        const addBtn = document.createElement("span");
        addBtn.id = "todo-add-btn";
        addBtn.setAttribute("class", "far fa-check-circle");
        addBtn.addEventListener("click", function (e) {
            e.preventDefault();
            addTodo();
            toggleAddForm("close");
            console.log("AFTER ADD TODO: ", main.projectList);
        })
        addForm.append(addBtn);

        const editBtn = document.createElement("span");
        editBtn.id = "todo-edit-done";
        editBtn.setAttribute("class", "far fa-check-circle");
        editBtn.style.display = "none";
        editBtn.addEventListener("click", function (e) {
            //apply changes when done editing todo
            e.preventDefault();
            expandDone();
        })
        addForm.append(editBtn);

        const closeBtn = document.createElement("span");
        closeBtn.id = "todo-close-btn";
        closeBtn.setAttribute("class", "far fa-times-circle");
        closeBtn.addEventListener("click", function (e) {
            e.preventDefault();
            toggleAddForm("close");
        })
        addForm.append(closeBtn);

        todoAddFormDiv.append(addForm)

        _todosListDiv.append(todoAddFormDiv);
    }

    // create todo
    const addTodo = () => {
        // grab info from form, create todo object
        const newTodo = todos.createTodo(...getTodoInfo())
        
        console.log(newTodo);
        
        // find currently selected project and append to obj todolist
        let obj = findSelected();
        obj.todoList.push(newTodo);

        // update local storage
        updateLocalStorage();
        
        // create html template and append template to div
        document.getElementById("todolist-container").append(todoHTMLTemplate(newTodo))
    }

    // delete todo
    const deleteTodo = (e) => {
        // get todo obj id from e.target.id
        let idNum = e.target.id.slice(-2);

        // find project obj array
        let obj = findSelected();

        // find todo obj, find index in array, remove element from array
        let todoObj = obj.todoList.find(({ id }) => id == idNum);
        //console.log(obj.todoList.indexOf(todoObj));
        obj.todoList.splice(obj.todoList.indexOf(todoObj), 1);

        // update local storage
        updateLocalStorage();

        // remove html div id="todo-id"
        document.getElementById(`todo-${todoObj.id}`).remove();

        console.log("AFTER TODO DELETE: ", obj.todoList);
    }

    const expandTodo = (e) => {
        // check that add form is not already open
        toggleAddForm("close");

        // find project obj array
        let obj = findSelected();

        // use id to find todo obj
        let idNum = e.target.id.slice(-2);
        let todoObj = obj.todoList.find(({ id }) => id == idNum);

        // add data id to add form for expandDone function to find todo object
        selectedTodo(e);

        // fill in with info from selected todo
        fillTodoInfo(todoObj);

        //hide add button and show apply changes button
        toggleEditBtn("edit");

        // show add form with edit mode action
        toggleAddForm("open");
    }

    const expandDone = () => {
        // take new input values and apply them to todo obj
        const form = document.getElementById("todo-addformcontainer");
        
        // find project obj array
        let obj = findSelected();

        // GET ID # FROM EXPAND BTN
        let idNum = form.getAttribute("data-id");
        let todoObj = obj.todoList.find(({ id }) => id == idNum);
        
        // get old priority to pass to updatePriorityColor function
        let oldPriority = todoObj.priority;

        // update values in todo object
        for (let element of form.elements) {
            if (element.type != "submit") {
                todoObj[(element.id).split("-")[1]] = element.value;
            }
        }

        // update local storage
        updateLocalStorage();

        // UPDATE HTML
        updateHTML(todoObj);

        // UPDATE PRIORITY CHECKBOX COLOR
        updatePriorityColor(todoObj, oldPriority);

        toggleEditBtn("close")

        // CLOSE FORM
        toggleAddForm("close");

        console.log("AFTER APPLYING CHANGES: ", obj.todoList);
    }

    const toggleEditBtn = (action) => {
        const addBtn = document.getElementById("todo-add-btn")
        const editBtn = document.getElementById("todo-edit-done");

        if (action == "edit") {
            addBtn.style.display = "none";
            editBtn.style.display = "block";
        }
        else {
            addBtn.style.display = "block";
            editBtn.style.display = "none";
        }
        

    }

    const findSelected = () => {
        let obj;

        if (!document.querySelector(".selected")) { // if nothing selected, select first project in list
            document.getElementById(`project-name-${main.projectList[0].id}`).classList.add("selected");
        }
        else {
            let selected = document.querySelector(".selected");
            obj = main.objFinder(selected.id.slice(-2));
        }
        

        return obj;
    }

    const fillTodoInfo = (obj) => {
        const form = document.getElementById("todo-addformcontainer");

        for (let element of form.elements) {
            if (element.type != "submit") {
                //console.log((element.id).split("-")[1]);

                element.value = obj[(element.id).split("-")[1]];
            }
        }
    }

    // get todos info
    const getTodoInfo = () => {
        let info = [];

        const form = document.getElementById("todo-addformcontainer");

        for (let element of form.elements) {
            if (element.type != "submit") {
                info.push(element.value);
            }
        }

        return info;
    }

    const selectedTodo = (e) => {
        const form = document.getElementById("todo-addformcontainer");
        form.setAttribute("data-id", `${e.target.id.slice(-2)}`);
    }

    const updateHTML = (todoObj) => {
        // get todo div

        // loop through elements and update with info from todo object
        document.getElementById(`todo-html-title-${todoObj.id}`).innerText = todoObj["title"];
        document.getElementById(`todo-html-desc-${todoObj.id}`).innerText = todoObj["desc"];
        document.getElementById(`todo-html-dueDate-${todoObj.id}`).innerText = formatDate(todoObj["dueDate"]);
        document.getElementById(`todo-html-priority-${todoObj.id}`).innerText = todoObj["priority"];
    }

    // update checkbox color after user edits priority
    const updatePriorityColor = (todoObj, oldColor) => {
        let checkbox = document.getElementById(`checkbox-${todoObj.id}`);

        // remove class associated with priority color
        checkbox.classList.remove(`todo-${oldColor}`);

        // add new priority color class
        checkbox.classList.add(`todo-${todoObj.priority}`);
    }
    
    const clearFields = () => {
        const form = document.getElementById("todo-addformcontainer");
        for (let element of form.elements) {
            if (element.type != "submit") {
                if (element.type == "date") {
                    element.value = format(new Date(), "yyyy-MM-dd");
                }
                else {
                    element.value = "";
                }
            }
        }
    }

    const updateLocalStorage = () => {
        // update local storage
        localStorage.setItem("LSprojectList", JSON.stringify(main.projectList));
    }

    // const statusDone = (id) => {
    //     // strike out title when box is checked to show it's done
    //     const checkbox = document.getElementById(`checkbox-${id}`);
    //     checkbox.addEventListener("change", () => {
    //         if (checkbox.checked) {
    //             document.getElementById(`todo-html-title-${id}`).classList.add("strike-out");
    //         }
    //         else {
    //             document.getElementById(`todo-html-title-${id}`).classList.remove("strike-out");
    //         }
    //     })
    // }

    return {
        createTodoList,
        createAddForm,
        populateTodoList,
        toggleAddForm
    }

})();

export { 
    func
}