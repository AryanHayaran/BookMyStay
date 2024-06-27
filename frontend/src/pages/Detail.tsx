import { useQuery } from "react-query";
import { useParams } from "react-router-dom"
import * as apiClient from '../api-client';
import { AiFillStar } from "react-icons/ai";
import GuestInfoForm from "../forms/GuestInfoForm/GuestInfoForm";
import BasicModal from "../components/ToggleImage";
import Loading from "./Loading";
const Detail = () => {
    const { hotelId } = useParams();

    const { data: hotel } = useQuery(
        "fetchHotelById",
        () => apiClient.fetchHotelById(hotelId as string),
        {
            enabled: !!hotelId
        }
    )

    if (!hotel) {
        return <Loading />;
    }

    return (
        <div className="space-y-6">
            <div>
                <span className="flex">
                    {Array.from({ length: hotel.starRating }).map(() => (
                        <AiFillStar className="fill-yellow-400" />
                    ))}
                </span>
                <h1 className="text-3xl font-bold">{hotel.name}</h1>
            </div>
            <div className="grid grid-cols-[2fr_1fr] relative w-full">
                <img
                    src={hotel.imageUrls[0]}
                    alt={hotel.name}
                    className="rounded-l-lg w-full h-full object-cover object-center pr-1"
                />
                <div className="grid grid-rows-[1fr_1fr]">
                    <img
                        src={hotel.imageUrls[1]}
                        alt={hotel.name}
                        className="rounded-tr-lg w-full h-full object-cover object-center pb-1"
                    />
                    <div className="relative">
                        <img
                            src={hotel.imageUrls[2]}
                            alt={hotel.name}
                            className="rounded-br-lg w-full h-full object-cover object-center"
                        />
                        <button className="absolute bottom-2 right-3">
                            <BasicModal imageUrl={hotel.imageUrls} />
                        </button>
                    </div>

                </div>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 md:gap-2 gap-1">
                {hotel.facilities.map((facility) => (
                    <div className="border border-[#0765ad89] rounded-md p-3 hover:bg-[#e8e8e889] shadow-lg bg-[#efefef]">
                        {facility}
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-5">
                <div className="whitespace-pre-line">
                    <div className="text-[25px] p-2 border-b-[1px] mb-4 border-[#b1b1b1]">Description</div>
                    {hotel.description}
                </div>
                <div className="h-fit">
                    <GuestInfoForm
                        pricePerNight={hotel.pricePerNight}
                        hotelId={hotel._id}
                    />
                </div>
            </div>
        </div>
    );
}

export default Detail