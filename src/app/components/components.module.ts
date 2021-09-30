import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppModule } from '../app.module';
import { NavbarComponent } from './navbar/navbar.component';
import { AppComponent } from '../app.component';
import { AuthGuard } from '../guards/auth.guard';
import { GuardsModule } from '../guards/guards.module';

 

@NgModule({
  declarations: [
   
    
  ],
  imports: [
    CommonModule,
    
    
  ],
  exports: [
    
  ]
})
export class ComponentsModule { }
