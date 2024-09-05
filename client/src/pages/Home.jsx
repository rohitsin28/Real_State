import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";
import { Navigation } from "swiper/modules";
import SwiperCore from "swiper";
import  ListingItem from './ListingItem'

const Home = () => {
  const [offerListings, setOfferListings] = useState([]);
  const [rentListing, setRentListings] = useState([]);
  const [saleListing, setSaleListings] = useState([]);
  SwiperCore.use([Navigation]);
  console.log("=======", { offerListings });
  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch(`/api/listing/get?offer=true&limit=4`);
        const data = await res.json();
        setOfferListings(data);
        console.log({ data });
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    };
    const fetchRentListings = async () => {
      try {
        const res = await fetch(`/api/listing/get?type=rent&limit=4`);
        const data = await res.json();
        setRentListings(data);
        console.log({ data });
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    };
    const fetchSaleListings = async () => {
      try {
        const res = await fetch(`/api/listing/get?type=sale&limit=4`);
        const data = await res.json();
        setSaleListings(data);
        console.log({ data });
        // fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    };
    fetchOfferListings();
  }, []);
  return (
    <div>
      <div>
        {/* top */}
        <div className="flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto">
          <h1 className="capitalize font-bold text-slate-700 text-3xl lg:text-6xl">
            find your next <span className="text-slate-500">perfect</span>
            <br /> place with ease
          </h1>
          <div className="text-gray-400 text-xs sm:text-sm">
            we provide is the best place to find your next perfect place to
            live. <br />
            we have a wide range of properties for you to choose from
          </div>
          <Link
            to={"/search"}
            className="hover:underline font-bold text-blue-800 sm:text-sm text-sm"
          >
            Let's get started...
          </Link>
        </div>
        {/* swipper */}
        <Swiper navigation>
          {offerListings &&
            offerListings.length > 0 &&
            offerListings.map((listing) => (
              <SwiperSlide>
                <div
                  style={{
                    background: `url(${listing.imageUrls[0]}) center no-repeat`,
                    backgroundSize: "cover",
                  }}
                  className="h-[700px]"
                  key={listing._id}
                ></div>
              </SwiperSlide>
            ))}
        </Swiper>
        {/* listing result for offer sale and rent */}
        <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10">
          {
            offerListings && offerListings.length > 0 && (
              <div className="">
                <div className="my-3">
                  <h2 className="text-2xl font-semibold">Recent offer</h2>
                  <Link to={`/search?offer=true`} className="text-sm text-blue-500 hover:underline font-semibold">Show more offer</Link>
                </div>
                <div className="flex flex-wrap gap-4">
                  {offerListings.map((listing)=>(
                    <ListingItem listing={listing} key={listing._id}/>
                  ))}
                </div>
              </div>
            )
          }
          {
            rentListing && rentListing.length > 0 && (
              <div className="">
                <div className="my-3">
                  <h2 className="text-2xl font-semibold">Recent places for rent</h2>
                  <Link to={`/search?type=rent`} className="text-sm text-blue-500 hover:underline font-semibold">Show more places for rent</Link>
                </div>
                <div className="flex flex-wrap gap-4">
                  {rentListing.map((listing)=>(
                    <ListingItem listing={listing} key={listing._id}/>
                  ))}
                </div>
              </div>
            )
          }
          {
            saleListing && saleListing.length > 0 && (
              <div className="">
                <div className="my-3">
                  <h2 className="text-2xl font-semibold">Recent places for sale</h2>
                  <Link to={`/search?type=sale`} className="text-sm text-blue-500 hover:underline font-semibold">Show places for sale</Link>
                </div>
                <div className="flex flex-wrap gap-4">
                  {saleListing.map((listing)=>(
                    <ListingItem listing={listing} key={listing._id}/>
                  ))}
                </div>
              </div>
            )
          }
        </div>
      </div>
    </div>
  );
};

export default Home;
