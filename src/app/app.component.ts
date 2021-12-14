// ============================================================================
//    Author: Kenneth Perkins
//    Date:   Dec 13, 2021
//    Taken From: http://programmingnotes.org/
//    File:  app.component.ts
//    Description: App component typescript
// ============================================================================
import { Component, OnInit } from '@angular/core';
import { ContactsApiService } from './services/api.service';
import { Contact } from './models/contact';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    title = 'My Programming Notes - Angular Contact List';

    contacts: Array<Contact> = [];
    contactsLoaded = false;
    baseUrl: string;

    constructor(private contactsApi: ContactsApiService) { 
        this.baseUrl = location.href;
    }
   
    ngOnInit() {
        this.contactsApi.getAll().subscribe({
            next: (data) => {
                this.contacts = data;         
            },
            error: (error) => {
                console.log(error);
                alert(`Error Occurred: Unable to fetch data from api. Please try again!`); 
            },
        }).add(() => {
            this.contactsLoaded = true           
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
            error: (error) => {
                console.log(error);
                alert(`Error Occurred: Unable to create contact on the api. Please try again!`); 
            }
        });
    }   
    
    onDeleteContact(contact: Contact) {
        this.contactsApi.delete(contact.id).subscribe({
            next: () => {
                let index = this.contacts.findIndex((x) => x.id == contact.id);
                this.contacts.splice(index, 1); 
                setTimeout(() => {
                    alert(`${contact.name} removed!`);
                }, 50); 
            },
            error: (error) => {
                console.log(error);
                alert(`Error Occurred: Unable to delete contact on the api. Please try again!`); 
            }
        });       
    }

    onEditContact(info: any) {  
        let index = this.contacts.findIndex((x) => x.id == info.updated.id);
        let errorOccurred = false;
        this.contactsApi.update(info.updated).subscribe({
            next: (data: Contact) => {
                this.contacts[index] = data;
            },
            error: (error) => {
                // Error will occur on server when updating non default api entries.
                // Only show error message if they occur when updating default entries 
                if (info.updated.id < 11) {
                    errorOccurred = true;
                    console.log(error);
                    this.contacts[index] = info.original;
                    alert(`Error Occurred: Unable to update entry on the server, reverting changes. Please try again!`); 
                }
            }
        }).add(() => {
            if (!errorOccurred) {
                alert(`${info.updated.name} updated!`);
            }            
        });          
    }    
}
