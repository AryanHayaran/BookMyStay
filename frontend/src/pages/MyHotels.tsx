import { useQuery } from "react-query"
import { Link } from "react-router-dom"
import * as apiClient from "../api-client"
import {  BsMap } from "react-icons/bs";
import {  BiStar } from "react-icons/bi";
import Loading from "./Loading";

const MyHotels = () => {
    const { data: hotelData } = useQuery(
        "fetchMyHotels",
        apiClient.fetchMyHotels,
        {
            onError: () => { },
        }
    );
     
    if (!hotelData) {
        return <Loading />;
    }
    if (hotelData.length ==0) {
        return <span>No Hotels found</span>
    }
    return (
        <div className="space-y-5 ">
            <span className="flex justify-between">
                <h1 className="text-3xl font-bold">My Hotels</h1>
                <Link to="/add-hotel" className="flex bg-[#0766AD] rounded-sm text-white text-xl font-san p-2 hover:bg-[#2d82bf] ">Add Hotel</Link>
            </span>
            <div className="grid grid-cols-1 gap-5">
                {hotelData.map((hotel) => (
                    <div className="flex flex-col justify-between border border-slate-300 rounded-lg p-4 gap-5">
                        <div className="grid md:grid-cols-[1fr_2fr] grid-cols-1">
                            <div className="">
                                <img
                                    src={hotel.imageUrls[0]}
                                    className="w-full h-full object-cover object-center rounded-md"
                                />
                            </div>
                            <div className="md:ml-5">
                                <h2 className="text-2xl font-bold mb-5">{hotel.name}</h2>
                                <div className="flex flex-cols items-center my-2">
                                    <BsMap className="mr-2" />
                                    {hotel.city},{hotel.country}
                                </div>
                                <div className="flex flex-cols items-center ">
                                    <BiStar className="mr-1" />
                                    {hotel.starRating} Star Rating
                                </div>
                            </div>
                        </div>
                        <div className="grid lg:grid-cols-4 grid-cols-2 gap-1">

                            <div className="flex flex-cols pl-4 items-center border border-[#0765ad43] rounded-md hover:bg-[#e8e8e889] shadow-md bg-[#efefef] px-1 py-2">
                                <BsMap className="mr-2" />
                                {hotel.type}
                            </div>
                            <div className="flex flex-cols pl-4 items-center border border-[#0765ad43] rounded-md hover:bg-[#e8e8e889] shadow-md bg-[#efefef] px-1 py-2">
                                <BsMap className="mr-2" />
                                ₹{hotel.pricePerNight} per night
                            </div>
                            <div className="flex flex-cols pl-4 items-center border border-[#0765ad43] rounded-md hover:bg-[#e8e8e889] shadow-md bg-[#efefef] px-1 py-2">
                                <BsMap className="mr-2" />
                                {hotel.adultCount} adults, {hotel.childCount} children
                            </div>
                            <div>

                            </div>


                        </div>
                            <span className="flex justify-end" >
                                <Link
                                    to={`/edit-hotel/${hotel._id}`}
                                className="flex bg-[#0766AD] rounded-sm text-[15px]  text-white text-xl font-san py-1 px-2 hover:bg-[#2d82bf] "
                                >
                                    View Details
                                </Link>
                            </span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MyHotels