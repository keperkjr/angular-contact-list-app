import { Component, OnInit } from '@angular/core';
import { ContactApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    title = 'angular-contact-app';

    contacts: Array<any> = [];

    constructor(private contactApiService: ContactApiService) { }
   
    ngOnInit() {
        this.contactApiService.getAll().subscribe({
            next: (data) => this.contacts = data,
            error: (error) => console.log(error)
        });        
    }    
 
    onAddContact(contact: any) {
        this.contactApiService.create(contact).subscribe({
            next: (data: any) => {
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
        this.contactApiService.delete(id).subscribe({
            next: () => {
                let index = this.contacts.findIndex((x) => x.id == id);
                this.contacts.splice(index, 1);  
            },
            error: (error) => console.error(error)
        });       
    }

    onEditContact(data: any) {  
        let index = this.contacts.findIndex((x) => x.id == data.updatedContact.id);  
        this.contactApiService.update(data.updatedContact).subscribe({
            next: (data: any) => this.contacts[index] = data,
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
