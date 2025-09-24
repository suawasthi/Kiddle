import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { StoryService } from '../../services/story.service';
import { ThemeService } from '../../services/theme.service';
import { Story } from '../../models/story.model';

@Component({
  selector: 'app-story-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="story-detail-container" *ngIf="currentStory(); else loading" 
         [style.background]="currentTheme().background">
      <div class="story-header">
        <div class="header-buttons">
          <button (click)="goHome()" class="home-button" 
                  [style.background]="currentTheme().buttonGradient">
            🏠 Home
          </button>
          <button (click)="goBack()" class="back-button" 
                  [style.background]="currentTheme().buttonGradient">
            ← Back to Stories
          </button>
        </div>
        
        <div class="story-info" [style.background]="currentTheme().backgroundGradient">
          <h1 class="story-title" [style.color]="currentTheme().textColor">{{ currentStory()?.title }}</h1>
          <div class="story-meta">
            <span class="category-badge" [style.background]="currentTheme().buttonGradient">{{ getCategoryEmoji(currentStory()?.category || '') }} {{ currentStory()?.category }}</span>
            <span class="age-range" *ngIf="currentStory()?.age_range" [style.background]="currentTheme().accentColor">👶 {{ currentStory()?.age_range }}</span>
            <span class="reading-time" *ngIf="currentStory()?.reading_time" [style.background]="currentTheme().secondaryColor">⏱️ {{ currentStory()?.reading_time }}min</span>
          </div>
        </div>
      </div>

      <div class="story-content">
        <div class="story-images" *ngIf="hasImages()">
          <img
            *ngFor="let imageUrl of currentStory()?.image_urls || []; let i = index"
            [src]="imageUrl"
            [alt]="'Story image ' + (i + 1)"
            (error)="onImageError($event)"
            class="story-image"
            [class.active]="currentImageIndex() === i"
            (click)="setCurrentImage(i)"
          />
        </div>

        <div class="story-text">
          <p class="story-paragraph">{{ currentStory()?.text }}</p>
        </div>
      </div>

      <div class="story-navigation">
        <button
          (click)="goToPreviousStory()"
          [disabled]="!hasPreviousStory()"
          class="nav-button prev-button"
          [style.background]="themeService.getPreviousButtonTheme(currentStory()?.category || '')"
        >
          ← Previous Story
        </button>
        
        <button
          (click)="goToNextStory()"
          [disabled]="!hasNextStory()"
          class="nav-button next-button"
          [style.background]="themeService.getNextButtonTheme(currentStory()?.category || '')"
        >
          Next Story →
        </button>
      </div>

      <div class="story-actions">
        <button (click)="playStory()" class="action-button play-button"
                [style.background]="themeService.getPlayButtonTheme()">
          🎵 {{ isPlaying() ? 'Stop Reading' : 'Play Story' }}
        </button>
        
        <button (click)="toggleFavorite()" class="action-button favorite-button"
                [style.background]="themeService.getLoveButtonTheme()">
          {{ isFavorite() ? '❤️' : '🤍' }} {{ isFavorite() ? 'Loved!' : 'Love this story' }}
        </button>
        
        <button (click)="shareStory()" class="action-button share-button"
                [style.background]="themeService.getShareButtonTheme()">
          📤 Share Story
        </button>
      </div>
    </div>

    <ng-template #loading>
      <div class="loading-container">
        <div class="loading-spinner">📚</div>
        <p>Loading your magical story...</p>
      </div>
    </ng-template>
  `,
  styles: [`
    .story-detail-container {
      max-width: 800px;
      margin: 0 auto;
      padding: 1rem;
      min-height: 100vh;
    }

    .story-header {
      margin-bottom: 2rem;
    }

    .header-buttons {
      display: flex;
      gap: 1rem;
      margin-bottom: 1rem;
    }

    .home-button, .back-button {
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
      box-shadow: 0 4px 15px rgba(255, 107, 157, 0.3);
    }

    .home-button:hover, .back-button:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(255, 107, 157, 0.4);
    }

    .back-button {
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

    .back-button:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(255, 107, 157, 0.4);
    }

    .story-info {
      text-align: center;
      padding: 2rem;
      background: linear-gradient(135deg, #ff9a9e 0%, #fecfef 50%, #fecfef 100%);
      border-radius: 20px;
      box-shadow: 0 8px 32px rgba(255, 154, 158, 0.3);
    }

    .story-title {
      font-size: 2.2rem;
      color: #333;
      margin: 0 0 1rem 0;
      font-family: 'Comic Sans MS', cursive, sans-serif;
      font-weight: bold;
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
    }

    .story-meta {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      justify-content: center;
    }

    .category-badge, .age-range, .reading-time {
      padding: 0.5rem 1rem;
      border-radius: 20px;
      font-size: 0.9rem;
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

    .story-content {
      margin-bottom: 2rem;
    }

    .story-images {
      display: flex;
      gap: 1rem;
      margin-bottom: 2rem;
      overflow-x: auto;
      padding: 1rem 0;
    }

    .story-image {
      min-width: 200px;
      height: 150px;
      object-fit: cover;
      border-radius: 15px;
      cursor: pointer;
      transition: all 0.3s ease;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    }

    .story-image:hover {
      transform: scale(1.05);
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
    }

    .story-image.active {
      border: 4px solid #ff6b9d;
      transform: scale(1.05);
    }

    .story-text {
      background: white;
      padding: 2rem;
      border-radius: 20px;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
      margin-bottom: 2rem;
    }

    .story-paragraph {
      font-size: 1.2rem;
      line-height: 1.8;
      color: #333;
      margin: 0;
      font-family: 'Comic Sans MS', cursive, sans-serif;
      text-align: justify;
    }

    .story-navigation {
      display: flex;
      justify-content: space-between;
      margin-bottom: 2rem;
      gap: 1rem;
    }

    .nav-button {
      padding: 1rem 2rem;
      border: none;
      border-radius: 25px;
      font-size: 1rem;
      font-weight: bold;
      cursor: pointer;
      transition: all 0.3s ease;
      font-family: 'Comic Sans MS', cursive, sans-serif;
      flex: 1;
    }

    .prev-button {
      background: linear-gradient(45deg, #4ecdc4, #44a08d);
      color: white;
    }

    .next-button {
      background: linear-gradient(45deg, #ffa726, #ff7043);
      color: white;
    }

    .nav-button:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
    }

    .nav-button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .story-actions {
      display: flex;
      gap: 1rem;
      justify-content: center;
    }

    .action-button {
      padding: 1rem 2rem;
      border: none;
      border-radius: 25px;
      font-size: 1rem;
      font-weight: bold;
      cursor: pointer;
      transition: all 0.3s ease;
      font-family: 'Comic Sans MS', cursive, sans-serif;
    }

    .favorite-button {
      background: linear-gradient(45deg, #ff6b9d, #c44569);
      color: white;
    }

    .share-button {
      background: linear-gradient(45deg, #667eea, #764ba2);
      color: white;
    }

    .action-button:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
    }

    .play-button {
      background: linear-gradient(45deg, #4ecdc4, #44a08d);
      color: white;
    }

    .loading-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 50vh;
      color: #666;
    }

    .loading-spinner {
      font-size: 4rem;
      animation: spin 2s linear infinite;
      margin-bottom: 1rem;
    }

    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }

    @media (max-width: 768px) {
      .story-detail-container {
        padding: 0.5rem;
      }

      .story-title {
        font-size: 1.8rem;
      }

      .story-text {
        padding: 1.5rem;
      }

      .story-paragraph {
        font-size: 1.1rem;
      }

      .story-navigation {
        flex-direction: column;
      }

      .story-actions {
        flex-direction: column;
      }

      .story-images {
        flex-direction: column;
      }

      .story-image {
        min-width: 100%;
        height: 200px;
      }
    }
  `]
})
export class StoryDetailComponent {
  private storyService = inject(StoryService);
  public themeService = inject(ThemeService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  currentStory = signal<Story | null>(null);
  currentImageIndex = signal(0);
  isFavorite = signal(false);
  isPlaying = signal(false);

  private allStories = computed(() => this.storyService.filteredStories());
  
  // Computed signal to safely check if story has images
  hasImages = computed(() => {
    const story = this.currentStory();
    return story?.image_urls && story.image_urls.length > 0;
  });

  // Computed current theme based on story category
  currentTheme = computed(() => {
    const story = this.currentStory();
    return story ? this.themeService.getThemeForCategory(story.category) : this.themeService.currentTheme();
  });

  constructor() {
    this.route.params.subscribe(params => {
      const storyId = +params['id'];
      this.loadStory(storyId);
    });
  }

  private loadStory(id: number): void {
    this.storyService.getStoryById(id).subscribe(story => {
      if (story) {
        this.currentStory.set(story);
        this.currentImageIndex.set(0);
      } else {
        this.router.navigate(['/']);
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/stories']);
  }

  goHome(): void {
    this.router.navigate(['/']);
  }

  goToPreviousStory(): void {
    const currentId = this.currentStory()?.id;
    if (!currentId) return;

    const currentIndex = this.allStories().findIndex(story => story.id === currentId);
    if (currentIndex > 0) {
      const previousStory = this.allStories()[currentIndex - 1];
      this.router.navigate(['/story', previousStory.id]);
    }
  }

  goToNextStory(): void {
    const currentId = this.currentStory()?.id;
    if (!currentId) return;

    const currentIndex = this.allStories().findIndex(story => story.id === currentId);
    if (currentIndex < this.allStories().length - 1) {
      const nextStory = this.allStories()[currentIndex + 1];
      this.router.navigate(['/story', nextStory.id]);
    }
  }

  hasPreviousStory(): boolean {
    const currentId = this.currentStory()?.id;
    if (!currentId) return false;

    const currentIndex = this.allStories().findIndex(story => story.id === currentId);
    return currentIndex > 0;
  }

  hasNextStory(): boolean {
    const currentId = this.currentStory()?.id;
    if (!currentId) return false;

    const currentIndex = this.allStories().findIndex(story => story.id === currentId);
    return currentIndex < this.allStories().length - 1;
  }

  setCurrentImage(index: number): void {
    this.currentImageIndex.set(index);
  }

  toggleFavorite(): void {
    this.isFavorite.update(fav => !fav);
  }

  shareStory(): void {
    if (navigator.share && this.currentStory()) {
      navigator.share({
        title: this.currentStory()?.title,
        text: `Check out this amazing story: ${this.currentStory()?.title}`,
        url: window.location.href
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href);
      alert('Story link copied to clipboard!');
    }
  }

  private audioPlayer: HTMLAudioElement | null = null;

  playStory(): void {
    const story = this.currentStory();
    if (!story) return;

    console.log('Play story called for:', story.title);
    console.log('Story audio_url:', story.audio_url);

    if (this.isPlaying()) {
      // Stop current audio or speech
      if (this.audioPlayer) {
        this.audioPlayer.pause();
        this.audioPlayer.currentTime = 0;
        this.audioPlayer = null;
      } else {
        speechSynthesis.cancel();
      }
      this.isPlaying.set(false);
      return;
    }

    // Check if story has audio file
    if (story.audio_url) {
      console.log('Playing audio file for:', story.title);
      this.playAudioFile(story.audio_url);
    } else {
      console.log('No audio file, using text-to-speech for:', story.title);
      this.playTextToSpeech(story.text);
    }
  }

  private playAudioFile(audioUrl: string): void {
    console.log('Attempting to play audio:', audioUrl, 'for story:', this.currentStory()?.title);
    
    this.audioPlayer = new Audio(audioUrl);
    
    this.audioPlayer.onloadstart = () => {
      console.log('Audio loading started for:', this.currentStory()?.title);
      this.isPlaying.set(true);
    };
    
    this.audioPlayer.oncanplay = () => {
      console.log('Audio can play for:', this.currentStory()?.title);
    };
    
    this.audioPlayer.onended = () => {
      console.log('Audio ended for:', this.currentStory()?.title);
      this.isPlaying.set(false);
      this.audioPlayer = null;
    };
    
    this.audioPlayer.onerror = (error) => {
      console.error('Audio error for:', this.currentStory()?.title, error);
      this.isPlaying.set(false);
      this.audioPlayer = null;
      // Fallback to text-to-speech if audio fails
      this.playTextToSpeech(this.currentStory()?.text || '');
    };
    
    this.audioPlayer.play().catch(error => {
      console.error('Error playing audio:', error);
      this.isPlaying.set(false);
      this.audioPlayer = null;
      // Fallback to text-to-speech if audio fails
      this.playTextToSpeech(this.currentStory()?.text || '');
    });
  }

  private playTextToSpeech(text: string): void {
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
      
      // Set up event handlers
      utterance.onstart = () => {
        this.isPlaying.set(true);
      };
      
      utterance.onend = () => {
        this.isPlaying.set(false);
      };
      
      utterance.onerror = () => {
        this.isPlaying.set(false);
      };
      
      // Start reading
      speechSynthesis.speak(utterance);
    } else {
      alert('Text-to-speech is not supported in this browser.');
    }
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
}
