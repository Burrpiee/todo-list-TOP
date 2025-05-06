import {Project} from './project';

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
        //save to storage
        return project;
    };

    //Delete project
    const deleteProject = (projectID) => {
        projects = projects.filter(project => project.id !== projectID);
        //save to storage
    };

    //Get project by ID
    const getProject = (projectID) => {
        return projects.find(project => project.id === projectID);
    }

    //Get all projects
    const getAllProjects = () => {
        return projects;
    }

    //Add a new todo to a project
    
})();