import { SharedService } from './../../core/shared.service';
import { Contract } from './../models/contract.model';
import { ITable } from './../../core/interfaces/table.interface';
import { AuthenticationService } from '../../authentication/auth.service';
import { Component, ElementRef, ViewChild, OnInit, ViewEncapsulation } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ContractService } from '../business-logic/contract.service';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-contracts',
  templateUrl: './contracts.component.html',
  styleUrls: ['./contracts.component.scss']
})
export class ContractsComponent implements OnInit, ITable<Contract>{

  displayedColumns: string[] = ['number', 'description', 'hourlyRate'];
  tableItems: MatTableDataSource<Contract>  = new MatTableDataSource<Contract>();
  contract: Contract = new Contract();
  isEdit = false;

  constructor(private contractService: ContractService,
    private sharedService: SharedService) {
    }

  async loadTableItems() {
    this.sharedService.isBusy.emit('Trwa ładowanie umów');
    this.tableItems.data = await this.contractService.getContracts();
    this.sharedService.isBusy.emit();
  }

  ngOnInit(): void {
    this.loadTableItems();
  }

  async addContract() {
    if (await this.contractService.addContract(this.contract)) {
      this.contract = new Contract();
    }
    await this.loadTableItems();
  }

  async deleteContract(id: number){
    if (await this.contractService.deleteContract(id)) {
      await this.loadTableItems();
    }
  }

  async editContract(id: number) {
    this.sharedService.isBusy.emit('Trwa pobieranie danych');
    this.contract = await this.contractService.getContract(id);
    this.sharedService.isBusy.emit();
    this.isEdit = true;
  }

  async updateContract() {
    await this.contractService.updateContract(this.contract);
    await this.loadTableItems();
    this.isEdit = false;
    this.contract = new Contract();
  }
}
