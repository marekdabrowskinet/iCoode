import { Contract } from './../../contracts/models/contract.model';
export class TimesheetWork {
id: number;
contract: Contract = new Contract();
hoursWorked: number;
}
