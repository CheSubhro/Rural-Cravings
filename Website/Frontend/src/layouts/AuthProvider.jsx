
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUser } from '../store/authSlice';
import { Box } from '@mantine/core';
import Spinner from '../components/common/Spinner'; 

const AuthProvider = ({ children }) => {
    const dispatch = useDispatch();
    const { isInitialLoading } = useSelector((state) => state.auth);
    const hasFetched = useRef(false); 

    useEffect(() => {
        if (!hasFetched.current) {
            dispatch(getCurrentUser());
            hasFetched.current = true;
        }
    }, [dispatch]);

    if (isInitialLoading) {
        return (
            <Box style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Spinner size="xl" label="Restoring session..." />
            </Box>
        );
    }

    return <>{children}</>;
};

export default AuthProvider;