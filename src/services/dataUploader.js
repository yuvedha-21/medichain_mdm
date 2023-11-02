// import * as blockchain from "./Blockchain"
const Moralis = require("moralis").default;
// import abi from "../abis/src/contracts/Patient.sol/PatientDetails.json";

// import * as blockchain from "./Blockchain"
// const fs = require("fs"); 
async function uploadToIpfs() {
    await Moralis.start({
        apiKey: "YL8ZnJJABhPYC20ilgZfGj6JSvvh1A6Op9CYzOcvsvygZCzLFC8CeNlkvJCUbTEy",
    });
    const uploadArray = [
        // {
        //     path: "cat.png",
        //     content: fs.readFileSync('./Cat.png', {encoding: 'base64'})
        // },
        {
            path: "favResturants.json",
            content: {
                one: "dxcfgvh",
                two: "resdata", 
                three: "Chic-Fil-A"
            },
        },
    ];
    const response = await Moralis.EvmApi.ipfs.uploadFolder({
        abi: uploadArray,
    });
    console.log(response.result)
}

uploadToIpfs()