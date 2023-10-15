import * as React from "react";
import { useCookies } from "react-cookie";

import { generateKeyPairSync, createSign, randomBytes } from 'node:crypto';

function genSignature() {
  const signer = createSign('rsa-sha256');

  return () => {
    const randomBuffer = randomBytes(256).toString('utf-8');
    const signerCopy = signer.update(randomBuffer);
    return {random: randomBuffer, signed: signerCopy.sign()}
  }
}

export default function UniqueUserProvider(props) {
  const [cookie, setCoookie]  = useCookies(['uniqueUser']); 

  const { privateKey, publicKey } = cookie || generateKeyPairSync('rsa');

  setCoookie({privateKey, publicKey})

  return (
    <UniqueUser.Provider 
      publicKey={publicKey} 
      privateKey={privateKey} 
      genSignature={genSignature}
    >
      {...props}
    </UniqueUser.Provider>
  );
}
