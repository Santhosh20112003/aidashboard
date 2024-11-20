import React from 'react'
import Header from '../parts/Header'
import { useData } from '../../context/DataContext';
import { useUserAuth } from '../../context/UserAuthContext';

function Overview() {
  const {logOut} = useUserAuth();
  const { isDropdownOpen,
    setIsDropdownOpen,
    open,
    setOpen, } = useData();
  return (
    <div className="min-h-screen flex flex-col items-center">
      <Header setOpen={setOpen} open={open} setIsDropdownOpen={setIsDropdownOpen} isDropdownOpen={isDropdownOpen} logOut={logOut} />
    </div>
  )
}

export default Overview