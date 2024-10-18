import wallet from "../../../Turbin3-wallet.json";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { 
    createMetadataAccountV3, 
    CreateMetadataAccountV3InstructionAccounts, 
    CreateMetadataAccountV3InstructionArgs,
    DataV2Args,
    findMetadataPda 
} from "@metaplex-foundation/mpl-token-metadata";
import { createSignerFromKeypair, signerIdentity, publicKey } from "@metaplex-foundation/umi";
import { bs58 } from "@coral-xyz/anchor/dist/cjs/utils/bytes";

// Create a UMI connection
const umi = createUmi('https://api.devnet.solana.com');
const keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const signer = createSignerFromKeypair(umi, keypair);
umi.use(signerIdentity(createSignerFromKeypair(umi, keypair)));

// Define our Mint address
const mint = publicKey("6BT7WZRXtYK6b5E98grpZjfC6GgUE7gSivm8TjLrWL2T");

// Create the context for findMetadataPda
const context = {
    eddsa: umi.eddsa,
    programs: umi.programs
};

// Call findMetadataPda with the context and seeds
const metadataPda = findMetadataPda(context, {
    mint: mint // Pass the mint PublicKey
});

// Check if the metadataPda has a base58 conversion directly
const metadataPdaBase58 = metadataPda.toString(); // Direct conversion to string

console.log(`Metadata PDA: ${metadataPdaBase58}`);

(async () => {
    try {
        // Start here
        let accounts: CreateMetadataAccountV3InstructionAccounts = {
            metadata: metadataPda, // Use the metadata PDA
            mint: mint,
            mintAuthority: signer,
            payer: signer,
            updateAuthority: signer.publicKey
        };

        let data: DataV2Args = {
            name: "CollectiFi",
            symbol: "CiFi",
            uri: "/home/rammo/TURBIN3/solana-starter/ts/cluster1/spl_metadata.json", // Add your metadata URI
            sellerFeeBasisPoints: 500,
            creators: null,
            collection: null,
            uses: null
        };

        let args: CreateMetadataAccountV3InstructionArgs = {
            data: data,
            isMutable: true,
            collectionDetails: null
        };

        let tx = createMetadataAccountV3(
            umi,
            {
                ...accounts,
                ...args
            }
        );

        let result = await tx.sendAndConfirm(umi);
        console.log(bs58.encode(result.signature));
    } catch (e) {
        console.error(`Oops, something went wrong: ${e}`);
    }
})();
