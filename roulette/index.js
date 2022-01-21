console.log("My first NodeJS application");

const web3 = require("@solana/web3.js");

const connection=new web3.Connection(web3.clusterApiUrl("devnet"),"confirmed");
//For checking whether the connection is successfully made
console.log(connection);

const userWallet=web3.Keypair.generate();
console.log(userWallet);

const userWallet=web3.Keypair.fromSecretKey(Uint8Array.from(userSecretKey));

/*
For making a successful transaction, the things needed:

    Public Key of the from wallet address
    Public Key of the to wallet address
    Amount to be transferred
    From Wallet instance for the signer

Initially, the participation amount will be from the user wallet and transferred to a treasuryWallet, whose secret key and wallet instance is already available. Thus, we can execute a transaction now. First, we will be creating a new transaction object. Then, we will be sending that transaction to another user and add our signature to it.
*/


const transferSOL=async (from,to,transferAmt)=>{
    try{
        const connection=new web3.Connection(web3.clusterApiUrl("devnet"),"confirmed");
        const transaction=new web3.Transaction().add(
            web3.SystemProgram.transfer({
                fromPubkey:new web3.PublicKey(from.publicKey.toString()),
                toPubkey:new web3.PublicKey(to.publicKey.toString()),
                lamports:transferAmt*web3.LAMPORTS_PER_SOL
            })
        )
        const signature=await web3.sendAndConfirmTransaction(
            connection,
            transaction,
            [from]
        )
        return signature;
    }catch(err){
        console.log(err);
    }
}



