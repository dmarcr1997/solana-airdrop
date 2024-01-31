const {
    Connection,
    PublicKey,
    clusterApiUrl,
    Keypair,
    LAMPORTS_PER_SOL
} = require('@solana/web3.js');

const wallet = new Keypair();

const pubKey = new PublicKey(wallet._keypair.publicKey);
const secretKey = wallet._keypair.secretKey;

const getWalletBalance = async () => {
    try {
        const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
        const balance = await connection.getBalance(pubKey);
        console.log("You HAVE: ", balance / LAMPORTS_PER_SOL);

    } catch(err) {
        console.error(err);
    }
}

async function airdropSol() {
    try {
        console.log("Airdropping some SOL")
        const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
        const fromAirdropSignature = await connection.requestAirdrop(pubKey, 2 * LAMPORTS_PER_SOL);
        await connection.confirmTransaction(fromAirdropSignature);
    } catch(err) {
        console.error(err);
    }
}

async function main() {
    await getWalletBalance();
    await airdropSol();
    await getWalletBalance();
}

main();