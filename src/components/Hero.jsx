import React, { useRef,useEffect,useState } from 'react'
'use client'
import gsap from 'gsap'
import useMousePosition from '../utils/useMousePosition'
import { NavLink } from 'react-router';
import { useGSAP } from '@gsap/react';
function Hero() {
  const [mouseEnter,setMouseEnter] = useState(true);
  const {x,y} = useMousePosition();
  const herosection = useRef(null);
  useEffect(() => {
    const heroElement = herosection.current;
    if (heroElement) {
      const handleMouseEnter = () => {
        console.log('Mouse entered the hero section!');
        setMouseEnter(true)
      };
      const handleMouseLeave = () => {
        console.log('Mouse left the hero section!');
        setMouseEnter(false)
      };
      // Add event listeners
      heroElement.addEventListener('mouseenter', handleMouseEnter);
      heroElement.addEventListener('mouseleave', handleMouseLeave);
      // Cleanup event listeners on unmount
      
    }
  }, []);
  useEffect(() => {
    if (cursorfollow.current) {
      if (mouseEnter) {
        gsap.to(cursorfollow.current, {
          scale: 1,
          opacity:1,
          
        });
      } else {
        gsap.to(cursorfollow.current, {
          scale: 0,
          opacity:1,
          
        });
      }
    }
  }, [mouseEnter]);
  const cursorfollow = useRef(null);
useEffect(() => {
    if (cursorfollow.current && herosection.current && mouseEnter) {
      const heroRect = herosection.current.getBoundingClientRect();
      const adjustedX = x - heroRect.left; // Adjusted X based on section position
      const adjustedY = y - heroRect.top; // Adjusted Y based on section position

      gsap.to(cursorfollow.current, {
        x: adjustedX,
        y: adjustedY,
        duration: 0.1,
      });
    }
  }, [x, y, mouseEnter]);
  return (
    <section className='h-[100vh] cursor-none' ref={herosection}>
      <div className='bg-red-500 w-[60px] h-[60px] rounded-[100%]  max-lg:hidden mousemove relative z-50 ' ref={cursorfollow}></div>
      <div className='max-w-7xl mx-auto pt-20 px-6 h-[100%] relative z-10 '>
        <div className='mt-[80px] h-[60%]'>
          <div className='h-[30%] relative bottom-0 left-[100px]'>
            <video  autoPlay loop muted src='https://globalcms.bbdo.com/wp-content/uploads/2024/05/BBDO_Manifesto-optimized.mp4' className='object-cover rounded-full h-[120px]'></video>
          </div>
          <div className="flex flex-col  items-center mt-4 lg:mt-[12%] cursor-none">
            <h1 className="text-4xl sm:text-6xl lg:text-8xl text-center tracking-wide text-white -translate-y-[150px]">Your <span className="bg-gradient-to-r from-orange-500 to-orange-800 text-transparent bg-clip-text">Digital</span>  Presence Speaks Before <span className="bg-gradient-to-r from-orange-500 to-orange-800 text-transparent bg-clip-text">
              You 
              </span> Do
              <p className='absolute right-0 text-sm translate-y-10'>- Gorav Tribhuwan</p> 
            </h1>
          </div>
        </div>
        <div className='h-[23%] bg-[#fffdf1] rounded-xl'></div>
      </div>
      <hr className='w-[90%] mx-auto border-red-400 border-opacity-60'></hr>
    </section>
  )
}

export default Hero


