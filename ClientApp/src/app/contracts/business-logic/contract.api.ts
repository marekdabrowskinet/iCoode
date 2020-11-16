import { Api } from 'src/app/core/api';
import { Contract } from './../models/contract.model';

export class ContractApi extends Api {
  async create(contract: Contract): Promise<boolean> {
    return await this.httpClient.post<boolean>('https://localhost:44324/api/Contracts/Create', contract).toPromise();
  }

  async readAll(): Promise<Contract[]> {
    return await this.httpClient.get<Contract[]>('https://localhost:44324/api/Contracts/ReadAll').toPromise();
  }

  async delete(id: number): Promise<boolean> {
    return await this.httpClient.post<boolean>('https://localhost:44324/api/Contracts/Delete', {id}).toPromise();
  }

  async read(id: number): Promise<Contract> {
    return await this.httpClient.get<Contract>('https://localhost:44324/api/Contracts/Read', {
      params: {
        id : String(id)
      }}).toPromise();
  }

  async update(contract: Contract): Promise<boolean> {
    return await this.httpClient.post<boolean>('https://localhost:44324/api/Contracts/Update', contract).toPromise();
  }
}
