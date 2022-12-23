import React from "react";
import { create as ipfsHttpClient } from "ipfs-http-client";
import UploadForm from "./UploadForm";
import FileInfo from "./FileInfo";

const projectId = process.env.REACT_APP_PROJECT_ID;
const projectSecretKey = process.env.REACT_APP_PROJECT_KEY;
const authorization = "Basic " + btoa(projectId + ":" + projectSecretKey);

const ipfs = ipfsHttpClient({
    url: "https://ipfs.infura.io:5001/api/v0",
    headers: {
      authorization,
    },
});

function App() {
  return (
    <div className="app">
      <UploadForm ipfs={ipfs} />
    </div>
  );
}

export default App;