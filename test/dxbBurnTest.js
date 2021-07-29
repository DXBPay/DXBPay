const {
    expectEvent, // Assertions for emitted events
    time,
    expectRevert,
  } = require("@openzeppelin/test-helpers");
const { italic } = require("ansi-colors");
const { use } = require("chai");
var chai = require("chai");
var expect = chai.expect;

const WBNB = artifacts.require("WBNB");
const PancakeFactory = artifacts.require("PancakeFactory");
const PancakeRouter = artifacts.require("PancakeRouter");
const DXB = artifacts.require("DXB");
const cycleBurn = artifacts.require("cycleBurn");
const TeamVault = artifacts.require("TeamVault");
const PancakePair = artifacts.require("PancakePair");
const RewardPool = artifacts.require("RewardPool");
const AirDrop = artifacts.require("AirDrop");

contract ("DXB", (accounts) => {
    var PancakeFactoryinstance;
    var WBNBinstance;
    var PancakeRouterinstance;
    const owner = accounts[0];
    const testAccount1 = accounts[1];
    const testAccount2 = accounts[2];
    const testAccount3 = accounts[3];
    const testAccount4 = accounts[4];
    const testAccount5 = accounts[5];
    const testAccount6 = accounts[6];
    const testAccount7 = accounts[7];
    const testAccount8 = accounts[8];
    const testAccount9 = accounts[9];
    const testAccount10 = accounts[10];
    before(async function () {
        PancakeFactoryinstance = await PancakeFactory.new(owner);
        WBNBinstance = await WBNB.new();
        PancakeRouterinstance = await PancakeRouter.new(PancakeFactoryinstance.address, WBNBinstance.address);
        cycleBurninstance = await cycleBurn.new();
        Rewardinstance = await RewardPool.new();
        TeamVaultinstance = await TeamVault.new(testAccount4,testAccount5,testAccount6,Rewardinstance.address);
        AirDropinstance = await AirDrop.new([accounts[11],accounts[12],accounts[13],accounts[14],accounts[15],accounts[16],accounts[17],accounts[18],
            accounts[19],accounts[20],accounts[21],accounts[22],accounts[23],accounts[24],accounts[25],accounts[26],accounts[27],accounts[28],accounts[29],
            accounts[30],accounts[31],accounts[32],accounts[33],accounts[34],accounts[35],accounts[36],accounts[37],accounts[38],accounts[39],accounts[40]],
            Rewardinstance.address);
        DXBinstance = await DXB.new(cycleBurninstance.address,TeamVaultinstance.address,AirDropinstance.address,Rewardinstance.address,[testAccount1,testAccount2,testAccount3],PancakeRouterinstance.address);
    });

    describe("[TestCase 1: To get Init code and Router contract address]",() =>{
        it("get init and Router contract address", async ()=>{
            let initialhash = await PancakeFactoryinstance.getInitCode()
            console.log(initialhash);
            console.log(PancakeRouterinstance.address);
        })
        
    });

    describe("[TestCase 2: To check the name, symbol, decimal and totalsupply.]",()=>{
        it("2.1 check the name of the DBX token", async ()=>{
            const name = await DXBinstance.name();
            console.log("name of the contract is :" + name);
        })
        it("2.2 check the symbol of the DBX token", async ()=>{
            const symbol = await DXBinstance.symbol();
            console.log("symbol of the contract is :" + symbol);
        })
        it("2.3 check the decimal of the DBX token", async ()=>{
            const decimal = await DXBinstance.decimals();
            console.log("decimal of the contract is :" + Number(decimal));
        })
        it("2.4 check the totalsupply of the DBX token", async ()=>{
            const totalsupply = await DXBinstance.totalSupply();
            console.log("totalsupply of the contract is :" + Number(totalsupply));
        })
        it("2.5 check the Owner balance", async ()=>{
            const Ownerbalance = await DXBinstance.balanceOf(owner);
            console.log("Owner balance :" + Number(Ownerbalance/1e18));
        });
    })
    
    describe("[TestCase 3: to call update in Rewardtpool contract]",()=>{
        it("3.1 To set the Authentiacation in Rewardtpool contract",async()=>{
            const auth = await Rewardinstance.updateAuth(DXBinstance.address,{from: owner});
            console.log("updateAuth function GasPrice",auth.receipt.gasUsed);
        })
        it("3.2 Update the DXB contract address",async()=>{
            const dxb = await Rewardinstance.updatedDXB(DXBinstance.address,{from: owner});
            console.log("updateAuth function GasPrice",dxb.receipt.gasUsed);
        });
        it("3.3 update the Authentication in cycleburn contract",async()=>{
            const authen = await cycleBurninstance.setAuth(DXBinstance.address,{from: owner});
            console.log("setAuth function GasPrice",authen.receipt.gasUsed);
        });

        
    })

    describe("[TestCase 4: transfer the token for testaccounts from owner]",()=>{
        it("4.1 transfer 1000 token by owner", async()=>{
            const transfefun =  await DXBinstance.transfer(AirDropinstance.address,"1000000000000000000000",{from: owner});
            console.log("transfer function GasPrice",transfefun.receipt.gasUsed);
        })
        it("4.2 transfer the token for testaccount-43",async ()=>{

            const transfefun43 =  await DXBinstance.transfer(accounts[43],"100000000000000000000",{from: owner});
            const acc43 = await DXBinstance.balanceOf(accounts[43]);
            console.log("balance of the account-43 is :" + Number(acc43/1e18));
            console.log("transfer function GasPrice",transfefun43.receipt.gasUsed);
        });
        it("4.3 transfer the token for testaccount-44",async()=>{
            const transfefun44 = await DXBinstance.transfer(accounts[44],"100000000000000000000",{from: owner});
            const acc44 = await DXBinstance.balanceOf(accounts[44]);
            console.log("balance of the account-44 is :" + Number(acc44/1e18));
            console.log("transfer function GasPrice",transfefun44.receipt.gasUsed);
        })
        it("4.3 transfer the token for testaccount-45",async()=>{
            const transfefun45 = await DXBinstance.transfer(accounts[45],"100000000000000000000",{from: owner});
            const acc45 = await DXBinstance.balanceOf(accounts[45]);
            console.log("balance of the account-45 is :" + Number(acc45/1e18));
            console.log("transfer function GasPrice",transfefun45.receipt.gasUsed);
        })
    });

    describe("[TestCase 5: to call the Investor contract]",()=>{
        it("5.1 update the DXB contracat address in Investor contract",async()=>{
            const dxbAddress =  await AirDropinstance.updatedDXB(DXBinstance.address);
            console.log("transfer function GasPrice",dxbAddress.receipt.gasUsed);
        })
        it("5.2 to set the Authentication person",async()=>{
            const setAuth = await  AirDropinstance.setAuth(DXBinstance.address,{from:owner})
            console.log("transfer function GasPrice",setAuth.receipt.gasUsed);
        })
        // it("5.3 exclude contract",async()=>{
        //     await DXBinstance.excludeFromHolderDeduction(DXBinstance.address,{from: owner});
        // })
    });

    describe("[TestCase 6: Transfer the token for Investor from owner]",()=>{
        it("6.1 Transfer the token to investor 1-10 investor",async()=>{
            var gasprice = 0;
            const bal = await DXBinstance.balanceOf(AirDropinstance.address);
            console.log("cycle burn token-balance : "+Number(bal/1e18));

            const approve =  await DXBinstance.approve(DXBinstance.address,"100000000000000000000000",{from: owner})
            for(i= 11; i < 41; i++){
            const approveandcall = await DXBinstance.IAirDropApproveAndCall(accounts[i],"100000000000000000000000",{from: owner})
            gasprice = gasprice + Number(approveandcall.receipt.gasUsed)
            }
            console.log("transfer function GasPrice",(approve.receipt.gasUsed)+ gasprice);
        })
    })

    describe("[TestCase 7: provide the liquidity from owner]",() =>{
        it("7.1 Addliquidity by Owner for create a pair for swap", async () =>{
            const approve = await DXBinstance.approve(PancakeRouterinstance.address,"100000000000000000000000000",{from: owner})
            const addliq = await PancakeRouterinstance.addLiquidityETH(DXBinstance.address, "100000000000000000000000","0","0",owner,"2651310238",{from: owner, value:"10000000000000000000000"});
        
            const DXBLpInstance = await PancakeFactoryinstance.getPair(DXBinstance.address,WBNBinstance.address,);

            const DXBPairInstance = await PancakePair.at(DXBLpInstance,);
                
                expect(await PancakeFactoryinstance.allPairs(0)).equal(DXBLpInstance)
            
                const value = await DXBPairInstance.getReserves();
                console.log("reserve amount of A "+ value[0]);
                console.log("reserve amount of B "+ value[1]);
    
                const lp = await DXBPairInstance.balanceOf(owner);
                console.log("Lp token of liquidityProvider DXB and BNB : "+Number(lp));

            console.log("GasPrice of addliquidity : ",(approve.receipt.gasUsed)+ (addliq.receipt.gasUsed));
        })

        it("7.2 swap in router contract",async()=>{
            const DXBLpInstance = await PancakeFactoryinstance.getPair(DXBinstance.address,WBNBinstance.address,);
            const DXBPairInstance = await PancakePair.at(DXBLpInstance,);

            const swap = await PancakeRouterinstance.swapExactETHForTokens(0,[WBNBinstance.address,DXBinstance.address,],accounts[42],"2651310238",{from: accounts[42], value:"10000000000000000"});

            const value = await DXBPairInstance.getReserves();
                console.log("reserve amount of A "+ value[0]);
                console.log("reserve amount of B "+ value[1]);
        });
    });


    describe(` transfer the tokens to test account`,()=>{
        it(`transfer the tokens`,async()=>{
            const DXBLpInstance = await PancakeFactoryinstance.getPair(DXBinstance.address,WBNBinstance.address,);
            const DXBPairInstance = await PancakePair.at(DXBLpInstance,);
            const value = await DXBPairInstance.getReserves();
                console.log("reserve amount of A "+ value[0]);
                console.log("reserve amount of B "+ value[1]);

            const bal = await DXBinstance.balanceOf(accounts[61]);
            console.log(`before balance`,Number(bal));

            await DXBinstance.transfer(accounts[61],"100000000000000000000",{from: owner})

            const bal1 = await DXBinstance.balanceOf(accounts[61]);
            console.log(`after balance`,Number(bal1/1e18));

            const DXBLpInstance1 = await PancakeFactoryinstance.getPair(DXBinstance.address,WBNBinstance.address,);
            const DXBPairInstance1 = await PancakePair.at(DXBLpInstance1,);
            const values = await DXBPairInstance1.getReserves();
                console.log(" after reserve amount of A "+ values[0]);
                console.log("after reserve amount of B "+ values[1]);

            console.log(`difference of the reserve amount`+ (values[0]- value[0]) + ` : `+(values[1]-value[1]))

        })
        var tokenAmount = '335000000000000000000000000000000';
        it(`Burn the owner tokens`,async()=>{
            const total1 = await DXBinstance.totalSupply();
            console.log(`total supply `+ Number(total1/ 1e18))

            await DXBinstance.burn(tokenAmount,{from: owner});

            const total = await DXBinstance.totalSupply();
            console.log(`total supply `+ Number(total/ 1e18))
        })
        it(`transfer the tokens`,async()=>{
            await time.increase(time.duration.days(Number(1)));
            const DXBLpInstance = await PancakeFactoryinstance.getPair(DXBinstance.address,WBNBinstance.address,);
            const DXBPairInstance = await PancakePair.at(DXBLpInstance,);
            const value = await DXBPairInstance.getReserves();
                console.log("reserve amount of A "+ value[0]);
                console.log("reserve amount of B "+ value[1]);

            const bal = await DXBinstance.balanceOf(accounts[51]);
            console.log(`before balance`,Number(bal));

            await DXBinstance.transfer(accounts[51],"100000000000000000000",{from: owner})
            await DXBinstance.transfer(accounts[54],"100000000000000000000",{from: owner})

            const bal1 = await DXBinstance.balanceOf(accounts[51]);
            console.log(`after balance`,Number(bal1/1e18));

            const DXBLpInstance1 = await PancakeFactoryinstance.getPair(DXBinstance.address,WBNBinstance.address,);
            const DXBPairInstance1 = await PancakePair.at(DXBLpInstance1,);
            const values = await DXBPairInstance1.getReserves();
                console.log(" after reserve amount of A "+ values[0]);
                console.log("after reserve amount of B "+ values[1]);

            console.log(`difference of the reserve amount`+ (values[0]- value[0]) + ` : `+(values[1]-value[1]))
        })

        it(`transfer the tokens`,async()=>{
            await time.increase(time.duration.days(Number(1)));
            const DXBLpInstance = await PancakeFactoryinstance.getPair(DXBinstance.address,WBNBinstance.address,);
            const DXBPairInstance = await PancakePair.at(DXBLpInstance,);
            const value = await DXBPairInstance.getReserves();
                console.log("reserve amount of A "+ value[0]);
                console.log("reserve amount of B "+ value[1]);

            const bal = await DXBinstance.balanceOf(accounts[52]);
            console.log(`before balance`,Number(bal));

            await DXBinstance.transfer(accounts[52],"100000000000000000000",{from: owner})
            await DXBinstance.transfer(accounts[53],"100000000000000000000",{from: owner})

            const bal1 = await DXBinstance.balanceOf(accounts[52]);
            console.log(`after balance`,Number(bal1/1e18));

            const DXBLpInstance1 = await PancakeFactoryinstance.getPair(DXBinstance.address,WBNBinstance.address,);
            const DXBPairInstance1 = await PancakePair.at(DXBLpInstance1,);
            const values = await DXBPairInstance1.getReserves();
                console.log(" after reserve amount of A "+ values[0]);
                console.log("after reserve amount of B "+ values[1]);

            console.log(`difference of the reserve amount`+ (values[0]- value[0]) + ` : `+(values[1]-value[1]))
        })
    })
});