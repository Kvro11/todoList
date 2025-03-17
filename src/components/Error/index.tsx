import empty from "../../assets/Error/empty.svg";

const Error = () => {
  return (
    <div className="w-full h-full flex flex-col items-center gap-2">
      <img
        className="w-full sm:w-[30%] mt-[50%] sm:mt-0"
        src={empty}
        alt="No data"
      />
      <h2 className="font-black text-2xl sm:text-4xl">No Data Yet!</h2>
      <span className="text-[1rem] sm:text-2xl text-center break-words w-full sm:w-[45%]">
        Looks like there’s no content here right now. Check back later or try
        something else.
      </span>
    </div>
  );
};
export default Error;
