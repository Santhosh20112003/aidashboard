import React from 'react'
import { Link } from 'react-router-dom';
import { useUserAuth } from '../.././components/context/UserAuthContext';

function Footer() {
    const { user } = useUserAuth();
    return (
        <footer className="text-gray-600 body-font">
            <div className="px-5 py-8 bg-main/5 mx-auto">
                <div className="flex flex-wrap md:text-left text-center">
                    <div className="lg:w-1/5  w-full px-4">
                        <h2 className="title-font text-main tracking-widest text-sm font-bold mb-3">
                            LINKS
                        </h2>
                        <nav className="list-none mb-5">
                            <li>
                                {user ? <Link onClick={() => {
                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                }} to="/dashboard" className="text-main/80 hover:text-main">Your Space</Link> : <Link onClick={() => {
                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                }} to="/getaccess" className="text-main/80 hover:text-main">Get Access</Link>}
                            </li>
                            <li>
                                <Link onClick={() => {
                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                }} to="https://santechh.vercel.app" className="text-main/80 hover:text-main">SanTech</Link>
                            </li>
                        </nav>
                    </div>
                    <div className="lg:w-1/5  w-full px-4">
                        <h2 className="title-font font-bold text-main tracking-widest text-sm mb-3">
                            COMPANY
                        </h2>
                        <nav className="list-none mb-5 ">
                            <li>
                                <Link onClick={() => {
                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                }} to="/need-spark" className="text-main/80 lg:hover:text-main">Need Spark?</Link>
                            </li>
                            <li>
                                <Link onClick={() => {
                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                }} to="/terms-of-use" className="text-main/80 hover:text-main">Terms Of Use</Link>
                            </li>
                        </nav>
                    </div>
                    <div className="lg:w-3/5  w-full px-4">
                        <h2 className="title-font font-bold  text-main tracking-widest text-sm mb-3">
                            SUBSCRIBE
                        </h2>
                        <form
                            action="https://formsubmit.co/santhoshtechnologies22@gmail.com"
                            method="POST"
                            className="flex flex-col md:flex-row gap-3 justify-center items-center lg:items-end"
                        >
                            <input
                                type="text"
                                id="footer-field"
                                name="footer-field"
                                required
                                autoComplete={"email"}
                                placeholder="Your Email"
                                className="w-full bg-main/5 bg-opacity-50 rounded border border-main/10 focus:bg-transparent focus:ring-2 focus:ring-main/20 focus:border-main/80 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                            />
                            <button className="w-full sm:w-auto text-white bg-main border-0 py-2 px-4 lg:px-6 focus:outline-none hover:bg-main/80 rounded">
                                Send&nbsp;Message
                            </button>
                        </form>
                        <p className="text-main/80  text-sm mt-2  font-medium ">
                            * All details are required for communication.
                        </p>
                    </div>
                </div>
            </div>
            <div className="bg-main/10">
                <div className="px-5 py-6 mx-auto flex flex-col items-center sm:flex-row">
                    <span onClick={() => {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    }} className="flex title-font cursor-pointer font-medium items-center justify-center text-main">
                        <img src={require("../../assets/logo192.png")} alt="" className="size-10" />
                    </span>
                    <p className="text-sm text-main/80 mt-4 sm:ml-6 sm:mt-0 font-medium ">
                        © 2024 CodeSpark —
                        <Link
                            to='https://santechh.vercel.app'
                            rel="noopener noreferrer"
                            className="text-gray-600 ml-1"
                            target="_blank"
                        >
                            @SanTech
                        </Link>
                    </p>

                </div>
            </div>
        </footer>
    )
}

export default Footer