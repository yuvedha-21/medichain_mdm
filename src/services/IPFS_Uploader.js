//YL8ZnJJABhPYC20ilgZfGj6JSvvh1A6Op9CYzOcvsvygZCzLFC8CeNlkvJCUbTEy
const Moralis = require("moralis").default;
const fs = require("fs");
let id=8
async function uploadToIpfs() {
  await Moralis.start({
    apiKey: "YL8ZnJJABhPYC20ilgZfGj6JSvvh1A6Op9CYzOcvsvygZCzLFC8CeNlkvJCUbTEy",
  });
  let filename=`${id}.json`

  // const fileContent = fs.readFileSync(`./${filename}`, { encoding: "utf8" });
  // const jsonContent = JSON.parse(fileContent);
  const jsonContent = JSON.parse(
    fs.readFileSync(`./${id}.json`, { encoding: "utf8" })
  );
//   let fileName=id+".json"
// for (const item of jsonContent){
//   console.log(jsonContent[item]);m
// }
  const uploadArray = [
    {
      path: filename,
      content: jsonContent,
    },
  ];
  console.log(filename);
  const response = await Moralis.EvmApi.ipfs.uploadFolder({
    abi: uploadArray,
  });
  fs.writeFileSync(`./${id}.json`, JSON.stringify({}));
  const newFileName = `${id+1}.json`;
  fs.renameSync(`${id}.json`, newFileName);
  id++;
  console.log(response.result[0].path);
}
// uploadToIpfs();