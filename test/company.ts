import { expect } from 'chai';
import { Company } from "../src/company";
const employees = require("../data/structure.json");

describe("Company", () => {
	it("Can load employees", () => {
		let company = new Company();
		company.load(employees);
		expect(company.employees).to.not.be.null;
		expect(company.employees.subordinates).to.not.be.null;
		expect(company.employees.subordinates.length).to.be.equal(3);
	});
});