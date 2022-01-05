const { expect } = require('chai');

const BigNumber = web3.BigNumber;

const Token = artifacts.require('Token');

require('chai')
  .use(require('chai-bignumber')(BigNumber))
  .should();

contract('Token', accounts => {
  const _name = 'Token';
  const _symbol = 'TOK';
  const _decimals = web3.utils.toBN('18');
  const _initialSupply = web3.utils.toBN('100000'); 

  beforeEach(async function () {
    this.token = await Token.new(_name, _symbol, _decimals, _initialSupply);
  });

  describe('token attributes', function() {
    it('has the correct name', async function() {
      const name = await this.token.name();
      name.should.equal(_name);
    });

    it('has the correct symbol', async function() {
      const symbol = await this.token.symbol();
      symbol.should.equal(_symbol);
    });

    it('has the correct decimals', async function() {
      const decimals = await this.token.decimals();
      //decimals.should.be.bignumber.eql(_decimals);
      expect(decimals).to.eql(_decimals);
    });

    it('has the correct initial supply', async function() {
        const initialSupply = await this.token.totalSupply();
        //decimals.should.be.bignumber.eql(_decimals);
        expect(initialSupply).to.eql(_initialSupply);
      });
  });
});