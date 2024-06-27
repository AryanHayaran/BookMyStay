import { useForm } from "react-hook-form";
import { useSearchContext } from "../../contexts/SearchContext";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation } from "react-query";
import * as apiClient from "../../api-client";
import { PaymentIntentResponse, UserType } from "../../shared/Type";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { StripeCardElement } from "@stripe/stripe-js";
import { useAppContext } from "../../contexts/AppContext";
import { useState } from "react";
import { Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
type Props = {
  currentUser: UserType;
  paymentIntent: PaymentIntentResponse
};


export type BookingFormData = {
  firstName: string;
  lastName: string;
  email: string;
  adultCount: number;
  childCount: number;
  checkIn: string;
  checkOut: string;
  hotelId: string;
  paymentIntentId: string;
  totalCost: number;
};

const BookingForm = ({ currentUser, paymentIntent }: Props) => {
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const search = useSearchContext();
  const { hotelId } = useParams();
  const { showToast } = useAppContext();
  const [processing, setProcessing] = useState(false);
  const { mutate: bookRoom, isLoading } = useMutation(apiClient.createRoomBooking, {
    onSuccess: () => {
      showToast({
        message: "Booking Successful!",
        type: "SUCCESS"
      })
      
    },
    onError: () => {
      showToast({
        message: "Booking failed",
        type: "ERROR"
      })
      
    }
  })

  const { handleSubmit, register } = useForm<BookingFormData>({
    defaultValues: {
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
      email: currentUser.email,
      adultCount: search.adultCount,
      childCount: search.childCount,
      checkIn: search.checkIn.toISOString(),
      checkOut: search.checkOut.toISOString(),
      hotelId: hotelId,
      totalCost: paymentIntent.totalCost,
      paymentIntentId: paymentIntent.paymentIntentId,
    },
  });
  
  const onSubmit = async (formData: BookingFormData) => {
    if (!stripe || !elements) {
      return;
    }
    setProcessing(true);
    const result = await stripe.confirmCardPayment(paymentIntent.clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement) as StripeCardElement,
      }
    })

    if (result.paymentIntent?.status === "succeeded") {
      //book the room
      bookRoom({ ...formData, paymentIntentId: result.paymentIntent.id })
      navigate("/")
    }
    setProcessing(false);
  };
  
  return (
    <form
    onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-1 gap-5 rounded-lg shadow-lg p-5"
      >
      <span className="text-3xl font-bold">Confirm Your Details</span>
      <div className="grid grid-cols-2 gap-6">
        <label className="text-gray-700 text-sm font-bold flex-1">
          First Name
          <input
            className="mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 font-normal"
            type="text"
            readOnly
            disabled
            {...register("firstName")}
            />
        </label>
        <label className="text-gray-700 text-sm font-bold flex-1">
          Last Name
          <input
            className="mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 font-normal"
            type="text"
            readOnly
            disabled
            {...register("lastName")}
            />
        </label>
        <label className="text-gray-700 text-sm font-bold flex-1">
          Email
          <input
            className="mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 font-normal"
            type="text"
            readOnly
            disabled
            {...register("email")}
            />
        </label>
      </div>

      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Your Price Summary</h2>

        <div className="bg-[#d8e6f8cd] p-4 rounded-md">
          <div className="font-semibold text-lg">
            Total Cost: ₹{paymentIntent.totalCost.toFixed(2)}
          </div>
          <div className="text-xs">Includes taxes and charges</div>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-xl font-semibold"> Payment Details</h3>
        <CardElement
          id="payment-element"
          className="border rounded-md p-2 text-sm"
          />
      </div>

      <div className="flex justify-end">
        {(isLoading || processing)
          ? <ButtonLoading
          />
          : <Button
          type="submit"
          className="bg-[#0766AD] px-4 text-white py-2  hover:bg-[#3b6bae] p-2 font-bold  text-md disabled:bg-[#3e93d4] rounded-md"
          >
            Confirm Booking
          </Button>
        }
      </div>
    </form>
  );
};
// 0766AD

export default BookingForm;



export function ButtonLoading() {
  return (
    <Button className="text-white font-bold hover:bg-[#3e93d4]  text-md bg-[#4a9cda] rounded-md">
      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      Please wait
    </Button>
  )
}