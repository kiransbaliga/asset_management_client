import { useNavigate } from 'react-router-dom';
import TitleBar from '../../components/TitleBar/TitleBar';
import IconButton from '../../components/IconButton/IconButton';
import Table from '../../components/Table/Table';
import { assetColumns } from '../../columns/assets.columns';
import Filter from '../../components/filter';
import {
  useGetCategoryListQuery,
  useLazyGetAssetListQuery,
  useLazyGetSubcategoryListQuery
} from './api';
import { useEffect, useState } from 'react';
import CategoryType from '../../types/CategoryType';
import subcategoryType from '../../types/SubcategoryType';
import AssetType from '../../types/AssetType';

function AssetList() {
  const [currentCategory, setCurrentCategory] = useState();

  const navigate = useNavigate();
  const [getAssets, { data: assetDataset }] = useLazyGetAssetListQuery();
  const [getSubCategories, { data: subcategoriesDateset }] = useLazyGetSubcategoryListQuery();
  const { data: categoriesDateset } = useGetCategoryListQuery();

  let categories = categoriesDateset?.data as CategoryType[];
  let subcategories = subcategoriesDateset?.data as subcategoryType[];

  const assets = assetDataset
    ? assetDataset.data.map((asset: AssetType) => {
        const newAsset = {
          ...asset,
          subcategory: subcategories
            ? subcategories.find((subcategory) => subcategory.id === asset.subcategoryId).name
            : ''
        };

        return newAsset;
      })
    : [];

  const handleCreate = () => {
    navigate('/assets/create/');
  };

  const handleTableClick = (data) => {
    navigate(`/assets/details/${data.id}`);
  };

  useEffect(() => {
    getSubCategories();
  }, [categories]);

  useEffect(() => {
    if (categories && subcategories) getAssets();
  }, [categories, subcategories]);

  return (
    <div className='flex-column'>
      <TitleBar title='Asset List'>
        <Filter
          label='Category'
          options={
            categories
              ? categories.map((category) => ({ value: category.id, text: category.name }))
              : []
          }
          onSelect={setCurrentCategory}
        />
        <Filter
          label='Sub category'
          options={
            subcategories
              ? subcategories
                  .filter((subcategory) => subcategory.categoryId == currentCategory)
                  .map((subcategory) => ({
                    value: subcategory.id,
                    text: subcategory.name
                  }))
              : []
          }
        />
        <Filter label='Status' options={[]} />
        <IconButton icon='/assets/icons/plus.png' text='Create asset' onClick={handleCreate} />
      </TitleBar>
      <div className='grow-scroll'>
        <Table columns={assetColumns} dataset={assets} onClick={handleTableClick} />
      </div>
    </div>
  );
}

export default AssetList;
