'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useRef } from 'react'
import { Input } from '../../components/form-elements'
import Layout from '../layout'
import Navbar from '../../components/navbar'
import { useAppContext } from '../../context/AuthProvider'
import { register } from '../../data/auth'

export default function Register() {
  const {setToken} = useAppContext()

  const firstName = useRef('')
  const lastName = useRef('')
  const username = useRef('')
  const password = useRef('')
  const email = useRef('')
  const router = useRouter()

  const submit = (e: Event) => {
    e.preventDefault()

    const user = {
      username: username.current.value,
      password: password.current.value,
      first_name: firstName.current.value,
      last_name: lastName.current.value,
      email: email.current.value,
    }

    register(user).then((res) => {
      if (res?.token) {
        setToken(res.token)
        router.push('/')
      }
    })
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-(--clr-surface-tonal-a10)">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center py-25 px-16">
      <form className="space-y-4 bg-(--clr-surface-tonal-a20) shadow-lg rounded-lg px-15 py-15 text-(--clr-light-a0) border border-(--clr-surface-tonal-a30)">

        <div className="sm:mx-auto sm:w-100">
          <h2 className="text-center text-3xl/9 font-semibold tracking-tight text-white">Register</h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm space-y-6">
            <div>
              <label htmlFor="first-name" className="block text-(--clr-light-a0)">First Name</label>
              <div className="mt-2">
                <Input 
                  refEl={firstName} 
                  id="firstName" 
                  type="first-name" 
                  name="first-name" 
                  required 
                  autocomplete="first-name" 
                />
              </div>
            </div>

          <div>
            <label htmlFor="last-name" className="block text-(--clr-light-a0)">Last Name</label>
            <div className="mt-2">
              <Input 
                refEl={lastName} 
                id="lastName" 
                type="last-name" 
                name="last-name" 
                required 
                autocomplete="last-name" 
              />
            </div>
          </div>    

          <div>
            <label htmlFor="email" className="block text-(--clr-light-a0)">Email</label>
            <div className="mt-2">
              <Input
                  refEl={email}
                  id="email"
                  type="email" 
                  name="email" 
                  required 
                  autocomplete="email"
                />
            </div>
          </div>     

          <div>
            <label htmlFor="username" className="block text-(--clr-light-a0)">Username</label>
            <div className="mt-2">
              <Input
                  refEl={username}
                  id="username"
                  type="username" 
                  name="username" 
                  required 
                  autocomplete="username"
                />
            </div>
          </div>         

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-(--clr-light-a0)">Password</label>
            </div>
            <div className="mt-2">
              <Input 
                refEl={password}
                id="password" 
                type="password" 
                name="password" 
                required 
                autocomplete="password" 
              />
            </div>
          </div>

          <div>
            <button 
              type="submit" 
              onClick={submit}
              className="flex w-full justify-center rounded-md bg-(--clr-primary-a10) hover:bg-(--clr-primary-a40) text-(--clr-surface-a0) hover:text-(--clr-surface-tonal-a10) px-3 py-1.5 font-semibold"
            >
              Register
            </button>
          </div>

        <p className="mt-10 text-center text-(--clr-light-a0)">
          Already have an account?
          <Link href="/login" className="font-semibold text-(--clr-primary-a10) hover:text-(--clr-primary-a40)"> Login</Link>
        </p>
      </div>
    </form>
    </main>
  </div>

  )
}