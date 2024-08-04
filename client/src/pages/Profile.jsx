import { useSelector } from 'react-redux';
import { useState } from 'react';

const Profile = () => {
  const { CurrentUser } = useSelector(state => state.user)
  const [loading, setLoading] = useState(false);

  return (
    <div className='p-3 max-w-lg mx-auto my-16'>
      <h1 className='text-3xl font-semibold text-center capitalize mb-5'>profile</h1>
      <form className='flex flex-col gap-4'>
        <img src={CurrentUser.avatar} alt="profileImg" className='rounded-full w-28 h-28 self-center mb-4'/>
        <input type="text" placeholder='UserName' className='border p-3 rounded-lg' id='username'/>
        <input type="email" placeholder='Email' className='border p-3 rounded-lg' id='email'/>
        <input type="password" placeholder='Password' className='border p-3 rounded-lg' id='password'  />
        <button disabled={loading} className='bg-slate-700 p-3 rounded-lg hover:opacity-80 uppercase font-semibold disabled:opacity-80 text-white'>{loading ? 'Loading...' : 'Update'}</button>
      </form>
      <div className="flex justify-between p-3 text-red-600 font-semibold">
        <h1 className='hover:underline'>Delete Account</h1>
        <h1 className='hover:underline'>Sign out</h1>
      </div>
    </div>
  )
}

export default Profile
