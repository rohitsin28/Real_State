import { FaSearch } from 'react-icons/fa'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Header = () => {
  const { CurrentUser } = useSelector((state) => state.user)
  // const {loading,error} = useSelector((state)=>state.user)
  console.log('///',CurrentUser)

  return (
    <header className='bg-slate-200 shadow-md'>
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to={'/'}>
          <h1 className='font-bold text-sm sm:text-xl flex-wrap'>
            <span className='text-slate-500'>Rohit</span>
            <span className='text-slate-700'>Estate</span>
          </h1>
        </Link>
        <form className="flex items-center bg-slate-100 p-3 rounded-lg">
          <input
            type="text"
            name="search"
            id="search"
            placeholder='Search...'
            className='bg-transparent w-24 sm:w-64 outline-none'
            aria-label="Search"
          />
          <FaSearch className='text-slate-600' />
        </form>
        <ul className='flex gap-3 text-center font-semibold capitalize'>
          <Link to={'/'}><li className='hidden sm:inline hover:underline'>Home</li></Link>
          <Link to={'/about'}><li className='hidden sm:inline hover:underline'>About</li></Link>
          <Link to={'/profile'}>
            {CurrentUser ?
              <img src={CurrentUser.avatar} alt="profileImg" className='w-8 h-8 object-cover rounded-full'/>
              :
              <li className='hover:underline'>Sign in</li>
            }
          </Link>
        </ul>
      </div>
    </header>
  );
}

export default Header;
