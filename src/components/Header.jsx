import React, { useRef, useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router';
import { navItems } from '../constants';
import { Menu, X } from 'lucide-react';
import { useWindowScroll } from 'react-use';
import gsap from 'gsap';

function Header() {
  const navContainerRef = useRef(null);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const { y: currentScrollY } = useWindowScroll();
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [hamburgerClicked,setHamburgerClicked] = useState(false)
  const hamburgerDiv = useRef();
  const hamburgerLinks = useRef();
  const toggleNavbar = () => {
    if (mobileDrawerOpen) {
      // Animate out when closing
      gsap.to(hamburgerDiv.current, {
        onComplete: () => setMobileDrawerOpen(false), // Unmount after animation
      });
    } else {
      setMobileDrawerOpen(true);
    }
    setHamburgerClicked(!hamburgerClicked)
  };
  const handleClick = () => {
    setMobileDrawerOpen(false);
  };
  useEffect(()=>{
    const t1 = gsap.timeline();
      if(hamburgerClicked){
        t1.from(hamburgerLinks.current,{
          x:400,
        })
      }else{
        t1.to(hamburgerLinks.current,{
          x:400,
          duration:1
        })
      }
  },[hamburgerClicked])
  useEffect(() => {
    if (navContainerRef.current) {
      if (currentScrollY === 0) {
        // Topmost position: show navbar without floating-nav
        setIsNavVisible(true);
        navContainerRef.current.classList.remove('floating-nav');
      } else if (currentScrollY > lastScrollY) {
        // Scrolling down: hide navbar and apply floating-nav
        setIsNavVisible(false);
        navContainerRef.current.classList.add('floating-nav');
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up: show navbar with floating-nav
        setIsNavVisible(true);
        navContainerRef.current.classList.add('floating-nav');
      }

      setLastScrollY(currentScrollY);
    }
  }, [currentScrollY, lastScrollY]);

  // Handle animations
  useEffect(() => {
    if (navContainerRef.current) {
      gsap.to(navContainerRef.current, {
        y: isNavVisible ? 0 : -100,
        opacity: isNavVisible ? 1 : 0,
        duration: 0.2,
      });
    }
  }, [isNavVisible]);

  return (
    <div ref={navContainerRef} className='fixed z-50 top-0 w-full transition-all duration-500 border-none h-16 '>
      <div className=''>
      <header className=' w-full '>
        <nav className='flex justify-between items-center '>
          <div className="flex items-center justify-around max-md:justify-between w-full ">
            <h1 className='text-white text-base cursor-pointer'>
              <Link to='/' className='text-3xl '>Janivaa</Link>
            </h1>
            <ul className='flex gap-4 font-semibold text-xl cursor-pointer max-md:hidden h-full p-4 '>
              {navItems.map((item, index) => (
                <li key={index}>
                  <NavLink
                    className={({ isActive }) =>
                      `nav-hover-btn ${isActive ? '!text-red-500 ' : 'text-white'} `
                    }
                    to={item.path}
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
              <NavLink className='text-white nav-hover-btn-special font-semibold flex justify-center items-center  max-md:hidden' to='/contact-us'>Let's GROW</NavLink>
          </div>
          <div className="md:hidden flex-col justify-end translate-y-2 -translate-x-3">
            <button onClick={toggleNavbar} className='text-white'>
              {mobileDrawerOpen ? <X /> : <Menu />}
            </button>
          </div>
        </nav>
      </header>
      </div>
      {mobileDrawerOpen && (
        <div ref={hamburgerDiv}>
          <div className="fixed w-screen  top-12 z-20 h-screen flex flex-col justify-center items-center md:hidden backdrop-blur-lg border-b border-neutral-700/80  " >
            <ul className='space-y-10' ref={hamburgerLinks}>
              {navItems.map((item, index) => (
                <li key={index}>
                  <NavLink
                    className={({ isActive }) =>
                      `${isActive ? '!text-red-500' : 'text-white'} nav-hover-btn  text-5xl font-semibold `
                    }
                    to={item.path}
                    onClick={handleClick}
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default Header;
