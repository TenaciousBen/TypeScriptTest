import { expect } from 'chai';
import { Company, Employee } from "../src/company";
const employees = require("../data/validStructure.json");
const invalidEmployees = require("../data/invalidStructure.json");

describe("Company", () => {
	it("Can determine whether structures are valid", () => {
		let company = new Company();
		let isValidStructureLoadable = company.isLoadable(employees);
		expect(isValidStructureLoadable).to.not.be.null;
		expect(isValidStructureLoadable).to.be.true;
	});
	it("Can determine whether invalid employees can be loaded", () => {
		let company = new Company();
		let isInvalidStructureLoadable = company.isLoadable(invalidEmployees);
		expect(isInvalidStructureLoadable).to.not.be.null;
		expect(isInvalidStructureLoadable).to.be.false;
	});
	it("Can load employees", () => {
		let company = new Company();
		company.load(employees);
		expect(company.employees).to.not.be.null;
		expect(company.employees.subordinates).to.not.be.null;
		expect(company.employees.subordinates.length).to.equal(3);
	});
	it("Can find employees by name", () => {
		let company = new Company();
		company.load(employees);
		let nameMatch = company.findEmployee(e => e.name === "Billy Price");
		let salaryMatch = company.findEmployee(e => e.salary === 45000);
		let noMatch = company.findEmployee(e => e.department === "Department of Nonsense");
		expect(nameMatch).to.not.be.null;
		expect(nameMatch!.name).to.equal("Billy Price");
		expect(salaryMatch).to.not.be.null;
		expect(salaryMatch!.salary).to.equal(45000);
		expect(noMatch).to.be.null;
	});
	it("Can find the highest paid employee", () => {
		let company = new Company();
		company.load(employees);
		let highestPaid = company.findHighestPaidEmployee();
		expect(highestPaid).to.not.be.null;
		expect(highestPaid.salary).to.equal(100000);
	});
	it("Can find the lowest paid employee", () => {
		let company = new Company();
		company.load(employees);
		let lowestPaid = company.findLowestPaidEmployee();
		expect(lowestPaid).to.not.be.null;
		expect(lowestPaid.salary).to.equal(15000);
	});
	it("Can get the departments", () => {
		let company = new Company();
		company.load(employees);
		let departments = company.getDepartments();
		expect(departments).to.not.be.null;
		expect(departments.length).to.equal(4);
		let expectedDepartments = ["Executive", "Marketing", "Sales", "IT"];
		let allMatch = departments.every(d => expectedDepartments.indexOf(d) !== -1);
		expect(allMatch).to.be.true;
	});
	it("Can get the department headcounts", () => {
		let company = new Company();
		company.load(employees);
		let executives = company.getDepartmentHeadcount("Executive");
		let marketing = company.getDepartmentHeadcount("Marketing");
		let sales = company.getDepartmentHeadcount("Sales");
		let it = company.getDepartmentHeadcount("IT");
		expect(executives).to.equal(1);
		expect(marketing).to.equal(4);
		expect(sales).to.equal(6);
		expect(it).to.equal(8);
	});
	it("Can get the highest paid department", () => {
		let company = new Company();
		company.load(employees);
		let highestPaid = company.findHighestPaidDepartment();
		expect(highestPaid).to.equal("IT");
	});
	it("Can get the lowest paid department", () => {
		let company = new Company();
		company.load(employees);
		let lowestPaid = company.findLowestPaidDepartment();
		expect(lowestPaid).to.equal("Executive");
	});
	it("Can add an employee as a subordinate", () => {
		let company = new Company();
		company.load(employees);
		const apprentice: Employee = {
			name: "Clive Mitchel",
			title: "Apprentice Software Developer",
			department: "IT",
			salary: 10000,
			subordinates: []
		};
		company.addEmployee("Martin Shawshank", apprentice);
		let manager = company.findEmployee(e => e.name === "Martin Shawshank");
		expect(manager!.subordinates.length).to.equal(1);
		expect(manager!.subordinates[0].name).to.equal(apprentice.name);
		expect(manager!.subordinates[0].title).to.equal(apprentice.title);
		expect(manager!.subordinates[0].department).to.equal(apprentice.department);
		expect(manager!.subordinates[0].salary).to.equal(apprentice.salary);
		expect(manager!.subordinates[0].subordinates).to.not.be.null;
		expect(manager!.subordinates[0].subordinates.length).to.equal(0);
	});
	it("Can add an employee as a new root", () => {
		let company = new Company();
		company.load(employees);
		const chairman: Employee = {
			name: "James Runner",
			title: "Chairman",
			department: "Executive",
			salary: 150000,
			subordinates: []
		};
		company.addEmployee(null, chairman);
		let added = company.findEmployee(e => e.name === "James Runner");
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
		let company = new Company();
		company.load(employees);
		company.removeEmployee("Josh Anderson");
		let removed = company.findEmployee(e => e.name === "Josh Anderson");
		expect(removed).to.be.null;
		let newManager = company.findEmployee(e => e.name === "Mike Love");
		expect(newManager).to.not.be.null;
		expect(newManager!.subordinates).not.not.be.null;
		expect(newManager!.subordinates.length).to.equal(6);
	});
	it("Cannot remove root employee", () => {
		let company = new Company();
		company.load(employees);
		let wasError = false;
		try {
			company.removeEmployee("Mike Love");
		} catch (error) {
			wasError = true;
		}
		expect(wasError).to.be.true;
	});
	it("Can replace an employee", () => {
		let company = new Company();
		company.load(employees);
		const newHeadOfIt: Employee = {
			name: "Helen Vargas",
			title: "Head of IT",
			department: "IT",
			salary: 75000,
			subordinates: []
		};
		company.replaceEmployee("Josh Anderson", newHeadOfIt);
		let removed = company.findEmployee(e => e.name === "Josh Anderson");
		expect(removed).to.be.null;
		let added = company.findEmployee(e => e.name === "Helen Vargas");
		expect(added).to.not.be.null;
		expect(added!.name).to.equal(newHeadOfIt.name);
		expect(added!.title).to.equal(newHeadOfIt.title);
		expect(added!.department).to.equal(newHeadOfIt.department);
		expect(added!.salary).to.equal(newHeadOfIt.salary);
		expect(added!.subordinates).to.not.be.null;
		expect(added!.subordinates.length).to.equal(4);
	});
});