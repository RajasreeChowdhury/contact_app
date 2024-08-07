import { ADD_CONTACT, EDIT_CONTACT, REMOVE_CONTACT } from './actionTypes';

// Define the shape of the payload for contact actions
interface ContactPayload {
  id?: string; // Optional 'id' field
  [key: string]: any; // Allow other dynamic properties
}

// Action creator for adding a contact
export const addContact = (payload: ContactPayload) => {
  console.log(payload); // Log the payload for debugging purposes
  return {
    type: ADD_CONTACT, // Action type for adding a contact
    payload, // Payload containing contact details to be added
  };
};

// Action creator for removing a contact
export const removeContact = (id: string) => {
  return {
    type: REMOVE_CONTACT, // Action type for removing a contact
    payload: {
      id, // ID of the contact to be removed
    },
  };
};

// Action creator for editing a contact
export const editContact = (payload: ContactPayload) => {
  console.log(payload); // Log the payload for debugging purposes
  return {
    type: EDIT_CONTACT, // Action type for editing a contact
    payload, // Payload containing updated contact details
  };
};
