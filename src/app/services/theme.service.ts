import { Injectable, signal, computed } from '@angular/core';

export interface Theme {
  background: string;
  backgroundGradient: string;
  textColor: string;
  buttonGradient: string;
  accentColor: string;
  secondaryColor: string;
}

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private currentCategory = signal<string>('default');

  private themes: { [key: string]: Theme } = {
    default: {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      backgroundGradient: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 50%, #fecfef 100%)',
      textColor: '#333',
      buttonGradient: 'linear-gradient(45deg, #ff6b9d, #c44569)',
      accentColor: 'linear-gradient(45deg, #4ecdc4, #44a08d)',
      secondaryColor: 'linear-gradient(45deg, #ffa726, #ff7043)'
    },
    Animals: {
      background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      backgroundGradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
      textColor: '#2c3e50',
      buttonGradient: 'linear-gradient(45deg, #ff6b9d, #c44569)',
      accentColor: 'linear-gradient(45deg, #4ecdc4, #44a08d)',
      secondaryColor: 'linear-gradient(45deg, #ffa726, #ff7043)'
    },
    Space: {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      backgroundGradient: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 50%, #fecfef 100%)',
      textColor: '#333',
      buttonGradient: 'linear-gradient(45deg, #ff6b9d, #c44569)',
      accentColor: 'linear-gradient(45deg, #4ecdc4, #44a08d)',
      secondaryColor: 'linear-gradient(45deg, #ffa726, #ff7043)'
    },
    Colors: {
      background: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
      backgroundGradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
      textColor: '#333',
      buttonGradient: 'linear-gradient(45deg, #ff6b9d, #c44569)',
      accentColor: 'linear-gradient(45deg, #4ecdc4, #44a08d)',
      secondaryColor: 'linear-gradient(45deg, #ffa726, #ff7043)'
    },
    Nature: {
      background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      backgroundGradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
      textColor: '#2c3e50',
      buttonGradient: 'linear-gradient(45deg, #ff6b9d, #c44569)',
      accentColor: 'linear-gradient(45deg, #4ecdc4, #44a08d)',
      secondaryColor: 'linear-gradient(45deg, #ffa726, #ff7043)'
    },
    Fantasy: {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      backgroundGradient: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 50%, #fecfef 100%)',
      textColor: '#333',
      buttonGradient: 'linear-gradient(45deg, #ff6b9d, #c44569)',
      accentColor: 'linear-gradient(45deg, #4ecdc4, #44a08d)',
      secondaryColor: 'linear-gradient(45deg, #ffa726, #ff7043)'
    }
  };

  currentTheme = computed(() => this.themes[this.currentCategory()] || this.themes['default']);

  setCategory(category: string): void {
    this.currentCategory.set(category);
  }

  getThemeForCategory(category: string): Theme {
    return this.themes[category] || this.themes['default'];
  }

  getLoveButtonTheme(): string {
    return 'linear-gradient(45deg, #ff6b9d, #c44569)';
  }

  getShareButtonTheme(): string {
    return 'linear-gradient(45deg, #667eea, #764ba2)';
  }

  getPlayButtonTheme(): string {
    return 'linear-gradient(45deg, #4ecdc4, #44a08d)';
  }

  getPreviousButtonTheme(category: string): string {
    return 'linear-gradient(45deg, #4ecdc4, #44a08d)';
  }

  getNextButtonTheme(category: string): string {
    return 'linear-gradient(45deg, #ffa726, #ff7043)';
  }
}
