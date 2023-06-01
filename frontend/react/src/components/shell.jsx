import * as React from "react";

export default function SinglePage(props) {
  const buffer = "ATTACK\nFLEE\nATTACK\nATTACK\nATTACK";
  
  return (
    <section className="flex flex-col items-center bg-black">
      <div className= {
        "flex flex-col mt-[30%] sm:mt-[12%] w-[90%] p-2 md:p-10 bg-slate-900 rounded-md " +
        " text-white font-monospace "
      }>
        <p className="h-[50vh]">
          {buffer}
        </p>
      <form 
        className=" flex flex-row items-center w-[100%] bg-[#000000A0] "
        action="none"
        >
        <div>{`>>>`}</div>
        <input 
          className=" bg-[#000000A0] border-none w-[100%] "
          type="text" 
          />
        <button 
          className=" rounded-md bg-[#80CC23] p-2 text-black"
          type="submit"
          > 
            Submit 
        </button>
      </form>
      </div>
    </section>
  );
}
