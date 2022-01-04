const hre = require("hardhat");

async function main() {
    const MyCrowdsale = await hre.ethers.getContractFactory("Crowdsale");
    const crowdsale = await MyCrowdsale.deploy("deploying Crowdsale contract"); 

    await crowdsale.deployed();
    console.log("Crowdsale deployed to: ", crowdsale.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1); 
    }); 