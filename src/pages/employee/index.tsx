import { useNavigate, useParams } from 'react-router-dom';
import TitleBar from '../../components/TitleBar/TitleBar';
import IconButton from '../../components/IconButton/IconButton';
import DetailsViewer from '../../components/DetailsViewer/DetailsViewer';
import { useEffect, useState } from 'react';
import { address, employeeColumns } from '../../columns/employee.columns';
import { useLazyGetEmployeeQuery } from './api';
import EmployeeType from '../../types/EmployeeType';

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
        <IconButton text='Edit' icon='/assets/icons/edit.svg' onClick={handleEditClick} />
      </TitleBar>
      <DetailsViewer rows={employeeDetailsRow} data={employeeData} />
    </div>
  );
}

export default Employee;
