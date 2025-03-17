import loading from "../../assets/loading.gif";

const Loading = () => {
  return (
    <div
      className="absolute top-0 bottom-0 left-0 right-0
          inset-0 bg-[rgba(0,0,0,0.2)]"
    >
      <img
        className="fixed top-[40%] sm:top-[50%] left-[30%] sm:left-[50%]"
        src={loading}
        alt="Loading"
      />
    </div>
  );
};
export default Loading;
