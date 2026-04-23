'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useRef } from 'react'
import { Input } from '../../components/form-elements'
// import Layout from '../layout'
import Navbar from '../../components/navbar'
import { useAppContext } from '../../context/AuthProvider'
import { login } from '../../data/auth'
import Image from 'next/image'

export default function Login() {
  const {setToken} = useAppContext()
  const username = useRef('')
  const password = useRef('')
  const router = useRouter()

  const submit = (e) => {
    e.preventDefault()
    const user = {
      username: username.current.value,
      password: password.current.value,
    }

    login(user).then((res) => {
      if (res?.token) {
        setToken(res.token)
        router.push('/')      
      }
    })
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-(--clr-surface-tonal-a10)">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center py-25 px-16">
      <form className="space-y-4 bg-(--clr-surface-tonal-a20) shadow-lg rounded-lg px-20 py-15 text-(--clr-light-a0) border border-(--clr-surface-tonal-a30)">

        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="text-center text-3xl/9 font-semibold tracking-tight text-white">Sign in to your account</h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm space-y-6">
            <div>
              <label htmlFor="username" className="block text-(--clr-light-a0)">Username</label>
              <div className="mt-2">
                <Input 
                  id="email" 
                  type="text" 
                  name="email" 
                  refEl={username}
                  required
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-(--clr-light-a0)">Password</label>
              </div>
              <div className="mt-2">
                <Input 
                  id="password" 
                  type="password" 
                  name="password" 
                  refEl={password}
                  required 
                />
              </div>
            </div>

            <div>
              <button 
                type="submit" 
                onClick={submit}
                className="flex w-full justify-center rounded-md bg-(--clr-primary-a10) hover:bg-(--clr-primary-a40) text-(--clr-surface-a0) hover:text-(--clr-surface-tonal-a10) px-3 py-1.5 font-semibold">Sign in</button>
            </div>

          <p className="mt-10 text-center text-(--clr-light-a0)">
            Don't have an account?
            <Link href="/register" className="font-semibold text-(--clr-primary-a10) hover:text-(--clr-primary-a40)"> Register</Link>
          </p>
        </div>
      </form>
      </main>
    </div>

  )
}
