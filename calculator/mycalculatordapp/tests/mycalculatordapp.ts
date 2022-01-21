// import * as anchor from '@project-serum/anchor';
// import { Program } from '@project-serum/anchor';
// import { Mycalculatordapp } from '../target/types/mycalculatordapp';

const assert = require('assert');
const anchor = require('@project-serum/anchor');
const { SystemProgram } = anchor.web3;

describe('mycalculatordapp', () => {
  const provider = anchor.Provider.local();
  anchor.setProvider(provider);

  const calculator = anchor.web3.Keypair.generate();
  const program = anchor.workspace.Mycalculatordapp;

  it('Creates a calculator', async () => {
    await program.rpc.create("Welcome to Solana", {
      accounts: {
        calculator: calculator.publicKey,
        user: provider.wallet.publicKey,
        systemProgram: SystemProgram.programId,
      },
      signers: [calculator]
    });

    const account = await program.account.calculator.fetch(calculator.publicKey);
    assert.ok(account.greeting === "Welcome to Solana");
    _calculator = calculator;
  });

  it("Adds two numbers", async function() {
    const calculator = _calculator;
    
    await program.rpc.add(new anchor.BN(2), new anchor.BN(3), {
      accounts: {
        calculator: calculator.publicKey,
      },
    });

    const account = await program.account.calculator.fetch(calculator.publicKey);
    assert.ok(account.result.eq(new anchor.BN(5)));
    assert.ok(account.greeting === "Welcome to Solana");
  });

  it('Multiplies two numbers', async function() {
    const calculator = _calculator;

    await program.rpc.multiply(new anchor.BN(2), new anchor.BN(3), {
      accounts: {
        calculator: calculator.publicKey,
      },
    });

    const account = await program.account.calculator.fetch(calculator.publicKey);
    assert.ok(account.result.eq(new anchor.BN(6)));
    assert.ok(account.greeting === "Welcome to Solana");
  })


  it('Subtracts two numbers', async function() {
    const calculator = _calculator;

    await program.rpc.subtract(new anchor.BN(2), new anchor.BN(3), {
      accounts: {
        calculator: calculator.publicKey,
      },
    });

    const account = await program.account.calculator.fetch(calculator.publicKey);
    assert.ok(account.result.eq(new anchor.BN(-1)));
    assert.ok(account.greeting === "Welcome to Solana");
  });


  t('Divides two numbers', async function() {
    const calculator = _calculator;

    await program.rpc.divide(new anchor.BN(10), new anchor.BN(5), {
      accounts: {
        calculator: calculator.publicKey,
      },
    });

    const account = await program.account.calculator.fetch(calculator.publicKey);
    assert.ok(account.result.eq(new anchor.BN(2)));
    assert.ok(account.remainder.eq(new anchor.BN(0)));
    assert.ok(account.greeting === "Welcome to Solana");
  });
});

// describe('mycalculatordapp', () => {

  // Configure the client to use the local cluster.
  // anchor.setProvider(anchor.Provider.env());

  // const program = anchor.workspace.Mycalculatordapp as Program<Mycalculatordapp>;

  // it('Is initialized!', async () => {
  //   // Add your test here.
  //   const tx = await program.rpc.initialize({});
  //   console.log("Your transaction signature", tx);
  // });
// });