import { Link } from 'react-router-dom'
import { useAppContext } from '../contexts/AppContext'
import SignOutButton from './SignOutButton';

const Header = () => {

    const { isLoggedIn } = useAppContext();

    return (
        <div className='bg-[#0766AD]'>

        <div className='bg-[#0766AD] pt-4  pb-[55px] sm:pb-5 border-none'>
            <div className='lg:px-[8rem] md:px-[5rem] sm:px-[2rem] px-[1rem] mx-auto flex justify-between md:mt-[15px] mt-[8px]'>
                <span className='sm:text-3xl  text-white font-bold tracking-tight'>
                    <Link to="/">
                        BookMyStay
                    </Link>
                </span>
                <span className='flex sm:gap-2 '>
                    {isLoggedIn ? (<>
                        <Link
                                className='items-center rounded-sm transition-shadow flex text-white sm:px-3 px-2 font-semibold hover:bg-[#2d82bf] sm:text-[16px] text-[13px]'
                            to="/my-bookings"
                        >
                            My Bookings
                        </Link>
                        <Link
                            className='items-center rounded-sm transition-shadow flex text-white sm:px-3 px-2 mr-1 font-semibold hover:bg-[#2d82bf] sm:text-[16px] text-[13px]'
                            to="/my-hotels"
                        >
                            My Hotels
                        </Link>
                        <SignOutButton />
                    </>) : (
                        <Link
                            to="/sign-in"
                                    className='flex bg-white items-center text-[#0766AD] px-3 font-bold  hover:text-[#2d82bf] rounded-sm sm:text-[15px] text-[13px]'
                        >
                            Sign In
                        </Link>
                    )}

                </span>
            </div>
            </div>
            <div className="bg-[#0766AD] pb-14 hidden sm:block border-t-[#0766AD]">
                <div className="lg:px-[8rem] md:px-[5rem] sm:px-[2rem] px-[1rem] mx-auto flex flex-col gap-2">
                    <h1 className="text-4xl text-white font-semibold">
                        Find yout next stay
                    </h1>
                    <p className="text-xl text-white">
                        Search low prices on hotels for your dream vacation...
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Header