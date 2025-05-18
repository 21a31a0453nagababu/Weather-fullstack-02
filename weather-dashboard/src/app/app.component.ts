import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  template: `
    <div class="app-container">
      <header>
        <h1>Weather Dashboard</h1>
        <nav>
          <button *ngIf="authService.isLoggedIn()" (click)="logout()">Logout</button>
        </nav>
      </header>
      <main>
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styles: [`
    .app-container {
      width: 100vw;
      height: 100vh;
      margin: 0;
      padding: 0;
      background: linear-gradient(to right, #4f46e5, #3b82f6);
      color: #e5e7eb;
      overflow-x: hidden;
    }

    header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem 2rem;
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(10px);
      width: 100%;
      box-sizing: border-box;
    }

    h1 {
      font-size: clamp(1.5rem, 4vw, 2.5rem);
      font-weight: 600;
      color: #f3f4f6;
      margin: 0;
      flex: 1;
      text-align: center;
    }

    nav button {
      background: #ef4444;
      color: white;
      border: none;
      padding: 0.5rem 1.5rem;
      border-radius: 0.5rem;
      cursor: pointer;
      transition: background-color 0.2s;
      font-size: clamp(0.875rem, 2vw, 1rem);
      white-space: nowrap;
      margin-left: 1rem;
    }

    nav button:hover {
      background: #dc2626;
    }

    main {
      height: calc(100vh - 80px);
      overflow-y: auto;
      padding: 1rem;
      box-sizing: border-box;
    }

    @media (max-width: 768px) {
      header {
        padding: 1rem;
        flex-direction: column;
        gap: 1rem;
      }

      nav button {
        width: 100%;
        margin-left: 0;
      }
    }
  `]
})
export class AppComponent {
  constructor(public authService: AuthService) {}

  logout() {
    this.authService.logout();
  }
}