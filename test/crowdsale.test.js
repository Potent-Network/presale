const { contract } = require("hardhat");

const Crowdsale = artifacts.require("Crowdsale"); 
const Token = artifacts.require("Token")

contract('crowdsale', (_, wallet) => {
    beforeEach(async function () {
        // token config
        this.name = "token"; 
        this.symbol = "TOK"; 
        this.decimals = 18; 

        // deploy token
        this.token = await this.Token.new(
            this.name, 
            this.symbol,
            this.decimals
        );

        // crowdsale config
        this.rate = 1; 
        this.wallet = wallet; 
        this.token = await Crowdsale.new(
            this.rate, 
            this.wallet,
            this.token.address
        );
    });
});