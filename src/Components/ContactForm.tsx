import { useState, ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';
import { addContact } from '../Redux/action';

// Define a type for the form state
interface FormState {
  first_name: string;
  last_name: string;
  status: 'active' | 'inactive';
}

function ContactForm() {
  const dispatch = useDispatch();

  // Initialize the form state with the type FormState
  const [form, setForm] = useState<FormState>({
    first_name: '',
    last_name: '',
    status: 'inactive', // Default status is 'inactive'
  });

  // Function to handle changes in form input fields
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form, // Preserve existing form state
      [e.target.name]: e.target.value, // Update the value of the changed field
    });
  };

  // Function to dispatch the addContact action with the form data
  function handleSave() {
    dispatch(addContact(form));
  }

  return (
    <div className="w-full mx-auto my-4 pt-16 h-full bg-neutral-300 ">
    <form>
      
        {/* Form title */}
        <h2 className="text-2xl font-bold mb-4 ">Create Contact Screen</h2>

        {/* Input field wrapping all inputs*/}
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
            name="first_name" // Name attribute to match FormState
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
            name="last_name" // Name attribute to match FormState
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
              name="status" // Name attribute to match FormState
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
            name="status" // Name attribute to match FormState
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
        {/* Save button to dispatch the form data */}
        <button
          className="bg-gray-300 hover:bg-gray-600 text-black font-bold py-2 px-4 rounded border border-black mt-5"
          onClick={handleSave} // Call handleSave on click
        >
          Save Contact
        </button>
    </form>
    </div>
  );
}

export default ContactForm;
