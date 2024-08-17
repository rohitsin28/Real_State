import { useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { app } from '../firebase';
import {updateUserStart,updateUserFailure,updateUserSuccess, deleteUserFailed, deleteUserSuccess, deleteUserStart} from '../redux/user/userSlice.js'
import { useDispatch } from 'react-redux';


const Profile = () => {
  const fileRef = useRef(null);
  const { CurrentUser, loading, error } = useSelector(state => state.user)
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL })
        );
      }
    );

  };

  const handleChange = (e) => {
    setFormData({...formData,[e.target.id]:e.target.value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res =await fetch(`/api/user/update/${CurrentUser._id}`,{
        method:'POST',
        headers:{
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if(data.success === false){
        dispatch(updateUserFailure(error.message));
        return
      }
      dispatch(updateUserSuccess(data))
    } catch (error) {
      dispatch(updateUserFailure(error.message))
    }
  }

  const handleDelete = async() => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${CurrentUser._id}`,{
        method:'DELETE'
      });
      const data = await res.json();
      if(data.success === false ){
        dispatch(deleteUserFailed(error.message))
      }
      dispatch(deleteUserSuccess(data))
    } catch (error) {
      dispatch(deleteUserFailed(data))
    }
  }
  return (
    <div className='p-3 max-w-lg mx-auto my-16'>
      <h1 className='text-3xl font-semibold text-center capitalize mb-5'>profile</h1>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <input onChange={(e) => setFile(e.target.files[0])} type="file" ref={fileRef} hidden accept='image/*' />
        <img src={formData.avatar || CurrentUser.avatar} alt="profileImg" className='rounded-full w-28 h-28 self-center mb-4 cursor-pointer' onClick={() => fileRef.current.click()} />
        <p className='text-sm self-center'>
          {fileUploadError ? (
            <span className='text-red-700'>
              Error Image upload (image must be less than 2 mb)
            </span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className='text-slate-700'>{`Uploading ${filePerc}%`}</span>
          ) : filePerc === 100 ? (
            <span className='text-green-700'>Image successfully uploaded!</span>
          ) : (
            ''
          )}
        </p>
        <input type="text" placeholder='UserName' defaultValue={CurrentUser.username} onChange={handleChange} className='border p-3 rounded-lg' id='username' />
        <input type="email" placeholder='Email' defaultValue={CurrentUser.email} onChange={handleChange} className='border p-3 rounded-lg' id='email' />
        <input type="password" placeholder='Password' className='border p-3 rounded-lg' id='password' onChange={handleChange} />
        <button disabled={loading} className='bg-slate-700 p-3 rounded-lg hover:opacity-80 uppercase font-semibold disabled:opacity-80 text-white'>{loading ? 'Loading...' : 'Update'}</button>
      </form>
      <div className="flex justify-between p-3 text-red-600 font-semibold">
        <h1 className='hover:underline cursor-pointer' onClick={handleDelete}>Delete Account</h1>
        <h1 className='hover:underline cursor-pointer'>Sign out</h1>
      </div>
    </div>
  )
}

export default Profile
