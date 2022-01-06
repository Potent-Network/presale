pragma solidity ^0.5.0;

import "hardhat/console.sol"; 

import "@openzeppelin/contracts/crowdsale/Crowdsale.sol";
import "@openzeppelin/contracts/crowdsale/emission/AllowanceCrowdsale.sol";
import "@openzeppelin/contracts/crowdsale/emission/MintedCrowdsale.sol";
import "@openzeppelin/contracts/crowdsale/validation/CappedCrowdsale.sol";
import "@openzeppelin/contracts/crowdsale/validation/TimedCrowdsale.sol";

// minimum investor contribution - 0.002 ether 
// maximum investor contribution - 50 ether 
contract MyCrowdsale is Crowdsale, MintedCrowdsale, CappedCrowdsale {

    uint256 public investorMinCap = 2000000000000000;
    uint256 public investorMaxCap = 50000000000000000000;
    mapping(address => uint256) public contributions; 

    //address private tokenWallet;
    //AllowanceCrowdsale allowanceCrowdSale; 
    constructor(
        uint256 rate, 
        address payable wallet, 
        IERC20 token,
        uint256 _cap
        // address tokenWallet
        //address tokenWallet // argument for allowance crowdsale
        // IndividuallyCappedCrowdsale doesn't have a constructor 
        //uint256 openingTime, // for timed crowdsale
        //uint256 closingTime // for timed crowdsale 

    )
    Crowdsale(rate, wallet, token) 
    CappedCrowdsale(_cap)
    public
    {

    }

    /**
    * @dev Getter for user to contributions mapping 
    * @param _beneficiary Token purchaser address 
    */
    function getUserContribution(address _beneficiary) public view returns (uint256) {
        return contributions[_beneficiary]; 
    }

    /**
    * @dev Overrides and extends CappedCrowdsale behavior 
    * @param _beneficiary Token purchaser
    * @param _weiAmount Amount of tokens sent
    */
    function _preValidatePurchase(
        address _beneficiary,
        uint256 _weiAmount
    ) internal view {
        super._preValidatePurchase(_beneficiary, _weiAmount); 
        uint256 _existingContribution = contributions[_beneficiary]; 
        uint256 _newContribution = _existingContribution.add(_weiAmount); 
        require(_newContribution >= investorMinCap && _newContribution <= investorMaxCap);
    }

    /**
    * @dev Overrides and extends Crowdsale behavior to update contributions
    * @param _beneficiary Token purchaser
    * @param _weiAmount Amount of tokens sent
    */
    function _updatePurchasingState(
        address _beneficiary,
        uint256 _weiAmount 
    ) internal {
        uint256 _existingContribution = contributions[_beneficiary]; 
        uint256 _newContribution = _existingContribution.add(_weiAmount); 
        contributions[_beneficiary] = _newContribution; 

    }

    // /**
    // * @dev Overrides AllowanceCrowdsale behavior by calling allowance/approve before transfer
    // * @param beneficiary Token purchaser
    // * @param tokenAmount Amount of tokens purchased
    // */
    // function _deliverTokens(address beneficiary, uint256 tokenAmount) internal {
    //     console.log("in MyCrowdsale _deliverTokens()"); 
    //     console.log("beneficiary address: ", beneficiary); 
    //     console.log("tokenAmount: ", tokenAmount); 
    //     super.token().safeApprove(super.tokenWallet(), tokenAmount); 
    //     super.token().safeIncreaseAllowance(super.tokenWallet(), tokenAmount); 

    //     super.token().safeTransferFrom(super.tokenWallet(), beneficiary, tokenAmount);
    // }
    // IERC20(tokenAddress).approve(CROWDSALE_ADDRESS, SOME_TOKEN_AMOUNT);
}