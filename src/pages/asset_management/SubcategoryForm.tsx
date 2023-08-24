import React, { useEffect, useState } from 'react';
import TitleBar from '../../components/TitleBar/TitleBar';
import './styles.css';
import InputField from '../../components/InputField/InputField';
import { useNavigate } from 'react-router-dom';
import { emptySubcategory, perishableTypeOptions } from './consts';
import { useCreateSubcategoryMutation, useGetCategoryListQuery } from './api';
import CategoryType from '../../types/CategoryType';
import SelectFied from '../../components/SelectField/SelectField';

const SubcategoryForm = () => {
  const [subcategoryData, setSubcategoryData] = useState(emptySubcategory);

  const [createSubcategory, { isSuccess: isCreateSubcategorySuccess }] =
    useCreateSubcategoryMutation();

  const navigate = useNavigate();
  const handleChange = (field: string, value: any) => {
    setSubcategoryData((prevData) => ({ ...prevData, [field]: value }));
  };
  const handleReset = () => {
    setSubcategoryData(emptySubcategory);
  };

  const handleSubmit = () => {
    createSubcategory(subcategoryData);
  };

  useEffect(() => {
    if (isCreateSubcategorySuccess) navigate('/assets');
  }, [isCreateSubcategorySuccess]);
  console.log(subcategoryData);

  const { data: categoriesDateset } = useGetCategoryListQuery();
  const categories = categoriesDateset?.data as CategoryType[];

  const categoryOptions = categories
    ? categories.map((category) => ({ value: category.id, text: category.name }))
    : [];

  return (
    <div className='subcategory-form'>
      <TitleBar title={'Create Subcategory'}></TitleBar>
      <div className='card flex-row center'>
        <div className='column'>
          <InputField
            id='subcategoryNameField'
            type='text'
            label='Subcategory Name'
            placeholder='Subcategory Name'
            value={subcategoryData.name}
            onChange={(value) => handleChange('name', value)}
          />
        </div>
        <div className='column'>
          <SelectFied
            id='categoryField'
            label='Category'
            placeholder='Choose a category'
            options={categoryOptions}
            value={subcategoryData.categoryId}
            onChange={(value) => handleChange('categoryId', Number(value))}
          />
        </div>
        <div className='column'>
          <SelectFied
            id='subcategoryType'
            label='Perishable?'
            placeholder='Is the subcategory perishable?'
            options={perishableTypeOptions}
            value={
              subcategoryData.perishable === null ? '' : subcategoryData.perishable ? '1' : '0'
            }
            onChange={(value) => handleChange('perishable', value === '1')}
          />
        </div>
        {subcategoryData.perishable === true && (
          <div className='column'>
            <InputField
              id='countField'
              type='number'
              label='Count'
              placeholder='Enter the count'
              value={subcategoryData.count}
              onChange={(value) => handleChange('count', value)}
            />
          </div>
        )}
        <div className='column request-btn'>
          <div className='btn-group'>
            <button className='btn btn-primary' onClick={handleSubmit}>
              Create
            </button>
            <button className='btn btn-secondary' onClick={handleReset}>
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubcategoryForm;
