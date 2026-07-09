import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex justify-around bg-slate-900 text-white py-1.5'>
        <div className="logo pt-2">
            <span className='font-bold text-xl mx-7 sm:mx-16'>iTask</span>
        </div>
        <ul  className='flex gap-5 sm:gap-8 mx-9'>
            <li className='cursor-pointer hover:font-bold transition-all pt-2.5'>Home</li>
            <li className='cursor-pointer hover:font-bold transition-all pt-2.5'>Your Tasks</li>
            <li>
              <a href="https://github.com/MSaifUdDin-999/" target="_blank" rel="noreferrer" className="w-10 h-10 bg-white dark:bg-transparent flex items-center justify-center rounded-full border border-white dark:hover:bg-gray-700 hover:border-transparent transition-transform duration-300 ease-in-out transform hover:scale-110">
               <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" className="w-7 h-7 filter dark:invert" alt="GitHub" />
              </a>
            </li>
        </ul>
    </nav>
  )
}

export default Navbar
