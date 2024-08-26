import { useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom';

const Search = () => {
const navigate = useNavigate();
const [sideBarData,setSideBarData] = useState({
    searchTerm: '',
    type: 'all',
    parking: false,
    furnished: false,
    offer: false,
    sort: 'created_at',
    order: 'desc'
  })
  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    const typeFromUrl = urlParams.get('type');
    const parkingFromUrl = urlParams.get('parking');
    const furnishedFromUrl = urlParams.get('furnished');
    const offerFromUrl = urlParams.get('offer');
    const sortFromUrl = urlParams.get('sort');
    const orderFromUrl = urlParams.get('order');
    
    if (
      searchTermFromUrl ||
      typeFromUrl ||
      parkingFromUrl ||
      furnishedFromUrl ||
      offerFromUrl ||
      sortFromUrl ||
      orderFromUrl
    ) {
      setSideBarData({
        searchTerm: searchTermFromUrl || '',
        type: typeFromUrl || 'all',
        parking: parkingFromUrl === 'true' ? true : false,
        furnished: furnishedFromUrl === 'true' ? true : false,
        offer: offerFromUrl === 'true' ? true : false,
        sort: sortFromUrl || 'created_at',
        order: orderFromUrl || 'desc',
      });
    }
    const fetchListings = async () => {
      setLoading(true);
      setShowMore(false);
      const searchQuery = urlParams.toString();
      const res = await fetch(`/api/listing/get?${searchQuery}`);
      const data = await res.json();
      console.log(data)
      if (data.length > 8) {
        setShowMore(true);
      } else {
        setShowMore(false);
      }
      setListings(data);
      setLoading(false);
    };

    fetchListings();
  },[location.search])


  const handleChange = (e) => {
    if(e.target.id === 'all' || e.target.id === 'rent' || e.target.id === 'sale'){
      setSideBarData({...sideBarData,type: e.target.id})
    }

    if(e.target.id === 'searchTerm'){
      setSideBarData({...sideBarData,searchTerm: e.target.value})
    }

    if(e.target.id === 'parking' || e.target.id === 'furnished' || e.target.id === 'offer'){
      setSideBarData({...sideBarData,[e.target.id]: e.target.checked || e.target.checked === 'true' ? true : false});
    }

    if(e.target.id === 'sort_order'){
      const sort = e.target.value.split('_')[0] || 'created_at';
      const order = e.target.value.split('_')[1] || 'desc';
      setSideBarData({...setSideBarData,sort,order});
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set('searchTerm', sideBarData.searchTerm);
    urlParams.set('type',sideBarData.type)
    urlParams.set('parking', sideBarData.parking)
    urlParams.set('furnished', sideBarData.furnished)
    urlParams.set('offer', sideBarData.offer)
    urlParams.set('sort', sideBarData.sort)
    urlParams.set('order',sideBarData.order)
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`)
  }
  return (
    <div className="flex flex-col md:flex-row">
      <div className="p-7 border-b-2 md:border-r-2 md:min-h-screen">
        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          <div className="flex items-center gap-2">
            <label className="whitespace-nowrap">Search term: </label>
            <input
              type="text"
              id="searchTerm"
              placeholder="Search..."
              className="p-3 w-full rounded-lg"
              value={sideBarData.searchTerm}
              onChange={handleChange}
            />
          </div>
          <div className="flex gap-2 items-center flex-wrap">
            <label>Type: </label>
            <div className="flex gap-2">
                <input type="checkbox" id="all" className="w-5" onChange={handleChange} checked={sideBarData.type === 'all'}/>
                <span>Rent & sale</span>
            </div>
            <div className="flex gap-2">
                <input type="checkbox" id="rent" className="w-5"
                onChange={handleChange}
                value={sideBarData.type === 'rent'}/>
                <span>Rent</span>
            </div>
            <div className="flex gap-2">
                <input type="checkbox" id="sale" className="w-5"
                onChange={handleChange}
                value={sideBarData.type === 'sale'}/>
                <span>sale</span>
            </div>
            <div className="flex gap-2">
                <input type="checkbox" id="offer" className="w-5"
                onChange={handleChange}
                value={sideBarData.offer}/>
                <span>offer</span>
            </div>
          </div>
          <div className="flex gap-2 items-center flex-wrap">
            <label>Amenities: </label>
            <div className="flex gap-2">
                <input type="checkbox" id="parking" className="w-5"
                onChange={handleChange}
                value={sideBarData.parking}/>
                <span>Parking</span>
            </div>
            <div className="flex gap-2">
                <input type="checkbox" id="furnished" className="w-5"
                onChange={handleChange}
                value={sideBarData.furnished}/>
                <span>Furnished</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <label>Sort:</label>
            <select onChange={handleChange} defaultValue={'createdPrice_desc'} id="sort_order" className="p-3 rounded-lg border">
                <option value={'regularPrice_desc'}>Price high to low</option>
                <option value={'regularPrice_asc'}>Price low to high</option>
                <option value={'createdAt_desc'}>Latest</option>
                <option value={'createdAt_asc'}>Oldest</option>
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
