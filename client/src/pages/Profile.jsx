import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import {
  updateUserStart,
  updateUserFailure,
  updateUserSuccess,
  deleteUserFailed,
  deleteUserSuccess,
  deleteUserStart,
  signOutUserFailed,
  signOutUserStart,
  signOutUserSuccess,
} from "../redux/user/userSlice.js";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const Profile = () => {
  const fileRef = useRef(null);
  const { CurrentUser, loading, error } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [showListingError, setShowListingError] = useState(false);
  const [userListings, setuserListings] = useState([]);
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
      "state_changed",
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
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${CurrentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }
      dispatch(updateUserSuccess(data));
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  const handleDelete = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${CurrentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailed(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailed(data.message));
    }
  };

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch("/api/user/signout");
      const data = res.json();
      if (data.success === false) {
        dispatch(signOutUserFailed(data.message));
        return;
      }
      dispatch(signOutUserSuccess(data));
    } catch (error) {
      dispatch(signOutUserFailed(data));
    }
  };

  const handleChangeListing = async (e) => {
    try {
      const res = await fetch(`/api/user/listings/${CurrentUser._id}`);
      const data = await res.json();
      if (data.success === false) {
        setFileUploadError(true);
        return;
      }
      setuserListings(data);
    } catch (error) {
      setShowListingError(true);
    }
  };
  return (
    <div className="p-3 max-w-lg mx-auto my-16">
      <h1 className="text-3xl font-semibold text-center capitalize mb-5">
        profile
      </h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
        />
        <img
          src={formData.avatar || CurrentUser.avatar}
          alt="profileImg"
          className="rounded-full w-28 h-28 self-center mb-4 cursor-pointer"
          onClick={() => fileRef.current.click()}
        />
        <p className="text-sm self-center">
          {fileUploadError ? (
            <span className="text-red-700">
              Error Image upload (image must be less than 2 mb)
            </span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className="text-slate-700">{`Uploading ${filePerc}%`}</span>
          ) : filePerc === 100 ? (
            <span className="text-green-700">Image successfully uploaded!</span>
          ) : (
            ""
          )}
        </p>
        <input
          type="text"
          placeholder="UserName"
          defaultValue={CurrentUser.username}
          onChange={handleChange}
          className="border p-3 rounded-lg"
          id="username"
        />
        <input
          type="email"
          placeholder="Email"
          defaultValue={CurrentUser.email}
          onChange={handleChange}
          className="border p-3 rounded-lg"
          id="email"
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-3 rounded-lg"
          id="password"
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className="bg-slate-700 p-3 rounded-lg hover:opacity-80 uppercase font-semibold disabled:opacity-80 text-white"
        >
          {loading ? "Loading..." : "Update"}
        </button>
        <Link
          to={"/create-listing"}
          disabled={loading}
          className="text-center bg-green-700 p-3 rounded-lg hover:opacity-80 uppercase font-semibold disabled:opacity-80 text-white"
        >
          {loading ? "Loading..." : "create listing page"}
        </Link>
      </form>
      <div className="flex justify-between p-3 text-red-600 font-semibold">
        <h1 className="hover:underline cursor-pointer" onClick={handleDelete}>
          Delete Account
        </h1>
        <h1 className="hover:underline cursor-pointer" onClick={handleSignOut}>
          Sign out
        </h1>
      </div>
      <button
        onClick={handleChangeListing}
        className="w-full font-semibold text-green-600"
      >
        Show Listing
      </button>
      <p className="text-red-700 mt-5">
        {showListingError ? "Error Showing Listing" : ""}
      </p>

      {userListings &&
        userListings.length > 0 &&
        <div className="flex flex-col gap-4">
          <h1 className="text-center mt-7 text-2xl font-semibold">Your Listing</h1>
        {userListings.map((listing) => (
          <div key={listing._id} className="border rounded-lg p-3 flex justify-between items-center gap-4">
            <Link to={`/listing/${listing._id}`}>
              <img
                src={listing.imageUrls[0]}
                alt="listing image"
                className="h-16 w-16 object-contain"
              />
            </Link>
            <Link to={`/listing/${listing._id}`} className="flex-1">
              <p className="text-slate-700 font-semibold hover:underline truncate">{listing.name}</p>
            </Link>
            <div className="flex flex-col items-center">
              <button className="text-red-700">Delete</button>
              <button className="text-green-700">Edit</button>
            </div>
          </div>
        ))}
        </div>}
    </div>
  );
};

export default Profile;
