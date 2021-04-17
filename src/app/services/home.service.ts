import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiSettings } from '../api-settings';
import { Contact } from '../_models/contact/contact.model';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(  private _snackBar: MatSnackBar ) { }

  openSnackBar(message: string, action: string, duration?: number) {
    this._snackBar.open(message, action, {
      duration: duration ? duration : 2000,
    });
  }

}
