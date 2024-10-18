import { Commitment, Connection, Keypair, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js"
import wallet from "../../../Turbin3-wallet.json"
import { getOrCreateAssociatedTokenAccount, transfer } from "@solana/spl-token";

// We're going to import our keypair from the wallet file
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

//Create a Solana devnet connection
const commitment: Commitment = "confirmed";
const connection = new Connection("https://api.devnet.solana.com", commitment);

// Mint address
const mint = new PublicKey("6BT7WZRXtYK6b5E98grpZjfC6GgUE7gSivm8TjLrWL2T");

// Recipient address
const to = new PublicKey("GH5nNwpSqN7N7WReMzkxpApugAeLa1NefhPAyfwKoiwP");

(async () => {
    try {
        // Get the token account of the fromWallet address, and if it does not exist, create it
        let from = getOrCreateAssociatedTokenAccount(connection, keypair, mint, keypair.publicKey)

        // Get the token account of the toWallet address, and if it does not exist, create it
        let toMe = getOrCreateAssociatedTokenAccount(connection, keypair, mint, to)
        // Transfer the new token to the "toTokenAccount" we just created
        const amount = 1
          // Check if there are enough tokens to transfer

        const transferIt = await transfer(connection, keypair, (await from).address, (await toMe).address, keypair, amount)
        console.log("Transfer successful, signature:", transferIt)
    } catch(e) {
        console.error(`Oops, something went wrong: ${e}`)
    }
})();