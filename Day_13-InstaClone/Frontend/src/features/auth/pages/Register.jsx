import { useState } from 'react'
import { Link } from 'react-router'
import axios from 'axios'

const inputClass = 'h-[55px] w-full rounded-[20px] border border-[#505050] bg-transparent px-5 text-base text-white outline-none placeholder:text-[#a0a0a0] focus:border-[#888]'
const labelClass = 'mb-2 block font-semibold text-[#f5f5f5]'

const Register = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [username, setUsername] = useState("")

    async function handleSubmit(e) {
      e.preventDefault()

      axios.post("http://localhost:3000/api/auth/register",{
        username,
        email,
        password
      }, {
        withCredentials: true
      })
      .then(res => {
        console.log(res.data)
      })
    }

  return (
    <main className="min-h-screen bg-[#1f1f1f] -mt-5 px-5 py-12 text-white sm:py-16">
      <section className="mx-auto w-full max-w-125">

        {/* back to login */}
        <Link to="/login" aria-label="Back to login" className="mb-1 inline-flex text-2xl leading-none text-[#bdbdbd] hover:text-white">
          ‹
        </Link>

        {/* meta logo */}
        <div className="mb-4 flex items-center gap-1 text-[#e5e5e5]" aria-label="Meta">
          <span className="text-2xl font-semibold">∞</span> Meta
        </div>

        <h1 className="mb-1 text-xl font-bold leading-tight">Get started on Instagram with a Meta Account</h1>
        <p className="mb-5 text-sm leading-6 text-[#e5e5e5]">
          A Meta Account lets you access multiple Meta technologies, like Instagram, easily and securely.
        </p>

        {/* register form */}
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="contact" className={labelClass}>Mobile number or email</label>
            <input 
            onInput={(e)=>{setEmail(e.target.value)}}
            id="contact" type="text" autoComplete="email" placeholder="Mobile number or email" className={inputClass} />
            <p className="mt-3 text-sm leading-6 text-[#e5e5e5]">
              You may receive notifications from us. <a href="#contact-info" className="font-semibold text-[#59aaff] hover:underline">Learn why we ask for your contact information</a>
            </p>
          </div>

          <div>
            <label htmlFor="password" className={labelClass}>Password</label>
            <input
            onInput={(e)=>{setPassword(e.target.value)}}
            id="password" type="password" autoComplete="new-password" placeholder="Password" className={inputClass} />
          </div>

          <div>
            <label htmlFor="username" className={labelClass}>Username</label>
            <input
            onInput={(e)=>{setUsername(e.target.value)}}
            id="username" type="text" autoComplete="username" placeholder="Username" className={inputClass} />
          </div>

          {/* <div>
            <label htmlFor="full-name" className={labelClass}>Bio</label>
            <input id="bio" type="text" autoComplete="bio" placeholder="Bio" className={inputClass} />
          </div> */}

          <p className="text-sm leading-5 text-[#bdbdbd]">
            People who use our service may have uploaded your contact information to Instagram. <a href="#learn-more" className="text-[#59aaff] hover:underline">Learn more</a>.
          </p>
          <p className="text-sm leading-5 text-[#bdbdbd]">
            By signing up, you agree to our <a href="#terms" className="text-[#59aaff] hover:underline">Terms</a>, <a href="#privacy" className="text-[#59aaff] hover:underline">Privacy Policy</a> and <a href="#cookies" className="text-[#59aaff] hover:underline">Cookies Policy</a>.
          </p>
          <button type="submit" className="h-12 w-full rounded-full bg-[#0866c2] font-semibold hover:bg-[#1877d2]">Sign up</button>
        </form>

        <div className="mt-6 rounded border border-[#444] p-5 text-center text-[#e5e5e5]">
          Have an account? <Link to="/login" className="font-semibold text-[#59aaff] hover:underline">Log in</Link>
        </div>
      </section>
    </main>
  )
}

export default Register
