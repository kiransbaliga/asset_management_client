import { useNavigate, useParams } from 'react-router-dom';
import TitleBar from '../../components/TitleBar/TitleBar';
import InputField from '../../components/InputField/InputField';
import { useEffect, useState } from 'react';
import SelectField from '../../components/SelectField/SelectField';
import AddressField from '../../components/AddressField/AddressField';
import { addressFields, initialEmployeeData, statusOptions } from './consts';
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
import useForm from '../../hooks/form.hook';
import useValidator from '../../hooks/validator.hook';
import { employeeErrorsType } from './type';
import { employeeValidators } from './validators';
import PermissionGuard from '../../wrappers/PermissionGuard';

function EmployeeForm() {
  const [departmentOptions, setDepartementOptions] = useState<OptionType[]>([]);
  const [roleOptions, setRoleOptions] = useState<OptionType[]>([]);

  const { id } = useParams();
  const navigate = useNavigate();

  const { data: departments } = useGetDepartmentListQuery();
  const { data: roles } = useGetRoleListQuery();
  const [updateEmployee, { isSuccess: isUpdated }] = useUpdateEmployeeMutation();
  const [createEmployee, { isSuccess: isCreated, error: createErrors }] =
    useLazyCreateEmployeeQuery();
  const [getEmployeeById, { data: employeeDataResponse }] = useLazyGetEmployeeQuery();

  const [employeeData, setEmployeeData] = useForm<EmployeeType>(initialEmployeeData);
  const [employeeValidate, employeeErrors] = useValidator<employeeErrorsType, EmployeeType>(
    employeeValidators,
    employeeData,
    createErrors ? createErrors['data'].errors : {}
  );

  const handleSubmit = () => {
    if (id && employeeValidate()) updateEmployee(employeeData);
    else if (employeeValidate()) createEmployee(employeeData);
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
      const employeeData = { ...(employeeDataResponse.data as EmployeeType) };

      employeeData.password = '';
      setEmployeeData(employeeData);
    }
  }, [employeeDataResponse]);

  return (
    <PermissionGuard>
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
                onChange={(value) => setEmployeeData('username', value)}
                errors={employeeErrors.username}
              />
            </div>
            <div className='column'>
              <InputField
                id='passwordField'
                label='Password'
                placeholder='Password'
                value={employeeData.password}
                onChange={(value) => setEmployeeData('password', value)}
                errors={employeeErrors.password}
              />
            </div>
            <div className='column'>
              <InputField
                id='employeeNameField'
                label='Name'
                placeholder='Employee name'
                value={employeeData.name}
                onChange={(value) => setEmployeeData('name', value)}
                errors={employeeErrors.name}
              />
            </div>
            <div className='column'>
              <InputField
                id='joiningDateField'
                type='date'
                label='Joining Date'
                value={employeeData.joining_date}
                onChange={(value) => setEmployeeData('joining_date', value)}
                errors={employeeErrors.joining_date}
              />
            </div>
            <div className='column'>
              <InputField
                type='number'
                id='experienceField'
                label='Experience (Yrs)'
                value={employeeData.experience}
                onChange={(value) => setEmployeeData('experience', value)}
                errors={employeeErrors.experience}
              />
            </div>
            <div className='column'>
              <SelectField
                id='departmentField'
                label='Department'
                placeholder='Choose a department'
                options={departmentOptions}
                value={employeeData.departmentId}
                onChange={(value) => setEmployeeData('departmentId', Number(value))}
                errors={employeeErrors.departmentId}
              />
            </div>
            <div className='column'>
              <SelectField
                id='roleField'
                label='Role'
                placeholder='Choose a role'
                options={roleOptions}
                value={employeeData.role}
                onChange={(value) => setEmployeeData('role', value)}
                errors={employeeErrors.role}
              />
            </div>
            <div className='column'>
              <SelectField
                id='statusField'
                label='Status'
                placeholder='Choose a status'
                options={statusOptions}
                value={employeeData.status}
                onChange={(value) => setEmployeeData('status', value)}
                errors={employeeErrors.status}
              />
            </div>
            <div className='column'>
              <AddressField
                label='Address'
                fields={addressFields}
                values={employeeData.address}
                onChange={(value) => setEmployeeData('address', value)}
                errors={employeeErrors.address}
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
    </PermissionGuard>
  );
}

export default EmployeeForm;
