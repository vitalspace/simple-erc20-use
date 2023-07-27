import "./style.css";
import Web3 from "web3";

const ercContractAbi: string;
const simpleContractAbi: string;

class App {
  protected web3: any;
  public userId: string;
  protected erc20ContractAddress: string =
    "0xd9145CCE52D386f254917e481eB44e9943F39138";
  protected simpleContractAddress: string =
    "0xd9145CCE52D386f254917e481eB44e9943F39138";
  erc20Contract: unknown;

  async init() {
    this.loadweb3();
  }

  async loadweb3() {
    if (window.ethereum) {
      this.web3 = new Web3(window.ethereum);
      this.loadContracts();
      this.isLoggedIn();
    }
  }

  async loadContracts() {
    this.erc20Contract = await new this.web3.eth.Contract(
      ercContractAbi,
      this.erc20ContractAddress
    );

    this.simpleContractAddress = await new this.web3.eth.Contract(
      simpleContractAbi,
      this.simpleContractAddress
    );
  }

  async login() {
    window.ethereum
      .request({
        method: "eth_requestAccounts",
      })
      .then((res) => {
        this.userId = res[0];
      })
      .catch((err) => {
        console.error(err);
      });
  }

  async isLoggedIn() {
    const account = await window.ethereum.request({
      method: "eth_accounts",
    });

    if (account.length > 0) {
      this.userId = account[0];
    }
  }
}

const app = new App();

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <h1>Hello world</h1>
`;
