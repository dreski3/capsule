import React from "react";
import "./UploadForm.css";
import FileInfo from "./FileInfo";

function UploadForm({ ipfs }) {
  const [uploadedImages, setUploadedImages] = React.useState([]);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const form = event.target;
    const files = form[0].files;

    if (!files || files.length === 0) {
      return alert("No files selected");
    }

    const file = files[0];
    // upload files
    const result = await ipfs.add(file);

    setUploadedImages([
      ...uploadedImages,
      {
        cid: result.cid,
        path: result.path,
      },
    ]);

    form.reset();
  };

  return (
    <div className="app">
      <div className="app__container">
        {ipfs ? (
          <div className="container">
            <h1>IPFS uploader</h1>
            <form onSubmit={onSubmitHandler}>
              <label for="file-upload" class="custom-file-upload">
                Select File
              </label>
              <input id="file-upload" type="file" name="file" />
              <button className="button" type="submit">
                Upload file
              </button>
            </form>
          </div>
        ) : null}
        <div className="data">
          {uploadedImages.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>URL</th>
                  <th>Info</th>
                </tr>
              </thead>
              <tbody>
                {uploadedImages.map((image, index) => (
                  <tr key={image.cid.toString() + index}>
                    <td>
                      <a href={"https://skywalker.infura-ipfs.io/ipfs/" + image.path}>
                        {"https://skywalker.infura-ipfs.io/ipfs/" + image.path}
                      </a>
                    </td>
                    <td>
                      <FileInfo ipfs={ipfs} cid={image.cid} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No uploaded images</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default UploadForm;
