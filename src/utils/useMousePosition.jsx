import React from 'react'
import { useState,useEffect } from 'react'
'use Client'
function useMousePosition() {
    const [mousePosition,setMousePosition] = useState({x:0,y:0});
    useEffect(() => {
      const updateMousePosition = (e) => {
          setMousePosition({ x: e.clientX, y: e.clientY });
      };
      window.addEventListener('mousemove', updateMousePosition);
      // Cleanup the event listener on unmount
      return () => {
          window.removeEventListener('mousemove', updateMousePosition);
      };
  }, []);

  return mousePosition; // Return the updated state
}

export default useMousePosition