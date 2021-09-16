import { expect } from 'chai';
import {
	isValidStructure,
	findEmployee,
	findHighestPaidEmployee,
	findLowestPaidEmployee,
	getDepartments,
	getDepartmentHeadcount,
	findHighestPaidDepartment,
	findLowestPaidDepartment,
	addEmployee,
	removeEmployee,
	replaceEmployee,
	Employee
} from "../src/company";
const employees = require("../data/validStructure.json");
const invalidEmployees = require("../data/invalidStructure.json");

const getEmployees = () => JSON.parse(JSON.stringify(employees));
const getInvalidEmployees = () => JSON.parse(JSON.stringify(invalidEmployees));

describe("Company", () => {
	it("Can determine whether structures are valid", () => {
		let isValidStructureLoadable = isValidStructure(getEmployees());
		expect(isValidStructureLoadable).to.not.be.null;
		expect(isValidStructureLoadable).to.be.true;
	});
	it("Can determine whether invalid employees can be loaded", () => {
		let isInvalidStructureLoadable = isValidStructure(getInvalidEmployees());
		expect(isInvalidStructureLoadable).to.not.be.null;
		expect(isInvalidStructureLoadable).to.be.false;
	});
	it("Can load employees", () => {
		expect(employees).to.not.be.null;
		expect(employees.subordinates).to.not.be.null;
		expect(employees.subordinates.length).to.equal(3);
	});
	it("Can find employees by name", () => {
		let nameMatch = findEmployee(getEmployees(), e => e.name === "Billy Price");
		let salaryMatch = findEmployee(getEmployees(), e => e.salary === 45000);
		let noMatch = findEmployee(getEmployees(), e => e.department === "Department of Nonsense");
		expect(nameMatch).to.not.be.null;
		expect(nameMatch!.name).to.equal("Billy Price");
		expect(salaryMatch).to.not.be.null;
		expect(salaryMatch!.salary).to.equal(45000);
		expect(noMatch).to.be.null;
	});
	it("Can find the highest paid employee", () => {
		let highestPaid = findHighestPaidEmployee(getEmployees());
		expect(highestPaid).to.not.be.null;
		expect(highestPaid.salary).to.equal(100000);
	});
	it("Can find the lowest paid employee", () => {
		let lowestPaid = findLowestPaidEmployee(getEmployees());
		expect(lowestPaid).to.not.be.null;
		expect(lowestPaid.salary).to.equal(15000);
	});
	it("Can get the departments", () => {
		let departments = getDepartments(getEmployees());
		expect(departments).to.not.be.null;
		expect(departments.length).to.equal(4);
		let expectedDepartments = ["Executive", "Marketing", "Sales", "IT"];
		let allMatch = departments.every(d => expectedDepartments.indexOf(d) !== -1);
		expect(allMatch).to.be.true;
	});
	it("Can get the department headcounts", () => {
		let executives = getDepartmentHeadcount(getEmployees(), "Executive");
		let marketing = getDepartmentHeadcount(getEmployees(), "Marketing");
		let sales = getDepartmentHeadcount(getEmployees(), "Sales");
		let it = getDepartmentHeadcount(getEmployees(), "IT");
		expect(executives).to.equal(1);
		expect(marketing).to.equal(4);
		expect(sales).to.equal(6);
		expect(it).to.equal(8);
	});
	it("Can get the highest paid department", () => {
		let highestPaid = findHighestPaidDepartment(getEmployees());
		expect(highestPaid).to.equal("IT");
	});
	it("Can get the lowest paid department", () => {
		let lowestPaid = findLowestPaidDepartment(getEmployees());
		expect(lowestPaid).to.equal("Executive");
	});
	it("Can add an employee as a subordinate", () => {
		const apprentice: Employee = {
			name: "Clive Mitchel",
			title: "Apprentice Software Developer",
			department: "IT",
			salary: 10000,
			subordinates: []
		};
		addEmployee(getEmployees(), "Martin Shawshank", apprentice);
		let manager = findEmployee(getEmployees(), e => e.name === "Martin Shawshank");
		expect(manager!.subordinates.length).to.equal(1);
		expect(manager!.subordinates[0].name).to.equal(apprentice.name);
		expect(manager!.subordinates[0].title).to.equal(apprentice.title);
		expect(manager!.subordinates[0].department).to.equal(apprentice.department);
		expect(manager!.subordinates[0].salary).to.equal(apprentice.salary);
		expect(manager!.subordinates[0].subordinates).to.not.be.null;
		expect(manager!.subordinates[0].subordinates.length).to.equal(0);
	});
	it("Can add an employee as a new root", () => {
		const chairman: Employee = {
			name: "James Runner",
			title: "Chairman",
			department: "Executive",
			salary: 150000,
			subordinates: []
		};
		addEmployee(getEmployees(), null, chairman);
		let added = findEmployee(getEmployees(), e => e.name === "James Runner");
		expect(added).to.not.be.null;
		expect(added!.name).to.equal(chairman.name);
		expect(added!.title).to.equal(chairman.title);
		expect(added!.department).to.equal(chairman.department);
		expect(added!.salary).to.equal(chairman.salary);
		expect(added!.subordinates).to.not.be.null;
		expect(added!.subordinates.length).to.equal(1);
		expect(added!.subordinates[0].name).to.equal("Mike Love");
		expect(added!.subordinates[0].title).to.equal("CEO");
		expect(added!.subordinates[0].department).to.equal("Executive");
		expect(added!.subordinates[0].salary).to.equal(100000);
		expect(added!.subordinates[0].subordinates).to.not.be.null;
		expect(added!.subordinates[0].subordinates.length).to.equal(3);
	});
	it("Can remove an employee", () => {
		removeEmployee(getEmployees(), "Josh Anderson");
		let removed = findEmployee(getEmployees(), e => e.name === "Josh Anderson");
		expect(removed).to.be.null;
		let newManager = findEmployee(getEmployees(), e => e.name === "Mike Love");
		expect(newManager).to.not.be.null;
		expect(newManager!.subordinates).not.not.be.null;
		expect(newManager!.subordinates.length).to.equal(6);
	});
	it("Cannot remove root employee", () => {
		let wasError = false;
		try {
			removeEmployee(getEmployees(), "Mike Love");
		} catch (error) {
			wasError = true;
		}
		expect(wasError).to.be.true;
	});
	it("Can replace an employee", () => {
		const newHeadOfIt: Employee = {
			name: "Helen Vargas",
			title: "Head of IT",
			department: "IT",
			salary: 75000,
			subordinates: []
		};
		replaceEmployee(getEmployees(), "Josh Anderson", newHeadOfIt);
		let removed = findEmployee(getEmployees(), e => e.name === "Josh Anderson");
		expect(removed).to.be.null;
		let added = findEmployee(getEmployees(), e => e.name === "Helen Vargas");
		expect(added).to.not.be.null;
		expect(added!.name).to.equal(newHeadOfIt.name);
		expect(added!.title).to.equal(newHeadOfIt.title);
		expect(added!.department).to.equal(newHeadOfIt.department);
		expect(added!.salary).to.equal(newHeadOfIt.salary);
		expect(added!.subordinates).to.not.be.null;
		expect(added!.subordinates.length).to.equal(4);
	});
});