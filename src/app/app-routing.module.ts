import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactDetailsComponent } from './home/contact-details/contact-details.component';
import { ContactListComponent } from './home/contact-list/contact-list.component';
import { ContentComponent } from './home/content/content.component';

const routes: Routes = [

];

@NgModule({
  imports: [
    RouterModule.forRoot([
      {
        path: 'home',
        component: ContentComponent
      },
      {
        path: 'contact-list',
        component: ContactListComponent },
      {
        path: 'contact-list/:id',
        component: ContactDetailsComponent
      },
      { path: '**', redirectTo: 'home' }
    ])
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
