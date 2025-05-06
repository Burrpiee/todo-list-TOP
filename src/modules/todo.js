//Todo factory function
export const Todo = (title, description, dueDate, priority, notes = "", checklist = [],  projectID = "default", completed = false) => {
    //Generate unique ID for todo
    const id = Date.now().toString(36) + Math.random().toString(36).slice(2);

    return {
        id,
        title,
        description,
        dueDate,
        priority,
        notes,
        checklist,
        projectID,
        completed,

        //methods for todo
        toggleCompleted() {
            this.completed = !this.completed;
        },

        updatePriority(newPriority) {
            this.priority = newPriority;
        },

        updateDueDate(newDate) {
            this.dueDate = newDate;
        },

        //Check up on this later
        addChecklistItem(item) {
            this.checklist.push({
                text: item,
                checked: false,
                id: Date.now().toString(36)
            });
        },

        toggleChecklistItem(itemID) {
            const item = this.checklist.find(item => item.id === itemID);
            if (item) {
                item.checked = !item.checked;
            }
        },

        removeChecklistItem(itemID) {
            this.checklist = this.checklist.filter(item => item.id !== itemID);
        }
    };
};