import React, { useState } from 'react';
// import { read, utils } from 'xlsx';
import TitleBar from '../../../components/TitleBar/TitleBar';
import './styles.css';

const UploadExcel = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = (e) => {
    e.preventDefault();
    // if (selectedFile) {
    //   const reader = new FileReader();

    //   reader.onload = (e) => {
    //     const data = e.target.result;
    //     const workbook = read(data, { type: 'array' });
    //     const sheetName = workbook.SheetNames[0];
    //     const worksheet = workbook.Sheets[sheetName];
    //     const json = utils.sheet_to_json(worksheet);
    //     console.log(json);
    //     const filteredData = json.map(({ name, serial_no, subcategoryId }) => ({
    //       name,
    //       serial_no,
    //       subcategoryId
    //     }));

    //     console.log(filteredData);
    //   };
    //   reader.readAsArrayBuffer(selectedFile);
    // }
    console.log(selectedFile);
  };

  return (
    <div>
      <TitleBar title={'Create assets via Excel'}></TitleBar>
      <div className='card flex-column upload '>
        <input type='file' onChange={handleFileChange} />
        <button className='btn btn-primary' onClick={handleUpload}>
          Upload
        </button>
      </div>
    </div>
  );
};

export default UploadExcel;
