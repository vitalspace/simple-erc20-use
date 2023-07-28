import { ethers } from "ethers";
import { LoginView } from "./componets/LoginView";
import { AppView } from "./componets/AppView";

import ercContractAbi from "./abis/erc20ContractAbi.json";
import simpleContractAbi from "./abis/simpleContractAbi.json";
class App {
  public userId: any;
  protected erc20ContractAddress: string =
    "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  protected simpleContractAddress: string =
    "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
  protected erc20Contract: ethers.Contract | undefined;
  protected simpleContract: ethers.Contract | undefined;

  async init() {
    await this.loadweb3();
  }

  async loadweb3() {
    if (window.ethereum) {
      await this.loadContracts();
    }
  }

  async loadContracts() {
    this.erc20Contract = new ethers.Contract(
      this.erc20ContractAddress,
      ercContractAbi,
      this.userId
    );

    this.simpleContract = new ethers.Contract(
      this.simpleContractAddress,
      simpleContractAbi,
      this.userId
    );
  }

  async login() {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const account = await provider.getSigner();
      this.userId = account.address;
      return account;
    } catch (error) {
      return false;
    }
  }

  isLoggedIn = async () => {
    const account = await window.ethereum.request({
      method: "eth_accounts",
    });

    if (account.length > 0) {
      this.userId = await account[0];
      return true;
    }

    return false;
  };
}

export { App }