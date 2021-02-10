import React, { useState, useLayoutEffect } from 'react';

function useSize() {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  window.addEventListener('resize', () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  });

  return [width, height];
}

export default useSize;
