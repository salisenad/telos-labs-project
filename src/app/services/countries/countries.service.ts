import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiSettings } from 'src/app/api-settings';
import { Country } from 'src/app/_models/country/country.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class CountriesService {

  constructor( private http: HttpClient ) { }

  getCountries(): Observable<Country[]> {
    return this.http.get<Country[]>( ApiSettings.url + 'countries' ).pipe(
        map(
            success => {
                const countries: Country[] = success.map( (contry: {} ) => new Country( contry ) );
                return countries;
            },
            ( error: string ) => {
                return error;
            }
        )
    )
}
}
