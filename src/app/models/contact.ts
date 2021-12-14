// ============================================================================
//    Author: Kenneth Perkins
//    Date:   Dec 13, 2021
//    Taken From: http://programmingnotes.org/
//    File:  contacts.ts
//    Description: Data models representing a contact
// ============================================================================
export interface Geo {
    lat: string;
    lng: string;
}

export interface Address {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: Geo;
}

export interface Company {
    name: string;
    catchPhrase: string;
    bs: string;
}

export interface Contact {
    id: number;
    name: string;
    username: string;
    email: string;
    address: Address;
    phone: string;
    website: string;
    company: Company;
}