import React from 'react'

const CreateListing = () => {
    return (
        <main className='p-3 max-w-4xl mx-auto'>
            <h1 className='text-3xl font -semibold text-center my-7'>Create a listing Page</h1>
            <form className='flex flex-col sm:flex-row gap-4'>
                <div className="flex flex-col gap-4 flex-1">
                    <input type="text" placeholder='Name' id='name' className='border p-3 rounded-lg' maxLength='60' minLength='10' required />
                    <textarea type="text" placeholder='Description' id='description' className='border p-3 rounded-lg' required />
                    <input type="text" placeholder='Address' id='address' className='border p-3 rounded-lg' required />
                    <div className="flex flex-wrap gap-4">
                        <div className="flex gap-2">
                            <input type="checkbox" name="sale" id="sale" className='w-5' />
                            <span>Spell</span>
                        </div>
                        <div className="flex gap-2">
                            <input type="checkbox" name="Rent" id="Rent" className='w-5' />
                            <span>Rent</span>
                        </div>
                        <div className="flex gap-2">
                            <input type="checkbox" name="parkingSpot" id="parkingSpot" className='w-5' />
                            <span>Parking Spot</span>
                        </div>
                        <div className="flex gap-2">
                            <input type="checkbox" name="furnished" id="furnished" className='w-5' />
                            <span>Furnished</span>
                        </div>
                        <div className="flex gap-2">
                            <input type="checkbox" name="offer" id="offer" className='w-5' />
                            <span>Offer</span>
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-4">
                        <div className="flex items-center gap-4">
                            <input type="number" id="bedrooms" min='1' max='10' required className='p-3 border boder-gray-300 rounded-lg text-center' defaultValue={1} />
                            <p>Beds</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <input type="number" id="bathrooms" min='1' max='10' required className='p-3 border boder-gray-300 rounded-lg text-center' defaultValue={1} />
                            <p>Baths</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <input type="number" id="regularprice" min='1' max='10' required className='p-3 border boder-gray-300 rounded-lg text-center' defaultValue={0} />
                            <div className="flex flex-col items-center">
                                <p>Regular Price</p>
                                <span className='text-xs'>($ / month)</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <input type="number" id="discountedPrice" min='1' max='10' required className='p-3 border boder-gray-300 rounded-lg text-center' defaultValue={0} />
                            <div className="flex flex-col items-center">
                                <p>Discounted Price</p>
                                <span className='text-xs'>($ / month)</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col flex-1 gap-4">
                    <p className='font-semibold'>Images:
                        <span className='font-normal text-gray-600 ml-2'>The first image will be the cover (max 6)</span>
                    </p>
                    <div className="flex gap-4">
                    <input type="file" id="images" accept='image/*' multiple className='p-3 border border-gray-300 rounded w-full'/>
                    <button className='p-3 border border-green-700 text-green-700 uppercase rounded-lg hover:shadow-lg disabled:opacity-80'> upload</button>
                    </div>
                <button className='uppercase border bg-slate-700 text-center p-3 text-white rounded-lg hover:opacity-95 disabled:opacity-80'>create listing</button>
                </div>
            </form>
        </main>
    )
}

export default CreateListing
