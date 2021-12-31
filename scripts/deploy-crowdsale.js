const hre = require("hardhat");

async function main() {
    const Crowdsale = await hre.ethers.getContractFactory("Crowdsale");
    const crowdsale = await Crowdsale.deploy("deploying Crowdsale contract"); 

    await token.deployed();
    console.log("Crowdsale deployed to: ", crowdsale.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1); 
    }); 