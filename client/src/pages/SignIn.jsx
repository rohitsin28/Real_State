import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
const SignIn = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setLoading(true)
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json(res)
      if (data.success === false) {
        setError(data.message);
        setLoading(false);
        return
      }
      setLoading(false);
      setError(null);
      navigate('/')
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <div className='max-w-lg mx-auto p-3'>
      <h1 className='text-3xl text-center font-semibold my-7'>SignIn</h1>
      {error && <p className='text-red-600 text-center p-3 bg-green-500 rounded-lg my-3 font-semibold'>{error}</p>}
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input type="email" placeholder='Email' className='border p-3 rounded-lg' id='email' onChange={handleChange} />
        <input type="password" placeholder='Password' className='border p-3 rounded-lg' id='password' onChange={handleChange} />
        <button disabled={loading} className='bg-slate-700 p-3 rounded-lg hover:opacity-80 uppercase font-semibold disabled:opacity-80 text-white'>{loading ? 'Loading...' : 'sign in'}</button>
      </form>
      <div className="flex gap-2 py-5">
        <p>Dont Have an account?</p>
        <Link to={'/sign-up'}>
          <span className='text-blue-700'>SignUp</span>
        </Link>
      </div>
    </div>
  )
}

export default SignIn
