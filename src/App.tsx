import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import Content from "./components/Content";
import Header from "./components/Header";
import NewTaskModal from "./components/NewTaskModal";

const dummyList = [
  {
    id: uuidv4(),
    date: "01/01/2025",
    title: "Task 1",
    desc: "uuid is a popular library that generates universally unique identifiers (UUIDs) Install it using",
    priority: "high",
    isComplete: false,
  },
  {
    id: uuidv4(),
    date: "01/02/2025",
    title: "Task 2",
    desc: "Learn React fundamentals, including components, state, and props.",
    priority: "medium",
    isComplete: false,
  },
  {
    id: uuidv4(),
    date: "01/03/2025",
    title: "Task 3",
    desc: "Implement a to-do list with add, delete, and complete functionalities.",
    priority: "high",
    isComplete: false,
  },
  {
    id: uuidv4(),
    date: "01/04/2025",
    title: "Task 4",
    desc: "Refactor the code to use better state management and improve performance.",
    priority: "low",
    isComplete: false,
  },
];

const App = () => {
  const [taskList, setTaskList] = useState([...dummyList]);
  const [addTask, setAddTask] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);

  // console.log(taskToEdit);

  return (
    <div className="relative w-full min-h-screen bg-[#f5f5f5] flex flex-col sm:flex-row">
      <Header />

      <Content
        setTaskList={setTaskList}
        taskList={taskList}
        setAddTask={setAddTask}
        setTaskToEdit={setTaskToEdit}
      />

      {addTask && (
        <div
          className="absolute top-0 bottom-0 left-0 right-0 
          inset-0 bg-[rgba(0,0,0,0.2)] flex justify-center items-center"
        >
          <NewTaskModal
            setAddTask={setAddTask}
            taskToEdit={taskToEdit}
            setTaskList={setTaskList}
            setTaskToEdit={setTaskToEdit}
          />
        </div>
      )}
    </div>
  );
};
export default App;
