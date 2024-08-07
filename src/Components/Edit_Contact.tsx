import { useEffect, useState, ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { editContact } from '../Redux/action';

// Define types for contact and form state
interface Contact {
  id: string;
  first_name: string;
  last_name: string;
  mob: string;
  status: 'active' | 'inactive';
}

interface RootState {
  contacts: Contact[];
}

function EditContact() {
  const { id } = useParams<{ id: string }>(); // Extracting the 'id' from the URL parameters
  const dispatch = useDispatch();
  const AllContact = useSelector((store: RootState) => store.contacts); // Get all contacts from the Redux store

  // Initialize the form state with default values
  const [form, setForm] = useState<Contact>({
    id: '',
    first_name: '',
    last_name: '',
    mob: '',
    status: 'active',
  });

  // Handle changes in form inputs
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // Handle saving the edited contact
  function handleSave() {
    const updatedContact = { ...form, id }; // Update the contact with the current form values and the id from URL
    dispatch(editContact(updatedContact)); // Dispatch the editContact action with the updated contact
  }

  // Effect to set the form state when the component mounts or the id changes
  useEffect(() => {
    if (id) {
      const contact = AllContact.find((el) => el.id === id); // Find the contact with the matching id
      if (contact) {
        setForm(contact); // Set the form state with the found contact
      }
    }
  }, [id, AllContact]);

  return (
    <div className="w-full mx-auto my-4 pt-16 h-full bg-neutral-300">
      <h2 className="text-2xl font-bold mb-4">Edit Contact Screen</h2>
      <div className="m-auto w-fit p-10 bg-slate-100 border border-black mt-20">
        {/* Input field for first name */}
        <div className="mb-4 flex items-center justify-center">
          <label className="block font-bold mb-2 mr-4" htmlFor="first-name">
            First Name:
          </label>
          <input
            className="w-half border border-gray-400 p-2 rounded-md"
            id="first-name"
            type="text"
            name="first_name" // Name attribute to match form state
            value={form.first_name}
            onChange={handleChange} // Update form state on change
          />
        </div>

        {/* Input field for last name */}
        <div className="mb-4 flex items-center justify-center">
          <label className="block font-bold mb-2 mr-4" htmlFor="last-name">
            Last Name:
          </label>
          <input
            className="w-half border border-gray-400 p-2 rounded-md"
            id="last-name"
            type="text"
            name="last_name" // Name attribute to match form state
            value={form.last_name}
            onChange={handleChange} // Update form state on change
          />
        </div>

        {/* Radio buttons for status */}
        <div className="mb-4 flex justify-center">
          <label className="block font-bold mb-2 mr-2 mt-4" htmlFor="status">
            Status:
          </label>
          <div className="flex flex-col"> {/* Using 'flex-col' to stack radio buttons vertically */}
            {/* Radio button for 'active' status */}
            <div className="flex items-center mb-2">
              <input
                type="radio"
                id="active"
                name="status" // Name attribute to match form state
                value="active"
                checked={form.status === 'active'} // Check if 'active' is the selected status
                onChange={handleChange} // Update form state on change
              />
              <label className="ml-2" htmlFor="active">
                Active
              </label>
            </div>

            {/* Radio button for 'inactive' status */}
            <div className="flex items-center">
              <input
                type="radio"
                id="inactive"
                name="status" // Name attribute to match form state
                value="inactive"
                checked={form.status === 'inactive'} // Check if 'inactive' is the selected status
                onChange={handleChange} // Update form state on change
              />
              <label className="ml-2" htmlFor="inactive">
                Inactive
              </label>
            </div>
          </div>
        </div>
      </div>

      <button
        className="bg-gray-300 hover:bg-gray-600 text-black font-bold py-2 px-4 rounded border border-black mt-5"
        onClick={handleSave} // Call handleSave on click
      >
        Save Edited Contact
      </button>
    </div>
  );
}

export default EditContact;
