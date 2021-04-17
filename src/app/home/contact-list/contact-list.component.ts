import {Component, OnInit} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Subscription} from 'rxjs';
import {ContactsService} from 'src/app/services/contacts/contacts.service';
import {HomeService} from 'src/app/services/home.service';
import {Contact} from 'src/app/_models/contact/contact.model';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  contactList: Subscription;
  contacts: Contact[] = [];
  contactDefaultLink = 'https://image.shutterstock.com/image-vector/person-icon-jpg-260nw-396004804.jpg';

  constructor(
    private contactService: ContactsService,
    private homeService: HomeService
  ) {
  }

  ngOnInit(): void {
    this.getContactList();
  }

  ngOnDestroy() {
    this.contactList.unsubscribe();
  }

  getContactList(): void {
    this.contactList = this.contactService.getContacts().subscribe(
      response => {
        this.contacts = response;
      },
      err => {
        // TODO: handle error
      }
    );
  }

  addNewContact(fullName: HTMLInputElement): void {
    const firstName = fullName.value?.split(' ')[0];
    const lastName = fullName.value?.split(' ')[1];
    this.contactService.addNewContact(firstName, lastName).subscribe(
      response => {
        this.homeService.openSnackBar('Success', 'New contact is created!', 5000);
        this.getContactList();
      },
      error => {
        // TODO: handle error
      }
    );
  }


}
