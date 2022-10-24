const { error } = require("console");
const shortid = require("shortid");
const path = require("path");
const fs = require("fs").promises;
const contactsPath = path.resolve("./db/contacts.json");

function listContacts() {
  const contacts = fs
    .readFile(contactsPath, "utf-8")
    .then((data) => {
      console.table(JSON.parse(data));
    })
    .catch((error) => console.error(error));
}

function getContactById(contactId) {
  fs.readFile(contactsPath, "utf-8")
    .then((data) => {
      const data1 = JSON.parse(data);
      const contacBytId = data1.find((el) => el.id === contactId);
      console.table(contacBytId);
    })
    .catch((error) => console.error(error));
}

function removeContact(contactId) {
  fs.readFile(contactsPath, "utf-8")
    .then((data) => {
      const data1 = JSON.parse(data);
      const contacById = data1.filter((el) => el.id !== contactId);

      const strData = JSON.stringify(contacById);
      console.table(contacById);
      fs.writeFile(contactsPath, strData, "utf-8");
    })
    .catch((error) => console.error(error)); // ...твой код
}

function addContact(name, email, phone) {
  fs.readFile(contactsPath, "utf-8")
    .then((data) => {
      const data1 = JSON.parse(data);
      const id = shortid.generate();
      data1.push({
        id,
        name,
        email,
        phone,
      });
      const data3 = JSON.stringify(data1);
      console.table(data1);
      fs.writeFile(contactsPath, data3, "utf-8");
    })
    .catch((error) => console.log(error));
}

module.exports = { listContacts, getContactById, removeContact, addContact };
