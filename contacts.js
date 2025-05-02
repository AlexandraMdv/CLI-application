const fs = require("fs").promises; // Using promises version
const path = require("path");
const { randomBytes } = require("crypto"); // For generating unique IDs

const contactsPath = path.join(__dirname, "db", "contacts.json");

//Generate a unique 21-character ID for each contact
const generateId = () => {
  return randomBytes(16)
    .toString("base64")
    .replace(/\+/g, "")
    .replace(/\//g, "")
    .replace(/=/g, "")
    .slice(0, 21);
};

async function listContacts() {
  try {
    const contacts = await fs.readFile(contactsPath, "utf-8");
    return JSON.parse(contacts);
  } catch (error) {
    console.error("Error reading contacts:", error.message);
  }
}

async function getContactByID(contactId) {
  try {
    const contacts = await listContacts();
    const contact = contacts.find((contact) => contact.id === contactId);
    if (!contact) {
      throw new Error(`Contact with ID ${contactId} not found`);
    }
    return contact;
  } catch (error) {
    console.error("Error getting contact by ID:", error.message);
  }
}

async function addContact(name, email, phone) {
  try {
    const contacts = await listContacts();
    const newContact = {
      id: generateId(), // Generate a unique ID
      name,
      email,
      phone,
    };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
  } catch (error) {
    console.error("Error adding contact:", error.message);
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    const updatedContacts = contacts.filter(
      (contact) => contact.id !== contactId
    );
    if (updatedContacts.length === contacts.length) {
      throw new Error(`Contact with ID ${contactId} not found`);
    }
    await fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2));
    return updatedContacts;
  } catch (error) {
    console.error("Error removing contact:", error.message);
  }
}

module.exports = {
  listContacts,
  getContactByID,
  addContact,
  removeContact,
};
