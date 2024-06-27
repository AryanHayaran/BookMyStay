import { Link } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";
import { HotelType } from "../shared/Type";
type Props = {
    hotel: HotelType;
};

const SearchResultsCard = ({ hotel }: Props) => {
    return (
        <div className="grid grid-cols-1 xl:grid-cols-[2fr_3fr] border border-slate-300 rounded-[3px] sm:p-8 p-5 gap-8 ">
            <div className="w-full h-[300px]">
                <img
                    src={hotel.imageUrls[0]}
                    className="w-full h-full object-cover object-center rounded-[5px] border "
                />
            </div>
            <div className="grid sm:grid-rows-[1fr_1.5fr_1fr] grid-rows-[1fr_1.2fr_1fr]">
                <div>
                    <div className="flex items-center">
                        <span className="flex">
                            {Array.from({ length: hotel.starRating }).map(() => (
                                <AiFillStar className="fill-yellow-400" />
                            ))}
                        </span>
                        <span className="ml-1 text-sm">{hotel.type}</span>
                    </div>
                    <Link
                        to={`/detail/${hotel._id}`}
                        className="text-2xl font-bold cursor-pointer"
                    >
                        {hotel.name}
                    </Link>
                </div>

                <div>
                    <div className="line-clamp-4">{hotel.description}</div>
                </div>

                <div className="grid sm:grid-cols-2 grid-cols-1 items-end whitespace-nowrap">
                    <div className=" gap-1 items-center sm:block hidden ">
                        {hotel.facilities.slice(0, 3).map((facility) => (
                            <span className="bg-[#E1E8EB] p-2 rounded-lg font-bold text-xs whitespace-nowrap">
                                {facility}
                            </span>
                        ))}
                        <span className="text-sm">
                            {hotel.facilities.length > 3 &&
                                `+${hotel.facilities.length - 3} more`}
                        </span>
                    </div>
                    <div className="flex gap-1 items-center sm:hidden ">
                        {hotel.facilities.slice(0, 2).map((facility) => (
                            <span className="bg-[#E1E8EB] p-2 rounded-lg font-bold text-xs whitespace-nowrap">
                                {facility}
                            </span>
                        ))}
                        <span className="text-sm">
                            {hotel.facilities.length > 2 &&
                                `+${hotel.facilities.length - 2} more`}
                        </span>
                    </div>
                    <div className="flex flex-col items-end  sm:pt-0 pt-3">
                        <span className="font-bold">₹{hotel.pricePerNight} per night</span>
                        <Link
                            to={`/detail/${hotel._id}`}
                            className=" text-white h-full p-2 font-sans mt-3 max-w-fit  hover:bg-[#3b6bae] rounded-sm bg-[#0766AD]"
                        >
                            View More
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchResultsCard;