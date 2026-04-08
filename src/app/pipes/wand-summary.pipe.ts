import { Pipe, PipeTransform } from '@angular/core';
import { PotterWand } from '../models/potter-character';

/** Formats wand fields for display (lab pipe requirement). */
@Pipe({ name: 'wandSummary', standalone: true })
export class WandSummaryPipe implements PipeTransform {
  transform(wand: PotterWand | null | undefined): string {
    if (!wand) {
      return '—';
    }
    const len = wand.length === null || wand.length === undefined || wand.length === '' ? '?' : String(wand.length);
    const wood = wand.wood || 'unknown';
    const core = wand.core || 'unknown';
    return `${wood} / ${core} / ${len}"`;
  }
}
