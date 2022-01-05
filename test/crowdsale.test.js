

const {web3} = require("hardhat"); 

const { contract } = require("hardhat");
const BigNumber = web3.BigNumber;
require('chai')
    .use(require('chai-as-promised'))
    .use(require('chai-bignumber')(BigNumber))
    .should();

const MyCrowdsale = artifacts.require("MyCrowdsale"); 
const Token = artifacts.require("Token")

function ether (n) {
    return new web3.utils.toBN(web3.utils.toWei(n, 'ether')); 
}

// _ is the address that deployed the Crowdsale contract (owner)
// wallet is used to create the crowdsale contract (contract itself)
contract('Crowdsale', function([_, wallet, tokenWallet, investor1, investor2]) {

    
    beforeEach(async function () {
        // token config
        this.name = "token"; 
        this.symbol = "TOK"; 
        this.decimals = 18; 
        this.initialSupply = 100000;

        // deploy token
        this.token = await Token.new(
            this.name, 
            this.symbol,
            this.decimals,
            this.initialSupply 
        );

        // crowdsale config
        this.rate = web3.utils.toBN('1'); 
        this.wallet = wallet; 
        this.tokenWallet = tokenWallet; 
        this.crowdsale = await MyCrowdsale.new(
            this.rate, 
            this.wallet,
            this.token.address,
            this.tokenWallet
        );

        // give a tokens to tokenWallet
        


        // transfer ownership?
        // await this.token.transferOwnership(this.crowdsale.address);
    });

    describe('crowdsale', function() {
        it('tracks the rate', async function() {
            const rate = await this.crowdsale.rate();
            //rate.should.be.bignumber.eql(this.rate); 
            expect(rate).to.eql(this.rate);
        });
        
        it('tracks the wallet', async function() {
            const wallet = await this.crowdsale.wallet();
            wallet.should.equal(this.wallet); 
        }); 

        it('tracks the token', async function() {
            const token = await this.crowdsale.token();
            token.should.equal(this.token.address);
        });

        it('tracks the tokenWallet', async function() {
            const tokenWallet = await this.crowdsale.tokenWallet(); 
            tokenWallet.should.equal(this.tokenWallet);
        })
    });

    describe('accepting payments', function() {
        it('should accept payments', async function() {
            const value = ether('1'); 
            console.log('value: ', value);
            await this.crowdsale.sendTransaction({ value: value, from: investor1})
        })
    })

});