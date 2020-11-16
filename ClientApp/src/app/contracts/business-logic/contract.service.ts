import { ContractApi } from './contract.api';
import { Contract } from './../models/contract.model';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogService } from 'src/app/core/dialogs/dialog.service';
import { SharedService } from 'src/app/core/shared.service';
import { HttpClient } from '@angular/common/http';


@Injectable({ providedIn: 'root' })
export class ContractService {
  private contractApi: ContractApi;

  constructor(
    private sharedService: SharedService,
    private dialogService: DialogService,
    private http: HttpClient) {
      this.contractApi = new ContractApi(http);
    }

    async addContract(contract: Contract): Promise<boolean> {
      if (this.verifyContract(contract)) {
        if (await this.contractApi.create(contract)) {
          this.dialogService.openSnackBar('Pomyślnie dodano umowę');
          this.sharedService.isBusy.emit();
          return true;
        } else {
          this.dialogService.openInfoDialog('Nie udało się dodać umowy');
          this.sharedService.isBusy.emit();
          return false;
        }
      }
    }

    async deleteContract(id: number): Promise<boolean> {
      const result = await this.dialogService.openConfirmDialog('Czy na pewno chcesz usunąć umowę ?').afterClosed().toPromise();

      if (!result) {
        return false;
      }

      this.sharedService.isBusy.emit('Trwa usuwanie umowy');
      if (await this.contractApi.delete(id)) {
        this.dialogService.openSnackBar('Pomyślnie usunięto umowę');
        this.sharedService.isBusy.emit();
        return true;
      } else {
        this.dialogService.openInfoDialog('Nie udało się usunąć umowy');
        this.sharedService.isBusy.emit();
        return false;
      }
    }

    verifyContract(contract: Contract): boolean {
      if (contract.description &&
        contract.hourlyRate &&
        contract.hourlyRate > 0 &&
        contract.number) {
        return true;
      } else {
        this.dialogService.openInfoDialog('Szablon umowy został niepoprawnie wypełniony');
        return false;
      }
    }

    async getContracts(): Promise<Contract[]> {
      const contracts = await this.contractApi.readAll();

      if (contracts && contracts.length === 0)
      {
        this.dialogService.openSnackBar('Nie znaleziono dostępnych umów');
      }

      return contracts;
    }

    async getContract(id: number): Promise<Contract> {
      return this.contractApi.read(id);
    }

    async updateContract(contract: Contract): Promise<boolean> {
      if (this.verifyContract(contract)) {
        this.sharedService.isBusy.emit('Trwa zapisywanie zmian');
        if (await this.contractApi.update(contract)) {
          this.dialogService.openSnackBar('Pomyślnie zamodyfikowano umowę');
          this.sharedService.isBusy.emit();
          return true;
        } else {
          this.dialogService.openInfoDialog('Nie udało się zmodyfikować umowy');
          this.sharedService.isBusy.emit();
          return false;
        }
      }
    }
}
