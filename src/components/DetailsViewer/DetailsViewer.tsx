import { FC } from 'react';
import './DetailsViewer.css';
import ColumnType from '../../types/ColumnType';

interface DetailsViewerProps {
  rows: ColumnType[][];
  data: object;
}

const DetailsViewer: FC<DetailsViewerProps> = ({ rows, data }) => {
  const renderColumns = (columns: ColumnType[]) => {
    return columns.map((column, j) => {
      let value = data[column.key];

      value = column.adapter ? column.adapter(value) : value;

      return (
        <div className='flex-column detail' key={`table-td-${j}`}>
          <div className='detail-label'>{column.label}</div>
          <div className='detail-value'>{value}</div>
        </div>
      );
    });
  };

  const renderRows = () => {
    return rows.map((columns, i) => (
      <div key={i} className='details-row'>
        {renderColumns(columns)}
      </div>
    ));
  };

  if (data) return <div className='card details-viewer'>{renderRows()}</div>;
  else return <div className='card'>No data</div>;
};

export default DetailsViewer;
