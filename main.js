document.addEventListener('DOMContentLoaded', () => {
    let contactsWrapper = document.querySelector('#contactsWrapper');

    // bottoni
    let showContactsBtn = document.querySelector('#showContactsBtn');
    let addContactBtn = document.querySelector('#addContactBtn');

    // inputs
    let nameInput = document.querySelector('#nameInput');
    let numberInput = document.querySelector('#numberInput');

    // variabile d'appoggio
    let check = false;

    const rubrica = {
        lista_contatti: [
            { contact_name: 'Marco', phone_number: 333333333 },
            { contact_name: 'Luigi', phone_number: 444444444 },
            { contact_name: 'Paolo', phone_number: 555555555 },
        ],

        showContacts: function () {
            contactsWrapper.innerHTML = "";
            this.lista_contatti.forEach((contatto, i) => {
                let div = document.createElement('div');
                div.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
                div.innerHTML = `
                    <span><strong>${contatto.contact_name}</strong> - ${contatto.phone_number}</span>
                    <span>
                        <i class="fa-solid fa-pen edit-icon me-2" data-index="${i}"></i>
                        <i class="fa-solid fa-trash-can icon" data-index="${i}"></i>
                    </span>
                `;

                contactsWrapper.appendChild(div);

                // icone per cancellare
                let deleteIcon = div.querySelector('.icon');
                deleteIcon.addEventListener('click', () => {
                    this.lista_contatti.splice(i, 1);
                    this.showContacts();
                });

                // icone per modificare
                let editIcon = div.querySelector('.edit-icon');
                editIcon.addEventListener('click', () => {
                    let newName = prompt("Modifica nome:", contatto.contact_name);
                    let newNumber = prompt("Modifica numero:", contatto.phone_number);
                    if (newName && newNumber) {
                        this.lista_contatti[i].contact_name = newName;
                        this.lista_contatti[i].phone_number = newNumber;
                        this.showContacts();
                    }
                });
            });
        },

        addContact: function (newName, newNumber) {
            if (newName && newNumber) {
                this.lista_contatti.push({ contact_name: newName, phone_number: newNumber });
                this.showContacts();
                nameInput.value = '';
                numberInput.value = '';

                if (check == false) {
                    check = true;
                    showContactsBtn.innerHTML = 'Nascondi Contatti';
                }
            } else {
                alert('Devi inserire sia nome che numero');
            }
        }
    };

    showContactsBtn.addEventListener('click', () => {
        if (check == false) {
            rubrica.showContacts();
            check = true;
            showContactsBtn.innerHTML = 'Nascondi Contatti';
        } else {
            contactsWrapper.innerHTML = '';
            check = false;
            showContactsBtn.innerHTML = 'Mostra Contatti';
        }
    });

    addContactBtn.addEventListener('click', () => {
        rubrica.addContact(nameInput.value, numberInput.value);
    });
});
