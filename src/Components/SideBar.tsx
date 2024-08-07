import React from 'react';
import { Link } from 'react-router-dom'; // Importing Link from react-router-dom for navigation
import ContactPageIcon from '@mui/icons-material/ContactPage'; // Importing ContactPageIcon from MUI icons
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt'; // Importing SignalCellularAltIcon from MUI icons

const Sidebar: React.FC = () => {
    return (
        <div className="flex border-r-2"> {/* Main container with a flex layout and right border */}
            <div className="flex pt-16 flex-col h-screen p-3 bg-white shadow w-60"> {/* Sidebar container with padding, white background, shadow, and fixed width */}
                <div className="space-y-3"> {/* Container for spacing out elements vertically */}
                    <div className="flex items-center"> {/* Container to align items in a row */}
                        <h2 className="text-xl mt-4 font-bold">Dashboard</h2> 
                    </div>
                    <div className="flex-1"> {/* Container that takes remaining space */}
                        <ul className="pt-2 pb-4 space-y-1 text-sm"> {/* Unordered list for navigation items with padding and spacing */}
                            <li className="rounded-sm"> {/* List item with rounded corners */}
                                <Link
                                    to="/" // Link to the home route that has contacts
                                    className="flex items-center p-2 space-x-3 rounded-md text-sky-500 border-b-2" // Link styling with flex layout, padding, and border
                                >
                                    <ContactPageIcon style={{ fontSize: 35 }} className="text-sky-800" /> {/* ContactPageIcon with custom size and color */}
                                    <span>Contacts</span> 
                                </Link>
                            </li>
                            <li className="rounded-sm">
                                <Link
                                    to="/dashboard" // Link to the dashboard route that has charts and maps
                                    className="flex items-center p-2 space-x-3 rounded-md text-sky-500 border-b-2" 
                                >
                                    <SignalCellularAltIcon style={{ fontSize: 35 }} className="text-sky-800" /> {/* SignalCellularAltIcon with custom size and color */}
                                    <span>Charts & Maps</span> 
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar; 