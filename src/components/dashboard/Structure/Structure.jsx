import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../parts/Header'
import { useData } from '../../context/DataContext';
import { useUserAuth } from '../../context/UserAuthContext';
import { Toaster } from 'react-hot-toast';

function Structure() {
    const { user, logOut } = useUserAuth();
    const { getWebTemplates, getCodeTemplates, getWebTrashes, getWebSpaces, getCodeTrashes, NewUserCloud, isFetching, getSpaces, isDropdownOpen, setIsDropdownOpen, open, setOpen } = useData();

    useEffect(() => {
        if (!isFetching) {
            getSpaces(user.uid);
        }
    }, [user]);

    useEffect(() => {
        if (!isFetching) {
            getWebSpaces(user.uid);
        }
    }, [user]);

    useEffect(() => {
        if (!isFetching) {
            getCodeTrashes(user.uid);
        }
    }, [user]);

    useEffect(() => {
        if (!isFetching) {
            getWebTrashes(user.uid);
        }
    }, [user]);

    useEffect(() => {
        NewUserCloud(user);
        getCodeTemplates();
        getWebTemplates();
    }, [user]);

    return (
        <div className="min-h-screen flex flex-col items-center">
            <Header setOpen={setOpen} open={open} setIsDropdownOpen={setIsDropdownOpen} isDropdownOpen={isDropdownOpen} logOut={logOut} />
            <div className="w-full">
                <Outlet />
            </div>
            <Toaster />
        </div>
    )
}

export default Structure