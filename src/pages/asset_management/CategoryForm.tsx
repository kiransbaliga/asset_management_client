import React, { useEffect, useState } from 'react';
import TitleBar from '../../components/TitleBar/TitleBar';
import './styles.css';
import InputField from '../../components/InputField/InputField';
import { emptyCategory } from './consts';
import { useCreateCategoryMutation } from './api';
import { useNavigate } from 'react-router-dom';

const CategoryForm = () => {
  const [categoryData, setCategoryData] = useState(emptyCategory);

  const [createCategory, { isSuccess: isCreateCategorySuccess }] = useCreateCategoryMutation();

  const navigate = useNavigate();
  const handleChange = (field: string, value: any) => {
    setCategoryData((prevData) => ({ ...prevData, [field]: value }));
  };

  const handleSubmit = () => {
    createCategory(categoryData);
  };

  useEffect(() => {
    if (isCreateCategorySuccess) navigate('/assets/create');
  }, [isCreateCategorySuccess]);
  console.log(categoryData);

  return (
    <div className='category-form'>
      <TitleBar title={'Create Category'}></TitleBar>
      <div className='card flex-row'>
        <div className='column'>
          <InputField
            id='categoryNameField'
            type='text'
            label='Category Name'
            placeholder='Category Name'
            value={categoryData.name}
            onChange={(value) => handleChange('name', value)}
          />
        </div>
        <div className='column request-btn'>
          <div className='btn-group'>
            <button className='btn btn-primary' onClick={handleSubmit}>
              Create
            </button>
            <button className='btn btn-secondary'>Reset</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryForm;
