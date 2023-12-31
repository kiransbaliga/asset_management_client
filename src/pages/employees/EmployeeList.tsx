import { useNavigate } from 'react-router-dom';
import IconButton from '../../components/IconButton/IconButton';
import Table from '../../components/Table/Table';
import TitleBar from '../../components/TitleBar/TitleBar';
import Employee from '../../types/EmployeeType';
import { FC, useEffect, useState } from 'react';
import Actions from '../../components/Actions/inedx';
import { employeeColumns } from '../../columns/employee.columns';
import Dialog, { DialogStateType } from '../../components/Dialog/Dialog';
import { useDeleteEmployeeMutation, useGetEmployeeListQuery } from './api';
import PermissionGuard from '../../wrappers/PermissionGuard';
import { AdminRoles } from '../request_management/consts';
import { useSelector } from 'react-redux';

const EmployeeList: FC = () => {
  const [deleteDialogState, setDeleteDialogState] = useState<DialogStateType>({ show: false });

  const user = useSelector((state: any) => state.auth.user);
  const [offset, setOffset] = useState(0);
  const { data } = useGetEmployeeListQuery({ offset: offset, take: 10 });
  const [deleteEmplyee, { isSuccess: isDeleted }] = useDeleteEmployeeMutation();
  const employeesDataset = data?.data;

  const navigate = useNavigate();

  const action = (id: string) => {
    return (
      <Actions
        onDelete={() => {
          setDeleteDialogState({ show: true, params: { id } });
        }}
        onEdit={() => {
          navigate(`/employees/edit/${id}`);
        }}
      />
    );
  };

  const employeeTableColumns = [
    ...employeeColumns,
    AdminRoles.includes(user.role) && { key: 'id', label: 'Action', adapter: action }
  ];

  const handleCreate = () => {
    navigate('/employees/create/');
  };

  const handleDelete = (params) => {
    deleteEmplyee(params.id);
  };

  const handleTableClick = (data: Employee) => {
    navigate(`/employees/details/${data.id}`);
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
        state={deleteDialogState}
        setState={setDeleteDialogState}
      >
        <p>Do you really want to delete employee ?</p>
      </Dialog>
      <div className='flex-column height-full'>
        <TitleBar title='Employee List'>
          <PermissionGuard userRoles={AdminRoles}>
            <IconButton
              icon='/assets/icons/plus.png'
              text='Create employee'
              onClick={handleCreate}
            />
          </PermissionGuard>
        </TitleBar>
        <div className='grow-scroll'>
          <Table
            className='height-full'
            columns={employeeTableColumns}
            dataset={employeesDataset}
            onClick={handleTableClick}
            onPaginate={(offset) => {
              setOffset(offset);
            }}
            total={data?.meta.tot}
          />
        </div>
      </div>
    </>
  );
};

export default EmployeeList;
