import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom"; // Importing Link from react-router-dom for navigation
import Popup from "../Components/Popup"; // Importing the Popup component
import { removeContact } from "../Redux/action"; // Importing the removeContact action from Redux actions
import CancelIcon from '@mui/icons-material/Cancel'; // Importing CancelIcon from MUI icons

// Defining the Contact interface
interface Contact {
  id: string;
  first_name: string;
  last_name: string;
  status: 'active' | 'inactive';
}

// Defining a functional component named Contacts
const Contacts = () => {
  const [isOpen, setIsOpen] = useState(false); // State to manage the popup visibility
  const [singleContact, setSingleContact] = useState<Contact>({
    id: '0',
    first_name: '',
    last_name: '',
    status: 'inactive',
  }); // State to manage the currently selected contact

  const AllContacts: Contact[] = useSelector((store: any) => store.contacts); // Selecting contacts from the Redux store
  const dispatch = useDispatch(); // Getting the dispatch function from Redux

  // Function to toggle the popup visibility and set the selected contact
  const togglePopup = (contact: Contact) => {
    setSingleContact(contact);
    setIsOpen(!isOpen);
  };

  useEffect(() => {}, [dispatch, AllContacts.length]); // Effect that runs on component mount and whenever dispatch or AllContacts.length changes

  return (
    <div className="justify-center pt-16 text-black-50 p-4 w-full h-full bg-neutral-300">
      {/* Main container for the contacts page */}
      <div className="m-4">
        <button className="bg-gray-300 p-2 text-2xl border border-black font-bold px-4 rounded border">
          <Link to="/contact_form">Create Contact</Link> {/* Link to the contact form */}
        </button>
      </div>
      {AllContacts.length === 0 && (
        <div className="m-auto w-fit p-4 bg-slate-100 border border-black mt-20">
          {/* Message to display when there are no contacts */}
          <div className="flex items-start justify-center">
            <CancelIcon style={{ fontSize: 60 }} className="text-gray-500" />
            <h1 className="text-2xl ml-4 text-left text-black-500">
              No Contact Found <br /> Please add contact from
              <br />
              Create Contact Button
            </h1>
          </div>
        </div>
      )}
      <div
        id="contact_list"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {/* Grid container for displaying contacts */}
        {AllContacts.map((el: Contact) => {
          return (
            <div>
            <div key={el.id} className="bg-cyan-700 rounded-lg shadow-md m-4 p-4 text-white w-80 h-56">
              {/* Card for each contact */}
              <div className="w-3/4 m-auto">
                {/* Clickable area to toggle the popup */}
                <img
                  className="w-full rounded-full"
                  src="data:image/png;base64,/* base64 encoded image */"
                  alt=""
                />
                <div className="text-left text-xl">
                  {/* Displaying contact details */}
                  <p>First Name : {el.first_name}</p>
                  <p>Last Name : {el.last_name}</p>
                  <p>Status : {el.status === "active" ? "Active" : "Inactive"}</p>
                </div>
                <button
                  className="bg-blue-500 text-white p-2 rounded mt-4"
                  onClick={() => togglePopup(el)}
                >
                  View Details
                </button>
              </div>
              </div>
              <div className="flex flex-col justify-center items-center mx-auto ">
                {/* Buttons for editing and deleting contacts */}
                <Link to={`edit/${el.id}`}>
                  <button className="rounded py-1 px-8 bg-green-500 text-white w-24 mb-5 shadow w-60">
                    Edit
                  </button>
                </Link>
                <button
                  onClick={() => dispatch(removeContact(el.id))}
                  className="rounded px-8 py-1 bg-red-500 text-white w-24 shadow w-60"
                >
                  Delete
                </button>
              </div>
            
            </div>
          );
        })}
      </div>
      {isOpen && (
        <Popup close={() => setIsOpen(false)} el={singleContact} />
      )}
    </div>
  );
};

export default Contacts;
