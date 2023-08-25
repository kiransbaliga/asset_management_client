import React, { useEffect, useState } from 'react';
import Icon from '../icon';
import { faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { classNames } from '../../utils/funcs';
import './Pagination.css';

function Pagination({
  className = 'center',
  offset = 0,
  limit = 10,
  onChange,
  loading = false,
  total
}) {
  const [start, setStart] = useState(0);
  const [isFirst, setIsFirst] = useState(true);

  limit = Math.ceil(total / limit);
  useEffect(() => {
    if (!isFirst) console.log('start', start, offset);
    if (!isFirst) onChange(start);
  }, [start]);

  function prev() {
    if (start - 1 >= 0) {
      setStart(start - 1);
      setIsFirst(false);
    }
  }

  function next() {
    if (start + 1 < limit) {
      setStart(start + 1);
      setIsFirst(false);
    }
  }

  return (
    <div className={classNames(className, ' pagination')}>
      <a data-tooltip-id='my-tooltip' data-tooltip-content='Prevous' data-tooltip-place='top'>
        <Icon className='box' icon={faAngleLeft} onClick={prev} disabled={start === 0 || loading} />
      </a>
      <div className='pagination-status'>
        {limit !== 0 && (
          <>
            {start + 1} / {limit}
          </>
        )}
        {limit === 0 && <>0 - 0</>}
      </div>
      <a data-tooltip-id='my-tooltip' data-tooltip-content='Next' data-tooltip-place='top'>
        <Icon
          className='box'
          icon={faAngleRight}
          onClick={next}
          disabled={start === limit - 1 || loading}
        />
      </a>
    </div>
  );
}

export default Pagination;
