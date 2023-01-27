// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Hello {
    
    string internal  message;
    function setMessage(string memory _message) public {
       message = _message;
    }
    function getMessage() view public returns (string memory){
        return message;
    }
}
