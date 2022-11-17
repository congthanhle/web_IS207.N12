import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


export default function Catagory() {
  const [file, setFile] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(file);
    if (file) {
      const data = new FormData();
      const filename = Date.now() +'_'+ file.name;
      data.append("name", filename);
      data.append("image", file);
      try {
        console.log(data);
        await axios.post(`http://127.0.0.1:8000/api/imageUpload`, data);
      } catch (e) { }
    }
  }
  const handleImg = (e) => {
    e.preventDefault();
    setFile(e.target.files[0])
  }
  return (
    <form onSubmit={handleSubmit} method="POST" encType="multipart/form-data">

      <div className="mb-3">
        <label className="form-label">File:</label>
        <input
          type="file"
          id="fileInput"
          onChange={(e) => setFile(e.target.files[0])}
        />


      </div>

      <div className="mb-3">
        <button type="submit" className="btn btn-success">Upload</button>
      </div>

    </form>
  )
}
