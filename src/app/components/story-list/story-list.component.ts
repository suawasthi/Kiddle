import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { StoryService } from '../../services/story.service';
import { Story } from '../../models/story.model';

@Component({
  selector: 'app-story-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="story-list-container">
      <div class="header">
        <button (click)="goHome()" class="home-button">
          🏠 Back to Home
        </button>
        <h1 class="main-title">🌟 Magical Story World 🌟</h1>
        <p class="subtitle">Choose your favorite adventure!</p>
      </div>

      <div class="stories-grid" *ngIf="filteredStories().length > 0; else noStories">
        <div
          *ngFor="let story of filteredStories(); trackBy: trackByStoryId"
          class="story-card"
          [routerLink]="['/story', story.id]"
        >
          <div class="story-image">
            <img
              [src]="story.image_urls[0]"
              [alt]="story.title"
              (error)="onImageError($event)"
              class="story-thumbnail"
            />
            <div class="story-overlay">
              <div class="play-button" (click)="playStory(story, $event)">▶️</div>
            </div>
          </div>
          
          <div class="story-content">
            <h3 class="story-title">{{ story.title }}</h3>
            <div class="story-meta">
              <span class="category-badge">{{ getCategoryEmoji(story.category) }} {{ story.category }}</span>
              <span class="age-range" *ngIf="story.age_range">👶 {{ story.age_range }}</span>
              <span class="reading-time" *ngIf="story.reading_time">⏱️ {{ story.reading_time }}min</span>
            </div>
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
      padding: 1rem;
      max-width: 1200px;
      margin: 0 auto;
    }

    .header {
      text-align: center;
      margin-bottom: 2rem;
      padding: 1rem;
    }

    .home-button {
      background: linear-gradient(45deg, #ff6b9d, #c44569);
      color: white;
      border: none;
      padding: 0.8rem 1.5rem;
      border-radius: 25px;
      font-size: 1rem;
      font-weight: bold;
      cursor: pointer;
      transition: all 0.3s ease;
      font-family: 'Comic Sans MS', cursive, sans-serif;
      margin-bottom: 1rem;
      box-shadow: 0 4px 15px rgba(255, 107, 157, 0.3);
    }

    .home-button:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(255, 107, 157, 0.4);
    }

    .main-title {
      font-size: 2.5rem;
      color: #ff6b9d;
      margin: 0;
      font-family: 'Comic Sans MS', cursive, sans-serif;
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
      animation: bounce 2s infinite;
    }

    .subtitle {
      font-size: 1.2rem;
      color: #666;
      margin: 0.5rem 0 0 0;
      font-family: 'Comic Sans MS', cursive, sans-serif;
    }

    .stories-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 1.5rem;
      padding: 1rem 0;
    }

    .story-card {
      background: white;
      border-radius: 20px;
      overflow: hidden;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
      transition: all 0.3s ease;
      cursor: pointer;
      position: relative;
    }

    .story-card:hover {
      transform: translateY(-8px);
      box-shadow: 0 16px 48px rgba(0, 0, 0, 0.2);
    }

    .story-image {
      position: relative;
      height: 200px;
      overflow: hidden;
    }

    .story-thumbnail {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s ease;
    }

    .story-card:hover .story-thumbnail {
      transform: scale(1.1);
    }

    .story-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.3);
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    .story-card:hover .story-overlay {
      opacity: 1;
    }

    .play-button {
      font-size: 3rem;
      color: white;
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
    }

    .story-content {
      padding: 1.5rem;
    }

    .story-title {
      font-size: 1.3rem;
      color: #333;
      margin: 0 0 1rem 0;
      font-family: 'Comic Sans MS', cursive, sans-serif;
      font-weight: bold;
    }

    .story-meta {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin-bottom: 1rem;
    }

    .category-badge, .age-range, .reading-time {
      padding: 0.3rem 0.8rem;
      border-radius: 15px;
      font-size: 0.8rem;
      font-weight: bold;
      font-family: 'Comic Sans MS', cursive, sans-serif;
    }

    .category-badge {
      background: linear-gradient(45deg, #ff6b9d, #c44569);
      color: white;
    }

    .age-range {
      background: linear-gradient(45deg, #4ecdc4, #44a08d);
      color: white;
    }

    .reading-time {
      background: linear-gradient(45deg, #ffa726, #ff7043);
      color: white;
    }

    .story-preview {
      color: #666;
      line-height: 1.5;
      font-size: 0.95rem;
      margin: 0;
      font-family: 'Comic Sans MS', cursive, sans-serif;
    }

    .no-stories {
      text-align: center;
      padding: 3rem 1rem;
      color: #666;
    }

    .no-stories-icon {
      font-size: 4rem;
      margin-bottom: 1rem;
    }

    .no-stories h3 {
      font-size: 1.5rem;
      margin: 0 0 0.5rem 0;
      font-family: 'Comic Sans MS', cursive, sans-serif;
    }

    .no-stories p {
      font-size: 1rem;
      margin: 0;
      font-family: 'Comic Sans MS', cursive, sans-serif;
    }

    @keyframes bounce {
      0%, 20%, 50%, 80%, 100% {
        transform: translateY(0);
      }
      40% {
        transform: translateY(-10px);
      }
      60% {
        transform: translateY(-5px);
      }
    }

    @media (max-width: 768px) {
      .stories-grid {
        grid-template-columns: 1fr;
        gap: 1rem;
      }

      .main-title {
        font-size: 2rem;
      }

      .story-content {
        padding: 1rem;
      }

      .story-title {
        font-size: 1.1rem;
      }
    }
  `]
})
export class StoryListComponent {
  private storyService = inject(StoryService);
  private router = inject(Router);
  private audioPlayer: HTMLAudioElement | null = null;

  filteredStories = computed(() => this.storyService.filteredStories());

  goHome(): void {
    this.router.navigate(['/']);
  }

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

  onImageError(event: any): void {
    // Fallback to a placeholder image
    event.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjBmMGYwIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIG5vdCBmb3VuZDwvdGV4dD48L3N2Zz4=';
  }

  playStory(story: Story, event: Event): void {
    event.stopPropagation(); // Prevent navigation to story detail
    
    console.log('Play story called for:', story.title);
    console.log('Story audio_url:', story.audio_url);
    
    // Check if story has audio file
    if (story.audio_url) {
      console.log('Playing audio file for:', story.title);
      this.playAudioFile(story.audio_url, story.title);
    } else {
      console.log('No audio file, using text-to-speech for:', story.title);
      this.playTextToSpeech(story.text, story.title);
    }
  }

  private playAudioFile(audioUrl: string, storyTitle: string): void {
    console.log('Attempting to play audio:', audioUrl, 'for story:', storyTitle);
    
    // Stop any current audio
    if (this.audioPlayer) {
      this.audioPlayer.pause();
      this.audioPlayer.currentTime = 0;
    }
    
    this.audioPlayer = new Audio(audioUrl);
    
    this.audioPlayer.onloadstart = () => {
      console.log('Audio loading started for:', storyTitle);
      this.showPlayFeedback(storyTitle);
    };
    
    this.audioPlayer.oncanplay = () => {
      console.log('Audio can play for:', storyTitle);
    };
    
    this.audioPlayer.onended = () => {
      console.log('Audio ended for:', storyTitle);
      this.audioPlayer = null;
    };
    
    this.audioPlayer.onerror = (error) => {
      console.error('Audio error for:', storyTitle, error);
      this.audioPlayer = null;
      // Fallback to text-to-speech if audio fails
      this.playTextToSpeechFallback(storyTitle);
    };
    
    this.audioPlayer.play().catch(error => {
      console.error('Error playing audio:', error);
      this.audioPlayer = null;
      // Fallback to text-to-speech if audio fails
      this.playTextToSpeechFallback(storyTitle);
    });
  }

  private playTextToSpeechFallback(storyTitle: string): void {
    // Find the story by title to get the text
    const story = this.filteredStories().find(s => s.title === storyTitle);
    if (story) {
      this.playTextToSpeech(story.text, storyTitle);
    } else {
      this.showPlayFeedback('Audio not available');
    }
  }

  private playTextToSpeech(text: string, storyTitle: string): void {
    // Use Web Speech API to read the story
    if ('speechSynthesis' in window) {
      // Stop any current speech
      speechSynthesis.cancel();
      
      // Create speech utterance
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.8; // Slower reading speed for children
      utterance.pitch = 1.1; // Slightly higher pitch
      utterance.volume = 0.8;
      
      // Try to use a child-friendly voice if available
      const voices = speechSynthesis.getVoices();
      const childVoice = voices.find(voice => 
        voice.name.includes('Child') || 
        voice.name.includes('Female') ||
        voice.name.toLowerCase().includes('young')
      );
      
      if (childVoice) {
        utterance.voice = childVoice;
      }
      
      // Start reading
      speechSynthesis.speak(utterance);
      
      // Show feedback
      this.showPlayFeedback(storyTitle);
    } else {
      alert('Text-to-speech is not supported in this browser.');
    }
  }

  private showPlayFeedback(storyTitle: string): void {
    // Create a temporary notification
    const notification = document.createElement('div');
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: linear-gradient(45deg, #ff6b9d, #c44569);
      color: white;
      padding: 1rem 2rem;
      border-radius: 25px;
      font-family: 'Comic Sans MS', cursive, sans-serif;
      font-weight: bold;
      box-shadow: 0 8px 32px rgba(255, 107, 157, 0.3);
      z-index: 1000;
      animation: slideIn 0.3s ease-out;
    `;
    notification.textContent = `🎵 Playing: ${storyTitle}`;
    
    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
      @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
      notification.style.animation = 'slideIn 0.3s ease-out reverse';
      setTimeout(() => {
        document.body.removeChild(notification);
        document.head.removeChild(style);
      }, 300);
    }, 3000);
  }
}
