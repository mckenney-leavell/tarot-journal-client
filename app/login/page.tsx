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
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">Sign in to your account</h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form action="#" method="POST" className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm/6 font-medium text-gray-100">Username</label>
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
              <label htmlFor="password" className="block text-sm/6 font-medium text-gray-100">Password</label>
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
              className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">Sign in</button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm/6 text-gray-400">
          Don't have an account?
          <Link href="/register" className="font-semibold text-indigo-400 hover:text-indigo-300"> Register</Link>
        </p>
      </div>
    </div>

  )
}

// Login.getLayout = function getLayout(page) {
//   return (
//     <Layout>
//       {/* <Navbar /> */}
//       {page}
//     </Layout>
//   )
// }
