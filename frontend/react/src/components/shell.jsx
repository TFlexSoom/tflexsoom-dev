import * as React from "react";

export default function SinglePage(props) {
  const buffer = "ATTACK\nFLEE\nATTACK\nATTACK\nATTACK";

  return (
    <section className="flex flex-col items-center bg-black">
      <div className={
        "flex flex-col mt-[30%] sm:mt-[12%] w-[85%] p-1 bg-neutral-900 " +
        " border-slate-900 border-[0rem] md:border-[2rem] rounded-md " +
        " text-white font-mono "
      }>
        <p className="h-[50vh]">
          {buffer}
        </p>
        <form
          className=" flex flex-row items-center w-full "
          action="none"
        >
          <div>{`>>>`}</div>
          <input
            className=" bg-transparent border-none w-full font-mono focus:ring-0 focus:outline-none "
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
