'use client';
import React, { useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

import { setAuth, setAuthUser } from '@/lib/features/authSlice';
import { useAppDispatch } from '@/lib/hooks';

const AuthHelper = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    init();
  }, []);

  function init() {
    const token = localStorage.getItem('token');
    if (!token) {
      return;
    }

    let decodedToken: Record<string, string | number | null> = {},
      role: string = '';

    decodedToken = jwtDecode(token);
    role = String(
      decodedToken[
        'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
      ]
    );

    // setting global state
    dispatch(setAuth(true));
    dispatch(
      setAuthUser({
        ...decodedToken,
        role: role,
        name: '',
        email: ''
      })
    );
  }

  return <></>;
};

export default AuthHelper;
