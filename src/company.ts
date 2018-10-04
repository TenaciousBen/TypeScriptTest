export interface Employee {
	name: string;
	title: string;
	department: string;
	salary: number;
	subordinates: Employee[];
}

export interface EmployeeLoader {
	// returns true if all employees are uniquely named
	isLoadable(employees: Employee): boolean;
	// loads a set of employees into the implementor
	load(employees: Employee): void;
}

// returns true if the employee is a match
export type EmployeePredicate = (employee: Employee) => boolean;

export interface EmployeeFinder {
	// finds the first employee that matches the predicate
	findEmployee(predicate: EmployeePredicate): Employee | null;
	// finds the highest paid employee in the loaded employees
	findHighestPaidEmployee(): Employee;
	// finds the lowest paid employee in the loaded employees
	findLowestPaidEmployee(): Employee;
}

export interface DepartmentFinder {
	// gets an array of all the departments
	getDepartments(): string[];
	// gets the number of employees in the specified department
	getDepartmentHeadcount(department: string): number;
	// finds the department with the highest total pay
	findHighestPaidDepartment(): string;
	// finds the department with the lowest total pay
	findLowestPaidDepartment(): string;
}

export interface EmployeeAdministrator {
	// adds an employee as a subordinate of the matching manager if one is supplied, else
	// adds all employees as subordinates of the supplied employee
	addEmployee(managerName: string | null, subordinate: Employee): void;
	// removes the employee with the matching name
	removeEmployee(employee: string): void;
	// replaces the employee with the matching name with the replacement employee 
	replaceEmployee(original: string, replacement: Employee): void;
}

const defaultEmployee: Employee = {
	name: "",
	title: "",
	department: "",
	salary: -1,
	subordinates: []
};

export class Company implements EmployeeLoader, EmployeeFinder, DepartmentFinder, EmployeeAdministrator {
	employees: Employee = defaultEmployee;

	isLoadable(employees: Employee, namesSeen?: Set<string>): boolean {
		if (!namesSeen) namesSeen = new Set<string>();
		if (namesSeen.has(employees.name)) return false;
		namesSeen.add(employees.name);
		if (employees.subordinates.length === 0) return true;
		for (let i = 0; i < employees.subordinates.length; i++) {
			if (!this.isLoadable(employees.subordinates[i], namesSeen)) return false;
		}
		return true;
	}

	load(employees: Employee): void {
		this.employees = employees;
	}

	findEmployee(predicate: EmployeePredicate): Employee | null {
		return null;
	}

	findHighestPaidEmployee(): Employee {
		return defaultEmployee;
	}

	findLowestPaidEmployee(): Employee {
		return defaultEmployee;
	}

	getDepartments(): string[] {
		return [];
	}

	getDepartmentHeadcount(department: string): number {
		return -1;
	}

	findHighestPaidDepartment(): string {
		return "";
	}

	findLowestPaidDepartment(): string {
		return "";
	}

	addEmployee(managerName: string, subordinate: Employee): void {

	}

	removeEmployee(employee: string): void {

	}

	replaceEmployee(original: string, replacement: Employee): void {

	}
}