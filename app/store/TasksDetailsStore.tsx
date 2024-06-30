// "use client";

import { ITask, IaddTask } from "@/types/tasks";
import { IRootStore } from "./RootStore";
import { action, computed, makeObservable, observable } from "mobx";
import { toast } from "react-toastify";
import { clearScreenDown } from "readline";


export class TasksDetailsStore {
  tasksDetails: ITask[] = [];
  taskDetail: ITask = {} as ITask;
  rootStore: IRootStore;

/**
 * The constructor function initializes the rootStore and sets up observables, actions, and computed
 * properties for tasksDetails.
 * @param {IRootStore} rootStore - The `rootStore` parameter is an instance of the `IRootStore`
 * interface. It represents the root store of your application, which typically contains all the other
 * stores and provides access to them. By passing the `rootStore` to this constructor, you can access
 * other stores and their functionalities within
 */
  constructor(rootStore: IRootStore) {
    this.rootStore = rootStore;
    makeObservable(this, {
      tasksDetails: observable,
      taskDetail:observable,
      fetchTasksDetails: action,
      getTasksDetails: computed,
      getTaskDetail: computed,
      addTask: action,
      editTask: action,
      deleteTask: action,
      getSingleTask: action,
    });
  }

/**
 * The function fetches task details from a specified URL and assigns the retrieved data to the
 * tasksDetails variable.
 */
  async fetchTasksDetails() {
    const response = await fetch(`api/tasks`);
    const data = await response.json();
    console.log("Response",data)
    this.tasksDetails = data.seatstatus;
  }

/**
 * The below function returns the tasks details.
 * @returns The `tasksDetails` property is being returned.
 */
  get getTasksDetails() {
    return this.tasksDetails;
  }

/**
 * The above function returns the task detail.
 * @returns The `taskDetail` property is being returned.
 */
  get getTaskDetail() {
    return this.taskDetail;
  }

/**
 * The `addTask` function sends a POST request to the server to add a new task, and then updates the
 * local task list and displays a success or error toast message.
 * @param {ITask} payload - The payload parameter is an object of type ITask, which contains the data
 * for the task that needs to be added.
 */
  async addTask(payload: IaddTask) {
    try {
      const response = await fetch(`api/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const newTask = await response.json();
      this.tasksDetails.push(newTask);
      toast.success('Task added Successfully!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      console.error("Error adding task:", error);
      toast.error('Something went wrong!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }

/* The `editTask` function is responsible for updating a task in the `tasksDetails` array. It sends a
PUT request to a specified URL with the updated task details as the payload. If the request is
successful, the updated task is added to the `tasksDetails` array and a success toast message is
displayed. If there is an error, an error toast message is displayed. */
  async editTask(payload: ITask) {
    try{
        const response = await fetch(`api/tasks/${payload._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const updatedTask = await response.json();
    this.tasksDetails.push(updatedTask);
    toast.success('Task Updated successfully!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
    } catch (error) {
      toast.error('Something went wrong!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    }
  
  };

  /* The `deleteTask` function is responsible for deleting a task from the server. It takes an `id`
  parameter, which represents the id of the task to be deleted. */
  async deleteTask(id: string){
    try {
      await fetch(`api/tasks/${id}`, {
        method: "DELETE",
      });
      toast.success('Task delete successfully!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    } catch (error) {
      toast.error('Something went wrong!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    }
  };

/* The `getSingleTask` function is responsible for fetching a single task from the server based on the
provided `id`. It sends a GET request to the specified URL with the `id` parameter appended to it.
Once the response is received, it is converted to JSON format and assigned to the `singleTask`
variable. Finally, the `taskDetail` property of the store is updated with the fetched task. */
  async getSingleTask(id: string){
    const res = await fetch(`api/tasks/${id}`);
    const singleTask = await res.json();
    this.taskDetail = singleTask;
  };

}




