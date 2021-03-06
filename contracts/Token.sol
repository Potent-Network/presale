pragma solidity 0.5.5; 

import "@openzeppelin/contracts/token/ERC20/ERC20Detailed.sol"; 
import "@openzeppelin/contracts/token/ERC20/ERC20Mintable.sol"; 
import "@openzeppelin/contracts/token/ERC20/ERC20Pausable.sol"; 
import "@openzeppelin/contracts/token/ERC20/ERC20.sol"; 

contract Token is ERC20, ERC20Detailed, ERC20Mintable, ERC20Pausable {
    constructor(string memory _name, string memory _symbol, uint8 _decimals, uint256 initialSupply)
        ERC20Detailed(_name, _symbol, _decimals)
        public {
            _mint(_msgSender(), initialSupply); 
        }
}