class ClientManager {
    constructor() {
        this.token = this.getTokenFromCookie();
        this.data = [];
        document.addEventListener('DOMContentLoaded', () => this.init());
    }

    init() {
        document.getElementById('add-person-btn').addEventListener('click', () => this.addPerson());
        document.getElementById('search-input').addEventListener('input', (event) => this.searchClients(event));
        document.getElementById('add-tab').addEventListener('click', () => this.showTab('add-person-tab'));
        document.getElementById('list-tab').addEventListener('click', () => this.showTab('list-clients-tab', true));
        this.showTab('list-clients-tab', true);
    }

    getTokenFromCookie() {
        const token = document.cookie.split(';').map(cookie => cookie.trim().split('=')).find(([name]) => name === 'token');
        return token ? token[1] : null;
    }

    addPerson() {
        const name = document.getElementById('name').value;
        const numero = document.getElementById('numero').value;        
        const email = document.getElementById('email').value;
        
        this.add_people(name, numero, email)
    }

    searchClients(event) {
        const searchInput = event.target.value.toLowerCase();
        const filteredClients = this.data.filter(client => client.name.toLowerCase().includes(searchInput));
        this.updateClientList(filteredClients);
    }

    loadClientList() {
        fetch(`/data`, {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${this.token}` }
        })
        .then(response => response.ok ? response.json() : Promise.reject('Erreur lors de la récupération de la liste des clients.'))
        .then(data => {
            this.data = data;
            this.updateClientList(data);
        })
        .catch(error => {
            console.error(error);
            alert(error);
        });
    }

    updateClientList(clients) {
        const clientListDiv = document.getElementById('list-client');
        clientListDiv.innerHTML = '';
        clients.forEach(client => clientListDiv.appendChild(this.createClientCard(client)));
    }

    showTab(tabId, loadList = false) {
        ['add-person-tab', 'list-clients-tab'].forEach(id => this.hideElement(id));
        document.getElementById(tabId).classList.remove('d-none');
        if (tabId === 'list-clients-tab') this.showElement('search-input');
        else this.hideElement('search-input');
        if (loadList) this.loadClientList();
    }

    hideElement(id) {
        document.getElementById(id).classList.add('d-none');
    }

    showElement(id) {
        document.getElementById(id).classList.remove('d-none');
    }

    add_people(name, numero, email) {
        const clientData = {
            action: 'add-people',
            name,
            numero,
            email
        };

        fetch('/data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.token}`
            },
            body: JSON.stringify(clientData)
        })
        .then(response => response.ok ? response.text() : Promise.reject(response.statusText))
        .then(data => console.log('Client ajouté avec succès :', data))
        .catch(error => console.error('Erreur lors de l\'ajout du client :', error));
    }

    remove_people(name) {
        const clientData = {
            action: 'remove-people',
            name
        };
    
        fetch('/data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.token}`
            },
            body: JSON.stringify(clientData)
        })
        .then(response => response.ok ? response.text() : Promise.reject(response.statusText))
        .then(data => console.log('Client supprimé avec succès :', data))
        .catch(error => console.error('Erreur lors de la suppression du client :', error));
    }

    update_people(name, numero, email) {
        const clientData = {
            action: 'update-people',
            name,
            numero,
            email
        };
    
        fetch('/data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.token}`
            },
            body: JSON.stringify(clientData)
        })
        .then(response => response.ok ? response.text() : Promise.reject(response.statusText))
        .then(data => console.log('Client ajouté avec succès :', data))
        .catch(error => console.error('Erreur lors de l\'ajout du client :', error));
    }

    add_appointment(name, date) {
        const clientData = {
            action: 'add-appointment',
            name,
            index: {
                date
            }
        };

        fetch('/data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.token}`
            },
            body: JSON.stringify(clientData)
        })
        .then(response => response.ok ? response.text() : Promise.reject(response.statusText))
        .then(data => console.log('Render-vous ajouté avec succès :', data))
        .catch(error => console.error('Erreur lors de l\'ajout du render-vous :', error));
    };

    remove_appointment(name, rdv) {
        const clientData = {
            action: 'remove-appointment',
            name,
            index: {
                rdv,
            }
        };
    
        fetch('/data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.token}`
            },
            body: JSON.stringify(clientData)
        })
        .then(response => response.ok ? response.text() : Promise.reject(response.statusText))
        .then(data => console.log('Rendez-vous supprimé avec succès :', data))
        .catch(error => console.error('Erreur lors de la suppression du rendez-vous pour le client :', error));
    }

    update_appointment(name, rdv, date) {
        const clientData = {
            action: 'update-appointment',
            name,
            index: {
                rdv,
                date
            }
        };
    
        fetch('/data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.token}`
            },
            body: JSON.stringify(clientData)
        })
        .then(response => response.ok ? response.text() : Promise.reject(response.statusText))
        .then(data => console.log('Rendez-vous changer avec succès :', data))
        .catch(error => console.error('Erreur lors du changement du rendez-vous pour le client :', error));
    }

    createClientCard(client) {
        const clientCard = document.createElement('div');
        clientCard.classList.add('card', 'mb-3');
    
        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');
    
        const cardTitle = document.createElement('h5');
        cardTitle.classList.add('card-title');
        cardTitle.textContent = client.name;
    
        const addAppointmentButton = this.createButton('➕', () => this.showAddAppointmentPopup(client));
        cardTitle.appendChild(addAppointmentButton);
    
        const editClientButton = this.createButton('✎', () => this.showEditClientPopup(client));
        cardTitle.appendChild(editClientButton);
    
        cardTitle.addEventListener('mouseover', () => this.showButtons(addAppointmentButton, editClientButton));
        cardTitle.addEventListener('mouseout', () => this.hideButtons(addAppointmentButton, editClientButton));
    
        const clientDetails = this.createClientDetails(client);
    
        cardBody.appendChild(cardTitle);
        cardBody.appendChild(clientDetails);
        clientCard.appendChild(cardBody);
    
        return clientCard;
    }

    showButtons(...buttons) {
        buttons.forEach(button => button.style.display = 'inline-block');
    }

    hideButtons(...buttons) {
        buttons.forEach(button => button.style.display = 'none');
    }

    showAddAppointmentPopup(client) {
        const overlay = this.createOverlay();
        const popupContent = this.createPopupContent();
        const popupHeader = this.createPopupHeader(`Ajouter un rendez-vous pour ${client.name}`);
        const popupBody = document.createElement('div');
        popupBody.classList.add('modal-body');
    
        const dateLabel = this.createLabel('Date:', 'appointmentDateInput');
        const appointmentDateInput = this.createInput('date', 'form-control');
    
        const addButton = this.createButton('Ajouter', () => {
            const date = appointmentDateInput.value;
            if (date) {
                this.add_appointment(client.name, date);
                setTimeout(() => this.loadClientList(), 250);
                this.closePopup(popup, overlay);
            } else {
                alert('Veuillez sélectionner une date pour le rendez-vous.');
            }
        });
    
        popupBody.appendChild(dateLabel);
        popupBody.appendChild(appointmentDateInput);
        popupContent.appendChild(popupHeader);
        popupContent.appendChild(popupBody);
        popupContent.appendChild(addButton);
        const popup = this.createPopup(popupContent);
        document.body.appendChild(overlay);
        document.body.appendChild(popup);
    }

    showEditClientPopup(client) {
        const overlay = this.createOverlay();
        const popupContent = this.createPopupContent();
        const popupHeader = this.createPopupHeader(`Modifier les informations de ${client.name}`);
        const popupBody = document.createElement('div');
        popupBody.classList.add('modal-body');
    
        const nameLabel = this.createLabel('Nom:', 'clientNameInput');
        const clientNameInput = this.createInput('text', 'form-control', client.name);
    
        const saveButton = this.createButton('Enregistrer', () => {
            const newName = clientNameInput.value.trim();
            if (newName) {
                this.updateClientName(client.name, newName);
                setTimeout(() => this.loadClientList(), 250);
                this.closePopup(popup, overlay);
            } else {
                alert('Veuillez entrer un nouveau nom pour le client.');
            }
        });
    
        popupBody.appendChild(nameLabel);
        popupBody.appendChild(clientNameInput);
        popupContent.appendChild(popupHeader);
        popupContent.appendChild(popupBody);
        popupContent.appendChild(saveButton);
        const popup = this.createPopup(popupContent);
        document.body.appendChild(overlay);
        document.body.appendChild(popup);
    }

    createClientDetails(client) {
        const clientDetails = document.createElement('ul');
        clientDetails.classList.add('list-group', 'list-group-flush');
        if (client.appointments && client.appointments.length > 0) {
            client.appointments.forEach(appointment => {
                const listItem = document.createElement('li');
                listItem.classList.add('list-group-item');
                const date = new Date(appointment.date);
                const formattedDate = `${date.getDate().toString().padStart(2, '0')}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getFullYear().toString().padStart(4, '0')}`;
                const appointmentDetails = `Rendez-vous le ${formattedDate}`;
                listItem.textContent = appointmentDetails;
                clientDetails.appendChild(listItem);
            });
        }
        return clientDetails;
    }

    createOverlay() {
        const overlay = document.createElement('div');
        overlay.classList.add('overlay');
        return overlay;
    }

    createPopupContent() {
        const popupContent = document.createElement('div');
        popupContent.classList.add('popup', 'modal-dialog', 'modal-dialog-centered');
        popupContent.setAttribute('role', 'document');
        return popupContent;
    }

    createPopupHeader(title) {
        const popupHeader = document.createElement('div');
        popupHeader.classList.add('modal-header');
        const popupTitle = document.createElement('h4');
        popupTitle.classList.add('client-name');
        popupTitle.textContent = title;
        popupHeader.appendChild(popupTitle);
        const closeButton = document.createElement('button');
        closeButton.classList.add('btn', 'btn-danger', 'close');
        closeButton.setAttribute('type', 'button');
        closeButton.setAttribute('data-dismiss', 'modal');
        closeButton.innerHTML = '&times;';
        closeButton.addEventListener('click', () => this.closePopup(popup, overlay));
        popupHeader.appendChild(closeButton);
        return popupHeader;
    }

    createLabel(text, forId) {
        const label = document.createElement('label');
        label.textContent = text;
        label.setAttribute('for', forId);
        return label;
    }

    createInput(type, className, value = '') {
        const input = document.createElement('input');
        input.classList.add(className);
        input.setAttribute('type', type);
        input.value = value;
        return input;
    }

    createButton(text, onClick) {
        const button = document.createElement('button');
        button.classList.add('btn', 'btn-primary');
        button.textContent = text;
        button.addEventListener('click', onClick);
        return button;
    }

    createPopup(content) {
        const popup = document.createElement('div');
        popup.classList.add('popup', 'modal-dialog', 'modal-dialog-centered');
        popup.setAttribute('role', 'document');
        popup.appendChild(content);
        console.log(popup.style)
        return popup;
    }

    closePopup(popup, overlay) {
        popup.remove();
        overlay.remove();
    }
}

new ClientManager();
