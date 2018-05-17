import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../shared/employee.service';

import { Employee } from '../shared/employee.model';
@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  employeeList: Employee[];
  constructor(private employeeService: EmployeeService) { }

  ngOnInit() {
    const x = this.employeeService.getData();
    /**
     * convert firelist into employee array
     * that's why snapshotchanges used
     *
     * subscribe executed whenever there is chnage in datacollection
     *
     * item contain collection on employee
     * so convet into array we have to iterate
     *
     * payload.jSON() return json object of data
     *
     * for key  we need
     */
    x.snapshotChanges().subscribe(item => {
      this.employeeList = [];
      item.forEach(element => {
        const y = element.payload.toJSON();
        y["$key"] = element.key;
        this.employeeList.push(y as Employee);
      });
    });
  }


  onEdit(emp: Employee) {
    /**
     * make copy then work otherwise it work on actualdata
     * after modification then add to actual one
     */
      this.employeeService.selectedEmployee = Object.assign({}, emp);
  }

  onDelete(key: string) {
    this.employeeService.deleteEmployee(key);
    alert('Deleted Succesfully');
  }

}
