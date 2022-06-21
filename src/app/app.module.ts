import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClientComponent } from './client/client.component';
import { HttpClientModule } from '@angular/common/http';
import { StatutConsultationComponent } from './statut-consultation/statut-consultation.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    ClientComponent,
    StatutConsultationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
