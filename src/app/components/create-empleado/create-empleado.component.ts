import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EmpleadoService } from 'src/app/services/empleado.service';

@Component({
  selector: 'app-create-empleado',
  templateUrl: './create-empleado.component.html',
  styleUrls: ['./create-empleado.component.css']
})
export class CreateEmpleadoComponent implements OnInit {
    createEmpleado: FormGroup;
    submitted = false;
    id: string | null;
    titulo = 'Agregar Empleado';
    bandera =false;


  constructor(private fb: FormBuilder,
    private _empleadoService: EmpleadoService,
    private router: Router,
    private toastr: ToastrService,
    private aRoute: ActivatedRoute
    ) { 
    this.createEmpleado = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      documento: ['', Validators.required],
      salario: ['', Validators.required]

    })
    this.id = this.aRoute.snapshot.paramMap.get('id');
   // console.log(this.id);
  }

  ngOnInit(): void {
    this.esEditar();
  }
  agregarEditarEmpleado(){
    this.submitted=true;
  
    if(this.createEmpleado.invalid){
      return;

    }
    if (this.id == null) {
      this.agregarEmpleado();
      
    }else{
      this.editarEmpleado(this.id);
    }
   
    
  }
  // mayuscula(string campo){
  //   const adon: any={
  //      campo: this.createEmpleado.value.nombre,
      
  //   }
  //  console.log(adon);
   
  // }

  

  agregarEmpleado(){
    const Nombre1= this.createEmpleado.value.nombre
    const Apellido1= this.createEmpleado.value.apellido
    const Salario1= this.createEmpleado.value.salario
    const Documento1= this.createEmpleado.value.documento

    const Mnombre= Nombre1[0].toUpperCase() + Nombre1.substr(1).toLowerCase();
    const Mapellido= Apellido1[0].toUpperCase() + Apellido1.substr(1).toLowerCase();
    if ( isNaN(Salario1) ){
        return Salario1;
    }
  
    
    
    const empleado: any={
      nombre: Mnombre,
      apellido: Mapellido,
      documento: this.createEmpleado.value.documento,
      salario: this.createEmpleado.value.salario,
      fechaCreacion: new Date(),
      fechaActualizacion: new Date(),

      
    }
    //console.log(empleado.nombre);
    this._empleadoService.agregarEmpleado(empleado).then(() =>{
      this.toastr.success('el empleado fue registrado con exito','Empleado registrado',{
        positionClass: 'toast-bottom-right'
      });
      this.router.navigate(["/list-empleados"]);
    }).catch(error =>{
      console.log(error);
    })
  }
  editarEmpleado(id: string){
    const empleado: any={
      nombre: this.createEmpleado.value.nombre,
      apellido: this.createEmpleado.value.apellido,
      documento: this.createEmpleado.value.documento,
      salario: this.createEmpleado.value.salario,
      
      fechaActualizacion: new Date()
    }
    this._empleadoService.actualizarEmpleado(id, empleado).then(() => 
    this.toastr.info("el empleado fue modificado con exito","empleado modificado",
    {
      positionClass: 'toast-bottom-right'
    }))
    this.router.navigate(["/list-empleados"]);
  }

  esEditar(){
    this.titulo = 'Editar Empleado';
    if(this.id !== null){
      this._empleadoService.getEmpleado(this.id).subscribe(data =>{
        console.log(data);
        this.createEmpleado.setValue({
          nombre: data.payload.data()['nombre'],
          apellido: data.payload.data()['apellido'],
          documento: data.payload.data()['documento'],
          salario: data.payload.data()['salario'],

        })
      })
    }
  }

}
