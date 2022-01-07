import { getStarknet } from "@argent/get-starknet";
import { stark } from "starknet";
import utils from "@/utils";

const COUNTER_ADDRESS =
  "0x00f4c5e82ddb6894411d6ae48b33284ed1cc6b167551e0a76f27811700b1c3c2";

const state = {
  l2ActiveAccount: null,
  l2AccountSigner: null,
  l2ActiveSigner: null,
  l2ActiveProvider: null,
  l2IsConnected: false,
  l2ChainName: null,
  l2InFlight: false,
  l2Count: false,
  l2TxStatus: null,
  l2TxHash: null,
  l2Error: null,
};

const getters = {
  l2ActiveAccount: (state) => state.l2ActiveAccount,
  l2AccountSigner: (state) => state.l2AccountSigner,
  l2ActiveSigner: (state) => state.l2ActiveSigner,
  l2ActiveProvider: (state) => state.l2ActiveProvider,
  l2IsConnected: (state) => state.l2IsConnected,
  l2ChainName: (state) => state.l2ChainName,
  l2InFlight: (state) => state.l2InFlight,
  l2Count: (state) => state.l2Count,
  l2TxStatus: (state) => state.l2TxStatus,
  l2TxHash: (state) => state.l2TxHash,
  l2Error: (state) => state.l2Error,
};

const actions = {
  async l2ConnectWallet({ commit }) {
    let starknet = getStarknet({ showModal: true });
    let [walletAddress] = await starknet.enable();

    if (starknet.isConnected) {
      commit("setl2ActiveAccount", walletAddress);
      commit("setl2ActiveSigner", starknet.signer);
      commit("setl2ActiveProvider", starknet.provider);
      commit("setl2IsConnected", true);

      const baseUrl = starknet.provider.baseUrl;
      if (baseUrl.includes("alpha-mainnet.starknet.io")) {
        commit("setl2ChainName", "mainnet-alpha");
      } else {
        commit("setl2ChainName", "goerli-alpha");
      }
      starknet.on("accountsChanged", async (e) => {
        commit("disconnectL2Wallet");
        const newAddr = e[0];
        console.log("initing for: ", newAddr);
        let starknet = getStarknet({ showModal: true });
        let [walletAddress] = await starknet.enable();
        if (starknet.isConnected) {
          commit("setl2ActiveAccount", walletAddress);
          commit("setl2ActiveSigner", starknet.signer);
          commit("setl2ActiveProvider", starknet.provider);
          commit("setl2IsConnected", true);

          const baseUrl = starknet.provider.baseUrl;
          if (baseUrl.includes("alpha-mainnet.starknet.io")) {
            commit("setl2ChainName", "mainnet-alpha");
          } else {
            commit("setl2ChainName", "goerli-alpha");
          }
        } else {
          commit("setErr", "cannot connet to argent wallet");
        }
      });
    } else {
      commit("setErr", "cannot connet to argent wallet");
    }
  },
  async l2FetchSigner({ commit, state }) {
    commit("setl2InFlight", true);
    const signer = await state.l2ActiveProvider.callContract({
      contract_address: state.l2ActiveSigner.address,
      entry_point_selector: stark.getSelectorFromName("get_signer"),
    });
    commit("setl2InFlight", false);
    commit("setL2AccountSigner", signer.result[0]);
  },
  async l2FetchCount({ commit }) {
    commit("setl2InFlight", true);
    const count = await state.l2ActiveProvider.callContract({
      contract_address: COUNTER_ADDRESS,
      entry_point_selector: stark.getSelectorFromName("get_count"),
    });
    commit("setl2InFlight", false);
    commit("setl2Count", utils.removeHexPrefix(count.result[0]));
  },
  async l2IncrementCount({ commit }) {
    if (state.l2IsConnected) {
      const cowResp = await state.l2ActiveSigner.addTransaction({
        type: "INVOKE_FUNCTION",
        contract_address: COUNTER_ADDRESS,
        entry_point_selector: stark.getSelectorFromName("increment"),
      });
      commit("setl2TxStatus", cowResp.code);
      commit("setl2TxHash", cowResp.transaction_hash);
    }
  },
  async l2DisconnectWallet({ commit }) {
    await commit("disconnectL2Wallet");
  },
};

const mutations = {
  setl2ActiveAccount(state, account) {
    state.l2ActiveAccount = account;
  },
  setl2ActiveProvider(state, provider) {
    state.l2ActiveProvider = provider;
  },
  setl2ActiveSigner(state, signer) {
    state.l2ActiveSigner = signer;
  },
  setL2AccountSigner(state, signer) {
    state.l2AccountSigner = signer;
  },
  setl2IsConnected(state, conn) {
    state.l2IsConnected = conn;
  },
  setl2ChainName(state, name) {
    state.l2ChainName = name;
  },
  setl2InFlight(state, val) {
    state.l2InFlight = val;
  },
  setl2Count(state, count) {
    state.l2Count = count;
  },
  setl2TxStatus(state, status) {
    state.l2TxStatus = status;
  },
  setl2TxHash(state, hash) {
    state.l2TxHash = hash;
  },
  setL2Err(state, err) {
    state.setL2Err = err;
  },
  disconnectL2Wallet(state) {
    state.l2ActiveAccount = null;
    (state.l2AccountSigner = null), (state.l2ActiveSigner = null);
    state.l2ActiveProvider = null;
    state.l2IsConnected = false;
    state.l2ChainName = null;
    state.l2Error = null;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
