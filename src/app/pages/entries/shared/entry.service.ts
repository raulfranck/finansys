import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, throwError} from 'rxjs';
import { map, catchError, flatMap, mergeMap} from 'rxjs/operators' //provavelmente vai ser necessário substituir o flatMap por mergeMap, pois nessa versão 
                                                                   // do rxJs o fletMap já foi descontinuado.

import { Entry } from './entry.model'

@Injectable({
  providedIn: 'root'
})
export class EntryService {

  private apiPath: string = "api/entries"

  constructor(private http: HttpClient) { }

  getAll(): Observable<Entry[]> {

    return this.http.get(this.apiPath).pipe(
      catchError(this.handleError),
      map(this.jsonDataToEntries)
    )
  }

  getById(id: number): Observable<Entry> {
    const url = `${this.apiPath}/${id}`;

    return this.http.get(url).pipe(
      catchError(this.handleError),
      map(this.jsonDataToEntry)
    )
    
  }

  createEntry(entry: Entry): Observable<Entry> {
    return this.http.post(this.apiPath, entry).pipe(
      catchError(this.handleError),
      map(this.jsonDataToEntry)
    )
  }

  updateEntry(entry: Entry): Observable<Entry> {
    const url = `${this.apiPath}/${entry.id}`;

    return this.http.put(url, entry).pipe(
      catchError(this.handleError),
      map(() => entry) // Somento no caso de uso com in-memory-api
    )
  }

  deleteEntry(id: number): Observable<any> {
    const url = `${this.apiPath}/${id}`;

    return this.http.delete(url).pipe(
      catchError(this.handleError),
      map(() => null)
    )
  }

  private jsonDataToEntries(jsonData: any[]): Entry[] {
    const entries: Entry[] = [];
    jsonData.forEach(element => entries.push(element as Entry));

    return entries;
  }

  private handleError(error: any): Observable<any> {
    console.log(error);
    return throwError(error)
  }

  private jsonDataToEntry(jsonData: any): Entry {
    return jsonData as Entry
  }
}
