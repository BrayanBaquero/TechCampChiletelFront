import { FormControl, FormGroup } from "@angular/forms";
import { RxwebValidators } from "@rxweb/reactive-form-validators";

export class TipoCliente {
    nombre:    string;
    prioridad: number;

    static tCFormGroup(tipoCliente:TipoCliente):FormGroup{
        const formG=new FormGroup({
            nombre: new FormControl(tipoCliente.nombre),
            prioridad: new FormControl(tipoCliente.prioridad,RxwebValidators.unique())
        });
        return formG;
    }
}
