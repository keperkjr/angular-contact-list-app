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
        .set('X-Auth', 'userId'); 
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

    get(id:number) {        
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