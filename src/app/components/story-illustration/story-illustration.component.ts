import { Component, input, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { getStoryIllustration } from '../../illustrations/story-illustrations';

@Component({
  selector: 'app-story-illustration',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="illustration-container" [class]="containerClass()">
      <div 
        class="illustration-content"
        [innerHTML]="sanitizedSvg()"
        [attr.aria-label]="altText()"
        role="img"
      ></div>
      <div class="illustration-overlay" *ngIf="showOverlay()">
        <div class="play-indicator">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z"/>
          </svg>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .illustration-container {
      position: relative;
      width: 100%;
      height: 100%;
      border-radius: var(--radius-xl);
      overflow: hidden;
      background: var(--color-neutral-100);
      box-shadow: inset 2px 2px 4px rgba(0, 0, 0, 0.1);
    }

    .illustration-content {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .illustration-content svg {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform var(--duration-slow) var(--ease-out);
    }

    .illustration-container:hover .illustration-content svg {
      transform: scale(1.05);
    }

    .illustration-overlay {
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

    .illustration-container:hover .illustration-overlay {
      opacity: 1;
    }

    .play-indicator {
      background: rgba(255, 255, 255, 0.9);
      border-radius: var(--radius-full);
      width: var(--spacing-16);
      height: var(--spacing-16);
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--color-primary-600);
      transform: scale(0.8);
      transition: transform var(--duration-normal) var(--ease-bounce);
      box-shadow: var(--shadow-lg);
    }

    .illustration-container:hover .play-indicator {
      transform: scale(1);
    }

    /* Theme-specific styling */
    .animals {
      background: linear-gradient(135deg, #ecfdf5, #d1fae5);
    }

    .space {
      background: linear-gradient(135deg, #1e1b4b, #312e81);
    }

    .colors {
      background: linear-gradient(135deg, #faf5ff, #f3e8ff);
    }

    .nature {
      background: linear-gradient(135deg, #f0fdf4, #dcfce7);
    }

    .fantasy {
      background: linear-gradient(135deg, #ecfeff, #cffafe);
    }

    /* Responsive design */
    @media (max-width: 768px) {
      .play-indicator {
        width: var(--spacing-12);
        height: var(--spacing-12);
      }
    }
  `]
})
export class StoryIllustrationComponent {
  category = input.required<string>();
  scene = input<number>(1);
  showOverlay = input<boolean>(false);
  containerClass = input<string>('');
  altText = input<string>('Story illustration');

  private domSanitizer = inject(DomSanitizer);

  sanitizedSvg = computed(() => {
    const svgContent = getStoryIllustration(this.category(), this.scene());
    return this.domSanitizer.bypassSecurityTrustHtml(svgContent);
  });
}
