import { IoTrashOutline } from "react-icons/io5";
import { IoCalendarOutline } from "react-icons/io5";
import { IoAdd } from "react-icons/io5";
import { FiEdit } from "react-icons/fi";
import { MdOutlineCheckBox } from "react-icons/md";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import { FcHighPriority } from "react-icons/fc";
import { FcMediumPriority } from "react-icons/fc";
import { FcLowPriority } from "react-icons/fc";

type ContentProps = {
  setAddTask: React.Dispatch<React.SetStateAction<boolean>>;
  setTaskToEdit: any;
  setTaskList: any;
  taskList: any;
};
const Content = ({
  setAddTask,
  setTaskToEdit,
  setTaskList,
  taskList,
}: ContentProps) => {
  const importance: any = {
    high: <FcHighPriority />,
    medium: <FcMediumPriority />,
    low: <FcLowPriority />,
  };
  const handleDelete = (id: string) => {
    setTaskList((prevList: any) =>
      prevList.filter((list: any) => list.id !== id)
    );
  };

  const handleEdit = (id: string) => {
    const taskToEdit = taskList.find((task: any) => task.id === id);
    if (taskToEdit) {
      setTaskToEdit(taskToEdit); // Now it's an object, not an array
      setAddTask(true);
    }
  };

  const handleTaskComplete = (id: string) => {
    setTaskList((prevList: any) =>
      prevList.map((task: any) =>
        task.id === id ? { ...task, isComplete: !task.isComplete } : task
      )
    );
  };

  return (
    <div className="w-full p-3 sm:p-12">
      <div className="flex items-end gap-2 mb-7 font-custom-exo">
        <h1 className="font-black text-4xl text-primary-blue ">Task List</h1>
        <span className="text-2xl sm:text-3xl font-semibold text-custom-gray">
          ({taskList?.length ?? "0"})
        </span>
      </div>
      <div
        className="grid grid-cols-[repeat(auto-fit,minmax(130px,1fr))] 
            sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-10"
      >
        {taskList?.map((task: any) => (
          <div
            key={task.id}
            className="h-full min-h-[250px] sm:min-h-[350px] p-3 sm:p-5 rounded-lg
              flex flex-col gap-3 sm:gap-5 shadow-custom-shadow"
          >
            <div className="flex items-center justify-between">
              <span className="font-bold text-xl sm:text-2xl text-custom-black-200">
                {task.title}
              </span>
              <div
                className="text-xl sm:text-2xl transition ease-in-out
                text-custom-gray flex gap-3"
              >
                <button
                  onClick={() => handleEdit(task.id)}
                  className="hover:scale-90 hover:text-green-600"
                >
                  <FiEdit />
                </button>
                <button
                  className="hover:scale-90 hover:text-custom-red"
                  onClick={() => handleDelete(task.id)}
                >
                  <IoTrashOutline />
                </button>
              </div>
            </div>
            <div className="flex-grow text-custom-black-100 text-[0.9rem] sm:text-xl">
              <p>{task.desc}</p>
            </div>

            <div className="mt-auto font-custom-exo flex gap-3 text-custom-gray">
              <div className="flex items-center gap-2 text-custom-gray">
                <IoCalendarOutline className="text-[0.8rem] sm:text-2xl" />
                <span className="text-[0.8rem] sm:text-[1rem]">
                  {task.date}
                </span>
              </div>
              <span className="text-[0.8rem] sm:text-2xl">
                {importance[task.priority]}
              </span>
              <button
                onClick={() => handleTaskComplete(task.id)}
                className="text-[0.8rem] sm:text-2xl"
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
        <div
          className="h-full min-h-[250px] sm:min-h-[350px] flex justify-center items-center 
          shadow-custom-shadow transition ease-in-out hover:scale-95 rounded-lg"
          onClick={() => setAddTask(true)}
        >
          <IoAdd className="text-8xl text-custom-black-100" />
        </div>
      </div>
    </div>
  );
};
export default Content;
