import { Component, OnInit } from '@angular/core';

import { EmployeeService } from '../shared/employee.service';
import { ToastrService } from 'ngx-toastr';

import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  constructor(private employeeService: EmployeeService,private tostr: ToastrService) { }

  ngOnInit() {

    this.resetForm();
  }

  onSubmit(employeeForm: NgForm) {
    if ( employeeForm.value.$key == null) {
      this.employeeService.insertEmployee(employeeForm.value);
      alert('inserted successfully');
    } else {
      this.employeeService.updateEmployee(employeeForm.value);
      alert('Updated Successfully');
    }

    this.resetForm(employeeForm);
  }

  resetForm(employeeForm?: NgForm) {
    /**
     * we dont want to call this reset function when employyFrom is full
     * so,
     */
      if ( employeeForm != null) {
       employeeForm.reset();
     }

    this.employeeService.selectedEmployee = {
          $key: null,
          name: '',
          position: '',
          office: '',
          salary: 0
      }
  }


}
