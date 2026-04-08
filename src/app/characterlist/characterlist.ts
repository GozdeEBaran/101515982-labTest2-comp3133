import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { PotterDataService } from '../services/potter-data.service';
import { PotterCharacter } from '../models/potter-character';

@Component({
  selector: 'app-characterlist',
  imports: [
    FormsModule,
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './characterlist.html',
  styleUrl: './characterlist.css',
})
export class Characterlist implements OnInit {
  private readonly api = inject(PotterDataService);

  readonly characters = signal<PotterCharacter[]>([]);
  readonly loading = signal(true);
  readonly error = signal<string | null>(null);
  /** Template-driven filter (FormsModule); list still loads via HttpClient. */
  readonly nameFilter = signal('');
  readonly visibleCharacters = computed(() => {
    const needle = this.nameFilter().trim().toLowerCase();
    const list = this.characters();
    if (!needle) {
      return list;
    }
    return list.filter((c) => c.name.toLowerCase().includes(needle));
  });

  ngOnInit(): void {
    this.api.getAllCharacters().subscribe({
      next: (data) => {
        this.characters.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Unable to load characters. Try again later.');
        this.loading.set(false);
      },
    });
  }
}
