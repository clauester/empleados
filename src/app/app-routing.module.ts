import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateEmpleadoComponent } from './components/create-empleado/create-empleado.component';
import { ListEmpleadosComponent } from './components/list-empleados/list-empleados.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
      {path: '', redirectTo: 'list-empleados', pathMatch: 'full'},
      {path: 'list-empleados', component: ListEmpleadosComponent},
      {path: 'create-empleados', component: CreateEmpleadoComponent, canActivate: [AuthGuard] },
      {path: 'editempleado/:id', component: CreateEmpleadoComponent},

      {path: '**', redirectTo: 'list-empleados', pathMatch: 'full'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
