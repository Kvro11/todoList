import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  AddTask,
  deleteTodo,
  EditTask,
  updateTodo,
} from "../../state/todoSlice";
import { AppDispatch } from "../../state/store";
import Error from "../Error";
import useViewport from "../useViewport";

import { IoTrashOutline } from "react-icons/io5";
import { IoCalendarOutline } from "react-icons/io5";
import { IoAdd } from "react-icons/io5";
import { FiEdit } from "react-icons/fi";
import { MdOutlineCheckBox } from "react-icons/md";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import { FcHighPriority } from "react-icons/fc";
import { FcMediumPriority } from "react-icons/fc";
import { FcLowPriority } from "react-icons/fc";

enum TitleLength {
  mobile = 12,
  desktop = 18,
}

const TaskList = ({ todos, title }: any) => {
  const dispatch = useDispatch<AppDispatch>();
  const [priority, setPriority] = useState("all");
  const [filteredTodos, setFilteredTodos] = useState(todos);
  const isMobile = useViewport();

  const importance: any = {
    high: <FcHighPriority />,
    medium: <FcMediumPriority />,
    low: <FcLowPriority />,
  };

  const handleDelete = (id: string) => {
    dispatch(deleteTodo(id));
    toast.success("Task has been deleted!", { position: "top-center" });
  };

  const handleEdit = (id: string) => {
    const taskToEdit = todos.find((task: any) => task.id === id);
    if (todos) {
      dispatch(EditTask(taskToEdit)); // Now it's an object, not an array
    }

    dispatch(AddTask(true));
  };

  const handleUpdate = (id: string, isComplete: boolean) => {
    dispatch(updateTodo({ id, isComplete: !isComplete }));

    toast.dismiss();

    if (!isComplete) {
      toast.success("Task has been Completed!", { position: "top-center" });
    } else {
      toast.error("Task Status has been changed", { position: "top-center" });
    }
  };

  useEffect(() => {
    const newTodo = todos.filter((todo: { priority: string }) => {
      return priority === "all" || todo.priority === priority;
    });

    setFilteredTodos(newTodo);
  }, [todos, priority]);

  return (
    <>
      <div className="w-full p-2 sm:p-12">
        <ToastContainer />
        <div className="flex flex-row items-center justify-between mb-7 font-custom-exo">
          <div className="flex gap-2 items-end">
            <h1 className="font-black text-[1.4rem] sm:text-4xl text-primary-blue ">
              {title}
            </h1>
            <span className="text-xl sm:text-2xl font-semibold text-custom-gray">
              ({filteredTodos?.length ?? "0"})
            </span>
          </div>
          <div>
            <select
              className="w-fit border-0 border-b-2 p-2 border-gray-400 focus:border-b-primary-blue
                outline-none text-custom-black-100"
              onChange={(e) => setPriority(e.target.value)}
              value={priority}
              aria-label="Select Importance"
            >
              <option value="all">All Task</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
        </div>
        <div
          className="grid grid-cols-[repeat(auto-fit,minmax(130px,1fr))] 
            min-[500px]:grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-10 "
        >
          {filteredTodos?.map((task: any) => (
            <div
              key={task.id}
              className="h-full min-h-[250px] sm:min-h-[350px] p-3 sm:p-5 rounded-lg
              flex flex-col gap-3 sm:gap-5 shadow-custom-shadow"
            >
              <div className="flex items-center justify-between">
                <div className="relative group w-[70%]">
                  <span
                    className="font-bold text-xl sm:text-2xl text-custom-black-200 
                      truncate block"
                  >
                    {task.title}
                  </span>
                  {task.title.length >
                    (isMobile ? TitleLength.mobile : TitleLength.desktop) && (
                    <div
                      className="absolute -left-5 -top-12 z-10 mt-1 w-full sm:w-max max-w-xs bg-gray-800 
                    text-white text-sm p-2 rounded-lg opacity-0 group-hover:opacity-100 
                      transition-opacity"
                    >
                      {task.title}
                    </div>
                  )}
                </div>

                <div
                  className="text-xl sm:text-2xl transition ease-in-out
                text-custom-gray flex gap-3"
                >
                  <button
                    onClick={() => handleEdit(task.id)}
                    aria-label="Edit Button"
                    className="hover:scale-90 hover:text-green-600"
                  >
                    <FiEdit />
                  </button>
                  <button
                    className="hover:scale-90 hover:text-custom-red"
                    onClick={() => handleDelete(task.id)}
                    aria-label="Delete Button"
                  >
                    <IoTrashOutline />
                  </button>
                </div>
              </div>
              <div className="flex-grow text-custom-black-100 text-[0.9rem] sm:text-xl">
                <p>{task.desc}</p>
              </div>

              <div className="mt-auto font-custom-exo flex gap-2 sm:gap-3 items-center text-custom-gray">
                <div className="flex items-center gap-2 text-custom-gray">
                  <IoCalendarOutline className="text-[0.8rem] sm:text-2xl" />
                  <span className="text-[0.8rem] sm:text-[1rem]">
                    {task.date}
                  </span>
                </div>
                <span className="text-[1.2rem] sm:text-2xl">
                  {importance[task.priority]}
                </span>
                <button
                  onClick={() => handleUpdate(task.id, task.isComplete)}
                  aria-label="Task Checker"
                  className="text-[1.2rem] sm:text-2xl"
                >
                  {task.isComplete ? (
                    <MdOutlineCheckBox className="text-green-600" />
                  ) : (
                    <MdOutlineCheckBoxOutlineBlank />
                  )}
                </button>
              </div>
            </div>
          ))}
          {title === "Task List" && (
            <div
              className="h-full min-h-[250px] sm:min-h-[350px] flex flex-col justify-center 
              items-center gap-3 shadow-custom-shadow transition ease-in-out hover:scale-95
              rounded-lg text-custom-black-100 text-xl"
              onClick={() => dispatch(AddTask(true))}
            >
              <IoAdd className="text-8xl" />
              <span>Add task</span>
            </div>
          )}
        </div>
      </div>

      {filteredTodos?.length === 0 && title !== "Task List" && <Error />}
    </>
  );
};
export default TaskList;
