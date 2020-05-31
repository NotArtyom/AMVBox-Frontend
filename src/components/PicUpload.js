import axios from 'axios';

import React,{Component} from 'react';

class PicUpload extends Component {

  state = {
    selectedFile: null
  };

  onFileChange = event => {
    this.setState({ selectedFile: event.target.files[0] });
  };

  onFileUpload = () => {
    const formData = new FormData();
    formData.append(
      "file",
      this.state.selectedFile,
      this.state.selectedFile.name
    );
    console.log(this.state.selectedFile);
    axios
      .post("http://localhost/files", formData,
        {headers: {'Authorization': localStorage.getItem('token')},} )
      .then(data => console.log(data))
      .catch((reason => console.log(reason)));
  };

  // File content to be displayed after
  // file upload is complete
  fileData = () => {

    if (this.state.selectedFile) {

      return (
        <div>
          <h2>File Details:</h2>
          <p>File Name: {this.state.selectedFile.name}</p>
          <p>File Type: {this.state.selectedFile.type}</p>
          <p>
            Last Modified:{" "}
            {this.state.selectedFile.lastModifiedDate.toDateString()}
          </p>
        </div>
      );
    } else {
      return (
        <div>
          <br />
          <h4>Choose before Pressing the Upload button</h4>
        </div>
      );
    }
  };

  render() {

    return (
      <div>
          <input type="file" onChange={this.onFileChange} />
          <button onClick={this.onFileUpload}>
            Upload!
          </button>
        {this.fileData()}

      </div>
    );
  }
}

export default PicUpload;
