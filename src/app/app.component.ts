import { Component, OnInit } from '@angular/core';
import { ContactsApiService } from './services/api.service';
import { Contact } from './models/contact';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    title = 'angular-contact-app';

    contacts: Array<Contact> = [];
    contactsLoaded = false;

    constructor(private contactsApi: ContactsApiService) { }
   
    ngOnInit() {
        this.contactsApi.getAll().subscribe({
            next: (data) => {
                this.contacts = data;
                this.contactsLoaded = true;               
            },
            error: (error) => console.log(error)
        });        
    }    
 
    onAddContact(contact: Contact) {
        this.contactsApi.create(contact).subscribe({
            next: (data: Contact) => {
                let maxId = this.contacts.length > 0 ? 
                    this.contacts.reduce((a,b)=>a.id > b.id ? a : b).id
                    : 0;
                let nextId = maxId + 1;
                data.id = Math.max(nextId, data.id);
                this.contacts.push(data)
            },
            error: (error) => console.log(error)
        });
    }   
    
    onDeleteContact(id: number) {
        this.contactsApi.delete(id).subscribe({
            next: () => {
                let index = this.contacts.findIndex((x) => x.id == id);
                this.contacts.splice(index, 1);  
            },
            error: (error) => console.error(error)
        });       
    }

    onEditContact(data: any) {  
        let index = this.contacts.findIndex((x) => x.id == data.updatedContact.id);  
        this.contactsApi.update(data.updatedContact).subscribe({
            next: (data: Contact) => this.contacts[index] = data,
            error: (error) => {
                // Error will occur on server for non default entries.
                // Only show error message if they occur when editing default entries 
                if (data.updatedContact.id < 11) {
                    console.log(error);
                    this.contacts[index] = data.originalContact;
                    alert(`Error Occurred: Unable to update entry on the server, reverting changes. Please try again!`); 
                }                 
            }
        });          
    }    
}
