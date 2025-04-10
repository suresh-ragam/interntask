let contacts = []

document.addEventListener('DOMContentLoaded',() => {
    loadContacts();

    document.getElementById('contact-form').addEventListener('submit',addContact);

    document.getElementById('search').addEventListener('input',searchContacts);

});

function loadContacts(){
    contacts = JSON.parse(localStorage.getItem('contacts')) || [];

    displayContacts(contacts);
}

function saveContacts(){
    localStorage.setItem('contacts', JSON.stringify(contacts));
}

function addContact(e){
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const email = document.getElementById('email').value.trim();

    if(name && phone){
        const isDuplicate = contacts.some(c =>
            c.name.toLowerCase() === name.toLowerCase() ||
            c.phone === phone
        );

        if(isDuplicate){
            alert('Contact with name or phone already exists ');
            return;
        }

        const newContact = {
            id: Date.now(),
            name,
            phone,
            email
        };

        contacts.push(newContact);

        saveContacts();

        displayContacts(contacts);

        document.getElementById('contact-form').reset(); 
    }
}

function displayContacts(contactsToDisplay) {
    const tbody = document.querySelector('#contacts-table tbody');
    tbody.innerHTML = '';

    contactsToDisplay.forEach(contact => {
        const row = document.createElement('tr');
        row.setAttribute('data-id', contact.id);

        row.innerHTML = `
            <td>${contact.name}</td>
            <td>${contact.phone}</td>
            <td>${contact.email}</td>
            <td class="action-buttons">
                <button class="edit" onclick="handleEdit(this.closest('tr'), ${contact.id})">Edit</button>
                <button class="delete">Delete</button>
            </td>
        `;

        const deleteBtn = row.querySelector('.delete');

        deleteBtn.addEventListener('click', () => deleteContact(contact.id));

        tbody.appendChild(row);
    });
}

function handleEdit(row, id) {
    const contact = contacts.find(c => c.id === id);
    if (!contact) return;

    const tds = row.querySelectorAll('td');

    tds[0].innerHTML = `<input type="text" value="${contact.name}">`;
    tds[1].innerHTML = `<input type="text" value="${contact.phone}" pattern="\d{10}" maxlength="10">`;
    tds[2].innerHTML = `<input type="text" value="${contact.email}">`;

    const actionTd = tds[3];
    actionTd.innerHTML = `
        <button class="save">Save</button>
        <button class="cancel">Cancel</button>
    `;

    const saveBtn = actionTd.querySelector('.save');
    const cancelBtn = actionTd.querySelector('.cancel');

    saveBtn.addEventListener('click', () => {
        const updatedName = tds[0].querySelector('input').value.trim();
        const updatedPhone = tds[1].querySelector('input').value.trim();
        const updatedEmail = tds[2].querySelector('input').value.trim();

        if (!updatedName || !updatedPhone) {
            alert("Name and phone are required");
            tds[0].querySelector('input').focus();
            return;
        }

        if (updatedEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(updatedEmail)) {
            alert("Enter a valid email address");
            tds[2].querySelector('input').focus();
            return;
        }

        contact.name = updatedName;
        contact.phone = updatedPhone;
        contact.email = updatedEmail;

        saveContacts();
        displayContacts(contacts);
    });

    cancelBtn.addEventListener('click', () => {
        displayContacts(contacts);
    });

    // Focus name input
    tds[0].querySelector('input').focus();
}


function deleteContact(id){
    contacts = contacts.filter(contact => contact.id !== id);
    saveContacts();
    displayContacts(contacts);
}

function searchContacts(){
    const query = document.getElementById('search').value.toLowerCase();

    const filteredContacts = contacts.filter(contact => 
        contact.name.toLowerCase().includes(query) ||
        contact.phone.toLowerCase().includes(query) ||
        contact.email.toLowerCase().includes(query)
    );

    displayContacts(filteredContacts);
}