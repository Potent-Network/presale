

const {web3} = require("hardhat"); 
const ethers = require("ethers"); 

const { contract } = require("hardhat");
const { assert, expect } = require("chai");
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
        this.initialSupply = ethers.BigNumber.from("1000000000000000000000");
        console.log(this.initialSupply);

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
        this.cap = ether('100'); 
        this.investorMinCap = ether('0.002');
        this.investorHardCap = ether('50'); 
        //this.tokenWallet = tokenWallet; 
        this.crowdsale = await MyCrowdsale.new(
            this.rate, 
            this.wallet,
            this.token.address,
            this.cap
            //this.tokenWallet
        );

        // give a tokens to tokenWallet
        // this.token.transfer(tokenWallet, this.initialSupply);

        // add token minter role to crowdsale contract 
        await this.token.addMinter(this.crowdsale.address);
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

        // it('tracks the tokenWallet', async function() {
        //     const tokenWallet = await this.crowdsale.tokenWallet(); 
        //     tokenWallet.should.equal(this.tokenWallet);
        // })
    });

    describe('minted crowdsale', function() {
        it('mints tokens after purchase', async function() {
            const originalTotalSupply = await this.token.totalSupply();
            await this.crowdsale.sendTransaction({value: ether('1'), from: investor1});
            const newTotalSupply = await this.token.totalSupply();
            assert.isTrue(newTotalSupply > originalTotalSupply); 
        })
    })

    describe('capped crowdsale', async function() {
        it('has the correct hard cap', async function() {
            const cap = await this.crowdsale.cap(); 
            expect(cap).to.eql(this.cap); 
        }); 
    })

    describe('accepting payments', function() {
        it('should accept payments', async function() {
            this.ts = await this.token.totalSupply(); 
            console.log('token total supply: ', this.ts.toString()); 
            // this.twb = await this.token.balanceOf(tokenWallet); 
            // console.log('tokenWallet balance: ', this.twb.toString()); 
            const value = ether('0.5'); 
            console.log('value: ', value);
            // investor1 needs to transfer money to crowdsale
            // crowdsale spends tokens in tokenWallet and transfer to investor 1 
            //  (tokenWallet needs to approve crowdsale)
            //  (check that allowance(tokenWallet, crowdsale) = tokens) 
            // console.log('tokenWallet address: ', this.tokenWallet);
            console.log("investor1 address: ", investor1); 
            //await this.tokenWallet.approve(this.crowdsale, 100000);
            //await this.token.approve(tokenWallet, 100);             
            //await this.token.increaseAllowance(this.tokenWallet, 100000); 
            
            const purchaser = investor2; 
            await this.crowdsale.sendTransaction({ value: value, from: investor1});
            await this.crowdsale.buyTokens(investor1, { value: value, from: purchaser }); 
        });
    });

    describe('individual contribution cap', function() {
        describe('when contribution less than minimum cap', async function() {
            it('rejects the transaction', async function() {
                const value = this.investorMinCap - 1; 
                await this.crowdsale.buyTokens(investor2, { value: value, from: investor2}).should.be.rejectedWith();
            })
        })
        describe('when the investor has already met the minimum cap', function() {
            it('allows below minimum contribution', async function() {
                // first valid contribution
                const value1 = ether('1');
                await this.crowdsale.buyTokens(investor1, { value: value1, from: investor1});
                // below minimum contribution
                const value2 = '1'; 
                await this.crowdsale.buyTokens(investor1, {value: value2, from: investor1}).should.be.fulfilled;
            }); 
        });
        describe('when the investor exceeds the max cap', function() {
            it('rejects the transaction', async function() {
                
            })
        })
    });
    
    



});