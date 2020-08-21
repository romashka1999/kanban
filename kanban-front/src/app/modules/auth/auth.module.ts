import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule, AUTH_ROUTING_COMPONENTS } from './auth-routing.module';
import { MaterialModule } from '../../shared/material/material.module';



@NgModule({
  declarations: [
    ...AUTH_ROUTING_COMPONENTS
  ],
  imports: [
    CommonModule,
    MaterialModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }
