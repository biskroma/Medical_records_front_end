export class MedicalRecord
{
  constructor(
    public _id: string,
    public recordNumber: string,
    public name: string,
    public bloodType: string,
    public allergies: JSON,
    public createdAt: string,
    public lastAppointment: string
  ){}
}