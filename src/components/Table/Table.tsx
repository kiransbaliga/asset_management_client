import { FC } from 'react';
import './Table.css';
import ColumnType from '../../types/ColumnType';

interface TableProps {
  columns: ColumnType[];
  dataset: object[];
  onClick: (data: any) => void;
}

const Table: FC<TableProps> = ({ columns, dataset, onClick }) => {
  const renderHeaders = () => {
    return columns.map((column, i) => <th key={`table-th-${column.key}-${i}`}>{column.label}</th>);
  };

  const renderDatas = () => {
    return dataset.map((data, i) => (
      <tr className='table-row' key={'table-tr-' + i} onClick={() => onClick(data)}>
        {columns.map((column, j) => {
          let value = data[column.key];

          value = column.adapter ? column.adapter(value) : value;

          return (
            <td key={`table-td-${j}`}>
              <span>{value}</span>
            </td>
          );
        })}
      </tr>
    ));
  };

  return (
    <>
      <table className='table'>
        <thead>
          <tr className='table-head'>{renderHeaders()}</tr>
        </thead>
        {dataset?.length > 0 && <tbody>{renderDatas()}</tbody>}
      </table>
      {dataset?.length === 0 && (
        <div className='center flex-column text-primary'>
          <img
            className='icon'
            src='/assets/icons/triangle-exclamation.svg'
            alt='No data exclamation icon'
          />
          <div>No employee data</div>
        </div>
      )}
    </>
  );
};

export default Table;
