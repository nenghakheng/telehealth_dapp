import Web3 from "web3";

export const initWeb3 = async (contractJson) => {
  const web3 = new Web3(Web3.givenProvider || "http://localhost:7545");
  const networkId = await web3.eth.net.getId();
  const deployedNetwork = contractJson.networks[networkId];

  if (!deployedNetwork) {
    throw new Error("Contract not deployed on the detected network.");
  }

  const contract = new web3.eth.Contract(
    contractJson.abi,
    deployedNetwork.address
  );
  return { web3, contract };
};
