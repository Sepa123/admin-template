import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subject, Subscription, skipUntil, startWith, switchMap } from 'rxjs';
import { PesoVolumetricoService } from '../../../service/peso-volumetrico.service';
import { PesoVolumetrico } from '../../../models/peso-volumetrico.interface';
import { debounceTime, filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-peso-volumetrico',
  templateUrl: './peso-volumetrico.component.html',
  styleUrls: ['./peso-volumetrico.component.scss'],
})
export class PesoVolumetricoComponent implements OnInit {
  filteredOptions!: Observable<any[]>;
  myControl = new FormControl();
  public isloading = false;
  subReporte!: Subscription;
  arrayFiltered = [this.filteredOptions];
  tableData: PesoVolumetrico[] = [];
  selectControl = new FormControl();
  filteredOptionsData: any[] = [];

  descripcionSeleccionada: string = '';

  private searchSubject = new Subject<string>();
  
  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private pv: PesoVolumetricoService
  ) {}
  form: FormGroup | any;

  hideSuggestions() {
    setTimeout(() => {
      this.isloading = false;
    }, 200);
  }

  // selectOption(event: Event) {
  //   const selectElement = event.target as HTMLSelectElement;
  //   if (selectElement) {
  //     const selectedSku = selectElement.value;

  //     this.filteredOptions.subscribe((options) => {
  //       const selectedOption = options.find(
  //         (option) => option.sku === selectedSku
  //       );

  //       console.log(this.selectOption);
  //       if (selectedOption) {
  //         console.log(this.selectOption);
  //         const selectedSku = selectElement.value;
  //         this.form.patchValue({
  //           sku: selectedOption.Sku,
  //           descripcion: selectedOption.descripcion,
  //           alto: selectedOption.alto,
  //           ancho: selectedOption.ancho,
  //           profundidad: selectedOption.profundidad,
  //           peso_kg: selectedOption.peso_kg,
  //           bultos: selectedOption.bultos,
  //         });

  //         this.isloading = false;
  //       }
  //     });
  //   }
  // }

  ngOnInit(): void {
    this.form = this.fb.group({
      sku: ['', Validators.required],
      descripcion: ['', Validators.required],
      alto: ['', Validators.required],
      ancho: ['', Validators.required],
      profundidad: ['', Validators.required],
      peso_kg: ['', Validators.required],
      bultos: ['', Validators.required],
    });
    

    this.loadDataOnInit();
    

    this.filteredOptions = this.myControl.valueChanges.pipe(
       startWith(''),
       switchMap((value) => this.pv.getSuggestions(value))
     );

     this.searchSubject.pipe(
      debounceTime(500), // Espera 500 milisegundos después de la última emisión
      filter(term => term.length > 0) // Filtra términos vacíos
    ).subscribe(sku => {
      this.searchOI();
    });
  }
  onKeyUp(event: KeyboardEvent) {
    const inputValue = (event.target as HTMLInputElement).value;
    this.searchSubject.next(inputValue);
  }


  loadDataOnInit() {
    const sku = ' ';

    if (sku) {
      this.subReporte = this.pv.getArrayTable(sku).subscribe((data) => {
        this.tableData = data;
        this.isloading = this.tableData.length > 0;
      });
    }
  }
  checkAndResetTable() {
    const searchOIValue = (<HTMLInputElement>document.getElementById('searchOI')).value;
    const tableSearchValue = (<HTMLInputElement>document.getElementById('tableSearch')).value;
    
    // Verifica si ambos inputs están vacíos
    if (!searchOIValue && !tableSearchValue) {
      // Restablece la tabla
      this.loadDataOnInit();
    }
  }
//   seleccionarSku() {
//     const selectElement = <HTMLSelectElement>(
//       document.getElementById('skuSelected')
//     );
//     if (selectElement) {
//       const skuSeleccionado = selectElement.value;

//       console.log(skuSeleccionado);
//       console.log('SKU seleccionado:', skuSeleccionado);
//       this.pv.getSuggestions(skuSeleccionado).subscribe((data) => {
//         console.log('Datos de la tabla:', this.tableData);
//         this.tableData = data;
//         console.log(this.tableData);

//         // if (this.tableData.length > 0) {
//         //   const selectedData = this.tableData[0];
//         //   const inputElements = {
//         //     sku: <HTMLInputElement>document.getElementById('search-input'),
//         //     bultos: <HTMLInputElement>document.getElementById('bultos'),
//         //     alto: <HTMLInputElement>document.getElementById('alto'),
//         //     ancho: <HTMLInputElement>document.getElementById('ancho'),
//         //     profundidad: <HTMLInputElement>document.getElementById('profundidad'),
//         //     peso_kg: <HTMLInputElement>document.getElementById('peso_kg'),
//         //   };
  
//         //   inputElements.sku.value = selectedData.sku;
//         //   inputElements.bultos.value = selectedData.bultos.toString();
//         //   inputElements.alto.value = selectedData.alto.toString();
//         //   inputElements.ancho.value = selectedData.ancho.toString();
//         //   inputElements.profundidad.value = selectedData.profundidad.toString();
//         //   inputElements.peso_kg.value = selectedData.peso_kg.toString();
//         // }
        
        
//       });

//       //el filtro de opciones lo transpasamos a un array para poder navergar bajo un index.
//       this.filteredOptions.pipe(
//         map((data: any[]) => {
//             this.filteredOptionsData = data;
//         })
//     ).subscribe();
// }     
//       // navegamos en el array para buscar el indice correpondiente al CodigoSKU seleccionado.
//       if (selectElement) {
//         const index = selectElement.selectedIndex;
//         if (index !== -1) {
//             this.descripcionSeleccionada = this.filteredOptionsData[index].descripcion;
//             console.log(this.descripcionSeleccionada)
//         }
    
//     }
// }
  // search(sku_descripcion: any): any{

  //   this.pv.getSuggestions('').subscribe(data => {
  //     console.log('Initial Suggestions:', data);
  //   });

  //   this.filteredOptions = this.myControl.valueChanges.pipe(
  //     startWith(''),
  //     switchMap(value => this.pv.getSuggestions(value))
  //   );

  //   this.filteredOptions.subscribe(data => {
  //     console.log('Filtered Options:', data);
  //   });
  // }

  public visible = false;
  isModalOpen: boolean = false;

  resetForm() {
    this.form.reset();
  }
  toggleLiveDemo() {
    this.visible = !this.visible;
    if (!this.visible) {
      this.resetForm();
    }
  }
  handleLiveDemoChange(event: any) {
    this.visible = event;
    if (!this.visible) {
      this.resetForm();
    }
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  resetInputsAndTable() {
    const inputSearch = <HTMLInputElement>document.getElementById('inputSearch');
    const bultos = <HTMLInputElement>document.getElementById('bultos');
    const alto = <HTMLInputElement>document.getElementById('alto');
    const ancho = <HTMLInputElement>document.getElementById('ancho');
    const profundidad = <HTMLInputElement>document.getElementById('profundidad');
    const peso_kg = <HTMLInputElement>document.getElementById('peso_kg');

    // Reiniciar los valores de los inputs
    inputSearch.value = '';
    bultos.value = '';
    alto.value = '';
    ancho.value = '';
    profundidad.value = '';
    peso_kg.value = '';

    // Restablecer la tabla (reemplaza loadDataOnInit() con la función que cargue tus datos iniciales)
    this.loadDataOnInit();
  }

  submitForm() {
    // Obtener Valores de sessionStorage
    const id_user = sessionStorage.getItem('id')?.toString() + '';
    const ids_user =
      sessionStorage.getItem('server') +
      '-' +
      sessionStorage.getItem('id') +
      '';
    //Obtener  valores de los campos formularios.
    const sku = (<HTMLInputElement>document.getElementById('inputSearch')).value;
    const descripcion = (document.getElementById('descripcion'))?.textContent;
    const alto = (<HTMLInputElement>document.getElementById('alto')).value;
    const ancho = (<HTMLInputElement>document.getElementById('ancho')).value;
    const profundidad = (<HTMLInputElement>(
      document.getElementById('profundidad')
    )).value;
    const peso_kg = (<HTMLInputElement>document.getElementById('peso_kg'))
      .value;
    const bultos = (<HTMLInputElement>document.getElementById('bultos')).value;

    // Validar campos
    if (
      !sku ||
      !descripcion ||
      !alto ||
      !ancho ||
      !profundidad ||
      !peso_kg ||
      !bultos
    ) {
      // Mostrar alertas específicas para cada campo
      if (!sku) {
        alert('El campo Nombre es requerido.');
      }
      if (!descripcion) {
        alert('El campo Descripción es requerido.');
      }
      if (!alto) {
        alert('El campo alto es requerido.');
      }
      if (!ancho) {
        alert('El campo ancho es requerido.');
      }
      if (!profundidad) {
        alert('El campo profundidad es requerido.');
      }
      if (!peso_kg) {
        alert('El campo peso_kg es requerido.');
      }
      if (!bultos) {
        alert('El campo bultos es requerido.');
        // Detener la ejecución si hay campos vacíos
      }
    }
    // Crear un objeto FormData y agregar los datos del formulario
    const formData = {
      sku: sku,
      descripcion: descripcion,
      alto: alto,
      ancho: ancho,
      profundidad: profundidad,
      peso_kg: peso_kg,
      bultos: bultos,
      id_user: id_user,
      ids_user: ids_user,
    };
    // Configuracion para la solicitud
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData), // Convertimos el objeto a una cadena JSON
    };
    this.http
      .post('http://localhost:8000/skuPesoVolumetrico/', formData)
      .subscribe(
        (data) => {
          //mostrar aletar exito
          alert('El ingreso se ha realizado Correctamente');
        },
        (error) => {
          //MAnejar errores
          console.error('Error al enviar la solicitud', error);
          alert('Hubo un error al ingresar el dato');
        }
      );
  }

  codigoSku: string = '';
  searchBySku() {
    const sku = (<HTMLInputElement>document.getElementById('inputSearch'))
      .value;
    console.log(sku)
    this.subReporte = this.pv.getSuggestions(sku).subscribe((data) => {
      console.log(this.subReporte);
      this.tableData = data;
      console.log(this.tableData);
      this.isloading = false

      
      if (this.tableData.length > 0) {
        const selectedData = this.tableData[0];
        const inputElements = {
          sku: <HTMLInputElement>document.getElementById('inputSearch'),
          bultos: <HTMLInputElement>document.getElementById('bultos'),
          alto: <HTMLInputElement>document.getElementById('alto'),
          ancho: <HTMLInputElement>document.getElementById('ancho'),
          profundidad: <HTMLInputElement>document.getElementById('profundidad'),
          peso_kg: <HTMLInputElement>document.getElementById('peso_kg'),
        };

        inputElements.sku.value = selectedData.sku.toString();
        inputElements.bultos.value = selectedData.bultos.toString();
        inputElements.alto.value = selectedData.alto.toString();
        inputElements.ancho.value = selectedData.ancho.toString();
        inputElements.profundidad.value = selectedData.profundidad.toString();
        inputElements.peso_kg.value = selectedData.peso_kg.toString();
        this.isloading = true
      }else{
        this.isloading = false
      }
    });

  }

  searchBySku1stMenu() {
    const sku = (<HTMLInputElement>document.getElementById('inputS'))
      .value;
    console.log(sku)
    this.subReporte = this.pv.getSuggestions(sku).subscribe((data) => {
      console.log(this.subReporte);
      this.tableData = data;
      console.log(this.tableData);
      this.isloading = false

      
      if (this.tableData.length > 0) {
        const selectedData = this.tableData[0];
        const inputElements = {
          sku: <HTMLInputElement>document.getElementById('inputSearch'),
          bultos: <HTMLInputElement>document.getElementById('bultos'),
          alto: <HTMLInputElement>document.getElementById('alto'),
          ancho: <HTMLInputElement>document.getElementById('ancho'),
          profundidad: <HTMLInputElement>document.getElementById('profundidad'),
          peso_kg: <HTMLInputElement>document.getElementById('peso_kg'),
        };

        inputElements.sku.value = selectedData.sku.toString();
        inputElements.bultos.value = selectedData.bultos.toString();
        inputElements.alto.value = selectedData.alto.toString();
        inputElements.ancho.value = selectedData.ancho.toString();
        inputElements.profundidad.value = selectedData.profundidad.toString();
        inputElements.peso_kg.value = selectedData.peso_kg.toString();
        this.isloading = true
      }else{
        this.isloading = false
        
      }
    });

    

  }

  searchToTable() {
    const sku = (<HTMLInputElement>document.getElementById('tableSearch'))
      .value;
    console.log(sku)
    this.subReporte = this.pv.getSuggestions(sku).subscribe((data) => {
      console.log(this.subReporte);
      this.tableData = data;
      console.log(this.tableData);
      this.isloading = this.tableData.length > 0;

      
      if (this.tableData.length > 0) {
        const selectedData = this.tableData[0];
        const inputElements = {
          sku: <HTMLInputElement>document.getElementById('inputSearch'),
          bultos: <HTMLInputElement>document.getElementById('bultos'),
          alto: <HTMLInputElement>document.getElementById('alto'),
          ancho: <HTMLInputElement>document.getElementById('ancho'),
          profundidad: <HTMLInputElement>document.getElementById('profundidad'),
          peso_kg: <HTMLInputElement>document.getElementById('peso_kg'),
        };

        inputElements.sku.value = selectedData.sku.toString();
        inputElements.bultos.value = selectedData.bultos.toString();
        inputElements.alto.value = selectedData.alto.toString();
        inputElements.ancho.value = selectedData.ancho.toString();
        inputElements.profundidad.value = selectedData.profundidad.toString();
        inputElements.peso_kg.value = selectedData.peso_kg.toString();
        this.isloading = true
      }else{
        this.isloading = false
      }
    });

  }

  searchOI(codigo? : any) {
    
    const sku = (<HTMLInputElement>document.getElementById('searchOI')).value;
    console.log(sku)
    this.isloading = false
    this.subReporte = this.pv.getArrayTable(sku).subscribe((data) => {
      console.log(this.subReporte);
      this.tableData = data;
      console.log(this.tableData);
      this.isloading = this.tableData.length > 0;
      
      if (this.tableData.length > 0) {
        const selectedData = this.tableData[0];
        const inputElements = {
          sku: <HTMLInputElement>document.getElementById('inputSearch'),
          bultos: <HTMLInputElement>document.getElementById('bultos'),
          alto: <HTMLInputElement>document.getElementById('alto'),
          ancho: <HTMLInputElement>document.getElementById('ancho'),
          profundidad: <HTMLInputElement>document.getElementById('profundidad'),
          peso_kg: <HTMLInputElement>document.getElementById('peso_kg'),
        };

        inputElements.sku.value = selectedData.sku.toString();
        inputElements.bultos.value = selectedData.bultos.toString();
        inputElements.alto.value = selectedData.alto.toString();
        inputElements.ancho.value = selectedData.ancho.toString();
        inputElements.profundidad.value = selectedData.profundidad.toString();
        inputElements.peso_kg.value = selectedData.peso_kg.toString();
        this.isloading = true
      }else{
        this.isloading = false
      }

    });
  }
  
  selectBySelect() {
    this.isloading = false;
    const sku = (<HTMLSelectElement>document.getElementById('descripcion')).value;
    console.log(sku);
  
    this.subReporte = this.pv.getSuggestions(sku).subscribe((data) => {
      this.tableData = data;
      console.log(this.tableData);
      this.isloading = this.tableData.length > 0;
  
      if (this.tableData.length > 0) {
        const selectedData = this.tableData.find(item => item.sku === sku);
        if (selectedData) {
          this.form.patchValue({
            sku: selectedData.sku.toString(),
            bultos: selectedData.bultos.toString(),
            alto: selectedData.alto.toString(),
            ancho: selectedData.ancho.toString(),
            profundidad: selectedData.profundidad.toString(),
            peso_kg: selectedData.peso_kg.toString(),
          });
        }
      } else {
        this.isloading = false;
      }
  
      // Recargar todas las opciones en el select después de que se complete la suscripción
      this.reloadSelectOptions();
    });
  }
  
  reloadSelectOptions() {
    // Obtener el select
    const selectElement = <HTMLSelectElement>document.getElementById('descripcion');
  
    // Limpiar todas las opciones existentes en el select
    selectElement.innerHTML = '';
  
    // Volver a agregar todas las opciones del tableData al select
    this.tableData.forEach(option => {
      const optionElement = document.createElement('option');
      optionElement.value = option.descripcion;
      optionElement.textContent = option.descripcion;
      selectElement.appendChild(optionElement);
    });
  }
}