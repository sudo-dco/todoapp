const createProject = (name) => {
    let id = Math.floor((Math.random() * 100) + 1);

    let todoList = [];

    return {
        name,
        id,
        todoList
    }
}

const addProject = () => {

}

const removeProject = () => {
    
}

const editProjectTitle = () => {
    
};

export {
    createProject,
    editProjectTitle
}