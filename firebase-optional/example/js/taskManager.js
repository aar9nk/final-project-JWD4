import { db } from './firebase.js';

const createTaskHtml = (id, name, description, assignedTo, dueDate, status) => {
  const html = `<li class="card" data-task-id="${id}" style="min-width: 50vw">
  <div class="card-body">
    <h5 class="card-title">${name}</h5>
    <p class="card-text">
      ${description}
    </p>
    <p class="card-text">${assignedTo}</p>
    <p class="card-text">${dueDate}</p>
    <div class="card-footer row">
      <div class="col-6">
        <p class="card-text"><b>${status}</b></p>
      </div>
      <div class="col-3">
        <button class="btn btn-outline-success done-button">
          Done
        </button>
      </div>
      <div class="col-3">
        <button class="btn btn-outline-danger delete-button">
          Delete
        </button>
      </div>
    </div>
  </div>
</li>`;
  return html;
};

// Create the TaskManager class
export default class TaskManager {
  constructor(currentId = 0) {
    this.tasks = [];
    this.currentId = currentId;

    // Use onSnapshot() to get a synchronous and live data updates
    // this.unsubscribe = db.collection("tasks")
    //     .orderBy('name', 'asc')
    //     .onSnapshot((snapshot) => {
    //         this.tasks = snapshot.docs.map((doc) => ({
    //             id: doc.id,
    //             ...doc.data(),
    //         }));

    //         this.render();
    //     });
  }

  addTask(name, description, assignedTo, dueDate, status) {
    // Create a task object that we will push to the list of tasks

    db.collection('tasks')
      .add({
        name: name,
        description: description,
        assignedTo: assignedTo,
        dueDate: dueDate,
        status: status,
      })
      .then((docRef) => {
        console.log('Document written with ID: ', docRef.id);
        this.load();
      })
      .catch((error) => {
        console.error('Error adding document: ', error);
      });
  }

  getTaskById(taskId) {
    // Getting data from the collection in Firestore
    return db
      .collection('tasks')
      .doc(taskId)
      .get()
      .then((doc) => {
        if (!doc.exists) return;

        const data = {
          id: doc.id,
          ...doc.data(),
        };
        console.log('Document:', data);

        return data;
      })
      .catch((error) => {
        console.error('Error in getting task: ', error);
        return error;
      });
  }

  render() {
    let tasksHtmlList = [];
    // Loop over our tasks and create the html, storing it in the array
    for (let i = 0; i < this.tasks.length; i++) {
      // Get the current task in the loop
      const task = this.tasks[i];
      // Format the date
      const date = new Date(task.dueDate);
      const formattedDate =
        date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
      // Create the task html
      const taskHtml = createTaskHtml(
        task.id,
        task.name,
        task.description,
        task.assignedTo,
        formattedDate,
        task.status
      );
      // Push it to the tasksHtmlList array
      tasksHtmlList.push(taskHtml);
    }

    // Create the tasksHtml by joining each item in the tasksHtmlList
    // with a new line in between each item.
    const tasksHtml = tasksHtmlList.join('\n');

    // Set the inner html of the tasksList on the page
    const tasksList = document.querySelector('#task-list');
    tasksList.innerHTML = tasksHtml;
  }

  save() {
    // Create a JSON string of the tasks
    const tasksJson = JSON.stringify(this.tasks);

    // Store the JSON string in localStorage
    localStorage.setItem('tasks', tasksJson);

    // Convert the currentId to a string;
    const currentId = String(this.currentId);

    // Store the currentId in localStorage
    localStorage.setItem('currentId', currentId);
  }

  // Load the collection data from the database
  load() {
    db.collection('tasks')
      .orderBy('name', 'desc') // set order by name
      .get()
      .then((snapshot) => {
        this.tasks = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log("All data in 'tasks' collection", this.tasks);
        this.render();
      });
  }

  deleteTask(taskId) {
    //Deleting a document from a collection in the Firestore
    db.collection('tasks')
      .doc(taskId)
      .delete()
      .then(() => {
        console.log('Document deleted');
        this.load();
      })
      .catch((error) => console.error('Error deleting document', error));
  }
  // Create the update method
  update(task) {
    return db
      .collection('tasks')
      .doc(task.id)
      .update({
        // id: task.id,
        ...task,
      })
      .then(() => {
        console.log('Document updated'); // Document updated
        this.load();
      })
      .catch((error) => {
        console.error('Error updating doc', error);
      });
  }
}
