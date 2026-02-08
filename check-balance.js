// check-balance.js

const { ethers } = require('ethers');

// Function to check balance of an Ethereum account
async function checkBalance(address) {
    const provider = new ethers.providers.InfuraProvider('mainnet', 'YOUR_INFURA_PROJECT_ID');

    try {
        const balance = await provider.getBalance(address);
        console.log(`Balance of ${address}: ${ethers.utils.formatEther(balance)} ETH`);
    } catch (error) {
        console.error('Error fetching balance:', error);
    }
}

// Replace with the address you want to check
const addressToCheck = '0xYourEthereumAddress';
checkBalance(addressToCheck);