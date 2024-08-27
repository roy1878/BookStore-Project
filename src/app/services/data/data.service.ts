import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})

  export class DataService {
    private dataSource = new BehaviorSubject<string>("");
    currentData = this.dataSource.asObservable();
  
    updateData(data: any) {
      this.dataSource.next(data);
    }
  }