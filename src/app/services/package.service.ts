import { inject, Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { Package } from '../interfaces/package.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PackageService {
  apiUrl = environment.apiUrl;

  private http = inject(HttpClient);

  constructor() { }

  getAllPackages(): Observable<Package[]> {
    return this.http.get<Package[]>(`/packages`);
  }

  getDependenciesForPackageById(id: string) {
    id = id.replace('/', '%2F');
    return this.http.get<string[]>(`/packages/${id}/dependencies`);
  }
}
