const { contract } = require("hardhat");
const BigNumber = web3.BigNumber;
require('chai')
    .use(require('chai-as-promised'))
    .use(require('chai-bignumber')(BigNumber))
    .should();

const MyCrowdsale = artifacts.require("MyCrowdsale"); 
const Token = artifacts.require("Token")



contract('Crowdsale', function([_, wallet]) {

    
    beforeEach(async function () {
        // token config
        this.name = "token"; 
        this.symbol = "TOK"; 
        this.decimals = 18; 

        // deploy token
        this.token = await Token.new(
            this.name, 
            this.symbol,
            this.decimals
        );

        // crowdsale config
        this.rate = web3.utils.toBN('1'); 
        console.log('wallet: ', wallet);
        this.wallet = wallet; 
        console.log('this.wallet: ', this.wallet);
        this.crowdsale = await MyCrowdsale.new(
            this.rate, 
            this.wallet,
            this.token.address
        );
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
    });


});