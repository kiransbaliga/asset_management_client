import React, { useEffect, useState } from 'react';

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
    <div className={className + ' pagination'}>
      <div className='flex-row'>
        <button onClick={prev} disabled={start === 0 || loading}>
          Previous
        </button>
        <div className='bg-secondary-800 material h-6 rounded-lg flex items-center'>
          {limit !== 0 && (
            <div className='mx-2 text-xs'>
              {start + 1} / {limit}
            </div>
          )}
          {limit === 0 && <div className='mx-2 text-xs'>0 - 0</div>}
        </div>
        <button onClick={next} disabled={start === limit - 1 || loading}>
          Next
        </button>
      </div>
    </div>
  );
}

export default Pagination;
