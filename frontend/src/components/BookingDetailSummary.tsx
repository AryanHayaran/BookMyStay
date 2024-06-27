import { HotelType } from "../shared/Type";


type Props = {
    checkIn: Date;
    checkOut: Date;
    adultCount: number;
    childCount: number;
    numberOfNights: number;
    hotel: HotelType;
};

const BookingDetailsSummary = ({
    checkIn,
    checkOut,
    adultCount,
    childCount,
    numberOfNights,
    hotel,
}: Props) => {
    return (
        <div className="grid gap-4 rounded-lg shadow-lg p-5 h-fit">
            <h2 className="text-xl font-bold">Your Booking Details</h2>
            <div className="border-b py-2 ">
                <div className="font-bold">
                Location:

                </div>
                <div className="">{`${hotel.name}, ${hotel.city}, ${hotel.country}`}</div>
            </div>
            <div className="flex justify-between">
                <div>
                    <div className="font-bold">
                    Check-in
                    </div>
                    <div className=""> {checkIn.toDateString()}</div>
                </div>
                <div>
                    <div className="font-bold">
                        Check-out
                    </div>
                    
                    <div className=""> {checkOut.toDateString()}</div>
                </div>
            </div>
            <div className="border-t border-b py-2">
                <div className="font-bold">
                    Total length of stay:
                </div>
                
                <div className="">{numberOfNights} nights</div>
            </div>

            <div>
                <div className="font-bold">
                    Guests{" "}
                </div>
                <div className="">
                    {adultCount} adults & {childCount} children
                </div>
            </div>
        </div>
    );
};

export default BookingDetailsSummary;