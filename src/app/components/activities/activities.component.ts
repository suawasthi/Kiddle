import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-activities',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="activities-container">
      <div class="header">
        <button (click)="goBack()" class="back-button">
          ← Back to Stories
        </button>
        <h1 class="main-title">🎨 Fun Activities 🎨</h1>
        <p class="subtitle">Creative games and learning activities for little ones!</p>
      </div>

      <div class="activities-grid">
        <div class="activity-card" (click)="startColoring()">
          <div class="activity-icon">🎨</div>
          <h3>Coloring Book</h3>
          <p>Color beautiful pictures and bring them to life!</p>
        </div>

        <div class="activity-card" (click)="startPuzzle()">
          <div class="activity-icon">🧩</div>
          <h3>Story Puzzles</h3>
          <p>Solve fun puzzles based on your favorite stories!</p>
        </div>

        <div class="activity-card" (click)="startMemory()">
          <div class="activity-icon">🧠</div>
          <h3>Memory Game</h3>
          <p>Match characters and objects from the stories!</p>
        </div>

        <div class="activity-card" (click)="startDrawing()">
          <div class="activity-icon">✏️</div>
          <h3>Drawing Pad</h3>
          <p>Draw your own characters and scenes!</p>
        </div>

        <div class="activity-card" (click)="startQuiz()">
          <div class="activity-icon">❓</div>
          <h3>Story Quiz</h3>
          <p>Test your knowledge about the stories you've read!</p>
        </div>

        <div class="activity-card" (click)="startMusic()">
          <div class="activity-icon">🎵</div>
          <h3>Music Maker</h3>
          <p>Create your own magical melodies!</p>
        </div>
      </div>

      <div class="coming-soon">
        <h2>🌟 More Activities Coming Soon! 🌟</h2>
        <p>We're working hard to bring you more fun and educational activities!</p>
      </div>
    </div>
  `,
  styles: [`
    .activities-container {
      padding: 1rem;
      max-width: 1200px;
      margin: 0 auto;
      min-height: 100vh;
      background: linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%);
    }

    .header {
      text-align: center;
      margin-bottom: 2rem;
      padding: 1rem;
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

    .main-title {
      font-size: 2.5rem;
      color: #333;
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

    .activities-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 2rem;
      padding: 2rem 0;
    }

    .activity-card {
      background: white;
      border-radius: 20px;
      padding: 2rem;
      text-align: center;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
      transition: all 0.3s ease;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }

    .activity-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
      transition: left 0.5s;
    }

    .activity-card:hover::before {
      left: 100%;
    }

    .activity-card:hover {
      transform: translateY(-10px);
      box-shadow: 0 16px 48px rgba(0, 0, 0, 0.2);
    }

    .activity-icon {
      font-size: 4rem;
      margin-bottom: 1rem;
      animation: float 3s ease-in-out infinite;
    }

    .activity-card:nth-child(1) .activity-icon { animation-delay: 0s; }
    .activity-card:nth-child(2) .activity-icon { animation-delay: 0.5s; }
    .activity-card:nth-child(3) .activity-icon { animation-delay: 1s; }
    .activity-card:nth-child(4) .activity-icon { animation-delay: 1.5s; }
    .activity-card:nth-child(5) .activity-icon { animation-delay: 2s; }
    .activity-card:nth-child(6) .activity-icon { animation-delay: 2.5s; }

    .activity-card h3 {
      font-size: 1.5rem;
      color: #333;
      margin: 0 0 1rem 0;
      font-family: 'Comic Sans MS', cursive, sans-serif;
      font-weight: bold;
    }

    .activity-card p {
      color: #666;
      line-height: 1.5;
      font-size: 1rem;
      margin: 0;
      font-family: 'Comic Sans MS', cursive, sans-serif;
    }

    .coming-soon {
      text-align: center;
      padding: 3rem 1rem;
      background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%);
      border-radius: 20px;
      margin-top: 2rem;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    }

    .coming-soon h2 {
      font-size: 2rem;
      color: #333;
      margin: 0 0 1rem 0;
      font-family: 'Comic Sans MS', cursive, sans-serif;
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
    }

    .coming-soon p {
      font-size: 1.1rem;
      color: #666;
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

    @keyframes float {
      0%, 100% {
        transform: translateY(0px);
      }
      50% {
        transform: translateY(-10px);
      }
    }

    @media (max-width: 768px) {
      .activities-grid {
        grid-template-columns: 1fr;
        gap: 1rem;
        padding: 1rem 0;
      }

      .main-title {
        font-size: 2rem;
      }

      .activity-card {
        padding: 1.5rem;
      }

      .activity-icon {
        font-size: 3rem;
      }

      .activity-card h3 {
        font-size: 1.3rem;
      }
    }
  `]
})
export class ActivitiesComponent {

  goBack(): void {
    window.history.back();
  }

  startColoring(): void {
    this.showComingSoon('Coloring Book');
  }

  startPuzzle(): void {
    this.showComingSoon('Story Puzzles');
  }

  startMemory(): void {
    this.showComingSoon('Memory Game');
  }

  startDrawing(): void {
    this.showComingSoon('Drawing Pad');
  }

  startQuiz(): void {
    this.showComingSoon('Story Quiz');
  }

  startMusic(): void {
    this.showComingSoon('Music Maker');
  }

  private showComingSoon(activityName: string): void {
    // Create a modal-like notification
    const modal = document.createElement('div');
    modal.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.7);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
      animation: fadeIn 0.3s ease-out;
    `;

    const content = document.createElement('div');
    content.style.cssText = `
      background: white;
      padding: 2rem;
      border-radius: 20px;
      text-align: center;
      max-width: 400px;
      margin: 1rem;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
      animation: slideIn 0.3s ease-out;
    `;

    content.innerHTML = `
      <div style="font-size: 4rem; margin-bottom: 1rem;">🎨</div>
      <h2 style="color: #333; margin: 0 0 1rem 0; font-family: 'Comic Sans MS', cursive, sans-serif;">
        ${activityName}
      </h2>
      <p style="color: #666; margin: 0 0 2rem 0; font-family: 'Comic Sans MS', cursive, sans-serif;">
        This activity is coming soon! We're working hard to bring you the best experience.
      </p>
      <button id="closeModal" style="
        background: linear-gradient(45deg, #ff6b9d, #c44569);
        color: white;
        border: none;
        padding: 1rem 2rem;
        border-radius: 25px;
        font-size: 1rem;
        font-weight: bold;
        cursor: pointer;
        font-family: 'Comic Sans MS', cursive, sans-serif;
      ">Got it!</button>
    `;

    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      @keyframes slideIn {
        from { transform: translateY(-50px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
      }
    `;
    document.head.appendChild(style);

    modal.appendChild(content);
    document.body.appendChild(modal);

    // Close modal functionality
    const closeModal = () => {
      modal.style.animation = 'fadeIn 0.3s ease-out reverse';
      setTimeout(() => {
        document.body.removeChild(modal);
        document.head.removeChild(style);
      }, 300);
    };

    content.querySelector('#closeModal')?.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }
}
