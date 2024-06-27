import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import * as apiClient from "../api-client"
import { useAppContext } from '../contexts/AppContext';
import {  Link, useNavigate } from 'react-router-dom';

export type RegisterFormData = {
    firstName: string,
    lastName: string,
    email: string;
    password: string;
    confirmPassword: string;
}
const Register = () => {
    const queryClient = useQueryClient();
    const { showToast } = useAppContext();
    const navigate = useNavigate();

    const {
        register,
        watch,
        handleSubmit,
        formState: { errors }
    } = useForm<RegisterFormData>();
    const mutation = useMutation(apiClient.register, {
        onSuccess: async () => {
            showToast({ message: "Registration Success!", type: "SUCCESS" });
            await queryClient.invalidateQueries("validateToken");
            navigate("/");
        },
        onError: (error: Error) => {
            showToast({ message: error.message, type: "ERROR" })

        }
    })

    const onSubmit = handleSubmit((data) => {
        mutation.mutate(data);
    })

    return (
        <form className='flex flex-col gap-5' onSubmit={onSubmit}>
            <h2 className='text-3xl font-bold'>
                Create an Account
            </h2>
            <div className='flex flex-col md:flex-row gap-5'>
                <label className='text-gray-700 text-sm  flex-1'>
                    <div className='font-bold'>
                    First Name
                    </div>

                    <input className='border rounded w-full py-1 px-2 font-normal outline-[#999999]'
                        {...register("firstName", { required: "This field is required" })}
                    ></input>
                    {errors.firstName && (
                        <span className='text-red-500'>{errors.firstName.message}</span>
                    )}
                </label>
                <label className='text-gray-700 text-sm  flex-1'>
                    
                    <div className='font-bold'>
                        Last Name
                    </div>
                    <input className='border rounded w-full py-1 px-2 font-normal outline-[#999999]'
                        {...register("lastName", { required: "This field is required" })}
                    ></input>
                    {errors.lastName && (
                        <span className='text-red-500'>{errors.lastName.message}</span>
                    )}
                </label>

            </div>
            <label className='text-gray-700 text-sm  flex-1'>
                
                <div className='font-bold'>
                    Email
                </div>
                <input type="email" className='border rounded w-full py-1 px-2 font-normal outline-[#999999]'
                    {...register("email", { required: "This field is required" })}
                ></input>
                {errors.email && (
                    <span className='text-red-500'>{errors.email.message}</span>
                )}
            </label>
            <label className='text-gray-700 text-sm  flex-1'>
                
                <div className='font-bold'>
                    Password
                </div>
                <input type="password" className='border rounded w-full py-1 px-2 font-normal outline-[#999999]'
                    {...register("password", {
                        required: "This field is required",
                        minLength: {
                            value: 6,
                            message: "Password must be atleast 6 characters"
                        }
                    })}
                ></input>
                {errors.password && (
                    <span className='text-red-500'>{errors.password.message}</span>
                )}
            </label>
            <label className='text-gray-700 text-sm  flex-1'>
                
                <div className='font-bold'>
                    Confirm Password
                </div>
                <input type="password" className='border rounded w-full py-1 px-2 font-normal outline-[#999999]'
                    {...register("confirmPassword", {
                        validate: (val) => {
                            if (!val) {
                                return "This field is required"
                            }
                            else if (watch("password") !== val) {
                                return "Your passwords do no match"
                            }
                        }
                    })}
                ></input>
                {errors.confirmPassword && (
                    <span className='text-red-500'>{errors.confirmPassword.message}</span>
                )}
            </label>
            <span className="flex items-center justify-between">
                <span className="text-sm">
                    Already have an account?{" "}
                    <Link className="underline" to="/sign-in">
                        Sign in
                    </Link>
                </span>
                <button
                    type="submit"
                    className="bg-[#0766AD] px-4 text-white py-2 rounded-md  hover:bg-[#3b6bae] text-xl"
                >
                    Create Account
                </button>
            </span>
        </form>
    )
}

export default Register