import { useNavigate } from 'react-router-dom';
import IconButton from '../../components/IconButton/IconButton';
import Table from '../../components/Table/Table';
import TitleBar from '../../components/TitleBar/TitleBar';
import Employee from '../../types/EmployeeType';
import { FC, useState } from 'react';
import Actions from '../../components/Actions/inedx';
import { employeeColumns } from '../../columns/employee.columns';
import Dialog, { DialogStateType } from '../../components/Dialog/Dialog';
import { useGetEmployeeListQuery } from './api';

const Employees: FC = () => {
  const [deleteDialogState, setDeleteDialogState] = useState<DialogStateType>({ show: false });

  const { data } = useGetEmployeeListQuery();
  const employeesDataset = data?.data as object[];

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
    { key: 'id', label: 'Action', adapter: action }
  ];

  const handleCreate = () => {
    navigate('/employees/create/');
  };

  const handleTableClick = (data: Employee) => {
    navigate(`/employees/details/${data.id}`);
  };

  return (
    <>
      <Dialog
        title='Are you sure?'
        onSuccess={(params) => {
          console.log(params.id);
        }}
        successLabel='Confirm'
        state={deleteDialogState}
        setState={setDeleteDialogState}
      >
        <p>Do you really want to delete employee ?</p>
      </Dialog>
      <div className='flex-column'>
        <TitleBar title='Employee List'>
          <IconButton icon='/assets/icons/plus.png' text='Create employee' onClick={handleCreate} />
        </TitleBar>
        <div className='grow-scroll'>
          <Table
            columns={employeeTableColumns}
            dataset={employeesDataset}
            onClick={handleTableClick}
          />
        </div>
      </div>
    </>
  );
};

export default Employees;
