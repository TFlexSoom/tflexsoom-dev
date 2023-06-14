import * as React from "react";

function submitCommandImpl({
  event,
  commands,
  onSubmitCommand,
  setCommandBufferNav,
  commandBuffer,
  setCommandBuffer,
  textBuffer,
  setTextBuffer,
  inputBuffer,
  setInputBuffer,
}) {
  event.preventDefault();



}

export default function SinglePage(props) {
  const { commands, onSubmitCommand, prefix } = props;

  const [commandBufferNav, setCommandBufferNav] = React.useState(-1);
  const [commandBuffer, setCommandBuffer] = React.useState([]);
  const [textBuffer, setTextBuffer] = React.useState([]);
  const [inputBuffer, setInputBuffer] = React.useState(
    commandBufferNav > -1 && commandBufferNav < commandBuffer.length 
      ? commandBuffer[commandBuffer.length - commandBufferNav - 1] 
      : ""
  );
  
  // Grab last 20 lines
  // Join by newline
  const bufferFormatted = textBuffer.slice(textBuffer.length - 20, textBuffer.length).join('\n');

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
          onSubmit={(event) => submitCommandImpl({
            event,
            commands,
            onSubmitCommand,
            setCommandBufferNav,
            commandBuffer,
            setCommandBuffer,
            textBuffer,
            setTextBuffer,
            inputBuffer,
            setInputBuffer,
          })}
        >
          <div>{prefix || `>>>`}</div>
          <input
            className=" bg-transparent border-none w-full font-mono focus:ring-0 focus:outline-none "
            type="text"
            value={inputBuffer}
            onChange={(e) => setInputBuffer(e.target.value)}
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
