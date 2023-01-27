
import { Signer } from "ethers";
import { ethers } from "hardhat";
import { Hello__factory } from "../typechain-types";
import dotenv from "dotenv";
dotenv.config();

const fs = require('fs');

async function main() {
 
 
  const PK1 = process.env.PRIVATE_KEY ?? "";
 

  //const wallet = ethers.Wallet.fromMnemonic(process.env.MNEMONIC ?? "");
  const wallet0 = new ethers.Wallet(PK1);
  
  const accounts = [
    wallet0,
  ];



  const chainId = 5; // goerli chain id
  const provider_base_url = "https://goerli.infura.io/v3/";
  const rpcUrl = provider_base_url + (process.env.INFURA_API_KEY ?? "")
  console.log('ChainId : ',rpcUrl)
  console.log('Rpc url : ',rpcUrl)
 
  const provider = new ethers.providers.JsonRpcProvider(
    rpcUrl,
    chainId,
  );

  const signer0 = wallet0.connect(provider);


  const signers = [
    signer0,
  ];


  const projectContractFactory = new Hello__factory(signer0);

  let projectContract: any = null;
  let projectContractAddress : string = ''
  try {
    const options = {
      gasLimit: 30000000,
      gasPrice: ethers.utils.parseUnits("10", "gwei").toHexString(),
    };
    projectContract = await projectContractFactory.deploy(options);
    await projectContract.deployed();
    projectContractAddress = projectContract.address
    console.log(
      `Main Final Project Contract deployed at ${projectContract.address}`,
    );
  } catch (e : any) {
    console.log(
      "Check on TENDERLY the failed transaction",
      "https://dashboard.tenderly.co/tx/goerli/" + e.transactionHash,
    );
  }



  fs.writeFileSync(
    'deploy_goerli.txt', 
    `PROJECT_FINAL_CONTRACT="${projectContractAddress}"`            + '\n' 
    );

  console.log('Check contract addresses saved in deploy_goerli.txt')

}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});