import { Component, signal, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [FormsModule, CommonModule],
  template: `
    <div class="search-container fade-in-up">
      <div class="search-input-wrapper">
        <input
          type="text"
          [(ngModel)]="searchTerm"
          (input)="onSearchChange()"
          (focus)="onSearchFocus()"
          (blur)="onSearchBlur()"
          placeholder="🔍 Search for magical stories..."
          class="search-input"
          aria-label="Search for stories"
          autocomplete="off"
        />
        <div class="search-icon" [class.active]="isSearchFocused()">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M10 18a7.952 7.952 0 0 0 4.897-1.688l4.396 4.396 1.414-1.414-4.396-4.396A7.952 7.952 0 0 0 18 10c0-4.411-3.589-8-8-8s-8 3.589-8 8 3.589 8 8 8zM10 4c3.309 0 6 2.691 6 6s-2.691 6-6 6-6-2.691-6-6 2.691-6 6-6z"/>
          </svg>
        </div>
      </div>
      
      <div class="category-filters scale-in" *ngIf="categories().length > 0">
        <button
          *ngFor="let category of categories(); let i = index"
          (click)="onCategorySelect(category)"
          [class.active]="selectedCategory() === category"
          [style.animation-delay]="(i * 100) + 'ms'"
          class="category-btn"
          [attr.aria-pressed]="selectedCategory() === category"
        >
          {{ getCategoryEmoji(category) }} {{ category }}
        </button>
        <button
          (click)="clearFilters()"
          class="clear-btn pulse"
          *ngIf="selectedCategory() || searchTerm()"
          aria-label="Clear all filters"
        >
          ✨ Clear All
        </button>
      </div>
    </div>
  `,
  styles: [`
    .search-container {
      padding: var(--spacing-6);
      background: var(--color-neutral-50);
      border-radius: var(--radius-3xl);
      margin: var(--spacing-4);
      box-shadow: var(--shadow-neumorphic-medium);
      position: relative;
      overflow: hidden;
    }

    .search-container::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(135deg, rgba(14, 165, 233, 0.05), rgba(139, 92, 246, 0.05));
      pointer-events: none;
    }

    .search-input-wrapper {
      position: relative;
      margin-bottom: var(--spacing-6);
    }

    .search-input {
      width: 100%;
      padding: var(--spacing-4) var(--spacing-16) var(--spacing-4) var(--spacing-6);
      border: 2px solid transparent;
      border-radius: var(--radius-full);
      font-size: var(--font-size-lg);
      font-family: var(--font-family-primary);
      font-weight: var(--font-weight-medium);
      background: var(--color-neutral-100);
      box-shadow: inset 8px 8px 16px rgba(0, 0, 0, 0.05), inset -8px -8px 16px rgba(255, 255, 255, 0.8);
      transition: all var(--duration-normal) var(--ease-out);
      min-height: var(--touch-target-comfortable);
    }

    .search-input:focus {
      outline: none;
      background: var(--color-neutral-50);
      border-color: var(--color-primary-500);
      box-shadow: inset 4px 4px 8px rgba(0, 0, 0, 0.1), inset -4px -4px 8px rgba(255, 255, 255, 0.9), 0 0 0 4px rgba(14, 165, 233, 0.1);
      transform: translateY(-2px);
    }

    .search-input::placeholder {
      color: var(--color-neutral-500);
      font-style: italic;
    }

    .search-icon {
      position: absolute;
      right: var(--spacing-6);
      top: 50%;
      transform: translateY(-50%);
      color: var(--color-primary-600);
      transition: all var(--duration-normal) var(--ease-out);
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .search-icon.active {
      color: var(--color-primary-700);
      transform: translateY(-50%) scale(1.1);
    }

    .category-filters {
      display: flex;
      flex-wrap: wrap;
      gap: var(--spacing-3);
      justify-content: center;
      position: relative;
      z-index: 1;
    }

    .category-btn, .clear-btn {
      padding: var(--spacing-3) var(--spacing-5);
      border: 2px solid transparent;
      border-radius: var(--radius-full);
      font-size: var(--font-size-sm);
      font-weight: var(--font-weight-semibold);
      font-family: var(--font-family-primary);
      cursor: pointer;
      transition: all var(--duration-normal) var(--ease-spring);
      background: var(--color-neutral-100);
      color: var(--color-neutral-700);
      box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.1), -4px -4px 8px rgba(255, 255, 255, 0.8);
      min-height: var(--touch-target-min);
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      overflow: hidden;
    }

    .category-btn:hover, .clear-btn:hover {
      transform: translateY(-3px);
      box-shadow: 6px 6px 12px rgba(0, 0, 0, 0.15), -6px -6px 12px rgba(255, 255, 255, 0.9);
      background: var(--color-neutral-50);
    }

    .category-btn:active, .clear-btn:active {
      transform: translateY(-1px);
      box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1), -2px -2px 4px rgba(255, 255, 255, 0.8);
    }

    .category-btn.active {
      background: linear-gradient(135deg, var(--color-primary-500), var(--color-primary-600));
      color: white;
      transform: translateY(-2px) scale(1.05);
      box-shadow: 6px 6px 12px rgba(0, 0, 0, 0.2), -6px -6px 12px rgba(255, 255, 255, 0.1);
      border-color: var(--color-primary-300);
    }

    .clear-btn {
      background: linear-gradient(135deg, var(--color-warning-500), var(--color-warning-600));
      color: white;
    }

    .clear-btn.pulse {
      animation: pulse 2s infinite;
    }

    /* Professional Animations */
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes scaleIn {
      from {
        opacity: 0;
        transform: scale(0.9);
      }
      to {
        opacity: 1;
        transform: scale(1);
      }
    }

    @keyframes pulse {
      0%, 100% {
        transform: scale(1);
      }
      50% {
        transform: scale(1.05);
      }
    }

    .fade-in-up {
      animation: fadeInUp 0.6s var(--ease-out) forwards;
    }

    .scale-in {
      animation: scaleIn 0.5s var(--ease-spring) forwards;
    }

    .scale-in .category-btn {
      animation: scaleIn 0.4s var(--ease-spring) forwards;
      opacity: 0;
    }

    @media (max-width: 768px) {
      .search-container {
        margin: var(--spacing-2);
        padding: var(--spacing-4);
      }
      
      .search-input {
        font-size: var(--font-size-base);
        padding: var(--spacing-3) var(--spacing-12) var(--spacing-3) var(--spacing-4);
      }
      
      .category-btn, .clear-btn {
        padding: var(--spacing-2) var(--spacing-4);
        font-size: var(--font-size-xs);
      }
    }

    @media (max-width: 480px) {
      .search-container {
        margin: var(--spacing-1);
        padding: var(--spacing-3);
      }

      .search-input {
        padding: var(--spacing-3) var(--spacing-10) var(--spacing-3) var(--spacing-3);
      }

      .category-filters {
        gap: var(--spacing-2);
      }
    }
  `]
})
export class SearchBarComponent {
  categories = input<string[]>([]);
  selectedCategory = input<string>('');
  
  searchTerm = signal('');
  isSearchFocused = signal(false);
  searchChange = output<string>();
  categoryChange = output<string>();
  clearFiltersEvent = output<void>();

  onSearchChange(): void {
    this.searchChange.emit(this.searchTerm());
  }

  onSearchFocus(): void {
    this.isSearchFocused.set(true);
  }

  onSearchBlur(): void {
    this.isSearchFocused.set(false);
  }

  onCategorySelect(category: string): void {
    this.categoryChange.emit(category);
  }

  clearFilters(): void {
    this.searchTerm.set('');
    this.clearFiltersEvent.emit();
  }

  getCategoryEmoji(category: string): string {
    const emojiMap: { [key: string]: string } = {
      'Animals': '🐾',
      'Space': '⭐',
      'Colors': '🌈',
      'Nature': '🌺',
      'Fantasy': '🧚‍♀️'
    };
    return emojiMap[category] || '📚';
  }
}
