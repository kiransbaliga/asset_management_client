import { useNavigate, useParams } from 'react-router-dom';
import TitleBar from '../../components/TitleBar/TitleBar';
import InputField from '../../components/InputField/InputField';
import { useEffect, useState } from 'react';
import SelectFied from '../../components/SelectField/SelectField';
import AddressField from '../../components/AddressField/AddressField';
import { addressFields, emptyEmployee, statusOptions } from './consts';
import {
  useGetDepartmentListQuery,
  useGetRoleListQuery,
  useLazyCreateEmployeeQuery,
  useLazyGetEmployeeQuery,
  useUpdateEmployeeMutation
} from './api';
import EmployeeType from '../../types/EmployeeType';
import './style.css';
import { OptionType } from '../../types/OptionType';

function EmployeeForm() {
  const [employeeData, setEmployeeData] = useState<EmployeeType>(emptyEmployee);

  const [departmentOptions, setDepartementOptions] = useState<OptionType[]>([]);
  const [roleOptions, setRoleOptions] = useState<OptionType[]>([]);

  const { id } = useParams();
  const navigate = useNavigate();

  const { data: departments } = useGetDepartmentListQuery();
  const { data: roles } = useGetRoleListQuery();
  const [updateEmployee, { isSuccess: isUpdated }] = useUpdateEmployeeMutation();
  const [createEmployee, { isSuccess: isCreated }] = useLazyCreateEmployeeQuery();
  const [getEmployeeById, { data: employeeDataResponse }] = useLazyGetEmployeeQuery();

  const handleChange = (field: string, value: any) => {
    setEmployeeData((prevData) => ({ ...prevData, [field]: value }));
  };

  const handleSubmit = () => {
    if (id) updateEmployee(employeeData);
    else createEmployee(employeeData);
  };

  useEffect(() => {
    if (id) getEmployeeById(id);
  }, [id]);

  useEffect(() => {
    if (departments?.data)
      setDepartementOptions(
        departments.data.map((department: { name: string; id: number }) => ({
          text: department.name,
          value: department.id
        }))
      );
  }, [departments]);

  useEffect(() => {
    if (roles?.data['data'])
      setRoleOptions(
        roles.data['data'].map((role: { name: string; id: string }) => ({
          text: role,
          value: role
        }))
      );
  }, [roles]);

  useEffect(() => {
    if (isCreated || isUpdated) navigate('/employees');
  }, [isCreated, isUpdated]);

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
              id='usernameField'
              label='Username'
              placeholder='Username'
              value={employeeData.username}
              onChange={(value) => handleChange('username', value)}
            />
          </div>
          <div className='column'>
            <InputField
              id='passwordField'
              label='Password'
              placeholder='Password'
              value={employeeData.password}
              onChange={(value) => handleChange('password', value)}
            />
          </div>
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
              value={employeeData.joining_date}
              onChange={(value) => handleChange('joining_date', value)}
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
              onChange={(value) => handleChange('departmentId', Number(value))}
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
              value={employeeData.status}
              onChange={(value) => handleChange('status', value)}
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
