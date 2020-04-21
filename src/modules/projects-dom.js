import { main, initProjList } from '../index.js'

const func = (() => {
    let targetId;

    const _projectListDiv = document.getElementById("projectslist");

    const createProjectList = (list) => {    // show list of projects
            let listDiv = document.createElement("div");
            listDiv.id = "projects-container";
            listDiv.innerHTML = "<h2>Projects:</h2>";
            _projectListDiv.append(listDiv);
        
        if (list) {
            list.forEach((obj) => {
                listDiv.append(projectTemplate(obj));
            });
        }
    
        return listDiv;

    };

    const projectTemplate = (obj) => {
        let newProject = document.createElement("div");
        newProject.id = `project-div-${obj.id}`;
        newProject.classList.add("project-divs");

        const header = document.createElement("h3");
        header.id = `project-name-${obj.id}`;
        header.classList.add("project-names");
        header.innerText = `${obj.name}`;
        header.addEventListener("click", function (e) {
            initProjList.projectSelector(e.target);
        })
        newProject.append(header);

        const editBtn = document.createElement("button");
        editBtn.id = `edit-btn-${obj.id}`;
        editBtn.classList.add("project-edit-btn");
        editBtn.innerText = "Edit";
        editBtn.addEventListener("click", function (e) {
            targetId = e.target.id.slice(-2);
            toggleProjectEditForm("open");
        })
        newProject.append(editBtn);

        const delBtn = document.createElement("button");
        delBtn.id = `del-btn-${obj.id}`;
        delBtn.classList.add("project-del-btn");
        delBtn.innerText = "Delete";
        delBtn.addEventListener("click", function (e) {
            targetId = e.target.id.slice(-2);
            delProject(targetId);
        })
        newProject.append(delBtn);

        return newProject;
    }

    const projectEditForm = (() => { // creates edit form
        const editForm = document.createElement("div");
        editForm.id = "edit-form";
        editForm.style.display = "none";
        editForm.innerHTML = `
            <label for="edit-title">Project Name:</label>
        `
        const editTitleBox = document.createElement("input");
        editTitleBox.id = "edit-title";
        editTitleBox.type = "text";
        editForm.append(editTitleBox);

        const editDoneBtn = document.createElement("button");
        editDoneBtn.id = "edit-done"
        editDoneBtn.innerText = "Apply Changes";
        editDoneBtn.addEventListener("click", function () {
            // check for text
            if (main.inputVaildation(editTitleBox)) {
                updateAll(editTitleBox); // takes in editTitleBox dom to pass to updateObj
                toggleProjectEditForm("close");
            }
        })
        editForm.append(editDoneBtn);

        const editCloseBtn = document.createElement("button");
        editCloseBtn.id = "edit-close";
        editCloseBtn.innerText = "Close";
        editCloseBtn.addEventListener("click", function () {
            toggleProjectEditForm("close");
        })
        editForm.append(editCloseBtn);

        _projectListDiv.append(editForm);

    })();


    const addProject = (name) => {
        // pass value to run create object
        const newProj = main.createProject(name);
        
        // push to array
        main.projectList.push(newProj)
        
        // update local storage
        localStorage.setItem("LSprojectList", JSON.stringify(main.projectList));

        // create html template and update project container
        initProjList.projListDom.append(projectTemplate(newProj))

        // set new project as selected and show new todo list
        initProjList.projectSelector(document.getElementById(`project-name-${newProj.id}`));
    }

    const toggleProjectEditForm = (action) => {
        const editForm = document.getElementById("edit-form");

        if (action == "open") {
            editForm.style.display = "block";
        }
        else {
            editForm.style.display = "none";

            editForm.children[1].value = "";
        }

    }

    const updateAll = (dom) => {
        updateObj(targetId, dom);       
        updateHTML(targetId);
    }

    const updateObj = (idNum, dom) => {
        let obj = main.projectList.find(({ id }) => id == idNum);
        obj.name = dom.value;

        // update local storage
        localStorage.setItem("LSprojectList", main.projectList)

        console.log(main.projectList);
    }

    const updateHTML = (idNum, action) => {
        // use id to find obj
        let obj = main.projectList.find(({ id }) => id == idNum);

        if (action == "delete") {
            document.getElementById(`project-div-${idNum}`).remove();
        }
        else {
            // get h3 and update innertext
            document.getElementById(`project-name-${idNum}`).innerText = obj.name;
        }
    }

    const delProject = (idNum) => {
        // find obj index and delete it from array
        let index = main.projectList.findIndex(({ id }) => id == idNum);
        main.projectList.splice(index, 1);

        // update local storage
        localStorage.setItem("LSprojectList", JSON.stringify(main.projectList));

        console.log(main.projectList);

        // run updatehtml to delete div
        updateHTML(idNum, "delete");
    }

    const createAddForm = () => {
        const projectAddFormContainer = document.createElement("div");
        projectAddFormContainer.id = "project-addformcontainer";

        const projTitle = document.createElement("input");
        projTitle.id = "proj-title";
        projTitle.type = "text";
        projectAddFormContainer.append(projTitle);

        const projAdd = document.createElement("button");
        projAdd.id = "proj-add";
        projAdd.innerText = "Add";
        projAdd.addEventListener("click", function () {
            // check for text
            if (main.inputVaildation(projTitle)) {
                addProject(projTitle.value);
                main.clearInput(projTitle);
            }

            console.log(main.projectList);
        })
        projectAddFormContainer.append(projAdd);

        _projectListDiv.append(projectAddFormContainer);

        return {
            pAddFormTitle: projTitle,
            pAddFormBtn: projAdd
        }
    }

    return {
        createProjectList,
        createAddForm,
    }

})();

export { func }