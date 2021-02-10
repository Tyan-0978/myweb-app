import React, { useState, useLayoutEffect } from 'react';

function useWidth() {
  const [width, setWidth] = useState(0);

  /*
  useLayoutEffect(() => {
    setWidth(window.innerWidth);
  });
  */
  window.addEventListener('resize', () => {
    setWidth(window.innerWidth);
  });

  return width;
}

export default useWidth;
