import { Injectable } from '@angular/core';
import { HttpClient, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../models/category.model';

// import { ApiService } from './api.service';
// import { map } from 'rxjs/operators';

const URL = 'http://localhost:8080/api/categories';

@Injectable({
    providedIn: 'root'
  })
  
  export class CategoryService {
  
    constructor(private http: HttpClient) { }
  
    get_categories(params: any): Observable<Category[]> {
      return this.http.get<Category[]>(URL, {params});
    }
  
    all_categories(): Observable<Category[]> {
      return this.http.get<Category[]>(URL);
    }
  
    get_category(id: String): Observable<Category> {
      return this.http.get<Category>(`${URL}/${id}`);
    }
  
    create_category(category: Category): Observable<Category[]> {
      return this.http.post<Category[]>(URL, category);
    }
  
    update_category(category: Category, id: String): Observable<Category[]> {
      return this.http.put<Category[]>(`${URL}/${id}`, category);
    }
  
    delete_category(id: String): Observable<Category[]> {
      return this.http.delete<Category[]>(`${URL}/${id}`);
    }
    
    delete_all_categories(): Observable<Category[]> {
      return this.http.delete<Category[]>(`${URL}`);
    }
  
  }
  