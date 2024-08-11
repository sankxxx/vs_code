document.addEventListener("DOMContentLoaded", function() {
    const taskForm = document.getElementById("taskForm");
    const taskList = document.getElementById("taskList");
    const toggleFormBtn = document.getElementById("toggleForm");
    const filterHighBtn = document.getElementById("filterHigh");
    const filterMediumBtn = document.getElementById("filterMedium");
    const filterLowBtn = document.getElementById("filterLow");

    // Event listener for form toggle button
    toggleFormBtn.addEventListener("click", function() {
        taskForm.classList.toggle("active");
        toggleFormBtn.textContent = taskForm.classList.contains("active") ? "Close Form -" : "Add Task +";
    });

    // Event listener for task filter buttons
    filterHighBtn.addEventListener("click", function() {
        filterTasks("High");
    });

    filterMediumBtn.addEventListener("click", function() {
        filterTasks("Medium");
    });

    filterLowBtn.addEventListener("click", function() {
        filterTasks("Low");
    });

    // Event listener for form submission
    taskForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const taskName = document.getElementById("taskName").value;
        const dueDate = document.getElementById("dueDate").value;
        const priority = document.getElementById("priority").value;
        
        if (taskName && dueDate && priority) {
            addTask(taskName, dueDate, priority);
            scheduleTaskReminder(taskName, dueDate); // Schedule task reminder
            taskForm.reset();
            taskForm.classList.remove("active");
            toggleFormBtn.textContent = "Add Task +";
        } else {
            alert("Please fill in all fields.");
        }
    });

    // Function to add a new task
    function addTask(taskName, dueDate, priority) {
        const task = document.createElement("div");
        task.classList.add("task");
        task.dataset.priority = priority; // Store priority data for filtering
        task.innerHTML = `
            <h3>${taskName}</h3>
            <p><strong>Due Date:</strong> ${dueDate}</p>
            <p><strong>Priority:</strong> ${priority}</p>
            <button class="delete-btn">Delete</button>
        `;
        taskList.appendChild(task);

        // Event listener for delete button
        const deleteBtn = task.querySelector(".delete-btn");
        deleteBtn.addEventListener("click", function() {
            task.remove();
        });
    }

    // Function to filter tasks by priority
    function filterTasks(priority) {
        const tasks = document.querySelectorAll(".task");
        tasks.forEach(task => {
            if (task.dataset.priority !== priority) {
                task.style.display = "none";
            } else {
                task.style.display = "block";
            }
        });
    }

    // Function to schedule task reminders
    function scheduleTaskReminder(taskName, dueDate) {
        const currentDate = new Date();
        const dueDateTime = new Date(dueDate);

        // Calculate time difference in milliseconds
        const timeDifference = dueDateTime.getTime() - currentDate.getTime();

        // Schedule desktop notification for task reminder
        if (timeDifference > 0) {
            setTimeout(() => {
                showNotification("Task Reminder", `Task "${taskName}" is due soon!`, "info");
            }, timeDifference);
        }
    }

    // Function to display custom notifications
    function showNotification(title, message, type) {
        const notification = document.createElement("div");
        notification.classList.add("notification", type);
        notification.innerHTML = `
            <h4>${title}</h4>
            <p>${message}</p>
            <button class="close-btn">&times;</button>
        `;
        document.body.appendChild(notification);

        // Automatically close notification after 5 seconds
        setTimeout(() => {
            notification.remove();
        }, 5000);

        // Event listener for close button
        const closeBtn = notification.querySelector(".close-btn");
        closeBtn.addEventListener("click", function() {
            notification.remove();
        });
    }
});
