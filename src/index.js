import * as todos_dom from './modules/todos-dom.js';
import * as projects_dom from './modules/projects-dom.js';
import * as todos from './modules/todos.js';
//import * as projects from './modules/projects.js';
import { formatRelative, parseISO, formatDistance, isBefore, isAfter, format } from 'date-fns';
import "./style.css";

const main = (() => {
    function storageAvailable(type) {
        var storage;
        try {
            storage = window[type];
            var x = '__storage_test__';
            storage.setItem(x, x);
            storage.removeItem(x);
            return true;
        }
        catch(e) {
            return e instanceof DOMException && (
                // everything except Firefox
                e.code === 22 ||
                // Firefox
                e.code === 1014 ||
                // test name field too, because code might not be present
                // everything except Firefox
                e.name === 'QuotaExceededError' ||
                // Firefox
                e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
                // acknowledge QuotaExceededError only if there's something already stored
                (storage && storage.length !== 0);
        }
    }

    let projectList = [];

    if (storageAvailable('localStorage')) {
        if (!localStorage.getItem("LSprojectList")) {
            localStorage.setItem("LSprojectList", projectList);
        }
        else {
            projectList = JSON.parse(localStorage.getItem("LSprojectList"));
        }
    }

    const generateRNG = () => { // use to assign random ID number to obj
        let num = Math.floor((Math.random() * 100) + 1);

        if (/^\d$/.test(num)) {
            return `0 + ${num}`;
        }
        else {
            return num;
        }
    }

    const trackIDs = () => {
        const usedIDs = [0,1];
        let randomNum;

        do { // only use number if it's not already in use
            randomNum = generateRNG();
        }
        while (usedIDs.includes(randomNum))

        usedIDs.push(randomNum);

        return randomNum;
    }

    const createProject = (name) => {
        const todoList = [];
    
        return {
            name,
            id: trackIDs(),
            todoList
        }
    }

    const objFinder = (idNum) => {
        let obj = projectList.find(({ id }) => id == idNum);

        return obj
    }

    const inputVaildation = (dom) => {
        //if text is empty, change dom innertext to "enter a valid name"
        if (dom.value == "") {
            dom.value = "Please enter a valid name";
        }
        else {
            return true;
        }
    }

    const clearInput = (element) => {
        element.value = "";
    }

    document.getElementById("header").innerHTML = `
        <h3>ODIN PROJECT TODO LIST</h3>
        <p>Created by Daniel
    `

    console.log(projectList);

    return {
        projectList,
        createProject,
        objFinder,
        inputVaildation,
        clearInput,
        trackIDs
    }

})();

// const makeExampleProject = (() => {
//     main.projectList.push(main.createProject("Shopping"));
//     main.projectList.push(main.createProject("Reading List"));
//     main.projectList.push(main.createProject("Work"));
// })();

// const example = {
//     id: 0,
//     name: "Getting Started",
//     todoList: [
//         {
//             desc: "Things to pick up at grocery store",
//             dueDate: "2020-04-18",
//             id: 1,
//             notes: "This is an example note",
//             priority: "high",
//             title: "Example Note"
//         }
//     ]
// }

const initProjList = (() => { // initialize project list
    const projListDom = projects_dom.func.createProjectList(main.projectList);
    const addDoms = projects_dom.func.createAddForm();

    const showDefaultProject = (() => {
        // always show projectList[0] on load
        if (main.projectList[0]) {
            document.getElementById(`project-name-${main.projectList[0].id}`).classList.add("selected");
        }
    })();

    const showSelectedProj = (target) => {
        target.classList.add("selected");
    }

    const removeSelection = (selected) => {
        // query for project names class
        // for each project name, if not equal to e.target.id, remove class selected

        const headers = document.querySelectorAll(".project-names");

        headers.forEach((element) => {
            if (selected != element.id.slice(-2)) {
                element.classList.remove("selected");
            }
        })
    }
    
    const projectSelector = (target) => {
        // take id from selected header and find associated obj
        let currentSelection = main.objFinder(target.id.slice(-2));

        // clear selected class from other elements
        removeSelection(currentSelection);

        // add selected class to selected header
        showSelectedProj(target);

        // clear todo list DOM
        const todoContainer = document.getElementById("todolist-container");
        todoContainer.innerHTML = "";

        // populate new todos
        if (currentSelection.todoList) {
            todos_dom.func.populateTodoList(currentSelection.todoList, todoContainer);
        }
       
        // close add/expand form if it's open
        todos_dom.func.toggleAddForm("close");
    };

    return {
        projListDom,
        addDoms,
        projectSelector
    }
})();

const makeExampleTodos = (() => {
    // const todo1 = todos.createTodo("Pick up groceries", "Things to pick up at grocery store", "2020-04-18", "high", "This is an example note")
    // main.projectList[0].todoList.push(todo1);

    // const todo2 = todos.createTodo("Drop off mail at post office","Things to pick up at Home Depot","2020-04-18","low","This is an example note")
    // main.projectList[0].todoList.push(todo2);

    // const todo3 = todos.createTodo("Read Harry Potter","Example Desc","2020-04-18","low","This is an example note")
    // main.projectList[1].todoList.push(todo3);

    // const todo4 = todos.createTodo("Read Clean Code","Example Desc","2020-04-18","low","This is an example note")
    // main.projectList[1].todoList.push(todo4);
    
    if (main.projectList[0] != undefined) {
        todos_dom.func.createTodoList(main.projectList[0].todoList);
    }
    else {
        todos_dom.func.createTodoList();
    }
    
    // todos_dom.func.showAddForm();
    todos_dom.func.createAddForm();

})();

export { 
    main,
    initProjList
}


