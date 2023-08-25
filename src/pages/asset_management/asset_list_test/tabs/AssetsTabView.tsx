import { useEffect, useState } from 'react';
// import { assetColumns } from '../../../../columns/assets.columns';
// import Actions from '../../../../components/Actions/inedx';
import Dialog, { DialogStateType } from '../../../../components/Dialog/Dialog';
// import Table from '../../../../components/Table/Table';
import { useDeleteAssetMutation } from '../../api';
// import { useNavigate } from 'react-router-dom';

function AssetsTabView() {
  const [deleteDialogState, setDeleteDialogState] = useState<DialogStateType>({ show: false });

  const [deleteAsset, { isSuccess: isDeleted, isLoading: isDeleteLoading }] =
    useDeleteAssetMutation();

  // const navigate = useNavigate();

  // const action = (id: string) => {
  //   return (
  //     <Actions
  //       onDelete={() => {
  //         setDeleteDialogState({ show: true, params: { id } });
  //       }}
  //       onEdit={() => {
  //         navigate(`/assets/edit/${id}`);
  //       }}
  //     />
  //   );
  // };

  const handleDelete = (params) => {
    deleteAsset(params.id);
  };

  useEffect(() => {
    if (isDeleted) setDeleteDialogState({ show: false, params: {} });
  }, [isDeleted]);

  return (
    <>
      <Dialog
        title='Are you sure?'
        onSuccess={handleDelete}
        successLabel='Confirm'
        isLoading={isDeleteLoading}
        state={deleteDialogState}
        setState={setDeleteDialogState}
      >
        <p>Do you really want to delete asset ?</p>
      </Dialog>
      <div className='grow-scroll padding-top'>
        {/* <Table
        columns={assetsColumn}
        dataset={assetDataset?.data}
        onClick={handleTableClick}
        onPaginate={(offset) => {
          handleFilterSelect('offset', offset);
        }}
        total={assetDataset?.meta.tot}
        emptyMessage='No assets found'
      /> */}
      </div>
    </>
  );
}

export default AssetsTabView;
