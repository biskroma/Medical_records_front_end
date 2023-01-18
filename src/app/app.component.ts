import { Component } from '@angular/core';
import { MedicalRecord } from './modules/medicalRecord';
import { MedicalRecordService } from './services/medicalRecord.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  // styleUrls: ['./app.component.css']
  providers: [
    MedicalRecordService
  ]
})
export class AppComponent {
  title = 'Medical Records';
  public medicalRecord: MedicalRecord;
  public showNewRecordOption: boolean = false;
  public shownNewConsultOption: boolean = false;
  public bloodTypesArray: any = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']
  public typeSelected : string = 'Select Type';
  public allergies: any[] = [];
  public medications: any[] =  [];
  public showMainMenuOption: boolean = true;
  public allergyErrorMessage: any;
  public successRegistryMessage: any;

  public showRecordNumberField : any;
  public showCreatedDateField: any;
  public showLastAppointmentDateField: any;
  public showPatientsNameField: any;
  public showBloodTypeField: any;
  public showAllergiesField: any;

  public showRecordNumber: any;

  public allergiesMedications: any = [];

  constructor(private _medRecordService: MedicalRecordService)
  {
    this.medicalRecord = new MedicalRecord('', '', '', '', this.allergiesMedications, '', '');
    this.bloodTypesArray;
  }

ngOnInit()
{
  this.showMainMenuOption = true;
}

addInput() {
  this.allergies.push('');
  this.allergiesMedications.push({allergy: '', medication:''});
}

removeInput(index:number){
  this.allergies.splice(index,1);
  this.allergiesMedications.splice(index, 1);
}

setTypeSelected(bloodType:string){
  this.typeSelected = bloodType;
}

showNewRecord()
{
  this.shownNewConsultOption = false;
  this.showMainMenuOption = false;
  this.showNewRecordOption = true;
}

showNewConsult()
{
  this.shownNewConsultOption = true;
  this.showMainMenuOption = false;
  this.showNewRecordOption = false;
}

showMainMenu()
{
  this.shownNewConsultOption = false;
  this.showMainMenuOption = true;
  this.showNewRecordOption = false;
}

onSubmit()
{
  if(this.allergies.length === 0){
    throw this.allergyErrorMessage = 'Add at least one allergy. If pacient has none, type NONE at both allergy and medication.';
  }
  this._medRecordService.register(this.medicalRecord).subscribe(
    {
      next: response => {
        console.log(response);
        console.log(this.allergiesMedications);
        this.medicalRecord.name = '';
        this.medicalRecord.bloodType = '';
        this.typeSelected = 'Select Type';
        this.successRegistryMessage = 'Patient has been registered successfully';
        this.showMainMenu();
      },
      error: error =>{ console.log(error) }
    }
  );
}

onConsult()
{
  this._medRecordService.check(this.medicalRecord).subscribe(
    {
      next: response => {
        console.log(response);
        const responseString = JSON.stringify(response);
        const parsedResponse = JSON.parse(responseString);
        this.showRecordNumberField = parsedResponse.recordNumber;
        this.showCreatedDateField = parsedResponse.createdAt;
        this.showLastAppointmentDateField = parsedResponse.lastAppointment;
        this.showPatientsNameField = parsedResponse.name;
        this.showBloodTypeField = parsedResponse.bloodType;
        this.showAllergiesField = parsedResponse.allergies;
      },
      error: error =>{ console.log({error}) }
    }
  );
}

}
