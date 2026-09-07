import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../core/auth.service';
@Component({
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="min-h-screen grid lg:grid-cols-2">
      <section class="hidden lg:flex flex-col justify-between bg-harbor-900 text-harbor-50 p-12">
        <p class="tracking-[0.3em] uppercase text-sm">HarborAid</p>
        <div>
          <h1 class="font-display text-5xl leading-tight">Keep the pantry moving when the neighborhood needs it.</h1>
          <p class="mt-6 max-w-md text-harbor-50/80">Inventory, household requests, and volunteer coverage in one operations desk.</p>
        </div>
        <p class="text-sm text-harbor-50/60">Demo: maria@harboraid.org / HarborAid!23</p>
      </section>
      <section class="flex items-center justify-center p-8">
        <form class="w-full max-w-sm space-y-4" (ngSubmit)="submit()">
          <h2 class="font-display text-3xl text-harbor-900">Sign in</h2>
          <label class="block text-sm">Email
            <input class="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2" [(ngModel)]="email" name="email" />
          </label>
          <label class="block text-sm">Password
            <input type="password" class="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2" [(ngModel)]="password" name="password" />
          </label>
          @if (error()) { <p class="text-sm text-red-700">{{ error() }}</p> }
          <button class="w-full rounded-lg bg-harbor-700 text-white py-2.5 font-semibold" type="submit">Enter desk</button>
        </form>
      </section>
    </div>
  `,
})
export class LoginComponent {
  private auth = inject(AuthService);
  private router = inject(Router);
  email = 'maria@harboraid.org';
  password = 'HarborAid!23';
  error = signal('');
  submit() {
    this.auth.login(this.email, this.password).subscribe({
      next: () => this.router.navigateByUrl('/'),
      error: () => this.error.set('Could not sign in. Start the API and run the seed.'),
    });
  }
}
