"use client";

import { AiOutlinePlus } from "react-icons/ai";
import Modal from "./Modal";
import { FormEventHandler, useState } from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "../store";

interface AddTaskProps {
  setTasks: any;
}

const AddTask: React.FC<AddTaskProps> = observer(({setTasks }) => {
  const {
    rootStore: { tasksDetails },
  } = useStore();

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");
  const [editorValue, setEditorValue] = useState<string>("");
  const [error, setError] = useState<string>('');

  /**
   * The handleFormSubmit function is used to handle form submission in a TypeScript React application,
   * where it adds a new task with a unique ID, title, description, and status, fetches the updated task
   * details, updates the state with the new task, clears the input and editor values, and closes the
   * modal.
   * @param e - The parameter "e" is the event object that is passed to the event handler function. In
   * this case, it is the form submit event object.
   */
  const handleFormSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (!editorValue && !inputValue) {
      setError('Please enter title & description.');
      return;
    }else if(!inputValue) {
      setError('Please enter a title.');
      return;
    }else if(!editorValue) {
      setError('Please enter a description.');
      return;
    }
    const payload = {
      title: inputValue,
      desc: editorValue,
      status: "To Do"
    };
    await tasksDetails.addTask(payload);
    await tasksDetails.fetchTasksDetails();
    setTasks(tasksDetails.getTasksDetails);
    setInputValue("");
    setEditorValue("");
    setModalOpen(false);
  };



  return (
    <div>
      <button
        onClick={() => setModalOpen(true)}
        className="btn btn-primary w-full"
      >
        Add New Task
        <AiOutlinePlus size={18} />
      </button>

      <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <form onSubmit={handleFormSubmit} className="flex flex-col gap-5">
          <h3 className="font-bold text-lg">Add New Task</h3>
         
          <input
            className="input input-bordered w-full"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            type="text"
            placeholder="Enter title here..."
          />
        
          <textarea
          className="textarea textarea-bordered textarea-md w-full"
          placeholder="Enter description here..." 
          onChange={(e) => setEditorValue(e.target.value)}>
          </textarea>

          {error && <p className="error text-red-500">{error}</p>}
        
          <button className="btn" type="submit">
            Submit
          </button>
        </form>
      </Modal>
    </div>
  );
});

export default AddTask;
