import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import ProgressBar from './progressBar';
function  UploadForm(){
    const {currentUser} = useAuth(); 
const [file, setFile] = useState(null);
const [error, setError] = useState(null);
const [title, setTitle] = useState("");
const types=['image/png','image/jpeg','video/mp4'];
function changeHandler(e){
    let selected =e.target.files[0];
    let filetitle = document.getElementById("title").value;
if (selected && types.includes(selected.type)) {
    
    if(filetitle!=="")
    {
        setFile(selected);
        setError('');
        setTitle(filetitle);
    }
    else{
        setFile(null);
        setError('Title of the file should not be empty');
        setTitle("");
    }
    console.log(selected)
}
else {
    setFile(null);
    setTitle("");
    setError("please select an image file jpg/png or video file mp4");
    console.log("invalid file");

}
}
return (
        <div>
          {currentUser && 
          <form>
              <table style={{margin:"5px auto"}}>
                  <td>
                    <input className="w3-input w3-border" id="title" type="text" placeholder="Enter video/image title" required/>
                  </td>
                  <td>
                         
          <label className="upload-btn">
          <input type="file" onChange={changeHandler} id="input-file" required/>
          
          <span id="selectedFileName">Upload</span>
          </label>
                  </td>
              </table>
          
          <div className="output">
            {error && <div className="error">{error}</div>}
            {file && <div>{file.name}</div>}
            {file && <ProgressBar file={file} setFile={setFile} title={title} />}
          </div>
      </form>
          }
        </div>
)
}
export default UploadForm;