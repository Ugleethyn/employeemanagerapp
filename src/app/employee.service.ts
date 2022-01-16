import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from 'src/app/employee';
import { EmployeeReturnDto } from 'src/app/dto/EmployeeReturnDto';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private apiServerUrl = environment.apiBaseUrl+'api/v1/employee';


  constructor(private http:HttpClient) { }

  public getEmployees():Observable<EmployeeReturnDto[]>{
    return this.http.get<EmployeeReturnDto[]>(`${this.apiServerUrl}/findAll`)
  }

  public createEmployee(employee: Employee):Observable<Employee>{
    return this.http.post<Employee>(`${this.apiServerUrl}/create`,employee);
  }

  public updateEmployee(employeeReturnDto : EmployeeReturnDto):Observable<Employee>{
    return this.http.put<Employee>(`${this.apiServerUrl}/update`,employeeReturnDto);
  }

  public deleteEmployee(employeeId : number):Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/delete/${employeeId}`);
  }
  
}
