import { useSearchContext } from "../contexts/SearchContext"
import { useQuery } from "react-query";
import * as apiClient from "../api-client";
import { useState } from "react";

import SearchResultsCard from "../components/SearchResultCard";
import Pagination from "../components/Pagination";
import HotelTypesFilter from "../components/HotelTypesFilter";
import StarRatingFilter from "../components/StarRatingFilter";
import FacilitiesFilter from "../components/FacilitiesFilter";
import PriceFilter from "../components/PriceFilter";
import Loading from "./Loading";


const Search = () => {
    const search = useSearchContext();
    const [page, setPage] = useState<number>(1);
    const [selectedStars, setSelectedStars] = useState<string[]>([])
    const [selectedHotelTypes, setSelectedHotelTypes] = useState<string[]>([]);
    const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);
    const [selectedPrice, setSelectedPrice] = useState<number | undefined>();
    const [sortOption, setSortOption] = useState<string>("");

    const searchParams = {
        destination: search.destination,
        checkIn: search.checkIn.toISOString(),
        checkOut: search.checkOut.toISOString(),
        adultCount: search.adultCount.toString(),
        childCount: search.childCount.toString(),
        page: page.toString(),
        stars: selectedStars,
        types: selectedHotelTypes,
        facilities: selectedFacilities,
        maxPrice: selectedPrice?.toString(),
        sortOption
    };

    const { data: hotelData } = useQuery(['searchHotels', searchParams], () =>
        apiClient.searchHotels(searchParams)
    );

    const handleStarsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const starRating = event.target.value;


        const updatedStarRatings = event.target.checked
            ? [...selectedStars, starRating]
            : selectedStars.filter((star) => star !== starRating);
        
        setSelectedStars(updatedStarRatings)
    }
    const handleHotelTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const HotelType = event.target.value;


        const updatedHotelType = event.target.checked
            ? [...selectedHotelTypes, HotelType]
            : selectedHotelTypes.filter((hotel) => hotel !== HotelType);

        setSelectedHotelTypes(updatedHotelType)
    }
    const handleFacilityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const facilityType = event.target.value;


        const updatedFacilities = event.target.checked
            ? [...selectedFacilities, facilityType]
            : selectedFacilities.filter((facility) => facility !== facilityType);

        setSelectedFacilities(updatedFacilities)
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-5">
            <div className="rounded-lg border border-slate-300 p-5 h-fit sticky top-10 md:block hidden">
                <div className="space-y-5">
                    <h3 className="text-lg font-semibold border-b border-slate-300 pb-5">
                        Filter by:
                    </h3>
                    <StarRatingFilter
                        selectedStars={selectedStars}
                        onChange={handleStarsChange}
                    />
                    <HotelTypesFilter
                        selectedHotelTypes={selectedHotelTypes}
                        onChange={handleHotelTypeChange}
                    />
                    <FacilitiesFilter
                        selectedFacilities={selectedFacilities}
                        onChange={handleFacilityChange}
                    />
                    <PriceFilter
                        selectedPrice={selectedPrice}
                        onChange={(value?: number) => setSelectedPrice(value)}
                    />
                </div>
            </div>
            <div className="flex flex-col gap-5">
                <div className="flex justify-between items-center">
                    <span className="text-xl font-bold">
                        {hotelData?.pagination.total} Hotels found
                        {search.destination ? ` in ${search.destination}` : ""}
                    </span>
                    <select
                        value={sortOption}
                        onChange={(event) => setSortOption(event.target.value)}
                        className="p-2 border rounded-md form-control selectpicker"
                    >
                        <option value="">Sort By</option>
                        <option value="starRating" >Star Rating</option>
                        <option value="pricePerNightAsc">
                            Price Per Night (low to high)
                        </option>
                        <option value="pricePerNightDesc">
                            Price Per Night (high to low)
                        </option>
                    </select>
                </div>
                {!hotelData && <Loading/>}
                {hotelData?.data.map((hotel) => (
                    <SearchResultsCard hotel={hotel} />
                ))}
                <div>
                    <Pagination
                        page={hotelData?.pagination.page || 1}
                        pages={hotelData?.pagination.pages || 1}
                        onPageChange={(page) => setPage(page)}
                    />
                </div>
            </div>
        </div>
    )
}

export default Search

