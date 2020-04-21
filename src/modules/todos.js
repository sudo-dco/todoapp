import { main } from '../index.js'

const createTodo = (title, desc, dueDate, priority, notes) => {

    return {
        title,
        desc,
        dueDate,
        priority,
        notes,
        id: main.trackIDs()
    }

};

const addTodo = (obj) => {
    todoList.push(obj);
}

const removeTodo = () => {

}

const editTodo = () => {

}

const todoComplete = () => {

}

const changeDate = () => {

}

const changeNotes = () => {

}

const changeTodoPriority = () => {

}

const saveTodoChanges = () => {

}

export { createTodo };