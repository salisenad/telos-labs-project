import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {ApiSettings} from 'src/app/api-settings';
import {Contact} from 'src/app/_models/contact/contact.model';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  constructor(private http: HttpClient) {
  }


  getContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(ApiSettings.url + 'contacts').pipe(
      map(
        success => {
          const contacts: Contact[] = success.map((contact: {}) => new Contact(contact));
          return contacts;
        },
        (error: string) => {
          return error;
        }
      )
    );
  }


  getContactById(contactId: number): Observable<Contact> {
    return this.http.get<any>(ApiSettings.url + 'contacts/' + contactId).pipe(
      map(
        success => {
          return new Contact(success);
        },
        (error: string) => {
          return error;
        }
      )
    );
  }


  addNewContact(firstName: string, lastName: string): Observable<Contact> {
    return this.http.post<any>(ApiSettings.url + 'contacts', {first_name: firstName, last_name: lastName}).pipe(
      map(
        success => {
          return new Contact(success);
        },
        (error: string) => {
          return error;
        }
      )
    );
  }

}
