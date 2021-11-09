const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");
const web3 = new Web3(ganache.provider());
const { bytecode, interface } = require("../compile");

describe("Inbox", () => {
  let accounts;
  let inbox;
  beforeEach(async () => {
    accounts = await web3.eth.getAccounts();
    inbox = await new web3.eth.Contract(JSON.parse(interface))
      .deploy({ data: bytecode, arguments: ["Hi there!"] })
      .send({ from: accounts[0], gas: "1000000" });
  });

  it("deploys contract", async () => {
    assert.ok(inbox.options.address);
  });

  it("has a default message", async () => {
    const message = await inbox.methods.message().call();
    assert.equal(message, "Hi there!");
  });

  it("can change the message", async () => {
    await inbox.methods.setMessage("Bye").send({ from: accounts[0] });
    const message = await inbox.methods.message().call();
    assert.equal(message, "Bye");
  });

  it("can get the message", async () => {
    const message = await inbox.methods
      .getMessage()
      .call({ from: accounts[0] });
    assert.equal(message, "Hi there!");
  });
});
