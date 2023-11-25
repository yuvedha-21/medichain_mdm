import React, { useState } from 'react';
import Moralis from 'moralis';

function UploadToIpfs() {
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileChange = (event) => {
    setSelectedFiles(event.target.files);
  };

  // const uploadFiles =  () => {
     Moralis.start({ 
      apiKey: "YNBmlTN0i6gW08Qne6deVbRUybCIkyRqVkEqhIciFOmIlEcw6YcIJ7BIjwPql7Jq",
    });

  //   // const filesArray = Array.from(selectedFiles);

  //   // const uploadArray = filesArray.map((file) => {
  //   //   return {
  //   //     path: file.name,
  //   //     content: {},
  //   //   };                  
  //   // });

    // const uploadArray=[{
    //   path:"fav.json",
    //   content:{
    //     one:"gerfw",
    //     two:"gfed"
    //   }
    // }]

    // const response =  Moralis.EvmApi.ipfs.uploadFolder({
    //   abi: uploadArray,
    // });

    // console.log('Uploaded Links:', response.result);
  // };

  return (
    <div>
      <h4 className='text-center'>Upload Files to IPFS</h4>

      {/* <input type="file" onChange={handleFileChange} multiple />
      <button onClick={uploadFiles}>Upload</button> */}
    </div>  
  );
}

export default UploadToIpfs;