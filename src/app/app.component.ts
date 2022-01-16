import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EmployeeGetDto } from 'src/app/dto/EmployeeGetDto';
import { EmployeeReturnDto } from 'src/app/dto/EmployeeReturnDto';
import { EmployeeService } from 'src/app/employee.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'employeemanagerapp';

  public employeeReturnDtos: EmployeeReturnDto[] = [];
  public editEmployee!: EmployeeReturnDto;
  public deleteEmployee !: EmployeeReturnDto;

  constructor(private employeeService: EmployeeService) { }

  ngOnInit() {
    this.getEmployees();
  }

  public getEmployees(): void {
    this.employeeService.getEmployees().subscribe(
      (response: EmployeeReturnDto[]) => {

        this.employeeReturnDtos = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onCreateModal(employee: EmployeeGetDto | null, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addEmployeeModal');
    }
    container?.appendChild(button);
    button.click();
  }

  public onOpenModal(employee: EmployeeReturnDto, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'edit') {
      this.editEmployee = employee;
      button.setAttribute('data-target', '#updateEmployeeModal');
    }
    if (mode === 'delete') {
      this.deleteEmployee = employee;
      button.setAttribute('data-target', '#deleteEmployeeModal');
    }
    container?.appendChild(button);
    button.click();
  }

  public onAddEmployee(addForm: NgForm): void {
    document.getElementById('add-employee-form')?.click();
    this.employeeService.createEmployee(addForm.value).subscribe(
      (response: EmployeeGetDto) => {
        console.log(response);
        this.getEmployees();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onUpdateEmloyee(employeeReturnDto: EmployeeReturnDto): void {
    document.getElementById('add-employee-form')?.click();
    this.employeeService.updateEmployee(employeeReturnDto).subscribe(
      (response: EmployeeReturnDto) => {
        this.getEmployees();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteEmloyee(employeeId: number): void {
    document.getElementById('add-employee-form')?.click();
    this.employeeService.deleteEmployee(employeeId).subscribe(
      (response: void) => {
        this.getEmployees();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  public searchEmployees(key: string): void {
    const results: EmployeeReturnDto[] = [];
    for (const employee of this.employeeReturnDtos) {
      if (employee.fullName.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || employee.email.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || employee.phone.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || employee.jobTitle.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(employee);
      }
    }
    this.employeeReturnDtos = results;
    if (results.length === 0 || !key) {
      this.getEmployees();
    }
  }

}
