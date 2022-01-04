pragma solidity ^0.5.0;

import "@openzeppelin/contracts/crowdsale/Crowdsale.sol";
import "@openzeppelin/contracts/crowdsale/emission/AllowanceCrowdsale.sol";
import "@openzeppelin/contracts/crowdsale/validation/IndividuallyCappedCrowdsale.sol";
import "@openzeppelin/contracts/crowdsale/validation/TimedCrowdsale.sol";

contract MyCrowdsale is Crowdsale {
    constructor(
        uint256 rate, 
        address payable wallet, 
        IERC20 token
        //address tokenWallet // argument for allowance crowdsale
        // IndividuallyCappedCrowdsale doesn't have a constructor 
        //uint256 openingTime, // for timed crowdsale
        //uint256 closingTime // for timed crowdsale 

    )
 
    Crowdsale(rate, wallet, token) 

    public
    {

    }

    // IERC20(tokenAddress).approve(CROWDSALE_ADDRESS, SOME_TOKEN_AMOUNT);
}