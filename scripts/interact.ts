import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { ethers } from "hardhat";
import {  Hello__factory } from "../typechain-types";
import * as dotenv from "dotenv";
dotenv.config();

async function main() {
  
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY ?? "")
    const infuraProvider = new ethers.providers.InfuraProvider("goerli", process.env.INFURA_API_KEY);
    const signer = wallet.connect(infuraProvider);
    const balanceEth = await signer.getBalance();
    console.log(`Balance of signer is ${balanceEth} ETH`);

    const helloFactory = new Hello__factory(signer);
    const helloContract = helloFactory.attach(process.env.FINAL_PROJECT_ADDRESS ?? "");
    console.log(`Hello contract address: ${helloContract.address}`);

   
    let res =  await helloContract.setMessage('hello world');
    await res.wait();
    let message = await helloContract.getMessage();
    console.log(message)

}

main().catch((error) => {
    console.log(error);
    process.exit(1);
})