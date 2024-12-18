import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

const DetailsSection = () => {
    const {
        register,
        formState: { errors },
    } = useFormContext<HotelFormData>();

    return (
        <div className="flex flex-col gap-4">
            <h1 className="text-3xl font-bold mb-3">Add Hotel</h1>
            <label className="text-gray-700 text-sm  flex-1">
                <div className="font-bold">
                    Name
                </div>
                <input
                    type="text"
                    className="border rounded w-full py-1 px-2 font-normal outline-[#999999]"
                    {...register("name", { required: "This field is required" })}
                ></input>
                {errors.name && (
                    <span className="text-red-500">{errors.name.message}</span>
                )}
            </label>

            <div className="flex gap-4">
                <label className="text-gray-700 text-sm  flex-1">
                   
                    <div className="font-bold">
                        City
                    </div>
                    <input
                        type="text"
                        className="border rounded w-full py-1 px-2 font-normal outline-[#999999]"
                        {...register("city", { required: "This field is required" })}
                    ></input>
                    {errors.city && (
                        <span className="text-red-500">{errors.city.message}</span>
                    )}
                </label>
                <label className="text-gray-700 text-sm  flex-1">
                   
                    <div className="font-bold">
                        Country
                    </div>
                    <input
                        type="text"
                        className="border rounded w-full py-1 px-2 font-normal outline-[#999999]"
                        {...register("country", { required: "This field is required" })}
                    ></input>
                    {errors.country && (
                        <span className="text-red-500">{errors.country.message}</span>
                    )}
                </label>
            </div>
            <label className="text-gray-700 text-sm  flex-1">
                
                <div className="font-bold">
                    Description
                </div>
                <textarea
                    rows={10}
                    className="border rounded w-full py-1 px-2 font-normal outline-[#999999]"
                    {...register("description", { required: "This field is required" })}
                ></textarea>
                {errors.description && (
                    <span className="text-red-500">{errors.description.message}</span>
                )}
            </label>
            <label className="text-gray-700 text-sm  max-w-[50%]">
                
                <div className="font-bold">
                    Price Per Night
                </div>
                <input
                    type="number"
                    min={1}
                    className="border rounded w-full py-1 px-2 font-normal outline-[#999999]"
                    {...register("pricePerNight", { required: "This field is required" })}
                ></input>
                {errors.pricePerNight && (
                    <span className="text-red-500">{errors.pricePerNight.message}</span>
                )}
            </label>
            <label className="text-gray-700 text-sm  max-w-[50%]">
               
                <div className="font-bold">
                    Star Rating
                </div>
                <select
                    {...register("starRating", {
                        required: "This field is required",
                    })}
                    className="border rounded w-full p-2 text-gray-700 font-normal"
                >
                    <option value="" className="text-sm font-bold outline-[#999999]">
                        Select as Rating
                    </option>
                    {[1, 2, 3, 4, 5].map((num) => (
                        <option value={num}>{num}</option>
                    ))}
                </select>
                {errors.starRating && (
                    <span className="text-red-500">{errors.starRating.message}</span>
                )}
            </label>
        </div>
    );
};

export default DetailsSection;