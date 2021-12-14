// ============================================================================
//    Author: Kenneth Perkins
//    Date:   Dec 13, 2021
//    Taken From: http://programmingnotes.org/
//    File:  api.service.ts
//    Description: Service connecting to the api to retrieve contacts
// ============================================================================
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Contact } from '../models/contact';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
    baseUrl = 'https://jsonplaceholder.typicode.com';

    constructor(protected http: HttpClient) { }

    getHeaders() {
        const headers = new HttpHeaders()
        .set('X-Auth', 'authKey'); 
        return headers;         
    }      
}

@Injectable({
    providedIn: 'root'
})
export class ContactsApiService extends ApiService {
    getAll() {
        const params = new HttpParams() 
            .set('page', '1') 
            .set('pageSize', '10');        
        return this.http.get<Contact[]>(`${this.baseUrl}/users`, {params});           
    }

    get(id: number) {
        return this.http.get<Contact>(`${this.baseUrl}/users/${id}`);           
    }    

    create(contact: Contact) {
        const headers = this.getHeaders();
        return this.http.post<Contact>(`${this.baseUrl}/users`, contact, {headers});
    }

    update(contact: Contact) {
        const headers = this.getHeaders();        
        return this.http.put<Contact>(`${this.baseUrl}/users/${contact.id}`, contact, {headers});
    } 
    
    delete(id: number) {
        const headers = this.getHeaders();      
        return this.http.delete(`${this.baseUrl}/users/${id}`, {headers});
    }    
}