import * as React from "react";

function submitCommandImpl({
    event,
    commands,
    commandContext,
    setCommandBufferNav,
    commandBuffer,
    setCommandBuffer,
    textBuffer,
    setTextBuffer,
    inputBuffer,
    setInputBuffer,
    setIsProcessing,
}) {
    event.preventDefault();

    // Always clear input buffer on submission
    setInputBuffer("");

    // Always reset buffer nav
    setCommandBufferNav(-1);

    // Always add input buffer to command buffer
    commandBuffer.push(inputBuffer);
    setCommandBuffer(commandBuffer);

    const [commandUncased, ...args] = inputBuffer.split(" ");
    const command = commandUncased.toUpperCase();

    if (commands[command] === undefined) {
        textBuffer.push(`Command "${command}" does not exist!`);
        setTextBuffer(textBuffer);
        return;
    }

    const maybePromise = commands[command](command, args, commandContext);
    if (maybePromise) {
        setIsProcessing(true);
        maybePromise
            .then((logging) => {
                console.log(logging);
                textBuffer.push(logging);
                setTextBuffer(textBuffer);
            })
            .finally(() => setIsProcessing(false));
    }
}

function inputTextImpl({
    e,
    isProcessing,
    setInputBuffer,
}) {
    if (!isProcessing) {
        setInputBuffer(e.target.value);
    }
}

export default function Shell(props) {
    const { commands, prefix, commandContext } = props;

    const [commandBufferNav, setCommandBufferNav] = React.useState(-1);
    const [commandBuffer, setCommandBuffer] = React.useState([]);
    const [textBuffer, setTextBuffer] = React.useState([]);
    const [inputBuffer, setInputBuffer] = React.useState(
        commandBufferNav > -1 && commandBufferNav < commandBuffer.length
            ? commandBuffer[commandBuffer.length - commandBufferNav - 1]
            : ""
    );
    const [isProcessing, setIsProcessing] = React.useState(false);

    const textBufferStart = textBuffer.length > 20 ? textBuffer.length - 20 : 0;
    const bufferFormatted = textBuffer.slice(textBufferStart, textBuffer.length).join('\n');

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
                        commandContext,
                        setCommandBufferNav,
                        commandBuffer,
                        setCommandBuffer,
                        textBuffer,
                        setTextBuffer,
                        inputBuffer,
                        setInputBuffer,
                        setIsProcessing,
                    })}
                >
                    <div>{prefix || `>>>`}</div>
                    <input
                        className=" bg-transparent border-none w-full font-mono focus:ring-0 focus:outline-none "
                        type="text"
                        value={inputBuffer}
                        onChange={(e) => inputTextImpl({
                            e,
                            isProcessing,
                            setInputBuffer,
                        })}
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
