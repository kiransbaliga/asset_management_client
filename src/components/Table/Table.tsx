import { FC } from 'react';
import './Table.css';
import ColumnType from '../../types/ColumnType';
import Pagination from '../Pagination/Pagination';
import { classNames } from '../../utils/funcs';
import Icon from '../icon';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

interface TableProps {
  columns: ColumnType[];
  dataset: object[];
  onClick?: (data: any) => void;
  emptyMessage?: string;
  onPaginate?: (offset: number) => void;
  total?: number;
  className?: string;
}

const Table: FC<TableProps> = ({
  columns,
  dataset,
  onClick,
  emptyMessage = 'No data',
  onPaginate,
  total = 10,
  className
}) => {
  const renderHeaders = () => {
    return columns.map((column, i) => <th key={`table-th-${column.key}-${i}`}>{column.label}</th>);
  };

  const handleClick = (data) => {
    if (onClick) onClick(data);
  };

  const renderDatas = () => {
    return dataset.map((data, i) => (
      <tr className='table-row' key={'table-tr-' + i} onClick={() => handleClick(data)}>
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
    <div className={classNames(className, 'table-wrapper')}>
      <div className='table-scroll'>
        <table className='table'>
          <thead>
            <tr className='table-head'>{renderHeaders()}</tr>
          </thead>
          {dataset?.length > 0 && <tbody>{renderDatas()}</tbody>}
        </table>
        {dataset?.length === 0 && (
          <div className='table-no-data'>
            <Icon icon={faExclamationTriangle} size='2xl' />
            <div>{emptyMessage}</div>
          </div>
        )}
      </div>
      <Pagination onChange={onPaginate} total={total ? total : 0}></Pagination>
    </div>
  );
};

export default Table;
