const todoListDom = (() => {
    const _todosListDiv = document.getElementById("todoslist");

    // show todo list in div
    const showTodoList = (list) => {
        let listDiv;

        if (document.getElementById("todolist-container") == null) {
            listDiv = document.createElement("div");
            listDiv.id = "todolist-container";
            _todosListDiv.append(listDiv);
        }
        else {
            listDiv = document.getElementById("todolist-container");
        }
        
        list.forEach((obj, i) => {
            let newTodo = document.createElement("div");
            newTodo.id = `todo-${i}`;
            newTodo.classList.add("todo-titles");
            newTodo.innerHTML = `
                <h3>${obj.title}<h3>
                <p>${obj.desc}</p>
                <p>${obj.dueDate}</p>
                <p>${obj.priority}</p>
                <button type="button">Expand</button>
                <button type="button">Delete</button>
            `
            listDiv.append(newTodo);
        });
        
        
    } 

    // show todo add box
    const showAddForm = () => {
        const addForm = document.createElement("div");
        addForm.id = "todo-addformcontainer";
        addForm.innerHTML = `
            <label for="todo-title">Title:</label>
            <input type="text" id="todo-title">

            <label for="todo-desc">Description:</label>
            <input type="text" id="todo-desc">

            <label for="todo-date">Date:</label>
            <input type="date" id="todo-date" min="2020-4-7">
            
            <label for="todo-priority">Priority:</label>
            <select id="todo-priority">
                <option value="high">High</option>
                <option value="normal">Normal</option>
                <option value="low">Low</option>
            </select>

            <label for="todo-notes">Notes:</label>
            <textarea id="todo-notes" cols="25" rows="7">Example Notes</textarea>
            <button type="button">Add</button>
        `
        _todosListDiv.append(addForm);
    }

    // get todos info
    const getTodoInfo = () => {
        const title = document.getElementById("todo-title");
        const desc = document.getElementById("todo-desc");
        const dueDate = document.getElementById("todo-date");
        const priority = document.getElementById("todo-priority");
        const notes = document.getElementById("todo-notes");

        return {
            title,
            desc,
            dueDate,
            priority,
            notes
        }
    }
    
    // add todo to div
    const todosAdd = (obj) => {

    }

    // remove to do from div

    // expand button

    //checkbox

    const clearTodoDom = () => {
        const listDiv = document.getElementById("todolist-container");
        listDiv.innerHTML = "";
    }

    return {
        showTodoList,
        showAddForm
    }

})();

const editTodosDom = (() => {
    const editTodoDiv = document.getElementById("todo-list");

    // option to change date button
    //document.getElementById("todo-date").value = obj.dueDate;

    // option to change priority
    // set priority to match obj priority
    //document.getElementById("todo-priority").value = obj.priority;

    // show notes box

    // create save button

})();

export { 
    todoListDom,
    editTodosDom
}