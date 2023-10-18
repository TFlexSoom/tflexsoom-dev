import * as React from "react";
import { useCookies } from "react-cookie";
import { SignJWT, generateKeyPair, exportJWK, importJWK } from "jose";

const alg = "PS256";

async function genKeys(setCookie) {
    const { privateKey, publicKey } = await generateKeyPair(alg, { extractable: true });

    const privateKeySaved = await exportJWK(privateKey);
    const publicKeySaved = await exportJWK(publicKey);

    setCookie('privateKey', privateKeySaved);
    setCookie('publicKey', publicKeySaved);

    return { privateKey, publicKey };
}

async function importKeys(cookie) {
    const privateKey = await importJWK({ ext: true, ...cookie?.privateKey }, alg);
    const publicKey = await importJWK({ ext: true, ...cookie?.publicKey }, alg);
    return { privateKey, publicKey };
}

async function genSignature(privateKey, payload) {
    const signedData = await new SignJWT(payload)
        .setProtectedHeader({ alg })
        .setIssuedAt()
        .setExpirationTime('5m')
        .sign(privateKey)
    return signedData;
}

const UniqueUser = React.createContext(null);

export function useUniqueUser() {
    const ctxt = React.useContext(UniqueUser);
    return ctxt;
}

export function UniqueUserProvider({ children }) {
    const [cookie, setCookie] = useCookies(['privateKey', 'publicKey']);
    const [keys, setKeys] = React.useState(null)

    if ((cookie?.privateKey || null) === null) {
        genKeys(setCookie).then(({ privateKey, publicKey }) => {
            console.log("GENERATED KEY");
            setKeys({ privateKey, publicKey });
        });
    } else if (keys == null) {
        importKeys(cookie).then(({ privateKey, publicKey }) => {
            console.log("LOADED KEY")
            setKeys({ privateKey, publicKey });
        })
    }


    return (
        <UniqueUser.Provider
            value={{
                publicKey: keys?.publicKey,
                genSignature: genSignature.bind(null, keys?.privateKey),
            }}

        >
            {children}
        </UniqueUser.Provider>
    );
}
