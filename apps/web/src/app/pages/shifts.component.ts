import { Component, inject, OnInit, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { environment } from '../../environments/environment';
@Component({
  standalone: true,
  imports: [DatePipe],
  template: `
    <h1 class="font-display text-3xl text-harbor-900">Volunteer shifts</h1>
    <div class="mt-6 grid gap-4 md:grid-cols-2">
      @for (shift of rows(); track shift.id) {
        <article class="rounded-2xl bg-white p-5 ring-1 ring-slate-100">
          <h2 class="font-display text-2xl">{{ shift.title }}</h2>
          <p class="text-sm text-slate-600">{{ shift.startsAt | date:'EEE d MMM, HH:mm' }} – {{ shift.endsAt | date:'HH:mm' }}</p>
          <p class="mt-2 text-sm">{{ shift.coverage.remaining }} of {{ shift.capacity }} seats open</p>
          <button class="mt-3 rounded-lg bg-harbor-700 text-white px-3 py-1.5 text-sm" (click)="signup(shift.id)" [disabled]="shift.coverage.full">Sign up</button>
        </article>
      }
    </div>
  `,
})
export class ShiftsPageComponent implements OnInit {
  private http = inject(HttpClient);
  rows = signal<any[]>([]);
  ngOnInit() { this.refresh(); }
  refresh() { this.http.get<any[]>(`${environment.apiUrl}/shifts`).subscribe((r) => this.rows.set(r)); }
  signup(id: string) { this.http.post(`${environment.apiUrl}/shifts/${id}/signup`, {}).subscribe(() => this.refresh()); }
}
