import React from "react";

function ListFiles({ ipfs }) {
  const [files, setFiles] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const onShowFiles = async () => {
    setLoading(true);
    try {
      const res = await ipfs.ls("/");
      setFiles(res);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <div className="app__container">
        <button onClick={onShowFiles}>Show files</button>
        {loading && <p>Loading...</p>}
        {error && <p>{error.message}</p>}
        {files.length > 0 && (
          <ul>
            {files.map((file) => (
              <li key={file.cid.toString()}>
                <p>Name: {file.name}</p>
                <p>Type: {file.type}</p>
                <p>Size: {file.size} bytes</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default ListFiles;
