import { Component, inject, OnInit, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
@Component({
  standalone: true,
  template: `
    <h1 class="font-display text-3xl text-harbor-900">Inventory</h1>
    <div class="mt-6 overflow-hidden rounded-2xl bg-white ring-1 ring-slate-100">
      <table class="w-full text-left text-sm">
        <thead class="bg-harbor-50 text-slate-500"><tr><th class="px-4 py-3">Item</th><th>Category</th><th>Qty</th><th></th></tr></thead>
        <tbody>
          @for (item of items(); track item.id) {
            <tr class="border-t border-slate-100">
              <td class="px-4 py-3 font-medium">{{ item.name }} @if (item.low) { <span class="ml-2 text-xs text-amber-700">low</span> }</td>
              <td>{{ item.category }}</td>
              <td>{{ item.quantity }} {{ item.unit }}</td>
              <td class="text-right pr-4">
                <button class="mr-2" (click)="adjust(item.id, -1)">−</button>
                <button (click)="adjust(item.id, 1)">+</button>
              </td>
            </tr>
          }
        </tbody>
      </table>
    </div>
  `,
})
export class InventoryPageComponent implements OnInit {
  private http = inject(HttpClient);
  items = signal<any[]>([]);
  ngOnInit() { this.refresh(); }
  refresh() { this.http.get<any[]>(`${environment.apiUrl}/inventory`).subscribe((r) => this.items.set(r)); }
  adjust(id: string, delta: number) { this.http.patch(`${environment.apiUrl}/inventory/${id}`, { delta }).subscribe(() => this.refresh()); }
}
