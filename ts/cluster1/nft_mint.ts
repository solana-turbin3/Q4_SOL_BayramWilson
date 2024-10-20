import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { createSignerFromKeypair, signerIdentity, generateSigner, percentAmount } from "@metaplex-foundation/umi";
import { createNft, mplTokenMetadata } from "@metaplex-foundation/mpl-token-metadata";
import wallet from "../../../Turbin3-wallet.json";
import base58 from "bs58";

const RPC_ENDPOINT = "https://api.devnet.solana.com";
const umi = createUmi(RPC_ENDPOINT);

// Load the keypair from the secret key
let keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const myKeypairSigner = createSignerFromKeypair(umi, keypair);

// Use the signer and the Metaplex token metadata program
umi.use(signerIdentity(myKeypairSigner));
umi.use(mplTokenMetadata());

// Generate a new keypair for the mint account
const mint = generateSigner(umi);

(async () => {
    try {
        // Metadata and attributes for the NFT
        const metadataUri = "https://devnet.irys.xyz/84gHHfEHLKffmkeZY9wqXbpzHeiStan39GhfVR4xv5pp"; // Replace with your uploaded metadata URI
        const name = "CollectiFi";
        const symbol = "CiFi";
        const sellerFeeBasisPoints = percentAmount(0, 2); // 2.5% fee
        
        // Create the NFT using the createNft function
        const tx = await createNft(umi, {
            mint: mint,                  // The mint account to create
            authority: myKeypairSigner,  // The authority to mint the token
            name: name,                  // Name of the NFT
            uri: metadataUri,            // Metadata URI
            sellerFeeBasisPoints,        // Seller fee (in basis points)
            symbol: symbol,              // Symbol for the NFT
            isMutable: true,             // Whether the metadata is mutable
        });
        // Send and confirm the transaction
        const result = await tx.sendAndConfirm(umi);
        const signature = base58.encode(result.signature);

        console.log(`Successfully Minted! Check out your TX here:\nhttps://explorer.solana.com/tx/${signature}?cluster=devnet`);

        // Output the mint address
        console.log("Mint Address: ", mint.publicKey.toString());
    } catch (error) {
        console.error("Minting failed:", error);
    }
})();
