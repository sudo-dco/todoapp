import * as todos_dom from './modules/todos-dom.js';
import * as projects_dom from './modules/projects-dom.js';
import * as todos from './modules/todos.js';
//import * as projects from './modules/projects.js';
import "./style.css";

const main = (() => {
    let projectList = [];

    const generateRNG = () => { // use to assign random ID number to obj
        return Math.floor((Math.random() * 100) + 1);
    }

    const createProject = (name) => {
        let randomNum;
        //grab currently used ID's
        const ids = main.projectList.map((x) => {return x.id});

        do { // only use number if it's not already in use
            randomNum = generateRNG();
        }
        while (ids.includes(randomNum))
    
        const todoList = [];
    
        return {
            name,
            id: randomNum,
            todoList
        }
    }

    const objFinder = (idNum) => {
        let obj = projectList.find(({ id }) => id == idNum);

        return obj
    }

    const projectSelector = (() => {
        const projectButtons = document.querySelectorAll(".project-names");
        projectButtons.forEach((button) => {
            button.addEventListener("click", function (e) {
                //console.log(e.target.id);

                // clear todo list dom
                document.getElementById("todolist-container").innerHTML = "";
                
                // add todo list from newly selected project
                todos_dom.todoListDom.showTodoList(projectList[(e.target.id).charAt(e.target.id.length - 1)].todoList)
            })
        })
    })();

    console.log(projectList);

    return {
        projectList,
        createProject,
        objFinder
    }

})();

const makeExampleProject = (() => {
    main.projectList.push(main.createProject("Shopping"));
    main.projectList.push(main.createProject("Reading List"));
    main.projectList.push(main.createProject("Work"));

    
})();

const initProjList = (() => { // initialize project list
    projects_dom.func.createProjectList(main.projectList);
    const addDoms = projects_dom.func.createAddForm();
    console.log(addDoms);

    return {
        addDoms
    }
})();

const initProjBtns = (() => {   // initialize all project list button events
    projects_dom.func.delProjectBtn();
    projects_dom.func.editProjectBtn();
    projects_dom.func.editDoneBtn();
    //projects_dom.func.addProjectBtn();
})();

const makeExampleTodos = (() => {
    const todo1 = todos.createTodo("Pick up groceries","Things to pick up at grocery store","2020-4-8","high","This is an example note")
    main.projectList[0].todoList.push(todo1);

    const todo2 = todos.createTodo("Drop off mail at post office","Things to pick up at Home Depot","2020-4-10","low","This is an example note")
    main.projectList[0].todoList.push(todo2);

    const todo3 = todos.createTodo("Read Harry Potter","","2020-4-10","low","This is an example note")
    main.projectList[1].todoList.push(todo3);

    const todo4 = todos.createTodo("Read Clean Code","","2020-4-10","low","This is an example note")
    main.projectList[1].todoList.push(todo4);

    todos_dom.todoListDom.showTodoList(main.projectList[0].todoList);
    todos_dom.todoListDom.showAddForm();

})();

export { 
    main,
    initProjList
}


