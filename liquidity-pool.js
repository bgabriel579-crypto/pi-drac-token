// liquidity-pool.js

const Web3 = require('web3');
const { ethers } = require('ethers');

// Set up provider and wallet
const provider = new ethers.providers.JsonRpcProvider('https://your.ethereum.node');
const wallet = new ethers.Wallet('YOUR_PRIVATE_KEY', provider);

// Contracts addresses
const TOKEN_A_ADDRESS = 'YOUR_TOKEN_A_ADDRESS';
const TOKEN_B_ADDRESS = 'YOUR_TOKEN_B_ADDRESS';
const UNISWAP_ROUTER_ADDRESS = 'YOUR_UNISWAP_ROUTER_ADDRESS';

// ABI for Uniswap Router
const UNISWAP_ROUTER_ABI = [ /* ABI comes here */ ];

async function createLiquidityPool(amountA, amountB) {
    const router = new ethers.Contract(UNISWAP_ROUTER_ADDRESS, UNISWAP_ROUTER_ABI, wallet);

    const approveTokenA = await router.approve(TOKEN_A_ADDRESS, amountA);
    const approveTokenB = await router.approve(TOKEN_B_ADDRESS, amountB);

    await Promise.all([approveTokenA.wait(), approveTokenB.wait()]);

    const tx = await router.addLiquidity( 
        TOKEN_A_ADDRESS,  
        TOKEN_B_ADDRESS,  
        amountA,  
        amountB,  
        0,  // Min amount A 
        0,  // Min amount B 
        wallet.address,  
        Math.floor(Date.now() / 1000) + 60 * 20 // deadline
    );

    await tx.wait();
    console.log('Liquidity Pool Created!');
}

// Call the function to create a liquidity pool
const amountA = ethers.utils.parseUnits('10', 18); // Amount of Token A
const amountB = ethers.utils.parseUnits('10', 18); // Amount of Token B
createLiquidityPool(amountA, amountB);