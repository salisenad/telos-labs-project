import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';
import {AddressesService} from 'src/app/services/addresses/addresses.service';
import {ContactsService} from 'src/app/services/contacts/contacts.service';
import {CountriesService} from 'src/app/services/countries/countries.service';
import {Address} from 'src/app/_models/address/address.model';
import {Contact} from 'src/app/_models/contact/contact.model';
import {Country} from 'src/app/_models/country/country.model';
import {MatSnackBar} from '@angular/material/snack-bar';
import {HomeService} from 'src/app/services/home.service';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.css']
})
export class ContactDetailsComponent implements OnInit {
  contact: Contact;
  countries: Country[];
  contactId: number;
  addressForm: FormGroup;
  addresses: FormArray;
  isSaveButtonDisabled = false;
  defaultAvatarLink = 'https://image.shutterstock.com/image-vector/person-icon-jpg-260nw-396004804.jpg';
  constructor(
    private route: ActivatedRoute,
    private contactService: ContactsService,
    private addressService: AddressesService,
    private countriesService: CountriesService,
    private homeService: HomeService,
    private _snackBar: MatSnackBar,
    private formBuilder: FormBuilder
  ) {
    this.contactId = this.route.snapshot.params.id;
  }


  ngOnInit(): void {
    this.getContactById(this.contactId);
    this.getCountries();
    this.addressForm = this.formBuilder.group({
      addresses: this.formBuilder.array([])
    });
  }


  getContactById(contactId: number): void {
    this.contactService.getContactById(contactId).subscribe(
      response => {
        this.contact = response;
        this.getAddresses();
      }, (error: any) => {
        // TODO: handle error
      }
    );
  }

  getCountries(): void {
    this.countriesService.getCountries().subscribe(
      response => {
        this.countries = response;
      }, error => {
        // TODO: handle error
      }
    );
  }


  getAddresses(): void {
    this.addressService.getAddresses().subscribe(
      response => {
        for (const item of response) {
          if (item.contactId === this.contactId.toString()) {
            this.addAddress(item);
          }
        }
      },
      error => {
        // TODO: handle error
      }
    );
  }


  addAddress(address?: Address): void {
    this.addresses = this.addressForm.get('addresses') as FormArray;
    this.addresses.push(this.formBuilder.group({
      id: address ? address.id : '',
      street1: address ? address.street1 : '',
      street2: address ? address.street2 : '',
      town: address ? address.town : '',
      country: address ? address.country : ''
    }));
  }


  onSubmit(): void {
    this.isSaveButtonDisabled = false;
    const adds = this.addressForm.value.addresses;

    /**
     * based on documentation json-server doesn't support update
     * So to simulate update I first delete the address and then insert it
     */
    for (const address of adds) {
      if (address.id !== '') {
        this.deleteAddress(address);
      }
    }
    this.clearAddressesForm();
    for (const address of adds) {
      this.addressService.addNewAddress(address, this.contactId).subscribe(
        response => {
          this.addresses.push(this.formBuilder.group(response));
          this.homeService.openSnackBar('Success', 'Changes on addresses are saved!');
        },
        error => {
          this.homeService.openSnackBar('Error', 'Something went wrong!');
        }
      );
    }

  }


  deleteAddress(address, index?): void {
    this.addressService.deleteAddressById(address.id).subscribe(
      res => {
        const addresss = this.addressForm.get('addresses') as FormArray;
        addresss.removeAt(index);
        this.homeService.openSnackBar('Success', 'Address is deleted successfully!');
      },
      error => {
        // TODO: handle error
      }
    );
  }

  clearAddressesForm(): void {
    (this.addressForm.controls.addresses as FormArray).clear();
  }


}
