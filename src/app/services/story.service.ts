import { Injectable, signal, computed } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Story } from '../models/story.model';

@Injectable({
  providedIn: 'root'
})
export class StoryService {
  private stories = signal<Story[]>([
    {
      id: 1,
      title: "The Little Rabbit's Adventure",
      text: "Once upon a time, there was a little rabbit named Flopsy who loved to hop around the meadow. One sunny morning, she discovered a magical door hidden behind a rainbow bush. When she opened it, she found herself in a world where everything was made of candy! She met a talking lollipop and a chocolate river that flowed with milk. Flopsy spent the whole day exploring this sweet world, but when the sun started to set, she knew it was time to go home. She hopped back through the magical door and promised to visit again tomorrow.",
      category: "Animals",
      age_range: "3-5",
      reading_time: 3,
      image_urls: [
        "/assets/images/rabbit_with_rainbow.png",
        "/assets/images/flowers.png"
      ]
    },
    {
      id: 2,
      title: "The Star That Wished to Be a Rainbow",
      text: "High up in the night sky, there lived a little star named Twinkle who was very sad. All the other stars sparkled with beautiful white light, but Twinkle wanted to be colorful like a rainbow. One night, she made a wish upon herself, and suddenly she started to change colors! She became red, then orange, yellow, green, blue, and purple. The other stars were amazed and asked her to teach them how to be colorful too. From that night on, Twinkle and all her star friends created the most beautiful rainbow in the sky every evening.",
      category: "Space",
      age_range: "4-6",
      reading_time: 4,
      image_urls: [
        "/assets/images/rainbrow_star.png",
        "/assets/images/rainbow1.png"
      ]
    },
    {
      id: 3,
      title: "The Colorful Caterpillar's Journey",
      text: "In a beautiful garden, there lived a very special caterpillar named Rainbow. Unlike other caterpillars who were green, Rainbow had stripes of every color you could imagine. She loved to crawl from flower to flower, leaving a trail of colorful sparkles behind her. One day, she decided to climb to the top of the tallest sunflower to see the whole world. It was a long journey, but when she reached the top, she was so happy that she spun herself a magical cocoon. When she emerged, she had become the most beautiful butterfly with wings that shimmered with all the colors of the rainbow.",
      category: "Colors",
      age_range: "3-5",
      reading_time: 3,
      image_urls: [
        "/assets/images/flowers.png",
        "/assets/images/octa.png"
      ]
    },
    {
      id: 4,
      title: "The Magic Forest of Whispering Trees",
      text: "Deep in the enchanted forest, there stood ancient trees that could whisper secrets to those who listened carefully. A curious little girl named Lily discovered this magical place one afternoon while chasing a butterfly. The trees told her stories about the animals that lived there, about the seasons changing, and about how every living thing was connected. They taught her to be kind to nature and to always listen with her heart. From that day forward, Lily became the guardian of the forest, making sure all the creatures were happy and the trees continued to grow strong.",
      category: "Nature",
      age_range: "5-7",
      reading_time: 4,
      image_urls: [
        "/assets/images/magic_forest.png",
        "/assets/images/garden2.png"
      ]
    },
    {
      id: 5,
      title: "The Princess and the Friendly Dragon",
      text: "In a faraway kingdom, there lived a kind princess named Rose who loved to read books about dragons. Everyone in the kingdom was afraid of dragons, but Princess Rose believed they could be friends. One day, a gentle dragon named Sparkle landed in the castle garden. Instead of being scared, Princess Rose approached him with a smile and offered him some flowers. Sparkle was so touched by her kindness that he became the kingdom's protector, flying around and helping people in need. The princess and the dragon became the best of friends, and they showed everyone that sometimes the things we fear the most can become our greatest allies.",
      category: "Fantasy",
      age_range: "4-6",
      reading_time: 5,
      image_urls: [
        "/assets/images/dragon_with_child.png",
        "/assets/images/dragon_with_child_2.png"
      ]
    },
    {
      id: 6,
      title: "The Magical Jungle Drum",
      text: "One bright morning, we entered the jungle. The trees were so tall they touched the clouds! Suddenly… BOOM-BOOM-BOOM! We heard a deep drum sound echoing through the jungle. The sound came from behind the thick vines. We pushed the vines aside and saw a shiny wooden drum sitting on a big rock. But—oh no!—a monkey was guarding it! The monkey looked at us and said: 'You cannot take the drum unless you pass my jungle test!' The monkey asked us to make a loud elephant trumpet sound, clap like a parrot flapping its wings, and jump like a frog. Amazing! The monkey clapped and gave us the drum. But then… the jungle shook! BOOM-BOOM-BOOM! The drum started glowing. The monkey whispered: 'This drum holds a secret… but it will only reveal itself… tomorrow!' So we carried the magical jungle drum home, waiting for the next adventure.",
      category: "Nature",
      age_range: "3-6",
      reading_time: 4,
      image_urls: [
        "/assets/images/jungle_ani.png",
        "/assets/images/ocean2.png"
      ],
      audio_url: "/assets/audio/jungle-drum-story.mp3"
    }
  ]);

  private searchTerm = signal<string>('');
  private selectedCategory = signal<string>('');

  filteredStories = computed(() => {
    let filtered = this.stories();
    
    if (this.searchTerm()) {
      const search = this.searchTerm().toLowerCase();
      filtered = filtered.filter(story => 
        story.title.toLowerCase().includes(search) ||
        story.text.toLowerCase().includes(search) ||
        story.category.toLowerCase().includes(search)
      );
    }
    
    if (this.selectedCategory()) {
      filtered = filtered.filter(story => story.category === this.selectedCategory());
    }
    
    return filtered;
  });

  getStoryById(id: number): Observable<Story | undefined> {
    const story = this.stories().find(s => s.id === id);
    return of(story);
  }

  setSearchTerm(term: string): void {
    this.searchTerm.set(term);
  }

  setSelectedCategory(category: string): void {
    this.selectedCategory.set(category);
  }

  getCategories(): string[] {
    return [...new Set(this.stories().map(story => story.category))];
  }
}
