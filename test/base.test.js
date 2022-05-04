const { assert } = require('chai')

const Base = artifacts.require('./Base')

require('chai')
  .use(require('chai-as-promised'))
  .should()

contract('Base', (accounts) => {
  let base

  beforeEach( async () => {
    base = await Base.deployed()
  })

  describe('deployment', async () => {
      it('deploys successfully', async () => {
        const address = base.address
        assert.notEqual(address, 0x0)
        assert.notEqual(address, '')
        assert.notEqual(address, null)
        assert.notEqual(address, undefined)
      })

      it('has a name', async () => {
        const name = await base.name()
        assert.equal(name, 'Base')
      })

      it('has a symbol', async () => {
        const symbol = await base.symbol()
        assert.equal(symbol, 'BASE')
      })
  })

  describe('minting', async () => {
    it('creates a new token', async () => {
      const result = await base.mint('#EC058E')

      const event = result.logs[0].args
      const tokenId = event.tokenId.toNumber()
      const totalSupply = await base.totalSupply()
      const item = await base.Items(tokenId)
      const owner = await base.ownerOf(tokenId)
      const approvedAddress = await base.getApproved(tokenId)
      console.log(approvedAddress)

      //success
      assert.equal(tokenId, totalSupply, 'id is correct')
      assert.equal(item.uri, '#EC058E', 'color is correct')
      assert.equal(item.creator, owner, 'creator is correct')
      // assert.equal(approvedAddress, market.address, 'approved address is correct')
      assert.equal(event.from, '0x0000000000000000000000000000000000000000', 'from is correct')
      assert.equal(event.to, accounts[0], 'to is correct')
    })
  })

  describe('indexing', async () => {
    it('lists colors', async () => {
      //mint 3 more tokens
      await base.mint('#5386E4')
      await base.mint('#FFFFFF')
      await base.mint('#000000')

      const totalSupply = await base.totalSupply()
      let item
      let result = []

      for (var i=1; i <= totalSupply; i++){
        item = await base.Items(i)
        result.push(item.uri)
      }

      let expected = ['#EC058E', '#5386E4', '#FFFFFF', '#000000']
      assert.equal(result.join(','), expected.join(','))
    })
  })
})