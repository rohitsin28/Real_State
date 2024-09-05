import React from "react";
import { Link } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";

const ListingItem = (listing) => {
  return (
    <div className="bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[350px]">
      <Link to={`listing/${listing.listing._id}`}>
        <img
          src={listing.listing.imageUrls[0]}
          alt="image"
          className="w-full h-[320px] sm:h-[220px] hover:scale-105 transition-scale duration-300 object-cover"
        />
        <div className="p-3 flex flex-col gap-2 w-full">
          <p className="font-semibold truncate text-lg text-slate-700">
            {listing.listing.name}
          </p>
          <div className="flex items-center gap-1">
            <MdLocationOn className="h-4 w-4 text-green-700" />
            <p className="text-sm text-gray-700 truncate w-full">
              {listing.listing.address}
            </p>
          </div>
          <p className="text-sm text-gray-700 line-clamp-2">
            {listing.listing.description}
          </p>
          <p className="text-slate-500 font-semibold mt-2 items-center">
            $
            {listing.listing.offer
              ? listing.listing.discountPrice
              : listing.listing.regularPrice}
            {listing.listing.type === "rent" && " / month"}
          </p>
          <div className="text-slate-500 flex gap-4">
            <div className="font-bold text-xs">
              {listing.listing.bedrooms > 1
                ? `${listing.listing.bedrooms}beds`
                : `${listing.listing.bedrooms}bed`}
            </div>
            <div className="font-bold text-xs">
              {listing.listing.bathrooms > 1
                ? `${listing.listing.bathrooms}bathrooms`
                : `${listing.listing.bathrooms}bathroom`}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ListingItem;
