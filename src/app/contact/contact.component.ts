import { Component, OnInit, inject } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [NgFor, FormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent implements OnInit {
  contacts: any[] = [];
  contactForm: any = { id: null, name: '', email: '', phone: '' };
  isEditing: boolean = false;

  private contactService = inject(ContactService);

  ngOnInit(): void {
    this.loadContacts();
  }

  loadContacts(): void {
    this.contacts = this.contactService.getContacts();
  }

  saveContact(): void {
    if (this.isEditing) {
      this.contactService.updateContact(this.contactForm);
    } else {
      this.contactForm.id = Date.now();
      this.contactService.addContact(this.contactForm);
    }
    this.resetForm();
    this.loadContacts();
  }

  resetForm(): void {
    this.contactForm = { id: null, name: '', email: '', phone: '' };
    this.isEditing = false;
  }

  editContact(contact: any): void {
    this.contactForm = { ...contact };
    this.isEditing = true;
  }

  deleteContact(id: number): void {
    this.contactService.deleteContact(id);
    this.loadContacts();
  }
}

