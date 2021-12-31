pragma solidity 0.5.5; 

import "@openzeppelin/contracts/token/ERC20/ERC20Detailed.sol"; 
import "@openzeppelin/contracts/token/ERC20/ERC20Mintable.sol"; 
import "@openzeppelin/contracts/token/ERC20/ERC20Pausable.sol"; 

contract Token is ERC20Detailed, ERC20Mintable, ERC20Pausable {
    constructor(string memory _name, string memory _symbol, uint8 _decimals)
        ERC20Detailed(_name, _symbol, _decimals)
        public {

        }
}