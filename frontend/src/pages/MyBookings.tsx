import { useQuery } from "react-query";
import * as apiClient from "../api-client";
import Loading from "./Loading";

const MyBookings = () => {
    const { data: hotels } = useQuery(
        "fetchMyBookings",
        apiClient.fetchMyBookings
    );
    if (!hotels) {
        return <Loading />;
    }
    if (hotels.length === 0) {
        return <span>No bookings found</span>;
    }

    return (
        <div className="space-y-5">
            <h1 className="text-3xl font-bold">My Bookings</h1>
            {hotels.map((hotel) => (
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] border shadow-md rounded-lg p-3 gap-6">
                    <div className="lg:w-full lg:h-[300px] ">
                        <img
                            src={hotel.imageUrls[0]}
                            className="w-full h-full object-cover object-center rounded-md"
                        />
                    </div>
                    <div className="flex flex-col gap-4 overflow-y-auto max-h-[300px]">
                        <div className="text-2xl font-bold">
                            {hotel.name}
                            <div className="text-xs font-normal">
                                {hotel.city}, {hotel.country}
                            </div>
                        </div>
                        {hotel.bookings.map((booking) => (
                            <div className="bg-[#eaeaea] p-2 rounded-md">
                                <div>
                                    <span className="font-bold mr-2 text-[15px]">Dates: </span>
                                    <span className="text-[15px]">
                                        {new Date(booking.checkIn).toDateString()} -
                                        {new Date(booking.checkOut).toDateString()}
                                    </span>
                                </div>
                                <div>
                                    <span className="font-bold mr-2 text-[15px]">Guests:</span>
                                    <span className="text-[15px]">
                                        {booking.adultCount} adults, {booking.childCount} children
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default MyBookings;