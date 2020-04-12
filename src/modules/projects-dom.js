import { main } from '../index.js'

const func = (() => {
    let targetId;

    const _projectListDiv = document.getElementById("projectslist");

    const createProjectList = (list) => {    // show list of projects
            let listDiv = document.createElement("div");
            listDiv.id = "projects-container";
            listDiv.innerHTML = "<h2>Projects:</h2>";
            _projectListDiv.append(listDiv);
        
        list.forEach((obj) => {
            let newProject = document.createElement("div");
            newProject.id = `project-div-${obj.id}`;
            newProject.classList.add("project-divs");
            newProject.innerHTML = `
                <h3 id="project-name-${obj.id}" class="project-names">${obj.name}</h3>
                <button type="button" id="edit-btn-${obj.id}" class="project-edit-btn">Edit</button>
                <button type="button" id="del-btn-${obj.id}" class="project-del-btn">Delete</button>
            `
            listDiv.append(newProject);
        });

    };

    const projectTemplate = (obj) => {
        let newProject = document.createElement("div");
        newProject.id = `project-div-${obj.id}`;
        newProject.classList.add("project-divs");
        newProject.innerHTML = `
            <h3 id="project-name-${obj.id}" class="project-names">${obj.name}</h3>
            <button type="button" id="edit-btn-${obj.id}" class="project-edit-btn">Edit</button>
            <button type="button" id="del-btn-${obj.id}" class="project-del-btn">Delete</button>
        `

        return newProject;
    }

    const showDefaultProject = () => {
        // always show projectList[0] on load
    }

    const projectEditForm = (() => { // creates edit form
        const editForm = document.createElement("div");
        editForm.id = "edit-form";
        editForm.style.display = "none";
        editForm.innerHTML = `
            <label for="edit-title">Project Name:</label>
            <input type="text" id="edit-title">
            <button type="button" id="edit-done">Apply</button>
        `

        _projectListDiv.append(editForm);

    })();

    const editProjectBtn = () => { // add btn functionality
        const editBtns = document.querySelectorAll(".project-edit-btn");

        editBtns.forEach(btn => {
            btn.addEventListener("click", function (e) {
                targetId = e.target.id.slice(-2);

                toggleProjectEditForm("open");
            })
        })
    }

    const editDoneBtn = () => {
        document.getElementById("edit-done").addEventListener("click", function () {

            updateAll();
            toggleProjectEditForm("close");
        });
    }

    const delProjectBtn = () => {
        const delBtns = document.querySelectorAll(".project-del-btn");

        delBtns.forEach(btn => {
            btn.addEventListener("click", function (e) {
                //take id and pass it to del function
                const id = e.target.id.slice(-2);

                delProject(id);
            })
        })
    };

    const addProject = (name) => {
        //pass value to run create object
        main.createProject(name);
        
        //update html
    }

    const toggleProjectEditForm = (action) => {
        const editFormBtn = document.getElementById("edit-form");
        
        if (action == "open") {
            editFormBtn.style.display = "block";
        }
        else {
            editFormBtn.style.display = "none";
            editFormBtn.querySelector("#edit-title").value = ""; // clear input after user clicks apply
        }

    }

    const updateAll = () => {
        updateObj(targetId);       
        updateHTML(targetId);
    }

    const updateObj = (idNum) => {
            let obj = main.projectList.find(({ id }) => id == idNum);

            obj.name = document.getElementById("edit-title").value;

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
            addProject(projTitle.value);
        })
        projectAddFormContainer.append(projAdd);

        _projectListDiv.append(projectAddFormContainer);

        return {
            pAddFormTitle: projTitle,
            pAddFormBtn: projAdd
        }
    }

    const clearInput = (element) => {
        element.value = "";
    }

    return {
        createProjectList,
        createAddForm,
        editProjectBtn,
        delProjectBtn,
        editProjectBtn,
        editDoneBtn,
    }

})();

export { func }