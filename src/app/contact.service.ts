import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private storageKey = 'contacts';

  constructor() {}

  getContacts(): any[] {
    return JSON.parse(localStorage.getItem(this.storageKey) || '[]');
  }

  addContact(contact: any): void {
    const contacts = this.getContacts();
    contacts.push(contact);
    localStorage.setItem(this.storageKey, JSON.stringify(contacts));
  }

  updateContact(updatedContact: any): void {
    let contacts = this.getContacts();
    const index = contacts.findIndex((c) => c.id === updatedContact.id);
    if (index !== -1) {
      contacts[index] = updatedContact;
      localStorage.setItem(this.storageKey, JSON.stringify(contacts));
    }
  }

  deleteContact(id: number): void {
    let contacts = this.getContacts().filter((c) => c.id !== id);
    localStorage.setItem(this.storageKey, JSON.stringify(contacts));
  }
}
