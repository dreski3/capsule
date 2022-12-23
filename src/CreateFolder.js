import React from "react";

const CreateFolder = ({ ipfs }) => {
  const [folderName, setFolderName] = React.useState("");

  const handleChange = (event) => {
    setFolderName(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await ipfs.files.mkdir(`/${folderName}`);
      console.log(`Folder "${folderName}" created successfully`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Folder name:
        <input type="text" value={folderName} onChange={handleChange} />
      </label>
      <button type="submit">Create folder</button>
    </form>
  );
};

export default CreateFolder;
