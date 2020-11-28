import { Form } from "react-bootstrap"



const FormComponent = () => {
  return (
    <div className="d-flex justify-content-center my-5">
    <div>
      <div className="row">
        <h1>Task App</h1>
      </div>
      <div className="row mb-5">
        <form id="new-task-form">
          <div className="form-group">
            <label for="new-task-name">Name</label>
            <input
              type="text"
              className="form-control"
              id="new-task-name"
              required
            />
            <div className="valid-feedback">Looks good!</div>
            <div className="invalid-feedback">Please provide a valid name.</div>
          </div>
          <div className="form-group">
            <label for="new-task-description">Description</label>
            <input
              type="text"
              className="form-control"
              id="new-task-description"
              required
            />
            <div className="invalid-feedback">
              <div className="valid-feedback">Looks good!</div>
              Please provide a valid description
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col">
              <label for="new-task-assigned-to">Assigned To</label>
              <input
                type="text"
                className="form-control"
                id="new-task-assigned-to"
                required
              />
              <div className="valid-feedback">Looks good!</div>
              <div className="invalid-feedback">Please provide a valid name.</div>
            </div>
            <div className="form-group col">
              <label for="new-task-due-date">Due Date</label>
              <input
                type="date"
                className="form-control"
                id="new-task-due-date"
              />
              <div className="valid-feedback">Looks good!</div>
              <div className="invalid-feedback">Please provide a valid date.</div>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col">
              <select className="form-control" id="new-task-status">
                <option selected>In Progress</option>
                <option>Done</option>
                <option>Pending</option>
              </select>
            </div>

            <div className="form-group col">
              <button
                type="submit"
                className="btn btn-primary"
                id="new-task-submit"
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
  )
}
export default FormComponent;