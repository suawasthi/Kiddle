import { Injectable, computed, signal } from '@angular/core';
import { DesignTokens, CategoryTheme } from '../design-system/design-tokens';

export interface StoryTheme {
  name: string;
  category: CategoryTheme;
  background: string;
  backgroundGradient: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  textColor: string;
  textColorLight: string;
  buttonGradient: string;
  cardBackground: string;
  cardShadow: string;
  borderColor: string;
  hoverColor: string;
  focusColor: string;
}

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private currentStoryCategory = signal<string>('');

  // Professional story-specific themes using design tokens
  private themes: { [key: string]: StoryTheme } = {
    'Animals': {
      name: 'Jungle Adventure',
      category: 'animals',
      background: DesignTokens.colors.categories.animals.background,
      backgroundGradient: DesignTokens.colors.categories.animals.background,
      primaryColor: DesignTokens.colors.categories.animals.primary,
      secondaryColor: DesignTokens.colors.categories.animals.secondary,
      accentColor: DesignTokens.colors.categories.animals.accent,
      textColor: DesignTokens.colors.categories.animals.text,
      textColorLight: DesignTokens.colors.neutral[600],
      buttonGradient: `linear-gradient(135deg, ${DesignTokens.colors.categories.animals.primary}, ${DesignTokens.colors.categories.animals.secondary})`,
      cardBackground: DesignTokens.colors.neutral[50],
      cardShadow: DesignTokens.shadows.lg,
      borderColor: DesignTokens.colors.categories.animals.primary,
      hoverColor: DesignTokens.colors.categories.animals.accent,
      focusColor: DesignTokens.colors.categories.animals.primary,
    },
    'Space': {
      name: 'Starry Night',
      category: 'space',
      background: DesignTokens.colors.categories.space.background,
      backgroundGradient: DesignTokens.colors.categories.space.background,
      primaryColor: DesignTokens.colors.categories.space.primary,
      secondaryColor: DesignTokens.colors.categories.space.secondary,
      accentColor: DesignTokens.colors.categories.space.accent,
      textColor: DesignTokens.colors.categories.space.text,
      textColorLight: DesignTokens.colors.neutral[300],
      buttonGradient: `linear-gradient(135deg, ${DesignTokens.colors.categories.space.primary}, ${DesignTokens.colors.categories.space.secondary})`,
      cardBackground: DesignTokens.colors.neutral[50],
      cardShadow: DesignTokens.shadows.xl,
      borderColor: DesignTokens.colors.categories.space.primary,
      hoverColor: DesignTokens.colors.categories.space.accent,
      focusColor: DesignTokens.colors.categories.space.primary,
    },
    'Colors': {
      name: 'Rainbow Bridge',
      category: 'colors',
      background: DesignTokens.colors.categories.colors.background,
      backgroundGradient: DesignTokens.colors.categories.colors.background,
      primaryColor: DesignTokens.colors.categories.colors.primary,
      secondaryColor: DesignTokens.colors.categories.colors.secondary,
      accentColor: DesignTokens.colors.categories.colors.accent,
      textColor: DesignTokens.colors.categories.colors.text,
      textColorLight: DesignTokens.colors.neutral[600],
      buttonGradient: `linear-gradient(135deg, ${DesignTokens.colors.categories.colors.primary}, ${DesignTokens.colors.categories.colors.secondary})`,
      cardBackground: DesignTokens.colors.neutral[50],
      cardShadow: DesignTokens.shadows.lg,
      borderColor: DesignTokens.colors.categories.colors.primary,
      hoverColor: DesignTokens.colors.categories.colors.accent,
      focusColor: DesignTokens.colors.categories.colors.primary,
    },
    'Nature': {
      name: 'Magic Garden',
      category: 'nature',
      background: DesignTokens.colors.categories.nature.background,
      backgroundGradient: DesignTokens.colors.categories.nature.background,
      primaryColor: DesignTokens.colors.categories.nature.primary,
      secondaryColor: DesignTokens.colors.categories.nature.secondary,
      accentColor: DesignTokens.colors.categories.nature.accent,
      textColor: DesignTokens.colors.categories.nature.text,
      textColorLight: DesignTokens.colors.neutral[600],
      buttonGradient: `linear-gradient(135deg, ${DesignTokens.colors.categories.nature.primary}, ${DesignTokens.colors.categories.nature.secondary})`,
      cardBackground: DesignTokens.colors.neutral[50],
      cardShadow: DesignTokens.shadows.lg,
      borderColor: DesignTokens.colors.categories.nature.primary,
      hoverColor: DesignTokens.colors.categories.nature.accent,
      focusColor: DesignTokens.colors.categories.nature.primary,
    },
    'Fantasy': {
      name: 'Sky Dreams',
      category: 'fantasy',
      background: DesignTokens.colors.categories.fantasy.background,
      backgroundGradient: DesignTokens.colors.categories.fantasy.background,
      primaryColor: DesignTokens.colors.categories.fantasy.primary,
      secondaryColor: DesignTokens.colors.categories.fantasy.secondary,
      accentColor: DesignTokens.colors.categories.fantasy.accent,
      textColor: DesignTokens.colors.categories.fantasy.text,
      textColorLight: DesignTokens.colors.neutral[600],
      buttonGradient: `linear-gradient(135deg, ${DesignTokens.colors.categories.fantasy.primary}, ${DesignTokens.colors.categories.fantasy.secondary})`,
      cardBackground: DesignTokens.colors.neutral[50],
      cardShadow: DesignTokens.shadows.lg,
      borderColor: DesignTokens.colors.categories.fantasy.primary,
      hoverColor: DesignTokens.colors.categories.fantasy.accent,
      focusColor: DesignTokens.colors.categories.fantasy.primary,
    }
  };

  // Default theme
  private defaultTheme: StoryTheme = {
    name: 'Default',
    category: 'animals',
    background: DesignTokens.colors.primary[50],
    backgroundGradient: `linear-gradient(135deg, ${DesignTokens.colors.primary[50]}, ${DesignTokens.colors.secondary[50]})`,
    primaryColor: DesignTokens.colors.primary[600],
    secondaryColor: DesignTokens.colors.secondary[600],
    accentColor: DesignTokens.colors.warning[500],
    textColor: DesignTokens.colors.neutral[900],
    textColorLight: DesignTokens.colors.neutral[600],
    buttonGradient: `linear-gradient(135deg, ${DesignTokens.colors.primary[600]}, ${DesignTokens.colors.secondary[600]})`,
    cardBackground: DesignTokens.colors.neutral[50],
    cardShadow: DesignTokens.shadows.lg,
    borderColor: DesignTokens.colors.neutral[200],
    hoverColor: DesignTokens.colors.primary[500],
    focusColor: DesignTokens.colors.primary[600],
  };

  // Computed current theme
  currentTheme = computed(() => {
    const category = this.currentStoryCategory();
    return this.themes[category] || this.defaultTheme;
  });

  setStoryCategory(category: string): void {
    this.currentStoryCategory.set(category);
  }

  getThemeForCategory(category: string): StoryTheme {
    return this.themes[category] || this.defaultTheme;
  }

  // Special button themes with proper contrast
  getLoveButtonTheme(): string {
    return `linear-gradient(135deg, ${DesignTokens.colors.error[500]}, ${DesignTokens.colors.error[600]})`;
  }

  getShareButtonTheme(): string {
    return `linear-gradient(135deg, ${DesignTokens.colors.primary[500]}, ${DesignTokens.colors.primary[600]})`;
  }

  getNextButtonTheme(category: string): string {
    const theme = this.getThemeForCategory(category);
    return theme.buttonGradient;
  }

  getPreviousButtonTheme(category: string): string {
    const theme = this.getThemeForCategory(category);
    return theme.buttonGradient;
  }

  // Get design tokens for components
  getDesignTokens() {
    return DesignTokens;
  }
}