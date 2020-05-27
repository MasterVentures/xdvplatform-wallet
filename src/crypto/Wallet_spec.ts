import { Wallet } from './Wallet';
import { expect } from 'chai';

const SignedXml = require('web-xml-crypto').SignedXml
  , fs = require('fs')
describe("#wallet", function () {
  let selectedWallet;
  beforeEach(function () {
  });

  it("when adding a password for a new wallet, should create a keystore", async function () {
    const keystore = await Wallet.createHDWallet({ password: 'password123' });
    expect(JSON.parse(keystore).version).equal(3);
  });


  it("when adding a password and keystore for a new wallet, should create keystore", async function () {
    const mnemonic = Wallet.generateMnemonic();
    selectedWallet = await Wallet.createHDWallet({ mnemonic, password: '123password' });
    expect(JSON.parse(selectedWallet).version).equal(3);
  });

  it("when given a keystore and password, should unlock and return a wallet", async  ()=> {

    try {
      const wallet = await Wallet.unlock(selectedWallet, '123password');
      expect(true).equal(true);
    }
    catch (e) {
      console.log(e);
      throw e;
    }
  });

  it("when given a seed and creating EdDSA keys, should return EdDSA keypair", async function () {

    const mnemonic = Wallet.generateMnemonic();
    const opts = { mnemonic, password: '123password' };
    const keystore = await Wallet.createHDWallet(opts);
    expect(JSON.parse(keystore).version).equal(3);

    try {
      const wallet = await Wallet.unlock(keystore, opts.password);
      const kp = await wallet.getEd25519();
      expect(!!kp).equal(true);
    }
    catch (e) {
      throw e;
    }
  });

  it("when given a seed, should return a PEM", async function () {

    const mnemonic = Wallet.generateMnemonic();
    const opts = { mnemonic, password: '123password' };
    const keystore = await Wallet.createHDWallet(opts);
    expect(JSON.parse(keystore).version).equal(3);

    try {
      const wallet = await Wallet.unlock(keystore, opts.password);
      const pem = await wallet.getPrivateKeyAsPEM();
      expect(!!pem).equal(true);
    }
    catch (e) {
      throw e;
    }
  });


  it("when given a seed, should return a DER", async function () {

    const mnemonic = Wallet.generateMnemonic();
    const opts = { mnemonic, password: '123password' };
    const keystore = await Wallet.createHDWallet(opts);
    expect(JSON.parse(keystore).version).equal(3);

    try {
      const wallet = await Wallet.unlock(keystore, opts.password);
      const der = await wallet.getPrivateKeyAsDER();
      expect(!!der).equal(true);
    }
    catch (e) {
      throw e;
    }
  });
});