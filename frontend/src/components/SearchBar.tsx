import { FormEvent, useState } from "react";
import { useSearchContext } from "../contexts/SearchContext";
import { MdTravelExplore } from "react-icons/md";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
    const navigate = useNavigate();
    const search = useSearchContext();

    const [destination, setDestination] = useState<string>(search.destination);
    const [checkIn, setCheckIn] = useState<Date>(search.checkIn);
    const [checkOut, setCheckOut] = useState<Date>(search.checkOut);
    const [adultCount, setAdultCount] = useState<number>(search.adultCount);
    const [childCount, setChildCount] = useState<number>(search.childCount);

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        setAdultCount(search.adultCount)
        setChildCount(search.childCount)
        search.saveSearchValues(
            destination,
            checkIn,
            checkOut,
            adultCount,
            childCount
        );
        navigate("/search");
    };

    const minDate = new Date();
    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() + 1);

    return (
        <form
            onSubmit={handleSubmit}
            className="-mt-8 p-[5px] bg-[#F3F0CA] rounded shadow-md md:flex  md:flex-cols flex-rows items-center gap-x-3 gap-y-2  grid"
        >
            <div className="flex  flex-row items-center flex-1 bg-white p-2 grid-flow-col w-[100%]">
                <MdTravelExplore size={25} className="mr-2" />
                <input
                    placeholder="Where are you going?"
                    className="text-md w-full focus:outline-none"
                    value={destination}
                    onChange={(event) => setDestination(event.target.value)}
                />
            </div>
            <div className="flex flex-cols ">
                <DatePicker
                    selected={checkIn}
                    onChange={(date) => setCheckIn(date as Date)}
                    selectsStart
                    startDate={checkIn}
                    endDate={checkOut}
                    minDate={minDate}
                    maxDate={maxDate}
                    placeholderText="Check-in Date"
                    className="w-full  bg-white p-2 focus:outline-none border-r-[5px] border-[#F3F0CA]"
                    wrapperClassName=" "
                />
                {/* <div className="border border-l-[3px] border-[#F3F0CA]"></div> */}
                <DatePicker
                    selected={checkOut}
                    onChange={(date) => setCheckOut(date as Date)}
                    selectsStart
                    startDate={checkIn}
                    endDate={checkOut}
                    minDate={minDate}
                    maxDate={maxDate}
                    placeholderText="Check-out Date"
                    className="w-full  bg-white p-2  focus:outline-none"
                    wrapperClassName=" "
                />
            </div>
            <div className="">
                <button className="min-w-full bg-[#0766AD] text-white h-full p-2 font-bold text-xl hover:bg-[#3b6bae] rounded-sm">
                    Search
                </button>
            </div>
        </form>
    );
};

export default SearchBar;