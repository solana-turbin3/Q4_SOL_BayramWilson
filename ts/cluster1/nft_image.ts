import wallet from "../../../Turbin3-wallet.json"
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults"
import { createGenericFile, createSignerFromKeypair, signerIdentity } from "@metaplex-foundation/umi"
import { irysUploader } from "@metaplex-foundation/umi-uploader-irys"
import { readFile } from "fs/promises"

// Create a devnet connection
const umi = createUmi('https://api.devnet.solana.com');

let keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const signer = createSignerFromKeypair(umi, keypair);

umi.use(irysUploader());
umi.use(signerIdentity(signer));

(async () => {
    try {
        //1. Load image
        //2. Convert image to generic file.
        //3. Upload image
<<<<<<< HEAD
        const imagePath = "/home/rammo/TURBIN3/solana-starter/assets/generug.png"
        const image = await readFile(imagePath)
        const genericFile = createGenericFile(image, "generug.png")
        const [myUri] =  await umi.uploader.upload([genericFile])
        console.log("Your image URI: ", myUri);
=======

        // const image = ???

        // const [myUri] = ??? 
        // console.log("Your image URI: ", myUri);
>>>>>>> 5a39920bb4abfcdf67f90818bcb0e28d0faf7588
    }
    catch(error) {
        console.log("Oops.. Something went wrong", error);
    }
})();
<<<<<<< HEAD
// https://devnet.irys.xyz/84gHHfEHLKffmkeZY9wqXbpzHeiStan39GhfVR4xv5pp
=======
>>>>>>> 5a39920bb4abfcdf67f90818bcb0e28d0faf7588
