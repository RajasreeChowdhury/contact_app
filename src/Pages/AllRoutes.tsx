import { Route, Routes } from "react-router-dom";
import Contacts from "./Contacts"; 
import Dashboard from "./Charts_and_Maps"; 
import EditContact from "../Components/Edit_Contact"; 
import ContactForm from "../Components/ContactForm"; 

// Functional component for defining all application routes
const AllRoutes: React.FC = () => {
    return (
        <Routes>
            {/* Route for the home page, renders the Contacts component */}
            <Route path="/" element={<Contacts />} />
            {/* Route for the contact form page, renders the ContactForm component */}
            <Route path="/contact_form" element={<ContactForm />} />
            {/* Route for the dashboard page, renders the Dashboard component */}
            <Route path="/dashboard" element={<Dashboard />} />
            {/* Route for editing a contact, renders the EditContact component with a dynamic parameter for contact ID */}
            <Route path="/edit/:id" element={<EditContact />} />
        </Routes>
    );
};

export default AllRoutes;
