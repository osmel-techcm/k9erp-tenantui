export class PaginatorData {
    Count: number;
    PageNumber: number;
    PageSize: number;
    filterDataSt: string;
    orderField: string;
    descending: boolean;
  
    constructor() {
      this.Count = 0;
      this.PageNumber = 0;
      this.PageSize = 0;
    }
  }