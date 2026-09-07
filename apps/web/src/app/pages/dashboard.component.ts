import { Component, inject, OnInit, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
@Component({
  standalone: true,
  template: `
    <h1 class="font-display text-4xl text-harbor-900">Today at the pantry</h1>
    <p class="mt-2 text-slate-600">Live snapshot of stock risk, open household requests, and uncovered shifts.</p>
    <div class="mt-8 grid gap-4 md:grid-cols-3">
      <article class="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
        <p class="text-sm text-slate-500">Low-stock items</p>
        <p class="font-display text-4xl text-harbor-700">{{ low() }}</p>
      </article>
      <article class="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
        <p class="text-sm text-slate-500">Open / reserved requests</p>
        <p class="font-display text-4xl text-harbor-700">{{ openReq() }}</p>
      </article>
      <article class="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
        <p class="text-sm text-slate-500">Shifts with seats</p>
        <p class="font-display text-4xl text-harbor-700">{{ openShifts() }}</p>
      </article>
    </div>
  `,
})
export class DashboardComponent implements OnInit {
  private http = inject(HttpClient);
  low = signal(0); openReq = signal(0); openShifts = signal(0);
  ngOnInit() {
    this.http.get<any[]>(`${environment.apiUrl}/inventory`).subscribe((rows) => this.low.set(rows.filter((r) => r.low).length));
    this.http.get<any[]>(`${environment.apiUrl}/requests`).subscribe((rows) => this.openReq.set(rows.filter((r) => r.status === 'open' || r.status === 'reserved').length));
    this.http.get<any[]>(`${environment.apiUrl}/shifts`).subscribe((rows) => this.openShifts.set(rows.filter((r) => !r.coverage?.full).length));
  }
}
