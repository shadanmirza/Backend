import {useState} from 'react'
import { Link } from 'react-router'
import logo from '../../../assets/logo.png'
import loginPic from '../../../assets/loginPic.webp'
import axios from 'axios'

const Login = () => {

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  function handleSubmit(e){
    e.preventDefault()

    axios.post("http://localhost:3000/api/auth/login",{
      username,
      password
    },{
      withCredentials: true
    })
    .then(res => {
      console.log(res.data)
    })
  }

  return (
    <div>
       <div className="grid grid-cols-20 min-h-screen">
        <div className="col-span-11 bg-black/95">
            <div className="p-8">
              <img src={logo} alt="Instagram" className="w-12" />
            </div>
            <div className="px-14">
              <h1 className="text-4xl font-semibold text-white">
                See everyday moments from your{' '}
                <span className="bg-linear-to-r m-42 from-orange-400 to-pink-500 bg-clip-text text-transparent">
                  close friends.
                </span>
              </h1>
              <img src={loginPic} alt="Friends sharing everyday moments" className="mt-4 ml-20 w-90" />
            </div>
        </div>

        <div className="col-span-9 flex items-center justify-center border-l border-[#3a3a3a] bg-[#1f1f20] px-8 text-white">
          <div className="w-full max-w-110 mt-4">
            <h2 className="mb-5 font-semibold">Log into Instagram</h2>

            <form className="space-y-3" onSubmit={handleSubmit}>
              <input
                type="text"
                onInput={(e)=>{ setUsername(e.target.value) }}
                autoComplete="username"
                placeholder="Mobile number, username or email"
                aria-label="Mobile number, username or email"
                className="h-12 w-full rounded-[18px] border border-[#555] bg-transparent px-5 text-sm outline-none placeholder:text-[#aaa] focus:border-[#888]"
              />
              <input
                type="password"
                onInput={ (e)=>{ setPassword(e.target.value) } }
                autoComplete="current-password"
                placeholder="Password"
                aria-label="Password"
                className="h-12 w-full rounded-[18px] border border-[#555] bg-transparent px-5 text-sm outline-none placeholder:text-[#aaa] focus:border-[#888]"
              />
              <button type="submit" className="h-8 w-full rounded-full bg-[#0866c2] text-sm font-semibold text-white hover:bg-[#1877d2]">
                Log in
              </button>
            </form>

            <a href="#forgot-password" className="mt-4 block text-center text-sm font-semibold hover:text-gray-300">
              Forgot password?
            </a>

            <div className="mt-10 space-y-4">
              <button type="button" className="h-10 w-full rounded-full bg-[#2a2a2a] text-sm hover:bg-[#333]">
                <span className="mr-2 text-[#1685f8]">●</span>Log in with Facebook
              </button>
              <Link to="/register" className="flex h-10 w-full items-center justify-center rounded-full border border-[#1685f8] font-semibold text-[#1685f8] hover:bg-[#1685f8]/10">
                Create new account
              </Link>
            </div>

            <div className="mt-4 flex items-center justify-center gap-1 text-lg text-[#d5d5d5]" aria-label="Meta">
              <span className="text-2xl font-semibold">∞</span> Meta
            </div>
          </div>
        </div>
       </div>
    </div>
  )
}

export default Login
