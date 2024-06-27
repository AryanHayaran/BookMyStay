import Footer from "../components/Footer";
import Header from "../components/Header"
import SearchBar from "../components/SearchBar";

interface Props{
    children: React.ReactNode;
}
const Layout = ({children}:Props) => {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            {/* <Hero /> */}
            <div className="lg:mx-[8rem] md:mx-[5rem] sm:mx-[2rem] mx-[1rem]">
                <SearchBar/>
            </div>
            <div className="lg:mx-[8rem] md:mx-[5rem] sm:mx-[2rem] mx-[1rem] py-10 flex-1">
                {children}
            </div>
            <Footer/>
        </div>
    )
}

export default Layout;
