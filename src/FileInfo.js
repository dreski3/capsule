import React from "react";
import "./FileInfo.css";

function FileInfo({ ipfs, cid }) {
  const [file, setFile] = React.useState(null);

  React.useEffect(() => {
    async function fetchFile() {
      const result = await ipfs.ls(cid);
      setFile(result[0]);
    }
    fetchFile();
  }, [cid, ipfs]);

  return file ? (
    <div className="file-info">
      <h3>File Information</h3>
      <div className="file-type">
        <img src="/file-icon.png" alt="File icon" />
        <span>{file.name}</span>
      </div>
      <p>Content ID: {file.cid.toString()}</p>
      <p>Size: {file.size} bytes</p>
      <p>Path: {file.path}</p>
    </div>
  ) : (
    <p>Loading file information...</p>
  );
  }
export default FileInfo;
