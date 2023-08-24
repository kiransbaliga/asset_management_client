import { useNavigate, useParams } from 'react-router-dom';
import TitleBar from '../../components/TitleBar/TitleBar';
import IconButton from '../../components/IconButton/IconButton';
import DetailsViewer from '../../components/DetailsViewer/DetailsViewer';
import { useEffect, useState } from 'react';
import { address, employeeColumns } from '../../columns/employee.columns';
import EmployeeType from '../../types/EmployeeType';
import { useLazyGetEmployeeQuery } from './api';
import PermissionGuard from '../../wrappers/PermissionGuard';
import { AdminRoles } from '../request_management/consts';

const employeeDetailsRow = [
  employeeColumns.slice(0, 5),
  [{ label: 'Address', key: 'address', adapter: address }, ...employeeColumns.slice(5)]
];

function Employee() {
  const { id } = useParams();
  const [employeeData, setEmployeeData] = useState<EmployeeType>();

  const [getEmployeeById, { data, isSuccess }] = useLazyGetEmployeeQuery();

  const navigate = useNavigate();

  const handleEditClick = () => {
    navigate('/employees/edit/' + id);
  };

  useEffect(() => {
    if (id) getEmployeeById(id);
  }, [id]);

  useEffect(() => {
    if (data && isSuccess) setEmployeeData(data.data as EmployeeType);
  }, [data, isSuccess]);

  return (
    <div>
      <TitleBar title='Employee Details'>
        <PermissionGuard userRoles={AdminRoles}>
          <IconButton text='Edit' icon='/assets/icons/edit.svg' onClick={handleEditClick} />
        </PermissionGuard>
      </TitleBar>
      <DetailsViewer rows={employeeDetailsRow} data={employeeData} />
    </div>
  );
}

export default Employee;
