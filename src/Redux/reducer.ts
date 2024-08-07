import { ADD_CONTACT, EDIT_CONTACT, REMOVE_CONTACT } from './actionTypes';

// Define the structure of a Contact object without mobile number
interface Contact {
  id: string;
  first_name: string;
  last_name: string;
  status: string;
}

// Define the structure of the state
interface State {
  contacts: Contact[];
}

// Initial state with contacts loaded from localStorage or an empty array
const initialState: State = {
  contacts: JSON.parse(localStorage.getItem("contacts") || '[]') as Contact[],
};

// Define the possible actions and their payloads
type Action = 
  | { type: typeof ADD_CONTACT; payload: Omit<Contact, 'id'> }  // Action for adding a contact, without 'id'
  | { type: typeof REMOVE_CONTACT; payload: { id: string } }   // Action for removing a contact by 'id'
  | { type: typeof EDIT_CONTACT; payload: Contact };            // Action for editing a contact

// Reducer function to handle actions and update the state
export default function reducer(state: State = initialState, action: Action): State {
  switch (action.type) {
    case ADD_CONTACT: {
      const payload = action.payload as Omit<Contact, 'id'>; // Extract payload, which excludes 'id'
      let flag = 0;
      
      // Check if required fields are filled
      if (payload.first_name === "" || payload.last_name === "") {
        alert('Please fill all the required fields!');
        flag = 1;
      } else {
        // Check if contact with the same name already exists
        state.contacts.forEach((el) => {
          if (el.first_name === payload.first_name && el.last_name === payload.last_name) {
            alert('Name Already Exist In Contact');
            flag = 1;
          }
        });
      }

      // If no issues, add the new contact
      if (!flag) {
        alert('Contact Saved Successfully!');
        let updatedContacts = JSON.parse(localStorage.getItem("contacts") || '[]') as Contact[];
        const newContact: Contact = {
          id: (state.contacts.length + 1).toString(), // Generate new ID
          ...payload
        };
        updatedContacts.push(newContact); // Add new contact to the list
        localStorage.setItem('contacts', JSON.stringify(updatedContacts)); // Save to localStorage
        return {
          ...state,
          contacts: updatedContacts,
        };
      }
      return state; // Return current state if there are issues
    }
    case REMOVE_CONTACT: {
      const payload = action.payload as { id: string }; // Extract payload with 'id'
      let Contacts = JSON.parse(localStorage.getItem("contacts") || '[]') as Contact[];
      // Filter out the contact with the specified 'id'
      let updatedContacts = Contacts.filter((el) => el.id !== payload.id);
      localStorage.setItem('contacts', JSON.stringify(updatedContacts)); // Save updated list to localStorage
      return {
        ...state,
        contacts: updatedContacts,
      };
    }
    case EDIT_CONTACT: {
      const payload = action.payload as Contact; // Extract payload which includes 'id'
      // Check if required fields are filled
      if (payload.first_name === "" || payload.last_name === "") {
        alert('Input Fields Can Not Be Empty');
        return state;
      } else {
        let flag = 0;
        let Contacts = JSON.parse(localStorage.getItem("contacts") || '[]') as Contact[];

        // Check if the name already exists for another contact
        Contacts.forEach((el) => {
          if (el.id !== payload.id && el.first_name === payload.first_name && el.last_name === payload.last_name) {
            alert("Name Already Exist!");
            flag = 1;
            return;
          }
        });

        // If no issues, update the contact
        if (flag) {
          return state;
        } else {
          let updatedContacts = Contacts.map((el) => {
            if (el.id === payload.id) {
              return { ...payload }; // Update the contact
            } else {
              return el;
            }
          });
          localStorage.setItem("contacts", JSON.stringify(updatedContacts)); // Save updated list to localStorage
          alert('Contact has been updated');
          return {
            ...state,
            contacts: updatedContacts,
          };
        }
      }
    }
    default:
      return state; // Return current state for any other actions
  }
}
