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
    <div className="flex min-h-full justify-center px-6 py-12 lg:px-8 dark:bg-gray-950">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center m-20 bg-white dark:bg-gray-950">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">Register</h2>
      </div>

    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form action="#" method="POST" className="space-y-6">
        <div>
          <label htmlFor="first-name" className="block text-sm/6 font-medium text-gray-100">First Name</label>
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
          <label htmlFor="last-name" className="block text-sm/6 font-medium text-gray-100">Last Name</label>
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
          <label htmlFor="email" className="block text-sm/6 font-medium text-gray-100">Email</label>
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
          <label htmlFor="username" className="block text-sm/6 font-medium text-gray-100">Username</label>
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
            <label htmlFor="password" className="block text-sm/6 font-medium text-gray-100">Password</label>
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
            className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
          >
            Register
          </button>
        </div>
      </form>

      <p className="mt-10 text-center text-sm/6 text-gray-400">
        Already have an account?
        <Link href="/login" className="font-semibold text-indigo-400 hover:text-indigo-300"> Login</Link>
      </p>
    </div>
    </main>
  </div>

  )
}

Register.getLayout = function getLayout(page) {
  return (
    <Layout>
      <Navbar />
      {page}
    </Layout>
  )
}
