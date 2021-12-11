import { Component, EventEmitter, OnInit, Output, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit {

    contact = {
        name: '',
        email: ''
    };

    submitting = false;
    error = false;
    success = false;

    @Output('addContact')
    addContactEmitter = new EventEmitter();

    @ViewChild("contactName")
    contactNameRef!: ElementRef;

    constructor() { }

    ngOnInit(): void {
    }

    onAddContact() {
        this.submitting = true
        this.clearStatus()
    
        if (this.invalidName() || this.invalidEmail()) {
            this.error = true
            return
        }
        
        this.addContactEmitter.emit(this.contact);
        this.contactNameRef.nativeElement.focus();

        this.contact = {
            name: '',
            email: '',
        };
        this.error = false;
        this.success = true;
        this.submitting = false;   
        
        setTimeout(() => {
            this.clearStatus();
        }, 3000);
    }

    clearStatus() {
        this.success = false;
        this.error = false;
    }    

    invalidName() {
        return this.contact.name == '';
    }

    invalidEmail() {
        return this.contact.email == '';
    }

}
