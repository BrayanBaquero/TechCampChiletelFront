import { FormControl, FormGroup } from "@angular/forms";
import { RxwebValidators } from '@rxweb/reactive-form-validators';

export class TipoDaño {
    nombre:    string;
    prioridad: number;
    tiempo:    number;

    static tdFormGroup(tipoDaño: TipoDaño):FormGroup{
        const formG=new FormGroup({
            nombre: new FormControl(tipoDaño.nombre),
            prioridad: new FormControl(tipoDaño.prioridad,RxwebValidators.unique()),
            tiempo: new FormControl(tipoDaño.tiempo)
        });
        return formG;
    }
}
