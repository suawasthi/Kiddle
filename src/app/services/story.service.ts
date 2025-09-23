import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Story } from '../models/story.model';

@Injectable({
  providedIn: 'root'
})
export class StoryService {
  private readonly USE_API = false; // Toggle for future API integration
  private readonly API_URL = 'https://api.example.com/stories'; // Future API endpoint
  
  private storiesSubject = new BehaviorSubject<Story[]>([]);
  public stories$ = this.storiesSubject.asObservable();
  
  private searchTerm = signal('');
  private selectedCategory = signal('');

  // Computed signals for filtered stories
  public filteredStories = computed(() => {
    const stories = this.storiesSubject.value;
    const search = this.searchTerm().toLowerCase();
    const category = this.selectedCategory();

    return stories.filter(story => {
      const matchesSearch = !search || 
        story.title.toLowerCase().includes(search) ||
        story.text.toLowerCase().includes(search) ||
        story.category.toLowerCase().includes(search);
      
      const matchesCategory = !category || story.category === category;
      
      return matchesSearch && matchesCategory;
    });
  });

  public categories = computed(() => {
    const stories = this.storiesSubject.value;
    const uniqueCategories = [...new Set(stories.map(story => story.category))];
    return uniqueCategories.sort();
  });

  constructor(private http: HttpClient) {
    this.loadStories();
  }

  private loadStories(): void {
    if (this.USE_API) {
      this.loadStoriesFromAPI();
    } else {
      this.loadStoriesFromJSON();
    }
  }

  private loadStoriesFromJSON(): void {
    this.http.get<Story[]>('/assets/stories.json')
      .pipe(
        catchError(() => {
          console.warn('Failed to load stories from JSON, using fallback data');
          return of(this.getFallbackStories());
        })
      )
      .subscribe(stories => {
        this.storiesSubject.next(stories);
      });
  }

  private loadStoriesFromAPI(): void {
    this.http.get<Story[]>(this.API_URL)
      .pipe(
        catchError(() => {
          console.warn('Failed to load stories from API, falling back to JSON');
          return this.http.get<Story[]>('/assets/stories.json');
        })
      )
      .subscribe(stories => {
        this.storiesSubject.next(stories);
      });
  }

  public getStoryById(id: number): Observable<Story | undefined> {
    return this.stories$.pipe(
      map(stories => stories.find(story => story.id === id))
    );
  }

  public setSearchTerm(term: string): void {
    this.searchTerm.set(term);
  }

  public setCategory(category: string): void {
    this.selectedCategory.set(category);
  }

  public clearFilters(): void {
    this.searchTerm.set('');
    this.selectedCategory.set('');
  }

  private getFallbackStories(): Story[] {
    return [
      {
        id: 1,
        title: "The Jungle Adventure",
        category: "Animals",
        text: "Once upon a time in a lush green jungle, Leo the lion cub wanted to explore beyond his home. He met Sammy the squirrel, who showed him how to climb trees, and Bella the butterfly, who taught him about the beautiful flowers. Together, they discovered a magical waterfall where all the animals came to play and share stories.",
        image_urls: ["assets/images/jungle1.png", "assets/images/jungle2.png"],
        age_range: "2-4",
        reading_time: 3
      },
      {
        id: 2,
        title: "The Little Star's Wish",
        category: "Space",
        text: "Twinkle was a little star who lived high up in the night sky. She watched the children on Earth playing and laughing, and she wished she could join them. One magical night, a shooting star granted her wish, and she became a beautiful sparkle that danced in the children's eyes, making them smile and dream wonderful dreams.",
        image_urls: ["assets/images/star1.png", "assets/images/star2.png"],
        age_range: "3-5",
        reading_time: 4
      },
      {
        id: 3,
        title: "The Rainbow Bridge",
        category: "Colors",
        text: "After a big rainstorm, a beautiful rainbow appeared in the sky. Ruby the rabbit hopped along the rainbow bridge, meeting friends of every color. She found Red the robin, Orange the octopus, Yellow the sun, Green the grass, Blue the butterfly, and Purple the flower. Together, they painted the world with happiness and joy.",
        image_urls: ["assets/images/rainbow1.png", "assets/images/rainbow2.png"],
        age_range: "2-4",
        reading_time: 3
      },
      {
        id: 4,
        title: "The Magic Garden",
        category: "Nature",
        text: "In a secret garden behind an old cottage, magical flowers grew that could sing and dance. When the wind blew gently, the flowers would sway and hum beautiful melodies. Children who visited the garden would find their worries disappearing as the flowers shared their magical songs of peace and happiness.",
        image_urls: ["assets/images/garden1.png", "assets/images/garden2.png"],
        age_range: "3-5",
        reading_time: 4
      },
      {
        id: 5,
        title: "The Friendly Dragon",
        category: "Fantasy",
        text: "Sparkle was a gentle dragon who lived in a cozy cave on a mountain. Unlike other dragons, she loved to help people and make them laugh. She would breathe colorful bubbles instead of fire, and children would come from far and wide to play with her. Sparkle taught everyone that being kind and helpful is the most magical power of all.",
        image_urls: ["assets/images/dragon1.png", "assets/images/dragon2.png"],
        age_range: "4-5",
        reading_time: 5
      }
    ];
  }
}
