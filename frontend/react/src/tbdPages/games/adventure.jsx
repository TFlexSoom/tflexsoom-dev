import * as React from "react"

import Layout from "../../components/layout"
import Seo from "../../components/seo"
import Shell from "../../components/shell"
import { UniqueUserProvider, useUniqueUser } from "../../hooks/uniqueUser";
import { exportJWK } from "jose";

async function requestToServer(command, args, commandContext) {
    const { genSignature, game, updateGame } = commandContext;

    const { random, signed } = await genSignature(JSON.stringify(game));

    const resp = await fetch(
        `${process.env.GATSBY_API_URL}/adventure/${game?.playerId}` +
        `?action=${command}` +
        `&randomData=${random}` +
        `&signature=${signed}`
        , {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
                "Origin": process.env.GATSBY_SITE_URL,
            },
            redirect: "follow",
            referrerPolicy: "no-referrer",
            body: JSON.stringify({ "args": args })
        });

    console.log(resp);
    updateGame(resp.json());

    return "ACTION RECEIVED!";
}

async function infoImpl(command, args, commandContext) {
    return JSON.stringify(commandContext?.game || {});
}

async function newGameImpl(command, args, commandContext) {
    const { publicKey, updateGame } = commandContext;

    const publicKeyExport = await exportJWK(publicKey);
    const publicKeyExportUrl = encodeURIComponent(JSON.stringify(publicKeyExport));

    const resp = await fetch(
        `${process.env.GATSBY_API_URL}/adventure` +
        `?class=${args[0] || "0"}` +
        `&key=${publicKeyExportUrl}`
        , {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
                "Origin": process.env.GATSBY_SITE_URL,
            },
            redirect: "follow",
            referrerPolicy: "no-referrer",
        });

    console.log(resp);
    updateGame(resp.json());

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

function AdventureGame() {
    const uniqueUserComponents = useUniqueUser();
    const [game, updateGame] = React.useState(null);
    const publicKey = uniqueUserComponents?.publicKey;
    const genSignature = uniqueUserComponents?.genSignature;

    const commandContext = {
        publicKey,
        genSignature,
        game,
        updateGame,
    }

    return (
        <>
            <section className=" flex flex-col items-center bg-black ">
                <h1 className=" text-xl text-white ">Adventure Game</h1>
            </section>
            <Shell commands={commands} commandContext={commandContext} />
            <section className=" flex flex-col items-center bg-black ">
                <p className=" text-l text-white max-w-7xl text-center">
                    Note: cookies are used to save your adventure session. <br />
                    These allow you to continue the game after refreshing the page. <br />
                    These cookies are randomly generated and are not used for any sort of tracking. <br />
                    Thank You!
                </p>
            </section>
        </>
    );
}

export default function Adventure() {
    return (
        <Layout isWhite>
            <UniqueUserProvider>
                <AdventureGame />
            </UniqueUserProvider>
        </Layout>
    );
}

export const Head = () => <Seo title="Adventure Game" />;
