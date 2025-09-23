import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StoryService } from '../../services/story.service';
import { ThemeService } from '../../services/theme.service';
import { Story } from '../../models/story.model';

@Component({
  selector: 'app-story-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="story-list-container">
      <div class="header fade-in-up">
        <h1 class="main-title">🌟 Magical Story World 🌟</h1>
        <p class="subtitle">Choose your favorite adventure!</p>
      </div>

      <div class="stories-grid scale-in" *ngIf="filteredStories().length > 0; else noStories">
        <div
          *ngFor="let story of filteredStories(); trackBy: trackByStoryId"
          class="story-card"
          [routerLink]="['/story', story.id]"
          [style.border-color]="getThemeForStory(story.category).primaryColor"
        >
          <div class="story-image">
            <img
              [src]="story.image_urls[0]"
              [alt]="story.title"
              (error)="onImageError($event)"
              class="story-thumbnail"
            />
            <div class="story-overlay">
              <div class="play-button">▶️</div>
            </div>
          </div>
          
          <div class="story-content">
            <h3 class="story-title">{{ story.title }}</h3>
            <div class="story-meta">
            <span class="category-badge" [style.background]="getThemeForStory(story.category).buttonGradient">{{ getCategoryEmoji(story.category) }} {{ story.category }}</span>
            <span class="age-range" *ngIf="story.age_range" [style.background]="getThemeForStory(story.category).accentColor">👶 {{ story.age_range }}</span>
            <span class="reading-time" *ngIf="story.reading_time" [style.background]="getThemeForStory(story.category).secondaryColor">⏱️ {{ story.reading_time }}min</span>
            </div>
            <p class="story-preview">{{ getStoryPreview(story.text) }}</p>
          </div>
        </div>
      </div>

      <ng-template #noStories>
        <div class="no-stories">
          <div class="no-stories-icon">📚</div>
          <h3>No stories found</h3>
          <p>Try adjusting your search or filters</p>
        </div>
      </ng-template>
    </div>
  `,
  styles: [`
    .story-list-container {
      padding: var(--spacing-4);
      max-width: 1200px;
      margin: 0 auto;
      min-height: 100vh;
    }

    .header {
      text-align: center;
      margin-bottom: var(--spacing-12);
      padding: var(--spacing-8);
      background: var(--color-neutral-50);
      border-radius: var(--radius-3xl);
      box-shadow: var(--shadow-neumorphic-light);
      position: relative;
      overflow: hidden;
    }

    .header::before {
      content: '';
      position: absolute;
      top: -50%;
      left: -50%;
      width: 200%;
      height: 200%;
      background: radial-gradient(circle, rgba(14, 165, 233, 0.1) 0%, transparent 70%);
      animation: rotate 20s linear infinite;
    }

    .main-title {
      font-family: var(--font-family-display);
      font-size: var(--font-size-4xl);
      font-weight: var(--font-weight-extrabold);
      color: var(--color-primary-700);
      margin: 0;
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
      position: relative;
      z-index: 1;
      letter-spacing: -0.025em;
    }

    .subtitle {
      font-family: var(--font-family-primary);
      font-size: var(--font-size-xl);
      font-weight: var(--font-weight-medium);
      color: var(--color-neutral-600);
      margin: var(--spacing-4) 0 0 0;
      position: relative;
      z-index: 1;
    }

    .stories-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
      gap: var(--spacing-6);
      padding: var(--spacing-2) 0;
    }

    .story-card {
      background: var(--color-neutral-50);
      border-radius: var(--radius-3xl);
      overflow: hidden;
      box-shadow: var(--shadow-neumorphic-medium);
      transition: all var(--duration-normal) var(--ease-spring);
      cursor: pointer;
      position: relative;
      border: 2px solid transparent;
      min-height: var(--touch-target-extra-large);
      transform: translateY(0);
    }

    .story-card:hover {
      transform: translateY(-12px) scale(1.02);
      box-shadow: var(--shadow-neumorphic-strong);
      border-color: var(--color-primary-300);
    }

    .story-card:focus {
      outline: 3px solid var(--color-primary-500);
      outline-offset: 4px;
    }

    .story-card:active {
      transform: translateY(-4px) scale(0.98);
      transition: all var(--duration-fast) var(--ease-in-out);
    }

    .story-image {
      position: relative;
      height: 240px;
      overflow: hidden;
      background: linear-gradient(135deg, var(--color-primary-100), var(--color-primary-200));
    }

    .story-thumbnail {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform var(--duration-slow) var(--ease-out);
      filter: brightness(1.1) saturate(1.2);
    }

    .story-card:hover .story-thumbnail {
      transform: scale(1.08);
    }

    .story-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(135deg, rgba(14, 165, 233, 0.8), rgba(139, 92, 246, 0.8));
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      transition: opacity var(--duration-normal) var(--ease-in-out);
      backdrop-filter: blur(4px);
    }

    .story-card:hover .story-overlay {
      opacity: 1;
    }

    .play-button {
      font-size: var(--font-size-5xl);
      color: white;
      text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.3);
      background: rgba(255, 255, 255, 0.2);
      border-radius: var(--radius-full);
      width: var(--spacing-20);
      height: var(--spacing-20);
      display: flex;
      align-items: center;
      justify-content: center;
      transform: scale(0.8);
      transition: transform var(--duration-normal) var(--ease-bounce);
    }

    .story-card:hover .play-button {
      transform: scale(1);
    }

    .story-content {
      padding: var(--spacing-8);
      background: var(--color-neutral-50);
      position: relative;
    }

    .story-title {
      font-family: var(--font-family-display);
      font-size: var(--font-size-2xl);
      font-weight: var(--font-weight-bold);
      color: var(--color-neutral-900);
      margin: 0 0 var(--spacing-4) 0;
      line-height: var(--line-height-tight);
      letter-spacing: -0.025em;
    }

    .story-meta {
      display: flex;
      flex-wrap: wrap;
      gap: var(--spacing-2);
      margin-bottom: var(--spacing-4);
    }

    .category-badge, .age-range, .reading-time {
      padding: var(--spacing-3) var(--spacing-5);
      border-radius: var(--radius-full);
      font-size: var(--font-size-base);
      font-weight: var(--font-weight-semibold);
      font-family: var(--font-family-primary);
      color: white;
      text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
      border: 2px solid rgba(255, 255, 255, 0.2);
      backdrop-filter: blur(8px);
      transition: all var(--duration-fast) var(--ease-in-out);
      min-height: var(--touch-target-min);
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .category-badge:hover, .age-range:hover, .reading-time:hover {
      transform: translateY(-2px);
      box-shadow: var(--shadow-md);
    }

    .story-preview {
      font-family: var(--font-family-primary);
      color: var(--color-neutral-600);
      line-height: var(--line-height-relaxed);
      font-size: var(--font-size-base);
      margin: 0;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .no-stories {
      text-align: center;
      padding: var(--spacing-16) var(--spacing-4);
      background: var(--color-neutral-50);
      border-radius: var(--radius-3xl);
      box-shadow: var(--shadow-neumorphic-light);
      margin: var(--spacing-8);
    }

    .no-stories-icon {
      font-size: var(--font-size-6xl);
      margin-bottom: var(--spacing-4);
      opacity: 0.6;
    }

    .no-stories h3 {
      font-family: var(--font-family-display);
      font-size: var(--font-size-2xl);
      font-weight: var(--font-weight-bold);
      color: var(--color-neutral-700);
      margin: 0 0 var(--spacing-2) 0;
    }

    .no-stories p {
      font-family: var(--font-family-primary);
      font-size: var(--font-size-lg);
      color: var(--color-neutral-600);
      margin: 0;
    }

    /* Professional Animations */
    @keyframes rotate {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }

    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(30px);
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

    .fade-in-up {
      animation: fadeInUp 0.8s var(--ease-out) forwards;
    }

    .scale-in {
      animation: scaleIn 0.6s var(--ease-spring) forwards;
    }

    .scale-in .story-card {
      animation: scaleIn 0.6s var(--ease-spring) forwards;
      animation-delay: calc(var(--animation-delay, 0) * 0.1s);
    }

    @media (max-width: 768px) {
      .stories-grid {
        grid-template-columns: 1fr;
        gap: var(--spacing-6);
      }

      .main-title {
        font-size: var(--font-size-3xl);
      }

      .subtitle {
        font-size: var(--font-size-lg);
      }

      .header {
        padding: var(--spacing-6);
        margin-bottom: var(--spacing-8);
      }

      .story-content {
        padding: var(--spacing-5);
      }

      .story-title {
        font-size: var(--font-size-xl);
      }

      .story-image {
        height: 200px;
      }
    }

    @media (max-width: 480px) {
      .story-list-container {
        padding: var(--spacing-2);
      }

      .main-title {
        font-size: var(--font-size-2xl);
      }

      .subtitle {
        font-size: var(--font-size-base);
      }

      .stories-grid {
        grid-template-columns: 1fr;
        gap: var(--spacing-4);
      }

      .story-content {
        padding: var(--spacing-4);
      }
    }
  `]
})
export class StoryListComponent {
  private storyService = inject(StoryService);
  private themeService = inject(ThemeService);

  filteredStories = computed(() => this.storyService.filteredStories());

  trackByStoryId(index: number, story: Story): number {
    return story.id;
  }

  getStoryPreview(text: string): string {
    return text.length > 120 ? text.substring(0, 120) + '...' : text;
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

  getThemeForStory(category: string) {
    return this.themeService.getThemeForCategory(category);
  }

  onImageError(event: any): void {
    // Fallback to a placeholder image
    event.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjBmMGYwIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIG5vdCBmb3VuZDwvdGV4dD48L3N2Zz4=';
  }
}
