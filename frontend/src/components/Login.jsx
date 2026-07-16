import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export const Login = () => {
  const [isLoginMode, setisLoginMode] = useState(true);
  const navigate = useNavigate();

  const onSaveAuth = (e) => {
    e.preventDefault();
    navigate('/task');
  }

  return (
    <div className='grid w-[100% h-screen place-items-center bg-pink-400]'>

      <div className='mx-auto w-[430px] mt-10 bg-white p-8 rounded-2xl shadow-lg'>

        {/* header title*/}
        <div className='flex-justify-center mb-4'>
          <h2 className='text-3xl font-semibold text-center'>{isLoginMode ? "Logging" : "Sign Up"}</h2>
        </div>

        {/* Tab controls*/}
        <div className='relative flex h-12 mb-6 border border-pink-300 rounded-full overflow-hidden'>
          <button onClick={() => setisLoginMode(true)} className={`w-1/2 text-lg font-medium transition-all z-10 ${isLoginMode ? "text-white" :
            "text-pink-500"}`}>
            Login
          </button>

          <button onClick={() => setisLoginMode(false)} className={`w-1/2 text-lg font-medium transition-all z-10 ${!isLoginMode ? "text-white" : "bg-white text-pink-500"}`}>
            Sign up
          </button>

          <div className={`absolute top-0 h-full w-1/2 rounded-full bg-gradient-to-r from-pink-500 via-rose-400 to-pink-300 ${isLoginMode ? "left-0" : "left-1/2"}`}></div>
        </div>

        {/* Form section*/}
        <form className='space-y-4'>
          {!isLoginMode && (
            <input type="text" placeholder="Name" required className='w-full p-3 border-b-2 border-pink-300 outline-none focus:border-pink-500 placeholder-gray-400' />
          )}

          <input type="email" placeholder="Email" required className='w-full p-3 border-b-2 border-pink-300 outline-none focus:border-pink-500 placeholder-gray-400' />
          <input type="password" placeholder="Password" required className='w-full p-3 border-b-2 border-pink-300 outline-none focus:border-pink-500 placeholder-gray-400' />

          {!isLoginMode && (
            <input type="password" placeholder="Confirm Password" required className='w-full p-3 border-b-2 border-pink-300 outline-none focus:border-pink-500 placeholder-gray-400' />
          )}

          {!isLoginMode && (
            <div className='text-right'>
              <p className='text-pink-600 hover:underline'>Forget password</p>
            </div>
          )}

          <button
            type="button"
            className='w-full p-3 bg-gradient-to-r from-pink-500 via-rose-400 to-pink-300 text-white rounded-full text-lg font-medium hover:opacity-90 transition'
            onClick={onSaveAuth}
          >
            {isLoginMode ? "Login" : "Sign Up"}
          </button>

          <p className='text-center text-gray-600'> {isLoginMode ? "Don't have an account?" : "Already have an account?"}
            <a href="#" onClick={(e) => setisLoginMode(!isLoginMode)} className='text-pink-500 hover:underline'>
              {isLoginMode ? "Signup now" : "Login"}
            </a>
          </p>
        </form>

      </div>
    </div>
  )
}
