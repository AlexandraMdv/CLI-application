const {
  listContacts,
  getContactByID,
  addContact,
  removeContact,
} = require("./contacts.js");
const argv = require("yargs").argv;

async function invokeActions({ action, id, name, email, phone }) {
  switch (action) {
    // 1. Get all contacts
    case "list":
      console.log("----All contacts----");
      const contacts = await listContacts();
      console.table(contacts);
      break;

    // 2. Get contact by ID
    case "get":
      console.log("\n----Contact by ID----");
      const contactId = id;
      const contact = await getContactByID(contactId);
      console.log(contact ? contact : `Contact with ID ${contactId} not found`);
      break;

    // 3. Add a new contact
    case "add":
      console.log("\n----Add new contact----");
      const newContact = await addContact(name, email, phone);
      console.log("New contact added:", newContact);
      break;

    // 4. Remove a contact
    case "remove":
      console.log("\n----Remove contact----");
      const removedContactId = id;
      const updatedContacts = await removeContact(removedContactId);
      console.log(
        `Contact with ID ${removedContactId} removed. Updated contacts:`
      );
      console.table(updatedContacts);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeActions(argv);
