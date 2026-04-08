import { Component, OnDestroy, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Subscription, filter, map, switchMap } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';
import { PotterDataService } from '../services/potter-data.service';
import { PotterCharacter } from '../models/potter-character';
import { WandSummaryPipe } from '../pipes/wand-summary.pipe';

@Component({
  selector: 'app-characterdetails',
  imports: [
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatDividerModule,
    WandSummaryPipe,
  ],
  templateUrl: './characterdetails.html',
  styleUrl: './characterdetails.css',
})
export class Characterdetails implements OnInit, OnDestroy {
  private readonly api = inject(PotterDataService);
  private readonly route = inject(ActivatedRoute);
  private sub?: Subscription;

  readonly character = signal<PotterCharacter | null>(null);
  readonly loading = signal(true);
  readonly error = signal<string | null>(null);

  ngOnInit(): void {
    this.sub = this.route.paramMap
      .pipe(
        map((params) => params.get('id')),
        filter((id): id is string => !!id),
        switchMap((id) => this.api.getById(id)),
      )
      .subscribe({
        next: (c) => {
          this.character.set(c);
          this.loading.set(false);
          this.error.set(null);
        },
        error: () => {
          this.character.set(null);
          this.loading.set(false);
          this.error.set('That character id could not be loaded.');
        },
      });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
