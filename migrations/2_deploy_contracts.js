const Base = artifacts.require("Base");
const Transaction = artifacts.require("Transaction");

module.exports = async function(deployer) {
  await deployer.deploy(Base);

  const base = await Base.deployed()

  await deployer.deploy(Transaction, base.address)

  const market = await Transaction.deployed()

  await base.Init(market.address)
};
