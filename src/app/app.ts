import { Component, signal, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { HeroSectionComponent } from './components/hero-section/hero-section.component';
import { StoryService } from './services/story.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, SearchBarComponent, HeroSectionComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Kids Story World');
  private storyService = inject(StoryService);

  categories = this.storyService.categories;
  selectedCategory = signal('');

  onSearchChange(searchTerm: string): void {
    this.storyService.setSearchTerm(searchTerm);
  }

  onCategoryChange(category: string): void {
    this.selectedCategory.set(category);
    this.storyService.setCategory(category);
  }

  onClearFilters(): void {
    this.selectedCategory.set('');
    this.storyService.clearFilters();
  }
}
