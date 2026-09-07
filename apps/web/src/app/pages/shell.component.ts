import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../core/auth.service';
@Component({
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <div class="min-h-screen">
      <header class="border-b border-harbor-500/10 bg-white/80 backdrop-blur sticky top-0 z-10">
        <div class="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <a routerLink="/" class="font-display text-xl text-harbor-900">HarborAid</a>
          <nav class="flex gap-4 text-sm">
            <a routerLink="/" routerLinkActive="text-harbor-700 font-semibold" [routerLinkActiveOptions]="{exact:true}">Desk</a>
            <a routerLink="/inventory" routerLinkActive="text-harbor-700 font-semibold">Inventory</a>
            <a routerLink="/requests" routerLinkActive="text-harbor-700 font-semibold">Requests</a>
            <a routerLink="/shifts" routerLinkActive="text-harbor-700 font-semibold">Shifts</a>
          </nav>
          <div class="flex items-center gap-3 text-sm">
            <span>{{ auth.user()?.name }} · {{ auth.user()?.role }}</span>
            <button class="text-harbor-700" (click)="auth.logout()">Sign out</button>
          </div>
        </div>
      </header>
      <main class="mx-auto max-w-6xl px-4 py-8"><router-outlet /></main>
    </div>
  `,
})
export class ShellComponent { auth = inject(AuthService); }
