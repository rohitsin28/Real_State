const Search = () => {
  return (
    <div className="flex flex-col md:flex-row">
      <div className="p-7 border-b-2 md:border-r-2 md:min-h-screen">
        <form className="flex flex-col gap-8">
          <div className="flex items-center gap-2">
            <label className="whitespace-nowrap">Search term: </label>
            <input
              type="text"
              id="searchTerm"
              placeholder="Search..."
              className="p-3 w-full rounded-lg"
            />
          </div>
          <div className="flex gap-2 items-center flex-wrap">
            <label>Type: </label>
            <div className="flex gap-2">
                <input type="checkbox" id="all" className="w-5"/>
                <span>Rent & sale</span>
            </div>
            <div className="flex gap-2">
                <input type="checkbox" id="rent" className="w-5"/>
                <span>Rent</span>
            </div>
            <div className="flex gap-2">
                <input type="checkbox" id="sale" className="w-5"/>
                <span>sale</span>
            </div>
            <div className="flex gap-2">
                <input type="checkbox" id="offer" className="w-5"/>
                <span>offer</span>
            </div>
          </div>
          <div className="flex gap-2 items-center flex-wrap">
            <label>Amenities: </label>
            <div className="flex gap-2">
                <input type="checkbox" id="parking" className="w-5"/>
                <span>Parking</span>
            </div>
            <div className="flex gap-2">
                <input type="checkbox" id="furnished" className="w-5"/>
                <span>Furnished</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <label>Sort:</label>
            <select id="sort_order" className="p-3 rounded-lg border">
                <option>Price high to low</option>
                <option>Price low to high</option>
                <option>Latest</option>
                <option>Oldest</option>
            </select>
          </div>
          <button className="bg-slate-700 p-3 uppercase text-white font-semibold rounded-lg hover:opacity-90">Search</button>
        </form>
      </div>
      <div className="">
        <h1 className="text-3xl font-semibold border mt-5">Listing results:</h1>
      </div>
    </div>
  );
};

export default Search;
