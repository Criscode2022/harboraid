import { Component, inject, OnInit, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { environment } from '../../environments/environment';
@Component({
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="flex items-end justify-between gap-4 flex-wrap">
      <h1 class="font-display text-3xl text-harbor-900">Household requests</h1>
      <form class="flex gap-2 text-sm" (ngSubmit)="create()">
        <input class="rounded-lg border px-3 py-2" placeholder="Household" [(ngModel)]="household" name="household" />
        <input class="rounded-lg border px-3 py-2" placeholder="Items needed" [(ngModel)]="itemsNeeded" name="items" />
        <button class="rounded-lg bg-harbor-700 text-white px-3">Add</button>
      </form>
    </div>
    <ul class="mt-6 space-y-3">
      @for (req of rows(); track req.id) {
        <li class="rounded-2xl bg-white p-4 ring-1 ring-slate-100 flex items-center justify-between gap-3">
          <div>
            <p class="font-semibold">{{ req.household }} <span class="text-xs uppercase text-harbor-700">{{ req.priority }}</span></p>
            <p class="text-sm text-slate-600">{{ req.itemsNeeded }}</p>
          </div>
          <div class="flex items-center gap-2 text-sm">
            <span class="rounded-full bg-harbor-50 px-2 py-1">{{ req.status }}</span>
            @if (req.status === 'open') { <button (click)="move(req.id, 'reserved')">Reserve</button> }
            @if (req.status === 'reserved') { <button (click)="move(req.id, 'fulfilled')">Fulfill</button> }
          </div>
        </li>
      }
    </ul>
  `,
})
export class RequestsPageComponent implements OnInit {
  private http = inject(HttpClient);
  rows = signal<any[]>([]); household = ''; itemsNeeded = '';
  ngOnInit() { this.refresh(); }
  refresh() { this.http.get<any[]>(`${environment.apiUrl}/requests`).subscribe((r) => this.rows.set(r)); }
  create() {
    this.http.post(`${environment.apiUrl}/requests`, { household: this.household, itemsNeeded: this.itemsNeeded, priority: 'normal' })
      .subscribe(() => { this.household=''; this.itemsNeeded=''; this.refresh(); });
  }
  move(id: string, status: string) { this.http.patch(`${environment.apiUrl}/requests/${id}`, { status }).subscribe(() => this.refresh()); }
}
