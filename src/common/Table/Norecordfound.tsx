
function Norecordfound(props: { title: string }) {
  return (
    <div className="w-80 h-18 ">
      <div className="flex">
        <div className="w-18 h-18 bg-yellow-500 rounded-l-full">
          <div className="w-16 h-16 bg-white rounded-full mx-2 my-2">
            <h1 className="mx-4 mt-2.5 text-yellow-500 text-6xl">!</h1>
          </div>
        </div>
        <div className="h-18 w-60 border-black bg-amber-100 rounded-r-full flex items-center justify-center">
          <div className="text-md text-black font-bold my-4 mx-2.5  tracking-wide">
            {props.title}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Norecordfound;
