let addBtn = document.getElementById("add-btn");
let note = document.getElementById("note");
let todoList = document.getElementById("todo");
let progressList = document.getElementById("progress");
let doneList = document.getElementById("done");
let userData = JSON.parse(sessionStorage.getItem("LoggedUserData"));
let users = JSON.parse(localStorage.getItem("users"));

(function LoadData() {
    document.getElementById("userName").innerHTML = userData.name;
    if (userData && userData.tasks && userData.tasks.todo) {
        userData.tasks.todo.forEach((task) => {
            console.log(task)
            let parentdiv = createTaskElement(task);
            todoList.appendChild(parentdiv);
        });
    }
    if (userData && userData.tasks && userData.tasks.progress) {
        userData.tasks.progress.forEach((task) => {
            console.log(task)
            let parentdiv = createTaskElement(task);
            progressList.appendChild(parentdiv);
        });
    }
    if (userData && userData.tasks && userData.tasks.done) {
        userData.tasks.done.forEach((task) => {
            console.log(task)
            let parentdiv = createTaskElement(task);
            doneList.appendChild(parentdiv);
        });
    }
})();

function createTaskElement(taskValue) {
    let parentdiv = document.createElement("div");
    parentdiv.classList.add("singleNote");
    let p = document.createElement("p");
    p.innerText = taskValue;
    let closeBtn = document.createElement("span");
    closeBtn.innerHTML = "X";
    closeBtn.addEventListener("click", (e) => {
        parentdiv.remove();
        removeTaskFromUserData(taskValue);
    });
    parentdiv.appendChild(p);
    parentdiv.appendChild(closeBtn);
    parentdiv.setAttribute("draggable", "true");
    parentdiv.addEventListener("dragstart", () => {
        parentdiv.classList.add("is-dragging");
    });
    parentdiv.addEventListener("dragend", () => {
        parentdiv.classList.remove("is-dragging");
    });
    return parentdiv;
}

function removeTaskFromUserData(taskValue) {
    userData.tasks.todo = userData.tasks.todo.filter((task) => task !== taskValue);
    userData.tasks.progress = userData.tasks.progress.filter((task) => task !== taskValue);
    userData.tasks.done = userData.tasks.done.filter((task) => task !== taskValue);
    users.forEach((user) => {
        if (user.id === userData.id) {
            user.tasks.todo = userData.tasks.todo;
            user.tasks.progress = userData.tasks.progress;
            user.tasks.done = userData.tasks.done;
            localStorage.setItem("users", JSON.stringify(users));
            sessionStorage.setItem("LoggedUserData", JSON.stringify(userData));
        }
    });
}


addBtn.addEventListener("click", (e) => {
    let noteValue = note.value.trim();
    if (noteValue !== "") {
        let parentdiv = createTaskElement(noteValue);
        todoList.appendChild(parentdiv);

        // Add the task to userData.tasks.todo
        userData.tasks.todo.push(noteValue);

        // Update localStorage with the modified users array
        users.forEach((user) => {
            if (user.id === userData.id) {
                user.tasks.todo = userData.tasks.todo;
                localStorage.setItem("users", JSON.stringify(users));
                sessionStorage.setItem("LoggedUserData", JSON.stringify(userData));

            }
        });
        note.value = "";
    }
});

const draggables = document.querySelectorAll(".singleNote");
const droppables = document.querySelectorAll(".notes-place");

draggables.forEach((task) => {
    task.addEventListener("dragstart", () => {
        task.classList.add("is-dragging");
    });
    task.addEventListener("dragend", () => {
        task.classList.remove("is-dragging");
    });
});

droppables.forEach((zone) => {
    zone.addEventListener("dragover", (e) => {
        e.preventDefault();
        const belowTask = insertAboveTask(zone, e.clientY);
        const holdedTask = document.querySelector(".is-dragging");
        flag = false;
        if (!belowTask) {
            zone.appendChild(holdedTask);
            flag = true;

        } else {
            zone.insertBefore(holdedTask, belowTask);
            flag = true
        }

    });
    zone.addEventListener("dragend", (e) => {
        console.log(e)
        if (zone.id === "todo" && !isTaskInArray(userData.tasks.todo, e.target.firstChild.innerText)) {
            users.forEach((user) => {
                if (user.id === userData.id) {
                    user.tasks.todo.push(e.target.firstChild.innerText);
                    userData.tasks.todo.push(e.target.firstChild.innerText);
                    const progressIndex = user.tasks.progress.findIndex(task => task === e.target.firstChild.innerText);
                    const doneIndex = user.tasks.done.findIndex(task => task === e.target.firstChild.innerText);

                    // Remove the task from the todo array
                    if (progressIndex !== -1) {
                        user.tasks.progress.splice(progressIndex, 1);
                        userData.tasks.progress.splice(progressIndex, 1);
                    }
                    
                    if (doneIndex !== -1) {
                        user.tasks.done.splice(doneIndex, 1);
                        userData.tasks.done.splice(doneIndex, 1);
                    }
                    console.log(e.target.firstChild.innerText)
                    localStorage.setItem("users", JSON.stringify(users));
                    sessionStorage.setItem("LoggedUserData", JSON.stringify(userData));

                }
            });
        }
        else if (zone.id === "progress" && !isTaskInArray(userData.tasks.progress, e.target.firstChild.innerText) ) {
            users.forEach((user) => {
                if (user.id === userData.id) {
                    user.tasks.progress.push(e.target.firstChild.innerText);
                    userData.tasks.progress.push(e.target.firstChild.innerText);
                    const todoIndex = user.tasks.todo.findIndex(task => task === e.target.firstChild.innerText);
                    const doneIndex = user.tasks.done.findIndex(task => task === e.target.firstChild.innerText);

                    // Remove the task from the todo array
                    if (todoIndex !== -1) {
                        user.tasks.todo.splice(todoIndex, 1);
                        userData.tasks.todo.splice(todoIndex, 1);
                    }
                    
                    if (doneIndex !== -1) {
                        user.tasks.done.splice(doneIndex, 1);
                        userData.tasks.done.splice(doneIndex, 1);
                    }
                    console.log(e.target.firstChild.innerText)
                    localStorage.setItem("users", JSON.stringify(users));
                    sessionStorage.setItem("LoggedUserData", JSON.stringify(userData));

                }
            });
        }
        else if(zone.id === "done" && !isTaskInArray(userData.tasks.done, e.target.firstChild.innerText)){
            users.forEach((user) => {
                if (user.id === userData.id) {
                    user.tasks.done.push(e.target.firstChild.innerText);
                    userData.tasks.done.push(e.target.firstChild.innerText);
                    // Find the index of the task in the todo array
                    const todoIndex = user.tasks.todo.findIndex(task => task === e.target.firstChild.innerText);
                    const progressIndex = user.tasks.progress.findIndex(task => task === e.target.firstChild.innerText);

                    // Remove the task from the todo array
                    if (todoIndex !== -1) {
                        user.tasks.todo.splice(todoIndex, 1);
                        userData.tasks.todo.splice(todoIndex, 1);
                    }
                    if (progressIndex !== -1) {
                        user.tasks.progress.splice(progressIndex, 1);
                        userData.tasks.progress.splice(progressIndex, 1);
                    }
                    
                    console.log(e.target.firstChild.innerText)
                    localStorage.setItem("users", JSON.stringify(users));
                    sessionStorage.setItem("LoggedUserData", JSON.stringify(userData));

                }
            });
        }

    })

});

function isTaskInArray(taskArray, taskText) {
    return taskArray.includes(taskText);
}

const insertAboveTask = (zone, mouseY) => {
    const allNotMovingElements = zone.querySelectorAll(".singleNote:not(.is-dragging)");

    let closestTask = null;
    let closestOffset = Number.NEGATIVE_INFINITY;

    allNotMovingElements.forEach((task) => {
        const { top } = task.getBoundingClientRect();
        const offset = mouseY - top;
        if (offset < 0 && offset > closestOffset) {
            closestOffset = offset;
            closestTask = task;
        }
    });
    return closestTask;
};
