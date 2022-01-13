import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from 'src/app/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private apiServerUrl = 'http://localhost:8080/';


  constructor(private http:HttpClient) { }

  public getEmployees():Observable<Employee[]>{
    return this.http.get<Employee[]>(`${this.apiServerUrl}/findAll`)
  }

  public createEmployee(employee: Employee):Observable<Employee>{
    return this.http.post<Employee>(`${this.apiServerUrl}/create`,employee);
  }

  public updateEmployee(employeeId:number):Observable<Employee>{
    return this.http.put<Employee>(`${this.apiServerUrl}/update`,employeeId);
  }

  public deleteEmployee(employeeId : number):Observable<any>{
    return this.http.delete<any>(`${this.apiServerUrl}/delete/${employeeId}`);
  }
  
}
