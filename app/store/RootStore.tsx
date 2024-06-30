import { TasksDetailsStore } from "./TasksDetailsStore";

export interface IRootStore {
  tasksDetails: TasksDetailsStore;
}

/* The RootStore class is responsible for managing the tasksDetails store. */
export class RootStore implements IRootStore {
  tasksDetails: TasksDetailsStore;

  /**
   * The constructor initializes a new instance of the TasksDetailsStore class.
   */
  constructor() {
    this.tasksDetails = new TasksDetailsStore(this);
  }
}
