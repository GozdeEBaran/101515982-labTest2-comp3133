import { Component, OnDestroy, OnInit, inject, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PotterDataService } from '../services/potter-data.service';
import { PotterCharacter } from '../models/potter-character';

type HouseChoice = 'gryffindor' | 'slytherin' | 'hufflepuff' | 'ravenclaw' | 'none';

@Component({
  selector: 'app-characterfilter',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './characterfilter.html',
  styleUrl: './characterfilter.css',
})
export class Characterfilter implements OnInit, OnDestroy {
  private readonly api = inject(PotterDataService);
  private sub?: Subscription;

  readonly houseControl = new FormControl<HouseChoice>('gryffindor', { nonNullable: true });

  readonly characters = signal<PotterCharacter[]>([]);
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);
  readonly selectedLabel = signal('Gryffindor');

  readonly houseOptions: { value: HouseChoice; label: string }[] = [
    { value: 'gryffindor', label: 'Gryffindor' },
    { value: 'slytherin', label: 'Slytherin' },
    { value: 'hufflepuff', label: 'Hufflepuff' },
    { value: 'ravenclaw', label: 'Ravenclaw' },
    { value: 'none', label: 'No house' },
  ];

  ngOnInit(): void {
    this.sub = this.houseControl.valueChanges.subscribe((slug) => this.loadHouse(slug));
    this.loadHouse(this.houseControl.value);
    this.syncLabel(this.houseControl.value);
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  private syncLabel(slug: HouseChoice): void {
    const found = this.houseOptions.find((o) => o.value === slug);
    this.selectedLabel.set(found?.label ?? slug);
  }

  private loadHouse(slug: HouseChoice): void {
    this.syncLabel(slug);
    this.loading.set(true);
    this.error.set(null);

    if (slug === 'none') {
      this.api.getAllCharacters().subscribe({
        next: (all) => {
          const filtered = all.filter((c) => !c.house || c.house.trim() === '');
          this.characters.set(filtered);
          this.loading.set(false);
        },
        error: () => {
          this.error.set('Could not load characters for this filter.');
          this.loading.set(false);
        },
      });
      return;
    }

    this.api.getByHouseSlug(slug).subscribe({
      next: (rows) => {
        this.characters.set(rows);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('House endpoint failed. Check your connection.');
        this.loading.set(false);
      },
    });
  }
}
