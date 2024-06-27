import { useMutation, useQueryClient } from "react-query"
import * as apiClient from '../api-client';
import { useAppContext } from "../contexts/AppContext";

const SignOutButton = () => {
    const { showToast } = useAppContext();
    const queryClient = useQueryClient();

    const mutation = useMutation(apiClient.signOut, {
        onSuccess: async () => {
            await queryClient.invalidateQueries("validateToken")
            showToast({message:"Signed Out!",type:"SUCCESS"})
        },
        onError: (error:Error) => {
            showToast({ message: error.message, type: "ERROR" })
        },
    });

    const handleClick = () => {
        mutation.mutate();
    }
  return (
      <button className="text-[#0766AD] px-2 font-bold bg-white ml-1  rounded-sm hover:text-[#215982] sm:text-[15px] text-[13px]" onClick={handleClick}>
          Sign Out
    </button>
  )
}

export default SignOutButton