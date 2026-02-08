// token-mint.js

const StellarSdk = require('stellar-sdk');

const server = new StellarSdk.Server('https://horizon-testnet.stellar.org');
const keypair = StellarSdk.Keypair.fromSecret('YOUR_SECRET_KEY'); // Replace with your secret key

async function establishTrustline(destination) {
    const transaction = await server.transaction()
      .addOperation(StellarSdk.Operation.changeTrust({
          asset: new StellarSdk.Asset('YOUR_ASSET_CODE', 'YOUR_ISSUER_ACCOUNT'),
          source: destination
      }))
      .setSourceAccount(keypair.publicKey())
      .build();

    await transaction.sign(keypair);
    await server.submitTransaction(transaction);
    console.log('Trustline established');
}

async function mintTokens(destination, amount) {
    const transaction = await server.transaction()
      .addOperation(StellarSdk.Operation.payment({
          destination: destination,
          asset: new StellarSdk.Asset('YOUR_ASSET_CODE', 'YOUR_ISSUER_ACCOUNT'),
          amount: amount
      }))
      .setSourceAccount(keypair.publicKey())
      .build();

    await transaction.sign(keypair);
    await server.submitTransaction(transaction);
    console.log(`Minted ${amount} tokens to ${destination}`);
}

async function setHomeDomain() {
    const transaction = await server.transaction()
      .addOperation(StellarSdk.Operation.setOptions({
          homeDomain: 'YOUR_HOME_DOMAIN',
      }))
      .setSourceAccount(keypair.publicKey())
      .build();

    await transaction.sign(keypair);
    await server.submitTransaction(transaction);
    console.log('Home domain set');
}

async function checkBalance() {
    const account = await server.loadAccount(keypair.publicKey());
    console.log('Account balances:');
    account.balances.forEach((balance) => {
        console.log(`${balance.asset_code}: ${balance.balance}`);
    });
}

// Example usage:
(async () => {
    const destination = 'DIRECTION_ACCOUNT_ADDRESS'; // Replace with the recipient address
    await establishTrustline(destination);
    await mintTokens(destination, '10');  // Mint 10 tokens
    await setHomeDomain();
    await checkBalance();
})();
