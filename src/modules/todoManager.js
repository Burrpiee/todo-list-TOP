import {Todo} from './todo';
import {Project} from './project';
import {format, parseISO} from 'date-fns';

const TodoManager = (() => {
    let projects = [];

    //Default project if no projects
    const initialize = () => {
        if (projects.length === 0) {
            if (projects.length === 0) {
                addProject('Default', 'Default project for all todos.');
            }
        }
    };

    //Add project
    const addProject = (name, description) => {
        const project = Project(name, description);
        projects.push(project);
        saveToLocalStorage();
        return project;
    };

    //Delete project
    const deleteProject = (projectID) => {
        projects = projects.filter(project => project.id !== projectID);
        saveToLocalStorage();
    };

    //Get project by ID
    const getProject = (projectID) => {
        return projects.find(project => project.id === projectID);
    };

    //Get all projects
    const getAllProjects = () => {
        return projects;
    };

    //Add a new todo to a project
    const addTodo = (title, description, dueDate, priority, notes = "", checklist = [], projectID) => {
        const project = getProject(projectID) || projects[0];
        const todo = Todo(title, description, dueDate, priority, notes, checklist, project.id);
        project.addTodo(todo);
        saveToLocalStorage();
        return todo;
    };

    //Delete a todo
    const deleteTodo = (todoID, projectID) => {
        project = getProject(projectID);
        if (project) {
            project.removeTodo(todoID);
            saveToLocalStorage();
        }
    };
    
    //Update a todo
    const updateTodo = (todoID, projectID, updates) => {
        //Get project and todo
        const project = getProject(projectID);
        if (!project) return null;

        const todo = project.getTodo(todoID);
        if (!todo) return null;

        //Apply updates to todo
        Object.keys(updates).foreach(key => {
            todo[key] = updates[key];
        });

        saveToLocalStorage();
        return todo;
    }

    //Toggle todo completion status
    const toggleTodoComplete = (todoID, projectID) => {
        const project = getProject(projectID);
        if (!project) return null;

        const todo = project.getTodo(todoID);
        if (todo) {
            todo.toggleCompleted();
            saveToLocalStorage();
        }
    }

    //Get all todos from all projects
    const getAllTodos = () => {
        return projects.flatMap(project => {
            project.todos.map(todo => ({...todo, projectName: project.name}))
        })
    }

    //Save to localStorage
    const saveToLocalStorage = () => {
        localStorage.setItem('todoApp_projects', JSON.stringify(projects));
    };

    //Load from localstorage
    const loadFromLocalStorage = () => {
        try {
            const savedProjects = JSON.parse(localStorage.getItem('todoApp_projects'));

            if (savedProjects && Array.isArray(savedProjects)) {
                //Map saved projects to the project array
                projects = savedProjects.map(project => {
                    const restoredProject = Project(project.name, project.description);
                    restoredProject.id = project.id;

                    //Restore todos back to projects
                    if (project.todo && Array.isArray(project.todo)) {
                        project.todo.forEach(todo => {
                            const restoredTodo = Todo(
                                todo.title,
                                todo.description,
                                todo.dueDate,
                                todo.priority,
                                todo.notes,
                                todo.checklist || [],
                                todo.completed
                            );
                            restoredTodo.id = todo.id;
                            restoredProject.addTodo(restoredTodo);
                        });
                    }

                    return restoredProject;
                });
            }

            return true;
        }

        catch (error) {
            console.error('Error retrieving data from localstorage', error);
        }

        return false;
    };

    //Format date for display
    const formatDate = (dateString) => {
        //Converts dateString from ISO format to JS date object
        try {
            return format(parseISO(dateString), 'd MMM yyyy');
        }
        catch (error) {
            return dateString;
        }
    };

    return {
        initialize,
        addProject,
        deleteProject,
        getProject,
        getAllProjects,
        addTodo,
        deleteTodo,
        updateTodo,
        toggleTodoComplete,
        getAllTodos,
        saveToLocalStorage,
        loadFromLocalStorage,
        formatDate
    };

})();

export default TodoManager;