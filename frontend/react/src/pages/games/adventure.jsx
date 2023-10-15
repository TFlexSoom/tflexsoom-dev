import * as React from "react"

import Layout from "../../components/layout"
import Seo from "../../components/seo"
import Shell from "../../components/shell"

async function requestToServer(state, updateState, command, args) {
    const resp = await fetch(`/adventure/${state?.playerId}?action=${command}`, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json"
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify({"args": args})
    });

    updateState(resp.json());

    return "ACTION RECEIVED!";
}

async function infoImpl(state, updateState, command, args) {
    return JSON.stringify(state, space = true);
}

async function newGameImpl(state, updateState, command, args) {
    const key = "";
    const resp = await fetch(`/adventure?class=${args[0]}&key=${key}`, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json"
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
    });

    updateState(resp.json());

    return "NEW GAME CREATED!";
}

const commands = {
    "ATTACK": requestToServer,
    "MOVE": requestToServer,
    "ABILITY": requestToServer,
    "LAST": infoImpl,
    "HELP": infoImpl, // TODO
    "NEW": newGameImpl,
    "STATS": infoImpl, // TODO
}

export default function AdventureGame() {
    const [game, updateGame] = React.useState(null);

    return (
        <Layout isWhite>
            <section className=" flex flex-col items-center bg-black ">
                <h1 className=" text-xl text-white ">Adventure Game</h1>
            </section>
            <Shell state={game} updateState={updateGame} commands={commands}/>
        </Layout>
    );
}

export const Head = () => <Seo title="Adventure Game" />;
