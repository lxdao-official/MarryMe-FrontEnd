import contractABI from "../abi.json";

const contractInfo = () => {
  return {
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
    abi: contractABI,
  };
};

export default contractInfo;
