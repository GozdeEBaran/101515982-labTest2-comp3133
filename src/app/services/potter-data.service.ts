import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { PotterCharacter } from '../models/potter-character';

const BASE = 'https://hp-api.onrender.com/api';

@Injectable({ providedIn: 'root' })
export class PotterDataService {
  private readonly http = inject(HttpClient);

  /** All characters */
  getAllCharacters(): Observable<PotterCharacter[]> {
    return this.http.get<PotterCharacter[]>(`${BASE}/characters`);
  }

  /** Characters sorted into a Hogwarts house (API uses lowercase slug). */
  getByHouseSlug(slug: string): Observable<PotterCharacter[]> {
    const path = slug.trim().toLowerCase();
    return this.http.get<PotterCharacter[]>(`${BASE}/characters/house/${path}`);
  }

  /** Single character; API responds with a one-element array. */
  getById(id: string): Observable<PotterCharacter> {
    return this.http.get<PotterCharacter[]>(`${BASE}/character/${id}`).pipe(
      map((rows) => {
        const first = rows[0];
        if (!first) {
          throw new Error('Character not found');
        }
        return first;
      }),
    );
  }
}
