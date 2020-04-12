/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! exports provided: main */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"main\", function() { return main; });\n/* harmony import */ var _modules_todos_dom_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/todos-dom.js */ \"./src/modules/todos-dom.js\");\n/* harmony import */ var _modules_projects_dom_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/projects-dom.js */ \"./src/modules/projects-dom.js\");\n/* harmony import */ var _modules_todos_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/todos.js */ \"./src/modules/todos.js\");\n/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./style.css */ \"./src/style.css\");\n/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_style_css__WEBPACK_IMPORTED_MODULE_3__);\n\n\n\n//import * as projects from './modules/projects.js';\n\n\nconst main = (() => {\n    let projectList = [];\n\n    const generateRNG = () => {\n        return Math.floor((Math.random() * 100) + 1);\n    }\n\n    const createProject = (name) => {\n        let randomNum;\n        //grab currently used ID's\n        const ids = main.projectList.map((x) => {return x.id});\n\n        do {\n            randomNum = generateRNG();\n        }\n        while (ids.includes(randomNum))\n    \n        const todoList = [];\n    \n        return {\n            name,\n            id: randomNum,\n            todoList\n        }\n    }\n\n    const objFinder = (idNum) => {\n        let obj = projectList.find(({ id }) => id == idNum);\n\n        return obj\n    }\n\n    const projectSelector = (() => {\n        const projectButtons = document.querySelectorAll(\".project-names\");\n        projectButtons.forEach((button) => {\n            button.addEventListener(\"click\", function (e) {\n                //console.log(e.target.id);\n\n                // clear todo list dom\n                document.getElementById(\"todolist-container\").innerHTML = \"\";\n                \n                // add todo list from newly selected project\n                _modules_todos_dom_js__WEBPACK_IMPORTED_MODULE_0__[\"todoListDom\"].showTodoList(projectList[(e.target.id).charAt(e.target.id.length - 1)].todoList)\n            })\n        })\n    })();\n\n    console.log(projectList);\n\n    return {\n        projectList,\n        createProject,\n        objFinder\n    }\n\n})();\n\nconst makeExampleProject = (() => {\n    main.projectList.push(main.createProject(\"Shopping\"));\n    main.projectList.push(main.createProject(\"Reading List\"));\n    main.projectList.push(main.createProject(\"Work\"));\n\n    // need to run these after removing examples\n    _modules_projects_dom_js__WEBPACK_IMPORTED_MODULE_1__[\"projectsListDom\"].createProjectList(main.projectList);\n    _modules_projects_dom_js__WEBPACK_IMPORTED_MODULE_1__[\"projectsListDom\"].editProjectBtn();\n    _modules_projects_dom_js__WEBPACK_IMPORTED_MODULE_1__[\"projectsListDom\"].delProjectBtn();\n    _modules_projects_dom_js__WEBPACK_IMPORTED_MODULE_1__[\"projectsListDom\"].editProjectBtn();\n\n    _modules_projects_dom_js__WEBPACK_IMPORTED_MODULE_1__[\"projectsListDom\"].showProjectAddForm();\n})();\n\nconst makeExampleTodos = (() => {\n    const todo1 = _modules_todos_js__WEBPACK_IMPORTED_MODULE_2__[\"createTodo\"](\"Pick up groceries\",\"Things to pick up at grocery store\",\"2020-4-8\",\"high\",\"This is an example note\")\n    main.projectList[0].todoList.push(todo1);\n\n    const todo2 = _modules_todos_js__WEBPACK_IMPORTED_MODULE_2__[\"createTodo\"](\"Drop off mail at post office\",\"Things to pick up at Home Depot\",\"2020-4-10\",\"low\",\"This is an example note\")\n    main.projectList[0].todoList.push(todo2);\n\n    const todo3 = _modules_todos_js__WEBPACK_IMPORTED_MODULE_2__[\"createTodo\"](\"Read Harry Potter\",\"\",\"2020-4-10\",\"low\",\"This is an example note\")\n    main.projectList[1].todoList.push(todo3);\n\n    const todo4 = _modules_todos_js__WEBPACK_IMPORTED_MODULE_2__[\"createTodo\"](\"Read Clean Code\",\"\",\"2020-4-10\",\"low\",\"This is an example note\")\n    main.projectList[1].todoList.push(todo4);\n\n    _modules_todos_dom_js__WEBPACK_IMPORTED_MODULE_0__[\"todoListDom\"].showTodoList(main.projectList[0].todoList);\n    _modules_todos_dom_js__WEBPACK_IMPORTED_MODULE_0__[\"todoListDom\"].showAddForm();\n\n})();\n\n\n\n\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/modules/projects-dom.js":
/*!*************************************!*\
  !*** ./src/modules/projects-dom.js ***!
  \*************************************/
/*! exports provided: projectsListDom */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"projectsListDom\", function() { return projectsListDom; });\n/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../index.js */ \"./src/index.js\");\n\n\nconst projectsListDom = (() => {\n    let targetId;\n\n    const _projectListDiv = document.getElementById(\"projectslist\");\n\n    const createProjectList = (list) => {    // show list of projects\n            let listDiv = document.createElement(\"div\");\n            listDiv.id = \"projects-container\";\n            listDiv.innerHTML = \"<h2>Projects:</h2>\";\n            _projectListDiv.append(listDiv);\n        \n        list.forEach((obj) => {\n            let newProject = document.createElement(\"div\");\n            newProject.id = `project-div-${obj.id}`;\n            newProject.classList.add(\"project-divs\");\n            newProject.innerHTML = `\n                <h3 id=\"project-name-${obj.id}\" class=\"project-names\">${obj.name}</h3>\n                <button type=\"button\" id=\"edit-btn-${obj.id}\" class=\"project-edit-btn\">Edit</button>\n                <button type=\"button\" id=\"del-btn-${obj.id}\" class=\"project-del-btn\">Delete</button>\n            `\n            listDiv.append(newProject);\n        });\n\n    };\n\n    const showDefaultProject = () => {\n        // always show projectList[0] on load\n    }\n\n    const projectEditForm = (() => { // creates edit form\n        const editForm = document.createElement(\"div\");\n        editForm.id = \"edit-form\";\n        editForm.style.display = \"none\";\n        editForm.innerHTML = `\n            <label for=\"edit-title\">Project Name:</label>\n            <input type=\"text\" id=\"edit-title\">\n            <button type=\"button\" id=\"edit-done\">Apply</button>\n        `\n\n        _projectListDiv.append(editForm);\n\n    })();\n\n    const editProjectBtn = () => { // add btn functionality\n        const editBtns = document.querySelectorAll(\".project-edit-btn\");\n\n        editBtns.forEach(btn => {\n            btn.addEventListener(\"click\", function (e) {\n                targetId = e.target.id.slice(-2);\n\n                toggleProjectEditForm(\"open\");\n            })\n        })\n    }\n\n    const editDoneBtn = () => {\n        document.getElementById(\"edit-done\").addEventListener(\"click\", function () {\n\n            toggleProjectEditForm(\"close\");\n            updateAll();\n        });\n    }\n\n    const toggleProjectEditForm = (action) => {\n        const editFormBtn = document.getElementById(\"edit-form\");\n        \n        if (action == \"open\") {\n            editFormBtn.style.display = \"block\";\n        }\n        else {\n            editFormBtn.style.display = \"none\";\n        }\n\n    }\n\n    const updateAll = () => {\n        updateObj(targetId);       \n        updateHTML(targetId);\n    }\n\n    const updateObj = (idNum) => {\n            let obj = _index_js__WEBPACK_IMPORTED_MODULE_0__[\"main\"].projectList.find(({ id }) => id == idNum);\n\n            obj.name = document.getElementById(\"edit-title\").value;\n\n            console.log(_index_js__WEBPACK_IMPORTED_MODULE_0__[\"main\"].projectList);\n    }\n\n    const updateHTML = (idNum, action) => {\n        // use id to find obj\n        let obj = _index_js__WEBPACK_IMPORTED_MODULE_0__[\"main\"].projectList.find(({ id }) => id == idNum);\n\n        if (action == \"delete\") {\n            document.getElementById(`project-div-${idNum}`).remove();\n        }\n        else {\n            // get h3 and update innertext\n            document.getElementById(`project-name-${idNum}`).innerText = obj.name;\n        }\n    }\n\n    const delProjectBtn = () => {\n        const delBtns = document.querySelectorAll(\".project-del-btn\");\n\n        delBtns.forEach(btn => {\n            btn.addEventListener(\"click\", function (e) {\n                //take id and pass it to del function\n                const id = e.target.id.slice(-2);\n\n                delProject(id);\n            })\n        })\n    };\n\n    const delProject = (idNum) => {\n        // find obj index and delete it from array\n        let index = _index_js__WEBPACK_IMPORTED_MODULE_0__[\"main\"].projectList.findIndex(({ id }) => id == idNum);\n        _index_js__WEBPACK_IMPORTED_MODULE_0__[\"main\"].projectList.splice(index, 1);\n\n        console.log(_index_js__WEBPACK_IMPORTED_MODULE_0__[\"main\"].projectList);\n\n        // run updatehtml to delete div\n        updateHTML(idNum, \"delete\");\n    }\n\n    const showProjectAddForm = () => {\n        const projectAddFormContainer = document.createElement(\"div\");\n        projectAddFormContainer.id = \"project-addformcontainer\";\n\n        const projectTitle = () => {    // input for project name\n            const projTitle = document.createElement(\"input\");\n            projTitle.id = \"proj-title\";\n            projTitle.type = \"text\";\n            projectAddFormContainer.append(projTitle);\n        };\n    \n        const addProject = () => {     // add new project button\n            const projAdd = document.createElement(\"button\");\n            projAdd.id = \"proj-add\";\n            projAdd.innerText = \"Add\";\n            projectAddFormContainer.append(projAdd);\n        };\n\n        projectTitle();\n        addProject();\n\n        _projectListDiv.append(projectAddFormContainer);\n    }\n\n    return {\n        createProjectList,\n        showProjectAddForm,\n        editProjectBtn,\n        delProjectBtn,\n        editProjectBtn,\n        editDoneBtn\n    }\n\n})();\n\n\n\n//# sourceURL=webpack:///./src/modules/projects-dom.js?");

/***/ }),

/***/ "./src/modules/todos-dom.js":
/*!**********************************!*\
  !*** ./src/modules/todos-dom.js ***!
  \**********************************/
/*! exports provided: todoListDom, editTodosDom */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"todoListDom\", function() { return todoListDom; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"editTodosDom\", function() { return editTodosDom; });\nconst todoListDom = (() => {\n    const _todosListDiv = document.getElementById(\"todoslist\");\n\n    // show todo list in div\n    const showTodoList = (list) => {\n        let listDiv;\n\n        if (document.getElementById(\"todolist-container\") == null) {\n            listDiv = document.createElement(\"div\");\n            listDiv.id = \"todolist-container\";\n            _todosListDiv.append(listDiv);\n        }\n        else {\n            listDiv = document.getElementById(\"todolist-container\");\n        }\n        \n        list.forEach((obj, i) => {\n            let newTodo = document.createElement(\"div\");\n            newTodo.id = `todo-${i}`;\n            newTodo.classList.add(\"todo-titles\");\n            newTodo.innerHTML = `\n                <h3>${obj.title}<h3>\n                <p>${obj.desc}</p>\n                <p>${obj.dueDate}</p>\n                <p>${obj.priority}</p>\n                <button type=\"button\">Expand</button>\n                <button type=\"button\">Delete</button>\n            `\n            listDiv.append(newTodo);\n        });\n        \n        \n    } \n\n    // show todo add box\n    const showAddForm = () => {\n        const addForm = document.createElement(\"div\");\n        addForm.id = \"todo-addformcontainer\";\n        addForm.innerHTML = `\n            <label for=\"todo-title\">Title:</label>\n            <input type=\"text\" id=\"todo-title\">\n\n            <label for=\"todo-desc\">Description:</label>\n            <input type=\"text\" id=\"todo-desc\">\n\n            <label for=\"todo-date\">Date:</label>\n            <input type=\"date\" id=\"todo-date\" min=\"2020-4-7\">\n            \n            <label for=\"todo-priority\">Priority:</label>\n            <select id=\"todo-priority\">\n                <option value=\"high\">High</option>\n                <option value=\"normal\">Normal</option>\n                <option value=\"low\">Low</option>\n            </select>\n\n            <label for=\"todo-notes\">Notes:</label>\n            <textarea id=\"todo-notes\" cols=\"25\" rows=\"7\">Example Notes</textarea>\n            <button type=\"button\">Add</button>\n        `\n        _todosListDiv.append(addForm);\n    }\n\n    // get todos info\n    const getTodoInfo = () => {\n        const title = document.getElementById(\"todo-title\");\n        const desc = document.getElementById(\"todo-desc\");\n        const dueDate = document.getElementById(\"todo-date\");\n        const priority = document.getElementById(\"todo-priority\");\n        const notes = document.getElementById(\"todo-notes\");\n\n        return {\n            title,\n            desc,\n            dueDate,\n            priority,\n            notes\n        }\n    }\n    \n    // add todo to div\n    const todosAdd = (obj) => {\n\n    }\n\n    // remove to do from div\n\n    // expand button\n\n    //checkbox\n\n    const clearTodoDom = () => {\n        const listDiv = document.getElementById(\"todolist-container\");\n        listDiv.innerHTML = \"\";\n    }\n\n    return {\n        showTodoList,\n        showAddForm\n    }\n\n})();\n\nconst editTodosDom = (() => {\n    const editTodoDiv = document.getElementById(\"todo-list\");\n\n    // option to change date button\n    //document.getElementById(\"todo-date\").value = obj.dueDate;\n\n    // option to change priority\n    // set priority to match obj priority\n    //document.getElementById(\"todo-priority\").value = obj.priority;\n\n    // show notes box\n\n    // create save button\n\n})();\n\n\n\n//# sourceURL=webpack:///./src/modules/todos-dom.js?");

/***/ }),

/***/ "./src/modules/todos.js":
/*!******************************!*\
  !*** ./src/modules/todos.js ***!
  \******************************/
/*! exports provided: createTodo */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"createTodo\", function() { return createTodo; });\nconst createTodo = (title, desc, dueDate, priority, notes) => {\n    \n    const addToList = () => {\n        \n    }\n\n    return {\n        title,\n        desc,\n        dueDate,\n        priority,\n        notes\n    }\n};\n\nconst addTodo = (obj) => {\n    todoList.push(obj);\n}\n\nconst removeTodo = () => {\n\n}\n\nconst editTodo = () => {\n\n}\n\nconst todoComplete = () => {\n\n}\n\nconst changeDate = () => {\n\n}\n\nconst changeNotes = () => {\n\n}\n\nconst changeTodoPriority = () => {\n\n}\n\nconst saveTodoChanges = () => {\n\n}\n\n\n\n//# sourceURL=webpack:///./src/modules/todos.js?");

/***/ }),

/***/ "./src/style.css":
/*!***********************!*\
  !*** ./src/style.css ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n\n//# sourceURL=webpack:///./src/style.css?");

/***/ })

/******/ });