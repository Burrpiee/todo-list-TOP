// Project factory function
export const Project = (name, description = "") => {
    //Generate ID for project
    const id = Date.now().toString(36) + Math.random().toString(36).slice(2);

    return {
        id,
        name,
        description,
        todos : [],
        
        //Methods for todos
        addTodo(todo) {
            this.todos.push(todo);
        },

        removeTodo(todoID) {
            this.todos = this.todos.filter(todo => todo.id !== todoID);
        },

        getTodo(todoID) {
            return this.todos.find(todo => todo.id === todoID);
        }
    };  
};