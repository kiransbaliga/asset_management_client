import React, { useState } from 'react';
import TitleBar from '../../components/TitleBar/TitleBar';
import './styles.css';
import { useUploadFileMutation } from './api';
import PermissionGuard from '../../wrappers/PermissionGuard';

const UploadExcel = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadFile] = useUploadFileMutation();

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!selectedFile) return;

    const formData = new FormData();

    formData.append('file', selectedFile);

    try {
      await uploadFile(formData);
      console.log(selectedFile);
      console.log('File uploaded successfully');
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <PermissionGuard>
      <div>
        <TitleBar title={'Create assets via Excel'}></TitleBar>
        <div className='upload-card  card flex-column upload '>
          <input type='file' onChange={handleFileChange} />
          <button className='btn btn-primary' onClick={handleUpload}>
            Upload
          </button>
          <a href='.public/assets/filetemplate.csv' download='filetemplate.csv'>
            Download template
          </a>
        </div>
      </div>
    </PermissionGuard>
  );
};

export default UploadExcel;
