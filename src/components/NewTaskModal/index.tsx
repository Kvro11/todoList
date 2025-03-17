import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import { addTodo, updateTodo } from "../../state/todoSlice";
import { AppDispatch } from "../../state/store";

import { IoClose } from "react-icons/io5";
import { Todo } from "../../types/todoTypes";
import { toast } from "react-toastify";

const NewTaskModal = ({ setAddTask, taskToEdit, setTaskToEdit }: any) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [importance, setImportance] = useState("");

  const dispatch = useDispatch<AppDispatch>();

  const handleTask = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("Task title cannot be empty!");
      return;
    }

    const newTask: Partial<Todo> = {
      date,
      title: title.trim(),
      desc: description.trim(),
      priority: importance || "Normal", // Set a default priority if empty
      isComplete: false,
    };

    if (taskToEdit) {
      dispatch(updateTodo({ id: taskToEdit.id, ...newTask }));
      toast.success("Task has been updated", {
        position: "top-center",
      });
    } else {
      dispatch(addTodo(newTask));
      toast.success("New task has been added", {
        position: "top-center",
      });
    }

    setDate("");
    setTitle("");
    setDescription("");
    setImportance("");
    setAddTask(false);
    setTaskToEdit(null);
  };

  const handleCloseModal = () => {
    setAddTask(false);
    setTaskToEdit(null);
  };

  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title || "");
      setDescription(taskToEdit.desc || "");
      setImportance(taskToEdit.priority || "");

      //format  dates
      const formattedDate = taskToEdit.date
        ? new Date(taskToEdit.date).toISOString().split("T")[0]
        : "";
      setDate(formattedDate);
    }
  }, [taskToEdit]);

  return (
    <form
      onSubmit={handleTask}
      className="fixed top-[8%] left-[45%] w-[90%] sm:w-[27rem] h-fit bg-[whitesmoke] p-10 rounded-lg
        shadow-lg shadow-black/20 flex flex-col gap-8 font-custom-exo"
    >
      <div className="flex justify-end text-3xl -m-5">
        <button
          className="cursor-pointer transition ease-in-out duration-200 hover:scale-90 
              hover:text-custom-red"
          onClick={handleCloseModal}
        >
          <IoClose />
        </button>
      </div>
      <div className="flex flex-col gap-3 -mt-7">
        <label className="text-xl sm:text-[1.4rem]">Title</label>
        <input
          type="text"
          value={title}
          placeholder="What needs to be done?"
          required
          className="border p-2 outline-none border-gray-400 rounded-md"
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-3">
        <label className="text-xl sm:text-[1.4rem]">Description</label>
        <textarea
          className="w-full min-h-[150px] resize-y border p-2 outline-none border-gray-400 rounded-md"
          value={description}
          placeholder="Description about task"
          required
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-3">
        <label className="text-xl sm:text-[1.4rem]">Select Date</label>
        <input
          type="date"
          value={date}
          className="border p-2 rounded-md border-gray-400 w-[70%]
            focus:outline-none focus:ring-1 focus:ring-primary-blue"
          required
          onChange={(e) => setDate(e.target.value)}
        />
        <label className="text-xl sm:text-[1.4rem] mt-3">Importance</label>
        <select
          className="w-fit border-0 border-b-2 p-2 border-gray-400 focus:border-b-primary-blue
          outline-none"
          required
          onChange={(e) => setImportance(e.target.value)}
          value={importance}
        >
          <option value="">Select Importance</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
      </div>
      <button
        className="transition ease-in-out duration-200 hover:scale-95 bg-primary-blue 
          rounded-md text-white p-2"
        type="submit"
      >
        Add Task
      </button>
    </form>
  );
};
export default NewTaskModal;
