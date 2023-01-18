import { Injectable } from "@angular/core";
import { GLOBAL } from "./global";
import { HttpClient, HttpHeaders } from "@angular/common/http"
import { MedicalRecord } from "../modules/medicalRecord";
import { map } from "rxjs/operators";


@Injectable()
export class MedicalRecordService
{
    public url: string = GLOBAL.url;

    constructor(
        private _http: HttpClient
    ){}

    check(record_to_check: MedicalRecord)
    {
        const params = record_to_check;
        const headers = new HttpHeaders({'Content-Type':'application/json'});
        return this._http.get(this.url+'recordNumber/' + params.recordNumber, {headers: headers})
        .pipe(
            map(res => res)
        );
    }

    register(record_to_register: MedicalRecord)
    {
        const params = record_to_register;
        const headers = new HttpHeaders({'Content-Type':'application/json'});
        return this._http.post(this.url + 'register', params, {headers: headers})
        .pipe(
            map(res => res)
        );
    }
}