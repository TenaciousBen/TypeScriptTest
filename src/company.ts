export interface Employee {
	name: string;
	title: string;
	department: string;
	salary: number;
	subordinates: Employee[];
}

// returns true if the employee is a match
export type EmployeePredicate = (employee: Employee) => boolean;

const defaultEmployee: Employee = {
	name: "",
	title: "",
	department: "",
	salary: -1,
	subordinates: []
};

// returns true if all employees are uniquely named
export const isValidStructure = (employees: Employee, namesSeen?: Set<string>): boolean => {
	if (!namesSeen) namesSeen = new Set<string>();
	if (namesSeen.has(employees.name)) return false;
	namesSeen.add(employees.name);
	if (employees.subordinates.length === 0) return true;
	let duplicate = employees.subordinates.find(e => !isValidStructure(e, namesSeen));
	return !duplicate;
}

// finds the first employee that matches the predicate
export const findEmployee = (predicate: EmployeePredicate): Employee | null => {
	return null;
}

// finds the highest paid employee in the loaded employees
export const findHighestPaidEmployee = (): Employee => {
	return defaultEmployee;
}

// finds the lowest paid employee in the loaded employees
export const findLowestPaidEmployee = (): Employee => {
	return defaultEmployee;
}

// gets an array of all the departments
export const getDepartments = (): string[] => {
	return [];
}

// gets the number of employees in the specified department
export const getDepartmentHeadcount = (department: string): number => {
	return -1;
}

// finds the department with the highest total pay
export const findHighestPaidDepartment = (): string => {
	return "";
}

// finds the department with the lowest total pay
export const findLowestPaidDepartment = (): string => {
	return "";
}

// adds an employee as a subordinate of the matching manager if one is supplied, else
// adds all employees as subordinates of the supplied employee
export const addEmployee = (managerName: string | null, subordinate: Employee): void => {

}

// removes the employee with the matching name, shifting all their subordinates up to their manager
// if the highest level employee (the employee who is nobody's subordinate) is removed, then an error
// should be thrown
export const removeEmployee = (employee: string): void => {

}

// replaces the employee with the matching name with the replacement employee, retaining
// all subordinates from the replaced employee
export const replaceEmployee = (original: string, replacement: Employee): void => {

}