import { Injectable } from '@angular/core';

/**
 * For doing CRUD operation in
 * firebase we require.
 */
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

/**
 * we are making services for employee
 * so we need to add employee model in
 * this
 */

 import { Employee } from './employee.model';


@Injectable({
  providedIn: 'root'
})

/**  we create each function for
 * CRUD opertaion in service.
 */
export class EmployeeService {

  /**
   * we store employee details
   * in this list.
   */
  employeeList: AngularFireList<any>;

  /**
   *we  store deatils of currently
   *active employee.
   */

   selectedEmployee: Employee = new Employee();

  /**
   * For interaction with angularifrebase
   * database we need to inject the
   * AngularfirebaseDatabase .
   */
  constructor(private firebase: AngularFireDatabase) { }

  /**
   * for retrive data  from database
   */

   getData() {
      this.employeeList = this.firebase.list('employees');
      return this.employeeList;
   }

   /**
    * insert into database
    * need to pass object and also
    * assign individual fields
    */

    insertEmployee(employee: Employee) {
      this.employeeList.push({
        name: employee.name,
        position: employee.position,
        office: employee.office,
        salary: employee.salary
      });

    }

    /**
     * For update
     * 2 arguments are require
     * 1) which employee (so id)
     * 2) object of employee
     */

    updateEmployee(employee: Employee) {
      this.employeeList.update(employee.$key,
        {
          name: employee.name,
          position: employee.position,
          office: employee.office,
          salary: employee.salary
        });
    }

    /**
     * For delete
     * we only require key of the employee
     */
    deleteEmployee($key: string) {
      this.employeeList.remove($key);
    }

}
