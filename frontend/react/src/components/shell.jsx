import * as React from "react";

export default function SinglePage(props) {
  const { commands, onSubmitCommand, prefix } = props;

  const [bufferNav, setBufferNav] = React.useState(-1);
  const [buffer, setBuffer] = React.useState(["ATTACK", "FLEE", "ATTACK"]);
  
  // Grab last 20 lines
  // Join by newline
  const bufferFormatted = buffer.slice(buffer.length - 20, buffer.length).join('\n');

  return (
    <section className="flex flex-col items-center bg-black">
      <div className={
        "flex flex-col mt-[2%] w-[85%] p-1 bg-neutral-900 " +
        " border-slate-900 border-[0rem] md:border-[2rem] rounded-md " +
        " text-white font-mono "
      }>
        <pre className=" h-[50vh] overflow-y-auto mb-1 ">
          {bufferFormatted}
        </pre>
        <form
          className=" flex flex-row items-center w-full "
          action="none"
        >
          <div>{prefix || `>>>`}</div>
          <input
            className=" bg-transparent border-none w-full font-mono focus:ring-0 focus:outline-none "
            type="text"
            defaultValue={ bufferNav > -1 && bufferNav < buffer.length ? buffer[buffer.length - bufferNav - 1] : ""}
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
