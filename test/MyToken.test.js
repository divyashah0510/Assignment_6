const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MyToken", function () {
  let MyToken, myToken, owner, addr1, addr2;

  beforeEach(async function () {
    MyToken = await ethers.getContractFactory("MyToken");
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();

    myToken = await MyToken.deploy("My Awesome Token", "MAT", 1000000);
    await myToken.waitForDeployment();
  });

  it("Should assign the total supply of tokens to the deployer", async function () {
    const ownerBalance = await myToken.balanceOf(owner.address);
    expect(await myToken.totalSupply()).to.equal(ownerBalance);
  });

  it("Should transfer tokens between accounts", async function () {
    await myToken.transfer(addr1.address, ethers.utils.parseUnits("50", 18)); // Correct usage
    const addr1Balance = await myToken.balanceOf(addr1.address);
    expect(ethers.utils.formatUnits(addr1Balance, 18)).to.equal("50.0");

    await myToken.connect(addr1).transfer(addr2.address, ethers.utils.parseUnits("25", 18)); // Correct usage
    const addr2Balance = await myToken.balanceOf(addr2.address);
    expect(ethers.utils.formatUnits(addr2Balance, 18)).to.equal("25.0");
  });

  it("Should fail if sender doesn’t have enough tokens", async function () {
    const initialOwnerBalance = await myToken.balanceOf(owner.address);

    await expect(
      myToken.connect(addr1).transfer(owner.address, ethers.utils.parseUnits("1", 18)) // Correct usage
    ).to.be.revertedWith("ERC20: transfer amount exceeds balance");

    expect(await myToken.balanceOf(owner.address)).to.equal(initialOwnerBalance);
  });

  it("Should update balances after transfers", async function () {
    const initialOwnerBalance = await myToken.balanceOf(owner.address);

    await myToken.transfer(addr1.address, ethers.utils.parseUnits("100", 18)); // Correct usage
    await myToken.transfer(addr2.address, ethers.utils.parseUnits("50", 18)); // Correct usage

    const finalOwnerBalance = await myToken.balanceOf(owner.address);
    expect(ethers.utils.formatUnits(finalOwnerBalance, 18)).to.equal(ethers.utils.formatUnits(initialOwnerBalance.sub(ethers.utils.parseUnits("150", 18)), 18));

    const addr1Balance = await myToken.balanceOf(addr1.address);
    expect(ethers.utils.formatUnits(addr1Balance, 18)).to.equal("100.0");

    const addr2Balance = await myToken.balanceOf(addr2.address);
    expect(ethers.utils.formatUnits(addr2Balance, 18)).to.equal("50.0");
  });
});