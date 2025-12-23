'use client'

import { createContext, useContext, useEffect, useState } from 'react';
import { getUserProfile } from '../data/auth';
import { useRouter } from "next/navigation"

const AppContext = createContext();

export function AuthProvider({ children }) {
  const [profile, setProfile] = useState({})
  const [token, setToken] = useState("")
  const router = useRouter()

  useEffect(() => {
    setToken(localStorage.getItem('token'))
  }, [])

  useEffect(() => {
    const authRoutes = ['/login', '/register']
    if (token) {
      localStorage.setItem('token', token)
      if (!authRoutes.includes(router.pathname)) {
        getUserProfile().then((profileData: object) => {
          if (profileData) {
            setProfile(profileData)
          }
        })
      }
    }
  }, [token, router.pathname])

  return (
    <AppContext.Provider value={{ profile, token, setToken, setProfile }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
