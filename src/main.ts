import "./style.css";
import { ethers } from "ethers";

import ercContractAbi from "./abis/erc20ContractAbi.json";
import simpleContractAbi from "./abis/simpleContractAbi.json";
class App {
  public userId: any;
  protected erc20ContractAddress: string =
    "0xd9145CCE52D386f254917e481eB44e9943F39138";
  protected simpleContractAddress: string =
    "0xd9145CCE52D386f254917e481eB44e9943F39138";
  protected erc20Contract: ethers.Contract | undefined;
  protected simpleContract: ethers.Contract | undefined;

  async init() {
    await this.loadweb3();
  }

  async loadweb3() {
    if (window.ethereum) {
      // const provider = new ethers.BrowserProvider(window.ethereum);
      // this.userId = provider.getSigner();
      await this.loadContracts();
      await this.isLoggedIn();
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
    const provider = new ethers.BrowserProvider(window.ethereum);
    provider
      .getSigner()
      .then((res) => {
        this.userId = res.address;
      })
      .catch((err) => {
        alert("You have canceled the login.")
      });
  }

  isLoggedIn = async ()  =>  {
    const account = await window.ethereum.request({
      method: "eth_accounts",
    });

    if (account.length > 0) {
      this.userId = await account[0];
    }
  }
}

const app = new App();

await app.init();

console.log(await app.userId)

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <h1>Hello world </h1>
  <button id="button">Login</button>
`;

document.querySelector("#button")?.addEventListener("click", async (e) => {
  console.log(await app.login());
});
