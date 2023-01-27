import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";
import { showThrottleMessage } from "@ethersproject/providers";

import { Hello } from "../typechain-types";
import { EtherSymbol } from "@ethersproject/constants";
describe("Hello", function () {

    async function deployFunction() {

        const [owner, otherAccount] = await ethers.getSigners();

        const Hello = await ethers.getContractFactory("Hello");
        const helloContract = await Hello.deploy() as Hello;

        return { helloContract, owner, otherAccount };
    }

    describe("Testing our contract", function () {
        
        
        it("Get message", async function () {
            const { helloContract, owner, otherAccount } = await loadFixture(deployFunction);

            await helloContract.setMessage('hello world')
            let message = await helloContract.getMessage()
            
            expect(message).to.equal('hello world');
        });

    });



});
