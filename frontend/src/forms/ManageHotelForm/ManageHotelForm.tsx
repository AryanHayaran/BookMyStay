import { FormProvider, useForm } from 'react-hook-form';
import DetailsSection from "./DetailSection";
import TypeSection from "./TypeSection";
import FacilitiesSection from "./FacilitiesSection";
import GuestsSection from "./GuestSection";
import ImageSection from "./ImageSection";
import { HotelType } from '../../shared/Type';
import { useEffect } from 'react';
import { ButtonLoading } from '../BookingForm/BookingForm';

export type HotelFormData = {
    name: string;
    city: string;
    country: string;
    description: string;
    type: string;
    pricePerNight: number;
    starRating: number;
    facilities: string[];
    imageFiles: FileList;
    imageUrls: string[];
    adultCount: number;
    childCount: number;
};
type Props = {
    hotel?: HotelType;
    onSave: (hotelFormData: FormData) => void;
    isLoading: boolean;
}

const ManageHotelForm = ({onSave,isLoading,hotel}:Props) => {
    const formMethods = useForm<HotelFormData>();
    const { handleSubmit,reset } = formMethods;

    useEffect(() => {
        reset(hotel);
     },[hotel,reset])

    const onSubmit = handleSubmit((formDataJson: HotelFormData) => {
        // create new formdata object & call our API
        const formData = new FormData();
        if (hotel) {
            formData.append("hotelId", hotel._id);
        }
        formData.append("name", formDataJson.name);
        formData.append("city", formDataJson.city);
        formData.append("country", formDataJson.country);
        formData.append("description", formDataJson.description);
        formData.append("type", formDataJson.type);
        formData.append("pricePerNight", formDataJson.pricePerNight.toString());
        formData.append("starRating", formDataJson.starRating.toString());
        formData.append("adultCount", formDataJson.adultCount.toString());
        formData.append("childCount", formDataJson.childCount.toString());

        formDataJson.facilities.forEach((facility, index) => {
            formData.append(`facilities[${index}]`, facility);
        });
          
        if (formDataJson.imageUrls) {
            formDataJson.imageUrls.forEach((url, index) => {
                formData.append(`imageUrls[${index}]`,url)
            })
        }
        Array.from(formDataJson.imageFiles).forEach((imageFile) => {
            formData.append(`imageFiles`, imageFile);
        });
        onSave(formData);

        // formDataJson.name = "";
        // formDataJson.city = "";
        // formDataJson.country=""
        // formDataJson.description=""
        // formDataJson.type=""
        // formDataJson.pricePerNight=0
        // formDataJson.starRating=
        // formDataJson.adultCount=0
        // formDataJson.childCount=0
    });


    return (
        <FormProvider {...formMethods}>
            <form className="flex flex-col gap-10" onSubmit={onSubmit}>
                <DetailsSection />
                <TypeSection />
                <FacilitiesSection />
                <GuestsSection />
                <ImageSection />
                <span className="flex justify-end">
                    {!isLoading
                        ? <button
                            type="submit"
                            className="bg-[#0766AD] px-4 text-white py-2 font-bold hover:bg-[#3b6bae] text-xl rounded-sm"
                        >
                            Save
                        </button>
                        :<ButtonLoading/>
                    }
                </span>
            </form>
        </FormProvider>
    )
}
export default ManageHotelForm
