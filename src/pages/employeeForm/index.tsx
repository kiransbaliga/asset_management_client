import { useNavigate, useParams } from 'react-router-dom';
import TitleBar from '../../components/TitleBar/TitleBar';
import InputField from '../../components/InputField/InputField';
import { useEffect, useState } from 'react';
import SelectFied, { OptionType } from '../../components/SelectField/SelectField';
import AddressField from '../../components/AddressField/AddressField';
import { addressFields, emptyEmployee, statusOptions } from './consts';
import {
  useGetDepartmentListQuery,
  useGetRoleListQuery,
  useLazyCreateEmployeeQuery,
  useLazyGetEmployeeQuery
} from './api';
import EmployeeType from '../../types/EmployeeType';
import './style.css';

function EmployeeForm() {
  const [employeeData, setEmployeeData] = useState<EmployeeType>(emptyEmployee);

  const [departmentOptions, setDepartementOptions] = useState<OptionType[]>([]);
  const [roleOptions, setRoleOptions] = useState<OptionType[]>([]);

  const { id } = useParams();
  const navigate = useNavigate();

  const { data: departments } = useGetDepartmentListQuery();
  const { data: roles } = useGetRoleListQuery();
  const [createEmployee, { isSuccess: isCreated }] = useLazyCreateEmployeeQuery();
  const [getEmployeeById, { data: employeeDataResponse }] = useLazyGetEmployeeQuery();

  const handleChange = (field: string, value: any) => {
    setEmployeeData((prevData) => ({ ...prevData, [field]: value }));
  };

  const handleSubmit = () => {
    createEmployee(employeeData);
  };

  useEffect(() => {
    if (id) getEmployeeById(id);
  }, [id]);

  useEffect(() => {
    if (departments?.data)
      setDepartementOptions(
        departments.data.map((department: { name: string; id: string }) => ({
          text: department.name,
          value: department.id
        }))
      );
  }, [departments]);

  useEffect(() => {
    if (roles?.data)
      setRoleOptions(
        roles.data.map((role: { name: string; id: string }) => ({
          text: role.name,
          value: role.id
        }))
      );
  }, [roles]);

  useEffect(() => {
    if (isCreated) navigate('/employees');
  }, [isCreated]);

  useEffect(() => {
    if (employeeDataResponse?.data) {
      const employeeData = employeeDataResponse.data as EmployeeType;

      setEmployeeData(employeeData);
    }
  }, [employeeDataResponse]);

  return (
    <div className='employee-form'>
      <TitleBar title={id ? 'Edit Employee' : 'Create Employee'}></TitleBar>
      <div className='card'>
        <div className='flex-row'>
          <div className='column'>
            <InputField
              id='employeeNameField'
              label='Name'
              placeholder='Employee name'
              value={employeeData.name}
              onChange={(value) => handleChange('name', value)}
            />
          </div>
          <div className='column'>
            <InputField
              id='joiningDateField'
              type='date'
              label='Joining Date'
              value={employeeData.joiningDate}
              onChange={(value) => handleChange('joiningDate', value)}
            />
          </div>
          <div className='column'>
            <InputField
              type='number'
              id='experienceField'
              label='Experience (Yrs)'
              value={employeeData.experience}
              onChange={(value) => handleChange('experience', value)}
            />
          </div>
          <div className='column'>
            <SelectFied
              id='departmentField'
              label='Department'
              placeholder='Choose a department'
              options={departmentOptions}
              value={employeeData.departmentId}
              onChange={(value) => handleChange('department', value)}
            />
          </div>
          <div className='column'>
            <SelectFied
              id='roleField'
              label='Role'
              placeholder='Choose a role'
              options={roleOptions}
              value={employeeData.role}
              onChange={(value) => handleChange('role', value)}
            />
          </div>
          <div className='column'>
            <SelectFied
              id='statusField'
              label='Status'
              placeholder='Choose a status'
              options={statusOptions}
              value={employeeData.isActive === false ? 'inactive' : 'active'}
              onChange={(value) => handleChange('isActive', value === 'active')}
            />
          </div>
          <div className='column'>
            <AddressField
              label='Address'
              fields={addressFields}
              values={employeeData.address}
              onChange={(value) => handleChange('address', value)}
            />
          </div>
          <div className='column'>
            {id && <InputField id='joiningDateField' label='Employee ID' value={id} disabled />}
          </div>
          <div className='column'></div>
          <div className='column'>
            <div className='btn-group'>
              <button className='btn btn-primary' onClick={handleSubmit}>
                {id ? 'Edit' : 'Create'}
              </button>
              <button className='btn btn-secondary'>Reset</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployeeForm;
