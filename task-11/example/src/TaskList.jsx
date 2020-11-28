const TaskList = (tasks) => {
  return(
<div className="task-list-container">
      <h3 className="text-center">Tasks:</h3>
      <div className="d-flex justify-content-center">
        <ul className="list-group" id="task-list">
          {tasks}
        </ul>
      </div>
    </div>
  )
}
export default TaskList;