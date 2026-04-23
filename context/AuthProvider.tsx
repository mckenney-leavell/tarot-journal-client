'use client'

import { createContext, useContext, useEffect, useState } from 'react';
import { getUserProfile } from '../data/auth';
import { usePathname, useRouter } from "next/navigation"

const AppContext = createContext();

export function AuthProvider({ children }) {
  const [profile, setProfile] = useState({})
  const [token, setToken] = useState("")
  const pathname = usePathname()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setToken(localStorage.getItem('token'))
    }
  }, [])

  useEffect(() => {
    const authRoutes = ['/login', '/register']
    if (token && typeof window !== 'undefined') {
      localStorage.setItem('token', token)
      // if (!authRoutes.includes(pathname)) {
      //   getUserProfile().then((profileData: object) => {
      //     if (profileData) {
      //       setProfile(profileData)
      //     }
      //   })
      // }
    }
  }, [token, pathname])

  return (
    <AppContext.Provider value={{ profile, token, setToken }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
