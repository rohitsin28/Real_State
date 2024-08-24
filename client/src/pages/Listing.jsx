import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";

const Listing = () => {
  SwiperCore.use([Navigation]);
  const params = useParams();
  const [error, setError] = useState(false);
  const [loading, setloading] = useState(false);
  const [listing, setListing] = useState(null);

  useEffect(() => {
    const fetchFunction = async () => {
      try {
        setloading(true);
        const res = await fetch(`/api/listing/get/${params.listingId}`);
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setloading(false);
          return;
        }
        setListing(data);
        setloading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setloading(false);
      }
    };
    fetchFunction();
  }, [params.listingId]);

  return (
    <div>
      {loading && <p className="text-center my-7 text-2xl">Loding...</p>}
      {error && (
        <p className="text-center my-7 text-2xl">Something Went Wrong</p>
      )}
      {listing && !error && !loading && (
        <div>
          <Swiper navigation>
            {listing.imageUrls.map((url) => (
              <SwiperSlide key={url}>
                <div
                  className="h-[550px]"
                  style={{ background: `url(${url}) center no-repeat`,blockSize:'cover' }}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </div>
  );
};

export default Listing;
