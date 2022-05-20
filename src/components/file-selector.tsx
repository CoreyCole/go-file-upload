import * as React from "react";

interface IFileSelector {
  myValue: boolean,
}

interface IFileSelectorProps {
  progress: number,
}

export class FileSelector extends React.Component<IFileSelectorProps, IFileSelector> {
  constructor(props: any) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(selectorFiles: FileList | null) {
    if (!selectorFiles) {
      console.error("null file!");
    }
    console.log(selectorFiles);
    this.upload(selectorFiles!, 0)
      .catch(err => console.error(err));
  }

  async upload(selectorFiles: FileList, index: number) {
    const thisTemp = this;
    if (index > selectorFiles.length) {
      console.error("selectorFiles overrun!");
      return;
    }
    const file = selectorFiles[index];
    const data = new FormData();
    data.append("myFile", file);
    fetch("http://localhost:8080/upload", {
      mode: 'no-cors',
      method: "POST",
      body: data
    }).then(function (res) {
      if (res.ok) {
        alert("Perfect! ");
        thisTemp.upload(selectorFiles, index+1);
      } else if (res.status === 401) {
        alert("Oops! ");
      }
    }, function (e) {
      alert("Error submitting form!");
    });
  }

  render() {
    return <>{<div>
      <input type="file" name="myFile" onChange={(e) => this.handleChange(e.target.files)} />
    </div>}</>;
  }
}
