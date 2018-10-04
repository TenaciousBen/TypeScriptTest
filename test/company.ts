import { expect } from 'chai';
import { Company } from "../src/company";
const employees = require("../data/validStructure.json");
const invalidEmployees = require("../data/invalidStructure.json");

describe("Company", () => {
	it("Can determine whether structures are valid", () => {
		let company = new Company();
		let isValidStructureLoadable = company.isLoadable(employees);
		expect(isValidStructureLoadable).to.equal(true);
	});
	it("Can determine whether invalid employees can be loaded", () => {
		let company = new Company();
		let isInvalidStructureLoadable = company.isLoadable(invalidEmployees);
		expect(isInvalidStructureLoadable).to.equal(false);
	});
	it("Can load employees", () => {
		let company = new Company();
		company.load(employees);
		expect(company.employees).to.not.be.null;
		expect(company.employees.subordinates).to.not.be.null;
		expect(company.employees.subordinates.length).to.equal(3);
	});
});