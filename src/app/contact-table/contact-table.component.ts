import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Contact } from '../models/contact';

@Component({
  selector: 'app-contact-table',
  templateUrl: './contact-table.component.html',
  styleUrls: ['./contact-table.component.css']
})
export class ContactTableComponent implements OnInit {
    @Input()
    contacts!: Array<Contact>;    

    @Output('deleteContact')
    deleteContactEmitter = new EventEmitter();

    @Output('editContact')
    editContactEmitter = new EventEmitter();

    editing: number | null = null;

    cachedContact = {} as Contact | null;

    constructor() { }

    ngOnInit(): void {
    }

    getRowClasses(id: number) {
        return {
            'editing': this.isEditing(id)
        };
    }

    isEditing(id: number) {
        return this.editing === id;
    }

    onCancelEdit(contact: any) {
        Object.assign(contact, this.cachedContact);
        this.cachedContact = null;
        this.editing = null;
    }

    onBeginEdit(contact: any) {
        if (this.editing != null && this.editing != contact.id) {
            let prevEmp = this.contacts.find((x) => x.id == this.editing);
            if (prevEmp != null) {
                this.onCancelEdit(prevEmp);
            }
        }
        this.cachedContact = Object.assign({}, contact);
        this.editing = contact.id;
    }

    onEditContact(contact: any) {        
        if (contact.name === '' || contact.email === '') return;
        this.editContactEmitter.emit({
            updatedContact: contact, 
            originalContact: Object.assign({}, this.cachedContact)
        });
        this.cachedContact = null;
        this.editing = null;        
    }

    onDeleteContact(contact: any) {
        if (!confirm(`Are you sure you want to delete ${contact.name}?`)) {
            return;
        }
        this.deleteContactEmitter.emit(contact.id);
    }    

}
