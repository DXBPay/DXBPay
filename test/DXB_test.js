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

    describe("[TestCase 8: call the update function in cycle burn function.]",()=>{
        it("8.1 to call the update functions in cycleburn contract", async()=>{
            const DXBLpInstance = await PancakeFactoryinstance.getPair(DXBinstance.address,WBNBinstance.address,);
            const DXBPairInstance = await PancakePair.at(DXBLpInstance,);
            const value = await DXBPairInstance.getReserves();
            const update = await cycleBurninstance.updatelpSupply(value[0],{from: owner});
            console.log("GasPrice of updatelpsupply : ",update.receipt.gasUsed);
        });
        it("8.2 to call the updateStartTime function",async()=>{
            const updatetime =  await cycleBurninstance.updateStartBlock(1621581820);
            console.log("GasPrice of updatestartblock  : ",updatetime.receipt.gasUsed);
        });
        it("8.3 to call the updateV2 pair function",async()=>{
            const DXBLpInstance = await PancakeFactoryinstance.getPair(DXBinstance.address,WBNBinstance.address,);
            const DXBPairInstance = await PancakePair.at(DXBLpInstance,);
            const updatepair = await cycleBurninstance.updateV2Pair(DXBPairInstance.address,{from: owner});
            console.log("GasPrice of updatev2pair : ",updatepair.receipt.gasUsed);
        });
        it("8.4 to call the update DXB contract address function",async()=>{
            const updatedxb = await cycleBurninstance.updateDXB(DXBinstance.address);
            console.log("GasPrice of updateDXB : ",updatedxb.receipt.gasUsed);
        });
        it("8.5 to call the updateLPsupply and Burn function",async()=>{
            const updatelp = await cycleBurninstance._updateLPSupplyAndBurn();
            console.log("GasPrice of _updateLPSupplyAndBurn : ",updatelp.receipt.gasUsed);
        });
    });

    describe("[TestCase 9: transfer the token for testaccounts from owner]",()=>{
        it("9.1 transfer the token for testaccount-42",async ()=>{
            const approve = await DXBinstance.approve(accounts[41],"1000000000000000000000",{from: owner})
            const tf = await DXBinstance.transferFrom(owner,accounts[42],"10000000000000000000",{from: accounts[41]});

            const acc42 = await DXBinstance.balanceOf(accounts[42]);
            console.log("balance of the account-42 is :" + Number(acc42/1e18));
            console.log("GasPrice of transferfrom : ",(tf.receipt.gasUsed)+(approve.receipt.gasUsed));
        });
        it("9.2 transfer the token for testaccount-41",async ()=>{
            const transfer = await DXBinstance.transfer(accounts[41],"100000000000000000000",{from: owner});
            const acc41 = await DXBinstance.balanceOf(accounts[41]);
            console.log("balance of the account-41 is :" + Number(acc41/1e18));

            var userbalance = await web3.eth.getBalance(accounts[42]);
            console.log("acc-42 bnb balance : "+ Number(userbalance/1e18));
            var userbalance2 = await web3.eth.getBalance(owner);
            console.log("acc-41 bnb balance : "+ Number(userbalance2/1e18));


            const DXBLpInstance = await PancakeFactoryinstance.getPair(DXBinstance.address,WBNBinstance.address,);

            const DXBPairInstance = await PancakePair.at(DXBLpInstance,);
                
                expect(await PancakeFactoryinstance.allPairs(0)).equal(DXBLpInstance)
            
                const value = await DXBPairInstance.getReserves();
                console.log("reserve amount of A "+ value[0]);
                console.log("reserve amount of B "+ value[1]);
                console.log("GasPrice of transfer : ",transfer.receipt.gasUsed);
        })
    });

    describe("[TestCase 10: Check the reward BNB for test account]",()=>{
        it("10.1 reward amount of acc-41",async ()=>{

            var userbalance = await web3.eth.getBalance(DXBinstance.address);
            console.log("DXB contract bnb balance : "+ Number(userbalance/1e18));

            var userbalance1 = await web3.eth.getBalance(testAccount1);
            console.log("testAccount1 bnb balance : "+ Number(userbalance1/1e18));
            var userbalance2 = await web3.eth.getBalance(testAccount2);
            console.log("testAccount2 bnb balance : "+ Number(userbalance2/1e18));
            var userbalance3 = await web3.eth.getBalance(testAccount3);
            console.log("testAccount3 bnb balance : "+ Number(userbalance3/1e18));

            // const rewof41 = await DXBinstance.balanceOfBNB(accounts[41]);
            // console.log("acc-41 bnb balance : "+ Number(rewof41));
        });
    });

    describe("[TestCase 46: update the dxb address on TeamWallet contract]",()=>{
        it("46.1 update the dxb address on TeamWallet contract",async()=>{
            const RewardBNB = await TeamVaultinstance.updatedDXB(DXBinstance.address,{from: owner})
            console.log("GasPrice of addliquidity : ",(RewardBNB.receipt.gasUsed));
        });
    });

    describe("[TestCase 11 : update the Lp and burn]",()=>{

        it("11.1 To call the updatelpsuppyandburn function ",async()=>{
            // await time.increase(time.duration.days(Number(20)));
            const currenttime = await time.latest();
            console.log("current time : "+ Number(currenttime));
            const approve = await DXBinstance.approve(PancakeRouterinstance.address,"10000000000000000000000",{from: owner})
            const addliq = await PancakeRouterinstance.addLiquidityETH(DXBinstance.address, "100000000000000000000","0","0",owner,"2651310238",{from: owner, value:"1000000000000000000000"});
            const DXBLpInstance = await PancakeFactoryinstance.getPair(DXBinstance.address,WBNBinstance.address,);
            const DXBPairInstance = await PancakePair.at(DXBLpInstance,);
            const value = await DXBPairInstance.getReserves();
                console.log("reserve amount of A "+ value[0]);
                console.log("reserve amount of B "+ value[1]);

                // await time.increase(time.duration.days(Number(20)));
            const updatelp =     await cycleBurninstance._updateLPSupplyAndBurn();
            const lp = await DXBPairInstance.balanceOf(owner);
            console.log("Lp token of liquidityProvider DXB and BNB : "+Number(lp));
            
            // const BNBlp = await DXBinstance._bnbLiquidity();
            // console.log("BNB Liquidity balance : "+ Number(BNBlp/1e18));

            const bal = await DXBinstance.balanceOf(cycleBurninstance.address);
            console.log("cycle burn token-balance : "+Number(bal/1e18));

            console.log("GasPrice of addliquidity : ",(updatelp.receipt.gasUsed));
        })
        it("11.2 to call the updatelpsupplyandburn function",async()=>{
            const currenttime = await time.latest();
            console.log("current time : "+ Number(currenttime));
            await DXBinstance.approve(PancakeRouterinstance.address,"10000000000000000000000",{from: owner})
            await PancakeRouterinstance.addLiquidityETH(DXBinstance.address, "100000000000000000000","0","0",owner,"2651310238",{from: owner, value:"1000000000000000000000"});
            const DXBLpInstance = await PancakeFactoryinstance.getPair(DXBinstance.address,WBNBinstance.address,);
            const DXBPairInstance = await PancakePair.at(DXBLpInstance,);
            const value = await DXBPairInstance.getReserves();
                console.log("reserve amount of A "+ value[0]);
                console.log("reserve amount of B "+ value[1]);

                await time.increase(time.duration.days(Number(1)));
            const updatelp1 =  await cycleBurninstance._updateLPSupplyAndBurn();
            const lp = await DXBPairInstance.balanceOf(owner);
            console.log("Lp token of liquidityProvider DXB and BNB : "+Number(lp));

            const bal = await DXBinstance.balanceOf(cycleBurninstance.address);
            console.log("cycle burn token-balance : "+Number(bal/1e18));
            console.log("GasPrice of addliquidity : ",(updatelp1.receipt.gasUsed));
        })
    })

    describe("[Testcase 12: to transfer the token for 30 accountants]",()=>{
        it("12.1 transfer the token for accountandt 50 - 80",async()=>{
            const rewards1 = await web3.eth.getBalance(Rewardinstance.address);
            console.log("BNB of RewardContract "+i+" : "+ Number(rewards1/1e18));

            const bal1 = await DXBinstance.balanceOf(AirDropinstance.address);
            console.log("balance of airdropcontract", Number(bal1/1e18));

            const bal = await DXBinstance.balanceOf(owner);
            console.log("balance of airdropcontract", Number(bal/1e18)); 
            var total = 0;
            
            for(i=51; i < 81; i++){
                const DXBLpInstance = await PancakeFactoryinstance.getPair(DXBinstance.address,WBNBinstance.address,);
                const DXBPairInstance = await PancakePair.at(DXBLpInstance,);
                const value = await DXBPairInstance.getReserves();
                    console.log("before reserve amount of A "+ value[0]);
                    console.log("before reserve amount of B "+ value[1]);

                const transfefun43 =  await DXBinstance.transfer(accounts[i],"1000000000000000000000",{from: owner});
                const acc43 = await DXBinstance.balanceOf(accounts[i]);
                console.log("balance of the account "+i+" :" + Number(acc43/1e18));
                total += transfefun43.receipt.gasUsed;
              
                const DXBLpInstance1 = await PancakeFactoryinstance.getPair(DXBinstance.address,WBNBinstance.address,);
                const DXBPairInstance1 = await PancakePair.at(DXBLpInstance1,);
            const values = await DXBPairInstance1.getReserves();
                console.log("after reserve amount of A "+ values[0]);
                console.log("after reserve amount of B "+ values[1]);
                console.log('view the difference : '+(values[0]-value[0])/1e18+ ' BNB : '+(values[1] - value[1])/1e18)
            }
            console.log("transfer function GasPrice",total);

            for(j=51; j < 81; j++){
                const transfefun43 =  await DXBinstance.transfer(accounts[j+1],"10000000000000000000",{from: accounts[j]});
            }
        })

        it(`transfer the tokens for account - 51 by the owner`,async()=>{
            const DXBLpInstance = await PancakeFactoryinstance.getPair(DXBinstance.address,WBNBinstance.address,);
                const DXBPairInstance = await PancakePair.at(DXBLpInstance,);
                const value = await DXBPairInstance.getReserves();
                    console.log("before reserve amount of A "+ value[0]);
                    console.log("before reserve amount of B "+ value[1]);

                const transfefun43 =  await DXBinstance.transfer(accounts[52],"1000000000000000000000",{from: owner});
                const acc43 = await DXBinstance.balanceOf(accounts[52]);
                console.log("balance of the account "+i+" :" + Number(acc43/1e18));

                const DXBLpInstance1 = await PancakeFactoryinstance.getPair(DXBinstance.address,WBNBinstance.address,);
                const DXBPairInstance1 = await PancakePair.at(DXBLpInstance1,);
            const values = await DXBPairInstance1.getReserves();
                console.log("after reserve amount of A "+ values[0]);
                console.log("after reserve amount of B "+ values[1]);
                console.log('view the difference : '+(values[0]-value[0]+ ' BNB : '+(values[1] - value[1])/1e18))
        })
    });
    

    describe(`withdrawa the reward from the contract`, ()=>{
        it(`withdraw the reward`,async()=>{
            await Rewardinstance.withdrawReward({from: accounts[51]});
            console.log(`balance of the account - 51`,await DXBinstance.balanceOf(accounts[51]))
        })
    })

    describe("[TestCase 13: check the users are eligible or not]",()=>{
        it("13.1 check the eligible or not",async()=>{
            for(i=51; i < 81; i++){
                const bal2 = await Rewardinstance.holderWallet(accounts[i]);
                console.log("latest cycle : "+ bal2[3] +" : last withdraw cycle "+ bal2[4] ); 
               
            }
        })

        it("13.2 check the accountant's latest and last withdrawal cycle.",async()=>{
            for(i=51; i < 81; i++){
                const view = await Rewardinstance.getHolderCycleRewardEligibleDetails(accounts[i],1);
                console.log("Eligible : "+ view[0] +" time : "+ view[1]);
            }
        })
    })

    describe("[TestCase 14: call the viewclaim reward]",()=>{
        it("14.1 call the viewclaim reward",async()=>{
            const wai = await Rewardinstance.cycles(1);
            console.log(wai[0] + " bnb balance " + wai[1] + " state " + wai[2]);
            const wai1 = await Rewardinstance.cycles(2);
            console.log(wai1[0] + " bnb balance " + wai1[1] + " state " + wai1[2]);

            const rewards1 = await web3.eth.getBalance(Rewardinstance.address);
            console.log("BNB of RewardContract "+i+" : "+ Number(rewards1/1e18));

            for(i = 4; i < 7; i++){
                const reward = await Rewardinstance.viewClaimReward(accounts[i]);
                console.log("reward wallet : ",Number(reward));
            }
        })
        it("14.2 call the viewclaim reward by investor",async()=>{
            var total = 0;
            for(i = 51; i < 81; i++){
                const bal2 = await Rewardinstance.holderWallet(accounts[i]);
                console.log("latest cycle : "+ bal2[3] +" : last withdraw cycle "+ bal2[4] );

                const tbal = await DXBinstance.balanceOf(accounts[i]);
                console.log("tokeb balance of "+i+ " : "+ Number(tbal))

                const details = await Rewardinstance.getHolderCycleDetails(accounts[i],1);
                console.log("details of "+i+" : "+ details[2] +"  From : "+details[0]+ " To : "+ details[1]);

                const reward1 = await Rewardinstance.viewClaimReward(accounts[i]);
                console.log("investor wallet : "+ i + " : ",Number(reward1));
            }
        })
    })

    describe("[TestCase 15: withdraw the reward for accountant 51-80 in 1st cycle]",()=>{
        it("withdraw function",async()=>{
            total = 0 
            for(i=11; i < 41; i++){
                const rewards1 = await web3.eth.getBalance(accounts[i]);
                console.log("BNB of before withdraw account "+i+" : "+ Number(rewards1/1e18));

                const rew = await AirDropinstance.getReward({from:accounts[i]});
                console.log("GasPrice of withdrawreward function : ",(rew.receipt.gasUsed));  

                total = total + rew.receipt.gasUsed;
               
                const rewards2 = await web3.eth.getBalance(accounts[i]);
                console.log("BNB of after withdraw account "+i+" : "+ Number(rewards2/1e18));
            }
            console.log("gas used in withdrawal for 51 - 81 accounts "+Number(total))

        })
    })

    describe("[TestCase 16: view the investor reward]",()=>{
        it("16.1 getrewards from owner",async()=>{
            const gr = await AirDropinstance.getReward({from: owner});
            console.log("GasPrice of addliquidity : ",gr.receipt.gasUsed);
        })
        it("16.1 view the investor Rewards",async()=>{
            var total = 0;
            const bal = await DXBinstance.balanceOf(AirDropinstance.address);
            console.log("cycle burn token-balance : "+Number(bal/1e18));

            for(i = 11 ;i<41; i++){
                const rewards = await AirDropinstance.viewAirDropReward(accounts[i]);
                console.log("Reward of account "+i+" : "+ Number(rewards));
                
                total = total+Number(rewards)
            }
            console.log("total pending amount : "+total);
            
        })
    });

// cycle ---2===============================------------------------===================----------=
    describe("[TestCase 17: check the 2nd cycle ]",async()=>{
        it("17.1 transfer 50 to accountant 51 - 80 from owner",async()=>{
            var total = 0;
            for(i=51; i < 81; i++){
                const transfefun43 =  await DXBinstance.transfer(accounts[i],"1000000000000000000000",{from: owner});
                total += transfefun43.receipt.gasUsed;
            }
            console.log("transfer function GasPrice ",total);
        })
        it("17.2 view the reward for the accountants in cycle-2 and the transfer token",async()=>{
            
            await time.increase(time.duration.days(Number(8)));
            total = 0;

            for(j=51; j < 81; j++){
                const transfefun43 =  await DXBinstance.transfer(accounts[j+1],"50000000000000000000",{from: accounts[j]});
                total = total + transfefun43.receipt.gasUsed;
            }
            console.log("gas used in transfer : "+total)
            for(i = 51; i < 81; i++){
                const bal2 = await Rewardinstance.holderWallet(accounts[i]);
                console.log("latest cycle : "+ bal2[3] +" : last withdraw cycle "+ bal2[4] );

                const reward1 = await Rewardinstance.viewClaimReward(accounts[i]);
                console.log("investor wallet : "+ i + " : ",Number(reward1));

                const acc43 = await DXBinstance.balanceOf(accounts[j]);
                console.log("balance of the account "+j+" :" + Number(acc43/1e18));
            }
            
        })
    })

    describe("[TestCase 18: call the viewclaim reward in cycle - 2]",()=>{
        it("18.1 call the viewclaim reward",async()=>{
            

            const wai = await Rewardinstance.cycles(1);
            console.log(wai[0] + " bnb balance " + wai[1] + " state " + wai[2]);
            const wai1 = await Rewardinstance.cycles(2);
            console.log(wai1[0] + " bnb balance " + wai1[1] + " state " + wai1[2]);

            const rewards1 = await web3.eth.getBalance(Rewardinstance.address);
            console.log("BNB of RewardContract "+i+" : "+ Number(rewards1/1e18));

            for(i = 4; i < 7; i++){
                const reward = await Rewardinstance.viewClaimReward(accounts[i]);
                console.log("reward wallet : ",Number(reward));
            }
        })
        it("18.2 call the viewclaim reward by investor 2nd cycle",async()=>{
            const rewards1 = await web3.eth.getBalance(Rewardinstance.address);
            console.log("BNB of RewardContract "+i+" : "+ Number(rewards1/1e18));
            var total = 0;
            for(i = 51; i < 81; i++){
                const bal2 = await Rewardinstance.holderWallet(accounts[i]);
                console.log("latest cycle : "+ bal2[3] +" : last withdraw cycle "+ bal2[4] );

                const tbal = await DXBinstance.balanceOf(accounts[i]);
                console.log("tokeb balance of "+i+ " : "+ Number(tbal))

                const details = await Rewardinstance.getHolderCycleDetails(accounts[i],2);
                console.log("details of "+i+" : "+ details[2] +"  From : "+details[0]+ " To : "+ details[1]);

                const reward1 = await Rewardinstance.viewClaimReward(accounts[i]);
                console.log("investor wallet : "+ i + " : ",Number(reward1));
            }
        })
    })

    describe("[TestCase 19: Withdraw the rewards in cycle-2] ",()=>{
        it("19.1 withdraw function",async()=>{
            total = 0;
            const rewards1 = await web3.eth.getBalance(Rewardinstance.address);
            console.log("BNB of RewardContract "+i+" : "+ Number(rewards1/1e18));
            for(i=51; i < 81; i++){
                const rewards1 = await web3.eth.getBalance(accounts[i]);
                console.log("BNB of before withdraw account "+i+" : "+ Number(rewards1/1e18));

                const rew1 = await Rewardinstance.withdrawReward({from:accounts[i]});
                
                total = total + rew1.receipt.gasUsed;
                let events = rew1.logs[0].args;
                console.log("log event "+ events[1]);
                
                const rewards2 = await web3.eth.getBalance(accounts[i]);
                console.log("BNB of after withdraw account "+i+" : "+ Number(rewards2/1e18));
            }
            console.log("GasPrice of withdrawreward function in cycle -2 : "+total);  
            const rewards3 = await web3.eth.getBalance(Rewardinstance.address);
            console.log("BNB of RewardContract "+i+" : "+ Number(rewards3/1e18));

            const bal2 = await Rewardinstance.holderWallet(accounts[55]);
            console.log("latest cycle : "+ bal2[3] +" : last withdraw cycle "+ bal2[4] );

            const collecte  = await Rewardinstance.cycles(1);
            console.log("Cycle collect amount : ",Number(collecte[0]));

            const collect  = await Rewardinstance.cycles(2);
            console.log("Cycle collect amount : ",Number(collect[0]));
        })
    })

//cycle 3 -=-=-=---------------------===================================---------------------
    describe("[TestCase 20: check the 3rd cycle] ",async()=>{
        it("transfer the tokens from owner 3rd cycle",async()=>{
            var total = 0;
            for(i=51; i < 81; i++){
                const transfer =  await DXBinstance.transfer(accounts[i],"1000000000000000000000",{from: owner});
                total += transfer.receipt.gasUsed;
            }
            console.log("transfer function GasPrice",total);
        })
        it("check the cycle reward",async()=>{
            const rewards2 = await web3.eth.getBalance(Rewardinstance.address);
            console.log("BNB of RewardContract "+i+" : "+ Number(rewards2/1e18));
            await time.increase(time.duration.days(Number(8)));

            for(j=51; j < 81; j++){
                const transfer =  await DXBinstance.transfer(accounts[j+1],"50000000000000000000",{from: accounts[j]});
                total += transfer.receipt.gasUsed;
            }
            console.log("Gas used in transfer function in cycle-3",total)
            for(i = 51; i < 81; i++){
                const bal2 = await Rewardinstance.holderWallet(accounts[i]);
                console.log("latest cycle : "+ bal2[3] +" : last withdraw cycle "+ bal2[4] );

                const reward1 = await Rewardinstance.viewClaimReward(accounts[i]);
                console.log("investor wallet : "+ i + " : ",Number(reward1));

                const acc43 = await DXBinstance.balanceOf(accounts[j]);
                console.log("balance of the account "+j+" :" + Number(acc43/1e18));
            }
            const rewards3 = await web3.eth.getBalance(Rewardinstance.address);
            console.log("BNB of RewardContract "+i+" : "+ Number(rewards3/1e18));
        })
    })

    describe("[TestCase 21: call the viewclaim reward 3rd cycle]",()=>{
        it("21.1 call the viewclaim reward",async()=>{            
            const wai = await Rewardinstance.cycles(1);
            console.log(wai[0] + " bnb balance " + wai[1] + " state " + wai[2]);
            const wai1 = await Rewardinstance.cycles(2);
            console.log(wai1[0] + " bnb balance " + wai1[1] + " state " + wai1[2]);

            const rewards1 = await web3.eth.getBalance(Rewardinstance.address);
            console.log("BNB of RewardContract "+i+" : "+ Number(rewards1/1e18));

            for(i = 4; i < 7; i++){
                const reward = await Rewardinstance.viewClaimReward(accounts[i]);
                console.log("reward wallet : ",Number(reward));
            }
        })
        it("21.2 call the viewclaim reward by investor",async()=>{
            const rewards1 = await web3.eth.getBalance(Rewardinstance.address);
            console.log("BNB of RewardContract "+i+" : "+ Number(rewards1/1e18));
            var total = 0;
            for(i = 51; i < 81; i++){
                const bal2 = await Rewardinstance.holderWallet(accounts[i]);
                console.log("latest cycle : "+ bal2[3] +" : last withdraw cycle "+ bal2[4] );

                const tbal = await DXBinstance.balanceOf(accounts[i]);
                console.log("tokeb balance of "+i+ " : "+ Number(tbal))

                const details = await Rewardinstance.getHolderCycleDetails(accounts[i],3);
                console.log("details of "+i+" : "+ details[2] +"  From : "+details[0]+ " To : "+ details[1]);

                const reward2 = await Rewardinstance.viewClaimReward(accounts[i]);
                console.log("investor wallet : "+ i + " : ",Number(reward2));
            }
            const rewards3 = await web3.eth.getBalance(Rewardinstance.address);
            console.log("BNB of RewardContract "+i+" : "+ Number(rewards3/1e18));
        })
    })

    describe("[TestCase 22: Withdraw the rewards in cycle 3 ]",()=>{
        it("22.1 withdraw the rewards in cycle-3",async()=>{
            total = 0;
            const rewards1 = await web3.eth.getBalance(Rewardinstance.address);
            console.log("BNB of RewardContract "+i+" : "+ Number(rewards1/1e18));
            for(i=51; i < 81; i++){
                const rewards1 = await web3.eth.getBalance(accounts[i]);
                console.log("BNB of before withdraw account "+i+" : "+ Number(rewards1/1e18));

                const rew1 = await Rewardinstance.withdrawReward({from:accounts[i]});
                console.log("GasPrice of withdrawreward function : ",(rew1.receipt.gasUsed));  
                total += rew1.receipt.gasUsed;

                let events = rew1.logs[0].args;
                console.log("log event "+ events[1]);
                
                const rewards2 = await web3.eth.getBalance(accounts[i]);
                console.log("BNB of after withdraw account "+i+" : "+ Number(rewards2/1e18));
            }
            console.log("gas used in withdraw function in cycle-3"+total);
            const rewards3 = await web3.eth.getBalance(Rewardinstance.address);
            console.log("BNB of RewardContract "+i+" : "+ Number(rewards3/1e18));
        })
    })

    // cycle ---4===============================------------------------===================----------=
    describe("[TestCase 23: check the 4th cycle] ",async()=>{
        it("23.1 transfer 50 to accountant 51 - 80 from owner",async()=>{
            var total = 0;
            for(i=51; i < 81; i++){
                const transfefun43 =  await DXBinstance.transfer(accounts[i],"1000000000000000000000",{from: owner});
                total += transfefun43.receipt.gasUsed;
            }
            console.log("transfer function GasPrice",total);
        })
        it("23.2 view the reward for the accountants in cycle-4",async()=>{
            
            await time.increase(time.duration.days(Number(8)));
            total = 0;

            for(j=51; j < 81; j++){
                const transfefun43 =  await DXBinstance.transfer(accounts[j+1],"50000000000000000000",{from: accounts[j]});
                total = total + transfefun43.receipt.gasUsed;
            }
            console.log("gas used in transfer : "+total)
            for(i = 51; i < 81; i++){
                const bal2 = await Rewardinstance.holderWallet(accounts[i]);
                console.log("latest cycle : "+ bal2[3] +" : last withdraw cycle "+ bal2[4] );

                const reward1 = await Rewardinstance.viewClaimReward(accounts[i]);
                console.log("investor wallet : "+ i + " : ",Number(reward1));

                const acc43 = await DXBinstance.balanceOf(accounts[j]);
                console.log("balance of the account "+j+" :" + Number(acc43/1e18));
            }
            
        })
    })

    describe("[TestCase 24: call the viewclaim reward in cycle - 4]",()=>{
        it("24.1 call the viewclaim reward",async()=>{
            

            const wai = await Rewardinstance.cycles(1);
            console.log(wai[0] + " bnb balance " + wai[1] + " state " + wai[2]);
            const wai1 = await Rewardinstance.cycles(2);
            console.log(wai1[0] + " bnb balance " + wai1[1] + " state " + wai1[2]);

            const rewards1 = await web3.eth.getBalance(Rewardinstance.address);
            console.log("BNB of RewardContract "+i+" : "+ Number(rewards1/1e18));

            for(i = 4; i < 7; i++){
                const reward = await Rewardinstance.viewClaimReward(accounts[i]);
                console.log("reward wallet : ",Number(reward));
            }
        })
        it("24.2 call the viewclaim reward by investor 4th cycle",async()=>{
            const rewards1 = await web3.eth.getBalance(Rewardinstance.address);
            console.log("BNB of RewardContract "+i+" : "+ Number(rewards1/1e18));
            var total = 0;
            for(i = 51; i < 81; i++){
                const bal2 = await Rewardinstance.holderWallet(accounts[i]);
                console.log("latest cycle : "+ bal2[3] +" : last withdraw cycle "+ bal2[4] );

                const tbal = await DXBinstance.balanceOf(accounts[i]);
                console.log("tokeb balance of "+i+ " : "+ Number(tbal))

                const details = await Rewardinstance.getHolderCycleDetails(accounts[i],4);
                console.log("details of "+i+" : "+ details[2] +"  From : "+details[0]+ " To : "+ details[1]);

                const reward1 = await Rewardinstance.viewClaimReward(accounts[i]);
                console.log("investor wallet : "+ i + " : ",Number(reward1));
            }
        })
    })

    describe("[TestCase 25: Withdraw the rewards in cycle-4] ",()=>{
        it("25.1 withdraw function in cycle - 4",async()=>{
            total = 0;
            const rewards1 = await web3.eth.getBalance(Rewardinstance.address);
            console.log("BNB of RewardContract "+i+" : "+ Number(rewards1/1e18));
            for(i=51; i < 81; i++){
                const rewards1 = await web3.eth.getBalance(accounts[i]);
                console.log("BNB of before withdraw account "+i+" : "+ Number(rewards1/1e18));

                const rew1 = await Rewardinstance.withdrawReward({from:accounts[i]});
                
                total = total + rew1.receipt.gasUsed;
                let events = rew1.logs[0].args;
                console.log("log event "+ events[1]);
                
                const rewards2 = await web3.eth.getBalance(accounts[i]);
                console.log("BNB of after withdraw account "+i+" : "+ Number(rewards2/1e18));
            }
            console.log("GasPrice of withdrawreward function in cycle -4 : "+total);  
            const rewards3 = await web3.eth.getBalance(Rewardinstance.address);
            console.log("BNB of RewardContract "+i+" : "+ Number(rewards3/1e18));
        })
    })
// cycle ---5===============================------------------------===================----------=
    describe("[TestCase 26: check the 5th cycle] ",async()=>{
        it("26.1 transfer 50 to accountant 51 - 80 from owner",async()=>{
            var total = 0;
            for(i=51; i < 81; i++){
                const transfefun43 =  await DXBinstance.transfer(accounts[i],"1000000000000000000000",{from: owner});
                total += transfefun43.receipt.gasUsed;
            }
            console.log("transfer function GasPrice",total);
        })
        it("26.2 view the reward for the accountants in cycle-5",async()=>{
            
            await time.increase(time.duration.days(Number(8)));
            total = 0;

            for(j=51; j < 81; j++){
                const transfefun43 =  await DXBinstance.transfer(accounts[j+1],"50000000000000000000",{from: accounts[j]});
                total = total + transfefun43.receipt.gasUsed;
            }
            console.log("gas used in transfer : "+total)
            for(i = 51; i < 81; i++){
                const bal2 = await Rewardinstance.holderWallet(accounts[i]);
                console.log("latest cycle : "+ bal2[3] +" : last withdraw cycle "+ bal2[4] );

                const reward1 = await Rewardinstance.viewClaimReward(accounts[i]);
                console.log("investor wallet : "+ i + " : ",Number(reward1));

                const acc43 = await DXBinstance.balanceOf(accounts[j]);
                console.log("balance of the account "+j+" :" + Number(acc43/1e18));
            }
            
        })
    })

    describe("[TestCase 27: call the viewclaim reward in cycle - 5]",()=>{
        it("27.1 call the viewclaim reward",async()=>{
            

            const wai = await Rewardinstance.cycles(1);
            console.log(wai[0] + " bnb balance " + wai[1] + " state " + wai[2]);
            const wai1 = await Rewardinstance.cycles(2);
            console.log(wai1[0] + " bnb balance " + wai1[1] + " state " + wai1[2]);

            const rewards1 = await web3.eth.getBalance(Rewardinstance.address);
            console.log("BNB of RewardContract "+i+" : "+ Number(rewards1/1e18));

            for(i = 4; i < 7; i++){
                const reward = await Rewardinstance.viewClaimReward(accounts[i]);
                console.log("reward wallet : ",Number(reward));
            }
        })
        it("27.2 call the viewclaim reward by investor 5th cycle",async()=>{
            const rewards1 = await web3.eth.getBalance(Rewardinstance.address);
            console.log("BNB of RewardContract "+i+" : "+ Number(rewards1/1e18));
            var total = 0;
            for(i = 51; i < 81; i++){
                const bal2 = await Rewardinstance.holderWallet(accounts[i]);
                console.log("latest cycle : "+ bal2[3] +" : last withdraw cycle "+ bal2[4] );

                const tbal = await DXBinstance.balanceOf(accounts[i]);
                console.log("tokeb balance of "+i+ " : "+ Number(tbal))

                const details = await Rewardinstance.getHolderCycleDetails(accounts[i],5);
                console.log("details of "+i+" : "+ details[2] +"  From : "+details[0]+ " To : "+ details[1]);

                const reward1 = await Rewardinstance.viewClaimReward(accounts[i]);
                console.log("investor wallet : "+ i + " : ",Number(reward1));
            }
        })
    })

    describe("[TestCase 28: Withdraw the rewards in cycle-5] ",()=>{
        it("28.1 withdraw function in cycle - 5",async()=>{
            total = 0;
            const rewards1 = await web3.eth.getBalance(Rewardinstance.address);
            console.log("BNB of RewardContract "+i+" : "+ Number(rewards1/1e18));
            for(i=51; i < 81; i++){
                const rewards1 = await web3.eth.getBalance(accounts[i]);
                console.log("BNB of before withdraw account "+i+" : "+ Number(rewards1/1e18));

                const rew1 = await Rewardinstance.withdrawReward({from:accounts[i]});
                
                total = total + rew1.receipt.gasUsed;
                let events = rew1.logs[0].args;
                console.log("log event "+ events[1]);
                
                const rewards2 = await web3.eth.getBalance(accounts[i]);
                console.log("BNB of after withdraw account "+i+" : "+ Number(rewards2/1e18));
            }
            console.log("GasPrice of withdrawreward function in cycle -5 : "+total);  
            const rewards3 = await web3.eth.getBalance(Rewardinstance.address);
            console.log("BNB of RewardContract "+i+" : "+ Number(rewards3/1e18));
        })
    })
// cycle ---6===============================------------------------===================----------=
    describe("[TestCase 29: check the 6th cycle ]",async()=>{
        it("29.1 transfer 50 to accountant 51 - 80 from owner",async()=>{
            var total = 0;
            for(i=51; i < 81; i++){
                const transfefun43 =  await DXBinstance.transfer(accounts[i],"1000000000000000000000",{from: owner});
                total += transfefun43.receipt.gasUsed;
            }
            console.log("transfer function GasPrice",total);
        })
        it("29.2 view the reward for the accountants in cycle-6",async()=>{
            
            await time.increase(time.duration.days(Number(8)));
            total = 0;

            for(j=51; j < 81; j++){
                const transfefun43 =  await DXBinstance.transfer(accounts[j+1],"50000000000000000000",{from: accounts[j]});
                total = total + transfefun43.receipt.gasUsed;
            }
            console.log("gas used in transfer : "+total)
            for(i = 51; i < 81; i++){
                const bal2 = await Rewardinstance.holderWallet(accounts[i]);
                console.log("latest cycle : "+ bal2[3] +" : last withdraw cycle "+ bal2[4] );

                const reward1 = await Rewardinstance.viewClaimReward(accounts[i]);
                console.log("investor wallet : "+ i + " : ",Number(reward1));

                const acc43 = await DXBinstance.balanceOf(accounts[j]);
                console.log("balance of the account "+j+" :" + Number(acc43/1e18));
            }
            
        })
    })

    describe("[TestCase 30: call the viewclaim reward in cycle - 6]",()=>{
        it("30.1 call the viewclaim reward",async()=>{
            

            const wai = await Rewardinstance.cycles(1);
            console.log(wai[0] + " bnb balance " + wai[1] + " state " + wai[2]);
            const wai1 = await Rewardinstance.cycles(2);
            console.log(wai1[0] + " bnb balance " + wai1[1] + " state " + wai1[2]);

            const rewards1 = await web3.eth.getBalance(Rewardinstance.address);
            console.log("BNB of RewardContract "+i+" : "+ Number(rewards1/1e18));

            for(i = 4; i < 7; i++){
                const reward = await Rewardinstance.viewClaimReward(accounts[i]);
                console.log("reward wallet : ",Number(reward));
            }
        })
        it("30.2 call the viewclaim reward by investor 2nd cycle",async()=>{
            const rewards1 = await web3.eth.getBalance(Rewardinstance.address);
            console.log("BNB of RewardContract "+i+" : "+ Number(rewards1/1e18));
            var total = 0;
            for(i = 51; i < 81; i++){
                const bal2 = await Rewardinstance.holderWallet(accounts[i]);
                console.log("latest cycle : "+ bal2[3] +" : last withdraw cycle "+ bal2[4] );

                const tbal = await DXBinstance.balanceOf(accounts[i]);
                console.log("tokeb balance of "+i+ " : "+ Number(tbal))

                const details = await Rewardinstance.getHolderCycleDetails(accounts[i],6);
                console.log("details of "+i+" : "+ details[2] +"  From : "+details[0]+ " To : "+ details[1]);

                const reward1 = await Rewardinstance.viewClaimReward(accounts[i]);
                console.log("investor wallet : "+ i + " : ",Number(reward1));
            }
        })
    })

    describe("[TestCase 31: Withdraw the rewards in cycle-6] ",()=>{
        it("19.1 withdraw function in cycle - 6",async()=>{
            total = 0;
            const rewards1 = await web3.eth.getBalance(Rewardinstance.address);
            console.log("BNB of RewardContract "+i+" : "+ Number(rewards1/1e18));
            for(i=51; i < 81; i++){
                const rewards1 = await web3.eth.getBalance(accounts[i]);
                console.log("BNB of before withdraw account "+i+" : "+ Number(rewards1/1e18));

                const rew1 = await Rewardinstance.withdrawReward({from:accounts[i]});
                
                total = total + rew1.receipt.gasUsed;
                let events = rew1.logs[0].args;
                console.log("log event "+ events[1]);
                
                const rewards2 = await web3.eth.getBalance(accounts[i]);
                console.log("BNB of after withdraw account "+i+" : "+ Number(rewards2/1e18));
            }
            console.log("GasPrice of withdrawreward function in cycle -6 : "+total);  
            const rewards3 = await web3.eth.getBalance(Rewardinstance.address);
            console.log("BNB of RewardContract "+i+" : "+ Number(rewards3/1e18));
        })
    })
// cycle ---7===============================------------------------===================----------=
    describe("[TestCase 32: check the 7th cycle] ",async()=>{
        it("32.1 transfer 50 to accountant 51 - 80 from owner",async()=>{
            var total = 0;
            for(i=51; i < 81; i++){
                const transfefun43 =  await DXBinstance.transfer(accounts[i],"1000000000000000000000",{from: owner});
                total += transfefun43.receipt.gasUsed;
            }
            console.log("transfer function GasPrice",total);
        })
        it("32.2 view the reward for the accountants in cycle-7",async()=>{
            
            await time.increase(time.duration.days(Number(8)));
            total = 0;

            for(j=51; j < 81; j++){
                const transfefun43 =  await DXBinstance.transfer(accounts[j+1],"50000000000000000000",{from: accounts[j]});
                total = total + transfefun43.receipt.gasUsed;
            }
            console.log("gas used in transfer : "+total)
            for(i = 51; i < 81; i++){
                const bal2 = await Rewardinstance.holderWallet(accounts[i]);
                console.log("latest cycle : "+ bal2[3] +" : last withdraw cycle "+ bal2[4] );

                const reward1 = await Rewardinstance.viewClaimReward(accounts[i]);
                console.log("investor wallet : "+ i + " : ",Number(reward1));

                const acc43 = await DXBinstance.balanceOf(accounts[j]);
                console.log("balance of the account "+j+" :" + Number(acc43/1e18));
            }
            
        })
    })

    describe("[TestCase 33: call the viewclaim reward in cycle - 7]",()=>{
        it("33.1 call the viewclaim reward in cycle - 7",async()=>{
            

            const wai = await Rewardinstance.cycles(1);
            console.log(wai[0] + " bnb balance " + wai[1] + " state " + wai[2]);
            const wai1 = await Rewardinstance.cycles(2);
            console.log(wai1[0] + " bnb balance " + wai1[1] + " state " + wai1[2]);

            const rewards1 = await web3.eth.getBalance(Rewardinstance.address);
            console.log("BNB of RewardContract "+i+" : "+ Number(rewards1/1e18));

            for(i = 4; i < 7; i++){
                const reward = await Rewardinstance.viewClaimReward(accounts[i]);
                console.log("reward wallet : ",Number(reward));
            }
        })
        it("33.2 call the viewclaim reward by investor 7th cycle",async()=>{
            const rewards1 = await web3.eth.getBalance(Rewardinstance.address);
            console.log("BNB of RewardContract "+i+" : "+ Number(rewards1/1e18));
            var total = 0;
            for(i = 51; i < 81; i++){
                const bal2 = await Rewardinstance.holderWallet(accounts[i]);
                console.log("latest cycle : "+ bal2[3] +" : last withdraw cycle "+ bal2[4] );

                const tbal = await DXBinstance.balanceOf(accounts[i]);
                console.log("tokeb balance of "+i+ " : "+ Number(tbal))

                const details = await Rewardinstance.getHolderCycleDetails(accounts[i],7);
                console.log("details of "+i+" : "+ details[2] +"  From : "+details[0]+ " To : "+ details[1]);

                const reward1 = await Rewardinstance.viewClaimReward(accounts[i]);
                console.log("investor wallet : "+ i + " : ",Number(reward1));
            }
        })
    })

    describe("[TestCase 34: Withdraw the rewards in cycle-2] ",()=>{
        it("34.1 withdraw function in cycle -7",async()=>{
            total = 0;
            const rewards1 = await web3.eth.getBalance(Rewardinstance.address);
            console.log("BNB of RewardContract "+i+" : "+ Number(rewards1/1e18));
            for(i=51; i < 81; i++){
                const rewards1 = await web3.eth.getBalance(accounts[i]);
                console.log("BNB of before withdraw account "+i+" : "+ Number(rewards1/1e18));

                const rew1 = await Rewardinstance.withdrawReward({from:accounts[i]});
                
                total = total + rew1.receipt.gasUsed;
                let events = rew1.logs[0].args;
                console.log("log event "+ events[1]);
                
                const rewards2 = await web3.eth.getBalance(accounts[i]);
                console.log("BNB of after withdraw account "+i+" : "+ Number(rewards2/1e18));
            }
            console.log("GasPrice of withdrawreward function in cycle -7 : "+total);  
            const rewards3 = await web3.eth.getBalance(Rewardinstance.address);
            console.log("BNB of RewardContract "+i+" : "+ Number(rewards3/1e18));
        })
    })
// cycle ---8===============================------------------------===================----------=
    describe("testcase 35: check the 8th cycle ",async()=>{
        it("35.1 transfer 50 to accountant 51 - 80 from owner",async()=>{
            var total = 0;
            for(i=51; i < 81; i++){
                const transfefun43 =  await DXBinstance.transfer(accounts[i],"1000000000000000000000",{from: owner});
                total += transfefun43.receipt.gasUsed;
            }
            console.log("transfer function GasPrice",total);
        })
        it("35.2 view the reward for the accountants in cycle-8",async()=>{
            
            await time.increase(time.duration.days(Number(8)));
            total = 0;

            for(j=51; j < 81; j++){
                const transfefun43 =  await DXBinstance.transfer(accounts[j+1],"50000000000000000000",{from: accounts[j]});
                total = total + transfefun43.receipt.gasUsed;
            }
            console.log("gas used in transfer : "+total)
            for(i = 51; i < 81; i++){
                const bal2 = await Rewardinstance.holderWallet(accounts[i]);
                console.log("latest cycle : "+ bal2[3] +" : last withdraw cycle "+ bal2[4] );

                const reward1 = await Rewardinstance.viewClaimReward(accounts[i]);
                console.log("investor wallet : "+ i + " : ",Number(reward1));

                const acc43 = await DXBinstance.balanceOf(accounts[j]);
                console.log("balance of the account "+j+" :" + Number(acc43/1e18));
            }
            
        })
    })

    describe("[TestCase 36: call the viewclaim reward in cycle - 8]",()=>{
        it("36.1 call the viewclaim reward",async()=>{
            

            const wai = await Rewardinstance.cycles(1);
            console.log(wai[0] + " bnb balance " + wai[1] + " state " + wai[2]);
            const wai1 = await Rewardinstance.cycles(2);
            console.log(wai1[0] + " bnb balance " + wai1[1] + " state " + wai1[2]);

            const rewards1 = await web3.eth.getBalance(Rewardinstance.address);
            console.log("BNB of RewardContract "+i+" : "+ Number(rewards1/1e18));

            for(i = 4; i < 7; i++){
                const reward = await Rewardinstance.viewClaimReward(accounts[i]);
                console.log("reward wallet : ",Number(reward));
            }
        })
        it("36.2 call the viewclaim reward by investor 8th cycle",async()=>{
            const rewards1 = await web3.eth.getBalance(Rewardinstance.address);
            console.log("BNB of RewardContract "+i+" : "+ Number(rewards1/1e18));
            var total = 0;
            for(i = 51; i < 81; i++){
                const bal2 = await Rewardinstance.holderWallet(accounts[i]);
                console.log("latest cycle : "+ bal2[3] +" : last withdraw cycle "+ bal2[4] );

                const tbal = await DXBinstance.balanceOf(accounts[i]);
                console.log("tokeb balance of "+i+ " : "+ Number(tbal))

                const details = await Rewardinstance.getHolderCycleDetails(accounts[i],8);
                console.log("details of "+i+" : "+ details[2] +"  From : "+details[0]+ " To : "+ details[1]);

                const reward1 = await Rewardinstance.viewClaimReward(accounts[i]);
                console.log("investor wallet : "+ i + " : ",Number(reward1));
            }
        })
    })

    describe("[TestCase 37: Withdraw the rewards in cycle-8] ",()=>{
        it("37.1 withdraw function in cycle - 8",async()=>{
            total = 0;
            const rewards1 = await web3.eth.getBalance(Rewardinstance.address);
            console.log("BNB of RewardContract "+i+" : "+ Number(rewards1/1e18));
            for(i=51; i < 81; i++){
                const rewards1 = await web3.eth.getBalance(accounts[i]);
                console.log("BNB of before withdraw account "+i+" : "+ Number(rewards1/1e18));

                const rew1 = await Rewardinstance.withdrawReward({from:accounts[i]});
                
                total = total + rew1.receipt.gasUsed;
                let events = rew1.logs[0].args;
                console.log("log event "+ events[1]);
                
                const rewards2 = await web3.eth.getBalance(accounts[i]);
                console.log("BNB of after withdraw account "+i+" : "+ Number(rewards2/1e18));
            }
            console.log("GasPrice of withdrawreward function in cycle -8 : "+total);  
            const rewards3 = await web3.eth.getBalance(Rewardinstance.address);
            console.log("BNB of RewardContract "+i+" : "+ Number(rewards3/1e18));
        })
    })

// cycle ---9===============================------------------------===================----------=
    describe("testcase 38: check the 9th cycle ",async()=>{
        it("38.1 transfer 50 to accountant 51 - 80 from owner",async()=>{
            var total = 0;
            for(i=51; i < 81; i++){
                const transfefun43 =  await DXBinstance.transfer(accounts[i],"1000000000000000000000",{from: owner});
                total += transfefun43.receipt.gasUsed;
            }
            console.log("transfer function GasPrice",total);
        })
        it("38.2 view the reward for the accountants in cycle-9",async()=>{
            
            await time.increase(time.duration.days(Number(8)));
            total = 0;

            for(j=51; j < 81; j++){
                const transfefun43 =  await DXBinstance.transfer(accounts[j+1],"50000000000000000000",{from: accounts[j]});
                total = total + transfefun43.receipt.gasUsed;
            }
            console.log("gas used in transfer : "+total)
            for(i = 51; i < 81; i++){
                const bal2 = await Rewardinstance.holderWallet(accounts[i]);
                console.log("latest cycle : "+ bal2[3] +" : last withdraw cycle "+ bal2[4] );

                const reward1 = await Rewardinstance.viewClaimReward(accounts[i]);
                console.log("investor wallet : "+ i + " : ",Number(reward1));

                const acc43 = await DXBinstance.balanceOf(accounts[j]);
                console.log("balance of the account "+j+" :" + Number(acc43/1e18));
            }
            
        })
    })

    describe("[TestCase 39: call the viewclaim reward in cycle - 9]",()=>{
        it("39.1 call the viewclaim reward",async()=>{
            

            const wai = await Rewardinstance.cycles(1);
            console.log(wai[0] + " bnb balance " + wai[1] + " state " + wai[2]);
            const wai1 = await Rewardinstance.cycles(2);
            console.log(wai1[0] + " bnb balance " + wai1[1] + " state " + wai1[2]);

            const rewards1 = await web3.eth.getBalance(Rewardinstance.address);
            console.log("BNB of RewardContract "+i+" : "+ Number(rewards1/1e18));

            for(i = 4; i < 7; i++){
                const reward = await Rewardinstance.viewClaimReward(accounts[i]);
                console.log("reward wallet : ",Number(reward));
            }
        })
        it("39.2 call the viewclaim reward by investor cycle - 9",async()=>{
            const rewards1 = await web3.eth.getBalance(Rewardinstance.address);
            console.log("BNB of RewardContract "+i+" : "+ Number(rewards1/1e18));
            var total = 0;
            for(i = 51; i < 81; i++){
                const bal2 = await Rewardinstance.holderWallet(accounts[i]);
                console.log("latest cycle : "+ bal2[3] +" : last withdraw cycle "+ bal2[4] );

                const tbal = await DXBinstance.balanceOf(accounts[i]);
                console.log("tokeb balance of "+i+ " : "+ Number(tbal))

                const details = await Rewardinstance.getHolderCycleDetails(accounts[i],9);
                console.log("details of "+i+" : "+ details[2] +"  From : "+details[0]+ " To : "+ details[1]);

                const reward1 = await Rewardinstance.viewClaimReward(accounts[i]);
                console.log("investor wallet : "+ i + " : ",Number(reward1));
            }
        })
    })

    describe("[TestCase 40: Withdraw the rewards in cycle-9] ",()=>{
        it("40.1 withdraw function in cycle-9",async()=>{
            total = 0;
            const rewards1 = await web3.eth.getBalance(Rewardinstance.address);
            console.log("BNB of RewardContract "+i+" : "+ Number(rewards1/1e18));
            for(i=51; i < 81; i++){
                const rewards1 = await web3.eth.getBalance(accounts[i]);
                console.log("BNB of before withdraw account "+i+" : "+ Number(rewards1/1e18));

                const rew1 = await Rewardinstance.withdrawReward({from:accounts[i]});
                
                total = total + rew1.receipt.gasUsed;
                let events = rew1.logs[0].args;
                console.log("log event "+ events[1]);
                
                const rewards2 = await web3.eth.getBalance(accounts[i]);
                console.log("BNB of after withdraw account "+i+" : "+ Number(rewards2/1e18));
            }
            console.log("GasPrice of withdrawreward function in cycle -9 : "+total);  
            const rewards3 = await web3.eth.getBalance(Rewardinstance.address);
            console.log("BNB of RewardContract "+i+" : "+ Number(rewards3/1e18));

        })
    })

// cycle ---10===============================------------------------===================----------=
    describe("[TestCase 41: check the 10th cycle] ",async()=>{
        it("41.1 transfer 50 to accountant 51 - 80 from owner",async()=>{
            var total = 0;
            for(i=51; i < 81; i++){
                const transfefun43 =  await DXBinstance.transfer(accounts[i],"1000000000000000000000",{from: owner});
                total += transfefun43.receipt.gasUsed;
            }
            console.log("transfer function GasPrice",total);
        })
        it("41.2 view the reward for the accountants in cycle-10",async()=>{
            
            await time.increase(time.duration.days(Number(8)));
            total = 0;

            for(j=51; j < 81; j++){
                const transfefun43 =  await DXBinstance.transfer(accounts[j+1],"50000000000000000000",{from: accounts[j]});
                total = total + transfefun43.receipt.gasUsed;
            }
            console.log("gas used in transfer : "+total)
            for(i = 51; i < 81; i++){
                const bal2 = await Rewardinstance.holderWallet(accounts[i]);
                console.log("latest cycle : "+ bal2[3] +" : last withdraw cycle "+ bal2[4] );

                const reward1 = await Rewardinstance.viewClaimReward(accounts[i]);
                console.log("investor wallet : "+ i + " : ",Number(reward1));

                const acc43 = await DXBinstance.balanceOf(accounts[j]);
                console.log("balance of the account "+j+" :" + Number(acc43/1e18));
            }
            
        })
    })

    describe("[TestCase 42: call the viewclaim reward in cycle - 10]",()=>{
        it("42.1 call the viewclaim reward",async()=>{
            

            const wai = await Rewardinstance.cycles(1);
            console.log(wai[0] + " bnb balance " + wai[1] + " state " + wai[2]);
            const wai1 = await Rewardinstance.cycles(2);
            console.log(wai1[0] + " bnb balance " + wai1[1] + " state " + wai1[2]);

            const rewards1 = await web3.eth.getBalance(Rewardinstance.address);
            console.log("BNB of RewardContract "+i+" : "+ Number(rewards1/1e18));

            for(i = 4; i < 7; i++){
                const reward = await Rewardinstance.viewClaimReward(accounts[i]);
                console.log("reward wallet : ",Number(reward));
            }
        })
        it("42.2 call the viewclaim reward by investor 10th cycle",async()=>{
            const rewards1 = await web3.eth.getBalance(Rewardinstance.address);
            console.log("BNB of RewardContract "+i+" : "+ Number(rewards1/1e18));
            var total = 0;
            for(i = 51; i < 81; i++){
                const bal2 = await Rewardinstance.holderWallet(accounts[i]);
                console.log("latest cycle : "+ bal2[3] +" : last withdraw cycle "+ bal2[4] );

                const tbal = await DXBinstance.balanceOf(accounts[i]);
                console.log("tokeb balance of "+i+ " : "+ Number(tbal))

                const details = await Rewardinstance.getHolderCycleDetails(accounts[i],10);
                console.log("details of "+i+" : "+ details[2] +"  From : "+details[0]+ " To : "+ details[1]);

                const reward1 = await Rewardinstance.viewClaimReward(accounts[i]);
                console.log("investor wallet : "+ i + " : ",Number(reward1));
            }
        })
    })

    describe("[TestCase 43: Withdraw the rewards in cycle-10] ",()=>{
        it("43.1 withdraw function in cycle - 10",async()=>{
            total = 0;
            const rewards1 = await web3.eth.getBalance(Rewardinstance.address);
            console.log("BNB of RewardContract "+i+" : "+ Number(rewards1/1e18));
            for(i=51; i < 81; i++){
                const rewards1 = await web3.eth.getBalance(accounts[i]);
                console.log("BNB of before withdraw account "+i+" : "+ Number(rewards1/1e18));

                const rew1 = await Rewardinstance.withdrawReward({from:accounts[i]});
                
                total = total + rew1.receipt.gasUsed;
                let events = rew1.logs[0].args;
                console.log("log event "+ events[1]);
                
                const rewards2 = await web3.eth.getBalance(accounts[i]);
                console.log("BNB of after withdraw account "+i+" : "+ Number(rewards2/1e18));
            }
            console.log("GasPrice of withdrawreward function in cycle -10 : "+total);  
            const rewards3 = await web3.eth.getBalance(Rewardinstance.address);
            console.log("BNB of RewardContract "+i+" : "+ Number(rewards3/1e18));

        })
    })



    describe("[TestCase 44: withdrawal Reward bnb in reward contract after 7 days]",()=>{
        it("44.1 withdraw the BNB in reward contract",async()=>{
            const rewards1 = await web3.eth.getBalance(accounts[42]);
            console.log("BNB of accounts[42]  : "+ Number(rewards1/1e18));

            const rew = await TeamVaultinstance.getReward({from:accounts[4]});
            
            console.log("gas used in withdrawal function : "+ rew.receipt.gasUsed)
            const rewards2 = await web3.eth.getBalance(accounts[42]);
            console.log("BNB of accounts[42]  : "+ Number(rewards2/1e18));
        });
    });

    describe("[TestCase 52 : claim the investor and wallet DXB]",()=>{
        it(`claim the investor DXB tokens`,async()=>{
            for(i = 11; i < 41;i++ ){
                const beforeBal = await DXBinstance.balanceOf(accounts[i],{from: accounts[i]})
                console.log(`before balance of accounts `+i+' : '+Number(beforeBal/1e18));

                await AirDropinstance.claimDXB({from: accounts[i]});

                const afterBal = await DXBinstance.balanceOf(accounts[i],{from: accounts[i]})
                console.log(`before balance of accounts `+i+' : '+Number(afterBal/1e18));
            }
        })
        it(`check the team wallet token balance`,async()=>{
            const bal = await DXBinstance.balanceOf(TeamVaultinstance.address);
            console.log("balance of airdropcontract", Number(bal/1e18)); 
            await TeamVaultinstance.updateTeamBalance({from: owner});  
        })
    })

    describe("[Testcase 45: get rewars the investor",()=>{
        it("45.1 to call the reward function to the investors",async()=>{
            var gasfee=0 ;
            

            for(i=11; i<41; i++){
                const viewRew = await AirDropinstance.viewAirDropReward(accounts[i]);
                console.log("reward of the accountant "+i+" : "+Number(viewRew));
            }
            const rewards2 = await web3.eth.getBalance(DXBinstance.address);
            console.log("BNB of account "+i+" : "+ Number(rewards2/1e18));
            
            for(i = 11; i <41;i++){
            const rewards3 = await web3.eth.getBalance(accounts[i]);
            console.log("BNB of account "+i+" : "+ Number(rewards3/1e18));

            const getre = await AirDropinstance.getReward({from: accounts[i]});

            const rewards1 = await web3.eth.getBalance(accounts[i]);
            console.log("BNB of account "+i+" : "+ Number(rewards1/1e18));
            
            gasfee = gasfee + (getre.receipt.gasUsed)
            }

            console.log("GasPrice of addliquidity : ",gasfee);
        })
    });

    

    describe("[TestCase 47: view the wallet rewards]",()=>{
        it("47.1 to check the 1 wallet reward amount",async()=>{
            const wal1 = await TeamVaultinstance.viewTeamReward(testAccount4,{from:owner});
            console.log("Wallet-1 : "+ Number(wal1));
        })
        it("47.2 to check the 2 wallet reward amount",async()=>{
            const wal2 = await TeamVaultinstance.viewTeamReward(testAccount5,{from:owner});
            console.log("Wallet-2 : "+ Number(wal2));
        })
        it("47.3 to check the 3 wallet reward amount",async()=>{
            const wal3 = await TeamVaultinstance.viewTeamReward(testAccount6,{from:owner});
            console.log("Wallet-3 : "+ Number(wal3));
        })
    })
    describe("[TestCase 48: view the wallet rewards]",()=>{
       
        it("48.1 to check the 1 wallet reward amount",async()=>{
            const wal1 = await TeamVaultinstance.getReward({from:testAccount4});
            console.log("Gas used in getreward function", wal1.receipt.gasUsed);
            const bnb1 = await web3.eth.getBalance(testAccount4);
            console.log("team balanceof teamvallut"+Number(bnb1/1e18));
        })
        it("48.2 to check the 2 wallet reward amount",async()=>{
            const wal2 = await TeamVaultinstance.getReward({from:testAccount5});
            console.log("Gas used in getreward function", wal2.receipt.gasUsed);
            const bnb2 = await web3.eth.getBalance(testAccount5);
            console.log("team balanceof teamvallut"+Number(bnb2/1e18));
        })
        it("48.3 to check the 3 wallet reward amount",async()=>{
            const wal3 = await TeamVaultinstance.getReward({from:testAccount6});
            console.log("Gas used in getreward function", wal3.receipt.gasUsed);
            const bnb3 = await web3.eth.getBalance(testAccount6);
            console.log("team balanceof teamvallut"+Number(bnb3/1e18));
        })
    })

    describe("[TestCase 49 : call the distribute the team wallet]",()=>{
        it("49.1 check the distribute valut function",async()=>{
            await time.increase(time.duration.days(Number(174)));
            const distributeTeamWallet = await TeamVaultinstance.distributeTeamWallet({from: owner});
            console.log("GasPrice of addliquidity : ",(distributeTeamWallet.receipt.gasUsed));
        });
        it("49.2 to call the distribute investor function",async()=>{
            const bal = await DXBinstance.balanceOf(AirDropinstance.address);
            console.log("balance of airdropcontract", Number(bal/1e18));
            total = 0;
            for(i=11;i<41;i++){
            const distribute = await AirDropinstance.distributeWallet({from: accounts[i]});
            total = total + distribute.receipt.gasUsed;
            }
            console.log("Gas used in distributeWallet function : ", total);
        })
    });

    describe("[Testcase 50 : balance of the 3-Wallets]",()=>{
        it("50.1 to check the balance of wallet-1",async()=>{
            const wal1 = await DXBinstance.balanceOf(testAccount4);
            console.log("balanceof testaccount-4 : "+Number(wal1/1e18));
        })
        it("50.2 to check the balance of wallet-5",async()=>{
            const wal2 = await DXBinstance.balanceOf(testAccount5);
            console.log("balanceof testaccount-2 : "+Number(wal2/1e18));
        })
        it("50.3 to check the balance of wallet-6",async()=>{
            const wal3 = await DXBinstance.balanceOf(testAccount6);
            console.log("balanceof testaccount-3 : "+Number(wal3/1e18));
        })
        it("50.4 to check the balance of the invetors. ", async()=>{
            for(i = 11; i <41;i++){
                const rewards1 = await DXBinstance.balanceOf(accounts[i]);
                console.log("tokens of account "+i+" : "+ Number(rewards1/1e18));
            }
        })
    })

    describe("[Testcase 51 : balance of the 3-Wallets]",()=>{
        it("51.1 to check the balance of wallet-1",async()=>{
            const wal1 = await web3.eth.getBalance(testAccount4);
            console.log("balanceof testaccount-4 : "+Number(wal1/1e18));
        })
        it("51.2 to check the balance of wallet-5",async()=>{
            const wal2 = await web3.eth.getBalance(testAccount5);
            console.log("balanceof testaccount-2 : "+Number(wal2/1e18));
        })
        it("51.3 to check the balance of wallet-6",async()=>{
            const wal3 = await web3.eth.getBalance(testAccount6);
            console.log("balanceof testaccount-3 : "+Number(wal3/1e18));
        })

        it(`claim the team wallet DXB tokens`,async()=>{
            
            for(i = 4; i < 7;i++){
                const beforeBal = await DXBinstance.balanceOf(accounts[i],{from: accounts[i]})
                console.log(`before balance of accounts `+i+' : '+Number(beforeBal/1e18));

                await TeamVaultinstance.claimDXB({from: accounts[i]});

                const afterBal = await DXBinstance.balanceOf(accounts[i],{from: accounts[i]})
                console.log(`before balance of accounts `+i+' : '+Number(afterBal/1e18));
            }
        })
    })

});