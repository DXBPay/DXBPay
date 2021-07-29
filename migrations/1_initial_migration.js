const WBNB = artifacts.require("WBNB");
const PancakeFactory = artifacts.require("PancakeFactory");
const PancakeRouter = artifacts.require("PancakeRouter");
const DXB = artifacts.require("DXB");
const cycleBurn = artifacts.require("cycleBurn");
const TeamVault = artifacts.require("TeamVault");
const RewardPool = artifacts.require("RewardPool");
const AirDrop = artifacts.require("AirDrop");

module.exports = async function (deployer,helpers,accounts) {
  await deployer.deploy(WBNB);
  let WBNB__ = await WBNB.deployed()

  await deployer.deploy(PancakeFactory,accounts[0]);
  let PancakeFactory__ = await PancakeFactory.deployed()

  await deployer.deploy(PancakeRouter,PancakeFactory__.address,WBNB__.address);
  let PancakeRouter__ = await PancakeRouter.deployed()
  
  await deployer.deploy(cycleBurn);
  let cycleBurn__ = await cycleBurn.deployed()


  await deployer.deploy(RewardPool);
  let RewardPool__ = await RewardPool.deployed() 

  await deployer.deploy(TeamVault,accounts[4],accounts[5],accounts[6],RewardPool__.address);
  let TeamVault__ = await TeamVault.deployed()

  await deployer.deploy(AirDrop,[accounts[11],accounts[12],accounts[13],accounts[14],accounts[15],accounts[16],accounts[17],accounts[18],accounts[19],
    accounts[20],accounts[21],accounts[22],accounts[23],accounts[24],accounts[25],accounts[26],accounts[27],accounts[28],accounts[29],accounts[30],
    accounts[31],accounts[32],accounts[33],accounts[34],accounts[35],accounts[36],accounts[37],accounts[38],accounts[39],accounts[40]],RewardPool__.address);
  let AirDrop__ = await AirDrop.deployed()

  await deployer.deploy(DXB,cycleBurn__.address,TeamVault__.address,AirDrop__.address,RewardPool__.address,[accounts[1],accounts[2],accounts[3]],PancakeRouter__.address);
  let DXB__ = await DXB.deployed()
};
