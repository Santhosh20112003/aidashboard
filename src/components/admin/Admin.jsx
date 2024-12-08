import React, { useEffect, useState } from "react";
import { useUserAuth } from "../context/UserAuthContext";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { db } from "../../config/firebase";
import { AdminEmail, AdminUSerid } from "../../common/links";
import { LANGUAGE_VERSIONS } from "../../constants";
import { getAdminLanguages, ParseAIDate } from "../../common/methods";
import * as Popover from "@radix-ui/react-popover";
import { FaFilter } from "react-icons/fa6";
import { PiEmptyBold } from "react-icons/pi";

function Admin() {
    const { user } = useUserAuth();
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchLang, setSearchLang] = useState("");
    const navigate = useNavigate();

    const getAdminDetails = async () => {
        try {
            const codeQuery = query(collection(db, "hiddencodespace"), orderBy("updatedAt", "desc"));
            const webQuery = query(collection(db, "hiddenwebspace"), orderBy("updatedAt", "desc"));

            const [codesnapshot, websnapshot] = await Promise.all([
                getDocs(codeQuery),
                getDocs(webQuery),
            ]);

            const codeDocs = codesnapshot.docs.map((doc) => ({ setting: "code", ...doc.data() }));
            const webDocs = websnapshot.docs.map((doc) => ({ setting: "web", ...doc.data() }));
            const combinedData = [...codeDocs, ...webDocs]
            setData(combinedData);
            setFilteredData(combinedData);
        } catch (error) {
            console.error("Error fetching admin data:", error);
            setError("Error fetching admin data. Please try again later.");
            toast.error("Error fetching admin data.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const getDetails = () => {
            if (Object.keys(user).length > 0) {
                if (user.email === AdminEmail && user.uid === AdminUSerid) {
                    getAdminDetails();
                } else {
                    navigate("/dashboard/home");
                }
            }
        };
        getDetails();
    }, [user, navigate]);

    const filterData = () => {
        let filtered = data;
        if (searchTerm) {
            filtered = filtered.filter(
                (space) =>
                    space.heading?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    space.language?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    space.type?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    space.userid?.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (searchLang) {
            filtered = filtered.filter(
                (space) => space.language === searchLang || space.type === searchLang
            );
        }

        setFilteredData(filtered);
    };

    useEffect(() => {
        filterData();
    }, [searchTerm, searchLang]);

    if (isLoading) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    if (error) {
        return <div className="flex justify-center items-center h-screen">{error}</div>;
    }

    const availableLangs = getAdminLanguages(data);

    return (
        <div className="container mx-auto p-4">
            {/* <h1 className="text-3xl font-bold mb-4 text-center">Admin Panel</h1> */}
            {data.length > 0 && <div className="search-bar flex mt-2 mb-12">
                <input
                    type="text"
                    placeholder="Search..."
                    className="w-full p-2 border border-gray-300 rounded"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Popover.Root>
                    <Popover.Trigger asChild>
                        <button className="p-2.5 relative ml-2 text-sm font-medium text-white bg-main rounded-lg border border-main transition-all active:scale-95">
                            <FaFilter className="text-[1rem] mt-1" />
                            {searchLang !== "" && <div className="absolute -top-1 -right-1 size-3 rounded bg-green-400"></div>}
                        </button>
                    </Popover.Trigger>
                    <Popover.Portal>
                        <Popover.Content
                            sideOffset={10}
                            side="bottom"
                            className="z-[100] rounded-lg px-5 py-4 bg-white focus:outline-none border border-gray-300 shadow-lg w-fit"
                        >
                            <div className="pb-3">
                                <h1 className="text-main mb-3">Language</h1>
                                <div className="grid gap-3 place-items-center grid-cols-3">
                                    <button onClick={() => setSearchLang('')} className="p-2 bg-gray-100 text-gray-400 rounded-md border">
                                        <PiEmptyBold />
                                    </button>
                                    {availableLangs.map((item, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setSearchLang(item)}
                                            className={` rounded-md ${item == searchLang ? 'border border-gray-500' : ''} p-1`}
                                        >
                                            <img src={LANGUAGE_VERSIONS[item]?.image || "https://via.placeholder.com/50"} alt={item} className="size-6" />
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <Popover.Arrow className="fill-main/50" />
                        </Popover.Content>
                    </Popover.Portal>
                </Popover.Root>
            </div>}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredData.map((item) => (
                    <div key={item.spaceid} className="">
                        <img
                            src={item.language ? LANGUAGE_VERSIONS[item.language]?.banner : LANGUAGE_VERSIONS[item.type]?.banner}
                            alt={item.language ? item.language : item.type}
                            className="h-24 w-full rounded-t-xl object-cover"
                        />
                        <div className="relative block px-5 pb-5 pt-3 bg-white shadow-md rounded-b-lg border border-gray-200 hover:shadow-lg transform transition-all duration-300"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center">
                                    <img
                                        src={item.language ? LANGUAGE_VERSIONS[item.language]?.image : LANGUAGE_VERSIONS[item.type]?.image}
                                        alt={item.language ? item.language : item.type}
                                        className="size-10 p-1 rounded-xl object-cover"
                                    />
                                    <div className="ml-3">
                                        <h2 className="text-[0.9rem] font-semibold text-gray-700 group-hover:text-gray-900">
                                            {item.heading.slice(0, 30) + '..'}  &nbsp; <span className="text-xs">{ParseAIDate(item.updatedAt)}</span>
                                        </h2>
                                        <p className="text-xs text-gray-500">{item.spaceid}</p>
                                    </div>
                                </div>
                            </div>
                            <p className="text-xs font-semibold text-gray-700">User ID - {item.userid}</p>
                            <p className="text-sm text-gray-500 mt-2 leading-relaxed line-clamp-2">
                                {item.explanation || "No description available for this space."}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div >
    );
}

export default Admin;