import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {ApiSettings} from 'src/app/api-settings';
import {Address} from 'src/app/_models/address/address.model';

@Injectable({
  providedIn: 'root'
})
export class AddressesService {

  constructor(private http: HttpClient) {
  }

  // get all addresses
  getAddresses(): Observable<Address[]> {
    return this.http.get<Address[]>(ApiSettings.url + 'addresses').pipe(
      map(
        success => {
          const addresses: Address[] = success.map((address: {}) => new Address(address));
          return addresses;
        },
        (error: string) => {
          return error;
        }
      )
    );
  }


  // add new address
  addNewAddress(address: any, contactId: string | number): Observable<Address> {
    return this.http.post<Address>(ApiSettings.url + 'contacts/' + contactId + '/addresses', address).pipe(
      map(
        response => {
          console.log("addNewAddress", response)
          console.log("new Addresses(response);", new Address(response))
          return new Address(response);
        },
        (error: string) => {
          return error;
        }
      )
    );
  }


  deleteAddressById(addressId: number): Observable<any> {
    return this.http.delete(ApiSettings.url + 'addresses/' + addressId).pipe(
      map(
        res => {
          return res;
        },
        (err: any) => {
          return err;
        }
      )
    );
  }

}
