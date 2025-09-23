import { Component, signal, effect, ElementRef, ViewChild, AfterViewInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="hero-container" #heroContainer>
      <!-- Loading Animation -->
      <div class="loading-overlay" #loadingOverlay></div>
      
      <!-- Magical Floating Elements -->
      <div class="magic-container">
        <div class="floating-book book1" (click)="onBookClick()">
          <div class="book-cover">📚</div>
          <div class="book-pages"></div>
        </div>
        <div class="floating-book book2" (click)="onBookClick()">
          <div class="book-cover">✨</div>
          <div class="book-pages"></div>
        </div>
        <div class="floating-book book3" (click)="onBookClick()">
          <div class="book-cover">🌟</div>
          <div class="book-pages"></div>
        </div>

        <div class="magic-star star1"></div>
        <div class="magic-star star2"></div>
        <div class="magic-star star3"></div>
        <div class="magic-star star4"></div>

        <div class="magic-cloud cloud1"></div>
        <div class="magic-cloud cloud2"></div>

        <div class="rainbow" #rainbow></div>
      </div>

      <!-- Enhanced Particle System -->
      <div class="particle-system" #particlesContainer></div>
      
      <!-- Main Hero Content -->
      <div class="hero-content" #heroContent>
        <h1 class="hero-title">Kids Story World</h1>
        <p class="hero-subtitle">✨ Magical adventures for little dreamers ✨</p>
        <div class="hero-buttons">
          <button class="btn-primary" (click)="startReading()">Start Reading!</button>
          <button class="btn-secondary" (click)="exploreStories()">Explore Stories</button>
        </div>
      </div>
      
      <!-- Interactive Magical Character -->
      <div class="magic-character" (click)="characterInteraction()" #magicCharacter>
        <div class="character-body">
          <div class="character-head">
            <div class="character-eyes">
              <span class="eye"></span>
              <span class="eye"></span>
            </div>
            <div class="character-hat"></div>
          </div>
          <div class="magic-wand">
            <div class="wand-star"></div>
          </div>
        </div>
      </div>

      <!-- Interactive Elements -->
      <div class="interactive-elements">
        <div class="rainbow-trail" #rainbowTrail></div>
        <div class="sparkles" #sparkles></div>
        <div class="character-message" #characterMessage></div>
      </div>
    </div>
  `,
  styles: [`
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    .hero-container {
      height: 100vh;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      perspective: 1200px;
      overflow: hidden;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    }

    .hero-container::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
      opacity: 0;
      animation: backgroundPulse 8s ease-in-out infinite;
      z-index: 1;
    }

    @keyframes backgroundPulse {
      0%, 100% { opacity: 0; }
      50% { opacity: 0.3; }
    }

    /* Loading Animation */
    .loading-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(45deg, #667eea, #764ba2);
      z-index: 1000;
      animation: pageLoad 3s ease-in-out forwards;
    }

    @keyframes pageLoad {
      0% { opacity: 1; }
      70% { opacity: 1; }
      100% { opacity: 0; visibility: hidden; }
    }

    /* Magical Floating Elements */
    .magic-container {
      position: absolute;
      width: 100%;
      height: 100%;
      pointer-events: none;
    }

    .floating-book {
      position: absolute;
      width: 120px;
      height: 150px;
      transform-style: preserve-3d;
      animation: bookFloat 8s ease-in-out infinite;
      cursor: pointer;
      pointer-events: auto;
    }

    .book1 { top: 20%; left: 15%; animation-delay: 0s; z-index: 5; }
    .book2 { bottom: 25%; right: 20%; animation-delay: -2s; z-index: 5; }
    .book3 { top: 35%; right: 12%; animation-delay: -4s; z-index: 5; }

    .book-cover {
      position: absolute;
      width: 100%;
      height: 100%;
      background: 
        linear-gradient(145deg, #ff4757 0%, #ff3838 50%, #ff2525 100%),
        linear-gradient(45deg, rgba(255,255,255,0.2) 0%, transparent 50%);
      border-radius: 15px;
      transform: rotateY(0deg);
      backface-visibility: hidden;
      box-shadow: 
        0 20px 40px rgba(255, 71, 87, 0.4),
        0 8px 16px rgba(0,0,0,0.3),
        inset 0 1px 0 rgba(255,255,255,0.3),
        inset 0 -1px 0 rgba(0,0,0,0.2);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 3rem;
      border: 1px solid rgba(255,255,255,0.2);
    }

    .book-pages {
      position: absolute;
      width: 95%;
      height: 98%;
      background: #ffffff;
      border-radius: 12px;
      transform: rotateY(180deg) translateZ(15px);
      backface-visibility: hidden;
      left: 2.5%;
      top: 1%;
      box-shadow: inset 0 0 20px rgba(0,0,0,0.1);
    }

    @keyframes bookFloat {
      0%, 100% {
        transform: translateY(0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg);
      }
      33% {
        transform: translateY(-15px) rotateX(8deg) rotateY(45deg) rotateZ(2deg);
      }
      66% {
        transform: translateY(-25px) rotateX(-5deg) rotateY(-30deg) rotateZ(-1deg);
      }
    }

    @keyframes bookGlow {
      0% { box-shadow: 0 25px 50px rgba(0,0,0,0.4), 0 0 0 rgba(255,107,107,0.4); }
      100% { box-shadow: 0 25px 50px rgba(0,0,0,0.4), 0 0 40px rgba(255,107,107,0.8); }
    }

    /* Magical Stars */
    .magic-star {
      position: absolute;
      width: 40px;
      height: 40px;
      animation: starTwinkle 3s ease-in-out infinite;
      clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
    }

    .star1 { background: #ffd700; top: 25%; left: 25%; animation-delay: 0s; z-index: 15; }
    .star2 { background: #ffd700; bottom: 30%; right: 30%; animation-delay: -1s; z-index: 15; }
    .star3 { background: #ffd700; top: 40%; right: 15%; animation-delay: -2s; z-index: 15; }
    .star4 { background: #ffd700; bottom: 40%; left: 20%; animation-delay: -1.5s; z-index: 15; }

    @keyframes starTwinkle {
      0%, 100% {
        transform: scale(1) rotate(0deg);
        opacity: 0.8;
      }
      50% {
        transform: scale(1.5) rotate(180deg);
        opacity: 1;
      }
    }

    /* Magical Clouds */
    .magic-cloud {
      position: absolute;
      width: 150px;
      height: 80px;
      background: rgba(255,255,255,0.9);
      border-radius: 80px;
      animation: cloudFloat 12s linear infinite;
    }

    .cloud1 { top: 25%; left: -150px; animation-delay: 0s; }
    .cloud2 { top: 55%; left: -150px; animation-delay: -6s; }

    .magic-cloud::before {
      content: '';
      position: absolute;
      width: 80px;
      height: 80px;
      background: rgba(255,255,255,0.9);
      border-radius: 50%;
      top: -40px;
      left: 20px;
    }

    .magic-cloud::after {
      content: '';
      position: absolute;
      width: 60px;
      height: 60px;
      background: rgba(255,255,255,0.9);
      border-radius: 50%;
      top: -30px;
      right: 20px;
    }

    @keyframes cloudFloat {
      0% { transform: translateX(0); }
      100% { transform: translateX(calc(100vw + 150px)); }
    }

    /* Rainbow */
    .rainbow {
      position: absolute;
      top: 10%;
      right: -200px;
      width: 400px;
      height: 200px;
      border-radius: 400px 400px 0 0;
      border: 15px solid transparent;
      border-top: 15px solid #ff0000;
      animation: rainbowSlide 15s ease-in-out infinite;
    }

    .rainbow::before {
      content: '';
      position: absolute;
      top: -30px;
      left: -15px;
      width: 400px;
      height: 200px;
      border-radius: 400px 400px 0 0;
      border: 15px solid transparent;
      border-top: 15px solid #ff7f00;
    }

    .rainbow::after {
      content: '';
      position: absolute;
      top: -45px;
      left: -30px;
      width: 430px;
      height: 215px;
      border-radius: 430px 430px 0 0;
      border: 15px solid transparent;
      border-top: 15px solid #ffff00;
      box-shadow: 
        0 -15px 0 #00ff00,
        0 -30px 0 #0000ff,
        0 -45px 0 #4b0082,
        0 -60px 0 #9400d3;
    }

    @keyframes rainbowSlide {
      0%, 30% { transform: translateX(0) rotate(0deg); }
      70%, 100% { transform: translateX(-500px) rotate(-20deg); }
    }

    /* Hero Content */
    .hero-content {
      text-align: center;
      transform-style: preserve-3d;
      animation: heroEntrance 2s ease-out;
      z-index: 10;
      position: relative;
    }

    .hero-title {
      font-family: 'Fredoka One', var(--font-family-display);
      font-size: clamp(2.5rem, 8vw, 5rem);
      color: #ffffff;
      text-shadow: 
        0 2px 4px rgba(0,0,0,0.8),
        0 4px 8px rgba(0,0,0,0.6),
        0 8px 16px rgba(0,0,0,0.4);
      animation: titleBounce 4s ease-in-out infinite;
      margin-bottom: 1rem;
      transform: translateZ(100px);
      position: relative;
      z-index: 20;
    }

    .hero-title::before {
      content: '';
      position: absolute;
      top: -20px;
      left: -40px;
      right: -40px;
      bottom: -20px;
      background: radial-gradient(ellipse 80% 50% at 50% 50%, rgba(0,0,0,0.6) 0%, transparent 70%);
      border-radius: 50px;
      z-index: -1;
    }

    .hero-subtitle {
      font-size: clamp(1.2rem, 4vw, 2rem);
      color: #ffffff;
      margin-bottom: 2rem;
      font-weight: 400;
      line-height: 1.4;
      transform: translateZ(50px);
      text-shadow: 0 2px 8px rgba(0,0,0,0.7);
      position: relative;
      z-index: 20;
    }

    .hero-buttons {
      display: flex;
      gap: 2rem;
      justify-content: center;
      transform: translateZ(75px);
    }

    .btn-primary {
      background: #ff4757;
      border: 3px solid #ffffff;
      padding: 18px 36px;
      border-radius: 50px;
      color: #ffffff;
      font-size: clamp(1.1rem, 3vw, 1.4rem);
      font-weight: 700;
      cursor: pointer;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      box-shadow: 
        0 8px 25px rgba(255, 71, 87, 0.4),
        0 4px 12px rgba(0,0,0,0.3);
      font-family: 'Nunito', sans-serif;
      position: relative;
      z-index: 20;
      text-shadow: 0 1px 2px rgba(0,0,0,0.3);
    }

    .btn-secondary {
      background: transparent;
      border: 3px solid #ffffff;
      padding: 18px 36px;
      border-radius: 50px;
      color: #ffffff;
      font-size: clamp(1.1rem, 3vw, 1.4rem);
      font-weight: 700;
      cursor: pointer;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      box-shadow: 0 4px 12px rgba(0,0,0,0.3);
      font-family: 'Nunito', sans-serif;
      position: relative;
      z-index: 20;
      text-shadow: 0 1px 2px rgba(0,0,0,0.3);
    }

    .btn-primary:hover {
      transform: translateY(-3px) scale(1.02);
      background: #ff3742;
      box-shadow: 
        0 12px 35px rgba(255, 71, 87, 0.6),
        0 8px 20px rgba(0,0,0,0.4);
    }

    .btn-secondary:hover {
      transform: translateY(-3px) scale(1.02);
      background: #ffffff;
      color: #667eea;
      box-shadow: 0 8px 20px rgba(0,0,0,0.4);
    }

    .btn-primary:active, .btn-secondary:active {
      transform: translateY(-1px) scale(0.98);
    }

    /* Brand Signature - Magical Character */
    .magic-character {
      position: absolute;
      bottom: 8%;
      right: 8%;
      width: 180px;
      height: 220px;
      cursor: pointer;
      animation: characterIdle 6s ease-in-out infinite;
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      z-index: 25;
      filter: drop-shadow(0 8px 16px rgba(0,0,0,0.3));
    }

    .character-body {
      width: 70px;
      height: 90px;
      background: 
        linear-gradient(145deg, #ff4757 0%, #ff3838 50%, #ff2525 100%),
        linear-gradient(45deg, rgba(255,255,255,0.2) 0%, transparent 50%);
      border-radius: 35px;
      position: relative;
      margin: 0 auto;
      animation: characterBreathe 4s ease-in-out infinite;
      box-shadow: 
        0 4px 8px rgba(255, 71, 87, 0.3),
        inset 0 1px 0 rgba(255,255,255,0.3);
    }

    .character-head {
      width: 60px;
      height: 60px;
      background: #fdbcb4;
      border-radius: 50%;
      position: absolute;
      top: -30px;
      left: 50%;
      transform: translateX(-50%);
      animation: headNod 4s ease-in-out infinite;
    }

    .character-eyes {
      position: absolute;
      top: 20px;
      left: 50%;
      transform: translateX(-50%);
      animation: eyeBlink 3s ease-in-out infinite;
    }

    .eye {
      width: 8px;
      height: 8px;
      background: #333;
      border-radius: 50%;
      display: inline-block;
      margin: 0 5px;
    }

    .character-hat {
      position: absolute;
      top: -45px;
      left: 50%;
      transform: translateX(-50%);
      width: 0;
      height: 0;
      border-left: 30px solid transparent;
      border-right: 30px solid transparent;
      border-bottom: 40px solid #4facfe;
      animation: hatWiggle 4s ease-in-out infinite;
    }

    .magic-wand {
      position: absolute;
      right: -30px;
      top: 30px;
      width: 3px;
      height: 40px;
      background: #8b4513;
      transform-origin: bottom;
      animation: wandWave 2s ease-in-out infinite;
    }

    .wand-star {
      position: absolute;
      top: -10px;
      left: -5px;
      width: 0;
      height: 0;
      border-left: 5px solid transparent;
      border-right: 5px solid transparent;
      border-bottom: 15px solid #ffd700;
      animation: wandSparkle 1s ease-in-out infinite;
    }

    .magic-character:hover {
      transform: scale(1.1);
    }

    .magic-character:hover .magic-wand {
      animation: wandExcited 0.5s ease-in-out infinite;
    }

    /* Floating 3D Elements */
    .floating-element {
      position: absolute;
      border-radius: 50%;
      animation: rotate3d 12s linear infinite;
      filter: drop-shadow(0 10px 20px rgba(0,0,0,0.3));
    }

    .star1 {
      width: 80px;
      height: 80px;
      background: linear-gradient(45deg, var(--color-warning-400), var(--color-warning-500));
      top: 15%;
      left: 10%;
      animation-delay: 0s;
      clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
    }

    .star2 {
      width: 60px;
      height: 60px;
      background: linear-gradient(45deg, var(--color-secondary-400), var(--color-secondary-500));
      top: 70%;
      right: 15%;
      animation-delay: -3s;
      clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
    }

    .cloud1 {
      width: 120px;
      height: 80px;
      background: rgba(255,255,255,0.9);
      border-radius: 80px;
      top: 25%;
      right: 8%;
      animation-delay: -6s;
      box-shadow: 0 10px 30px rgba(0,0,0,0.2);
    }

    .cloud1::before {
      content: '';
      position: absolute;
      width: 60px;
      height: 60px;
      background: rgba(255,255,255,0.9);
      border-radius: 50%;
      top: -30px;
      left: 15px;
    }

    .cloud1::after {
      content: '';
      position: absolute;
      width: 80px;
      height: 50px;
      background: rgba(255,255,255,0.9);
      border-radius: 50px;
      top: -20px;
      right: 20px;
    }

    .magical-orb {
      width: 100px;
      height: 100px;
      background: radial-gradient(circle at 30% 30%, var(--color-primary-300), var(--color-primary-600));
      border-radius: 50%;
      top: 12%;
      right: 25%;
      animation-delay: -9s;
      box-shadow: 0 0 40px var(--color-primary-400);
    }

    /* 3D Book */
    .hero-book {
      position: absolute;
      left: 8%;
      top: 50%;
      transform: translateY(-50%);
      width: 200px;
      height: 280px;
      transform-style: preserve-3d;
      animation: bookRotate 8s ease-in-out infinite;
      cursor: pointer;
      transition: all var(--duration-normal) var(--ease-spring);
    }

    .book-cover {
      position: absolute;
      width: 100%;
      height: 100%;
      background: linear-gradient(135deg, var(--color-error-500), var(--color-error-600));
      border-radius: var(--radius-xl);
      transform: rotateY(0deg);
      backface-visibility: hidden;
      box-shadow: var(--shadow-2xl);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: var(--font-size-2xl);
      font-weight: var(--font-weight-bold);
      font-family: var(--font-family-display);
      text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
    }

    .book-pages {
      position: absolute;
      width: 95%;
      height: 98%;
      background: var(--color-neutral-50);
      border-radius: var(--radius-xl);
      transform: rotateY(180deg) translateZ(20px);
      backface-visibility: hidden;
      left: 2.5%;
      top: 1%;
      box-shadow: inset 0 0 20px rgba(0,0,0,0.1);
    }

    .hero-book:hover {
      animation-play-state: paused;
      transform: translateY(-50%) scale(1.1);
    }

    /* Particles */
    .particles {
      position: absolute;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 1;
    }

    .particle {
      position: absolute;
      width: 8px;
      height: 8px;
      background: rgba(255,255,255,0.8);
      border-radius: 50%;
      animation: particleFloat 10s linear infinite;
      box-shadow: 0 0 10px rgba(255,255,255,0.5);
    }

    /* Interactive Elements */
    .interactive-elements {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 5;
    }

    .rainbow-trail {
      position: absolute;
      width: 200px;
      height: 10px;
      background: linear-gradient(90deg, 
        var(--color-error-400), 
        var(--color-warning-400), 
        var(--color-success-400), 
        var(--color-primary-400), 
        var(--color-secondary-400)
      );
      border-radius: var(--radius-full);
      opacity: 0;
      transition: all var(--duration-slow) var(--ease-out);
      filter: blur(2px);
    }

    .sparkle {
      position: absolute;
      width: 6px;
      height: 6px;
      background: var(--color-warning-300);
      border-radius: 50%;
      animation: sparkleAnimation 2s ease-in-out infinite;
    }

    /* Animations */
    @keyframes backgroundShift {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.8; }
    }

    @keyframes floatIn {
      0% {
        opacity: 0;
        transform: translateY(100px) rotateX(-20deg);
      }
      100% {
        opacity: 1;
        transform: translateY(0) rotateX(0);
      }
    }

    @keyframes titleFloat {
      0%, 100% {
        transform: translateZ(100px) translateY(0px);
      }
      50% {
        transform: translateZ(100px) translateY(-15px);
      }
    }

    @keyframes subtitleFloat {
      0%, 100% {
        transform: translateZ(50px) translateY(0px);
      }
      50% {
        transform: translateZ(50px) translateY(-8px);
      }
    }

    @keyframes buttonFloat {
      0%, 100% {
        transform: translateZ(75px) translateY(0px);
      }
      50% {
        transform: translateZ(75px) translateY(-12px);
      }
    }

    @keyframes rotate3d {
      0% {
        transform: rotateX(0deg) rotateY(0deg) translateZ(0px);
      }
      25% {
        transform: rotateX(90deg) rotateY(90deg) translateZ(50px);
      }
      50% {
        transform: rotateX(180deg) rotateY(180deg) translateZ(0px);
      }
      75% {
        transform: rotateX(270deg) rotateY(270deg) translateZ(-50px);
      }
      100% {
        transform: rotateX(360deg) rotateY(360deg) translateZ(0px);
      }
    }

    @keyframes bookRotate {
      0%, 15% {
        transform: translateY(-50%) rotateY(0deg);
      }
      30%, 45% {
        transform: translateY(-50%) rotateY(180deg);
      }
      60%, 75% {
        transform: translateY(-50%) rotateY(360deg);
      }
      90%, 100% {
        transform: translateY(-50%) rotateY(0deg);
      }
    }

    @keyframes particleFloat {
      0% {
        transform: translateY(100vh) translateZ(0px) scale(0);
        opacity: 0;
      }
      10% {
        opacity: 1;
        transform: translateY(90vh) translateZ(20px) scale(1);
      }
      90% {
        opacity: 1;
        transform: translateY(-10vh) translateZ(100px) scale(1);
      }
      100% {
        transform: translateY(-20vh) translateZ(150px) scale(0);
        opacity: 0;
      }
    }

    @keyframes sparkleAnimation {
      0%, 100% {
        opacity: 0;
        transform: scale(0);
      }
      50% {
        opacity: 1;
        transform: scale(1);
      }
    }

    /* Enhanced Animation Keyframes */
    @keyframes heroEntrance {
      0% {
        opacity: 0;
        transform: translateY(100px) rotateX(-30deg);
      }
      100% {
        opacity: 1;
        transform: translateY(0) rotateX(0);
      }
    }

    @keyframes textShimmer {
      0%, 100% {
        background-position: 0% 50%;
      }
      50% {
        background-position: 100% 50%;
      }
    }

    @keyframes titleBounce {
      0%, 100% {
        transform: translateZ(100px) translateY(0px);
      }
      50% {
        transform: translateZ(100px) translateY(-20px);
      }
    }

    @keyframes subtitleGlow {
      0%, 100% {
        text-shadow: 0 5px 15px rgba(0,0,0,0.3), 0 0 0 rgba(255,255,255,0.5);
      }
      50% {
        text-shadow: 0 5px 15px rgba(0,0,0,0.3), 0 0 30px rgba(255,255,255,0.8);
      }
    }

    @keyframes buttonPulse {
      0%, 100% {
        transform: scale(1);
      }
      50% {
        transform: scale(1.05);
      }
    }

    @keyframes characterIdle { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-15px); } }
    @keyframes characterBreathe { 0%, 100% { transform: scaleY(1); } 50% { transform: scaleY(1.05); } }
    @keyframes headNod { 0%, 100% { transform: translateX(-50%) rotate(0deg); } 25% { transform: translateX(-50%) rotate(2deg); } 75% { transform: translateX(-50%) rotate(-2deg); } }
    @keyframes eyeBlink { 0%, 90%, 100% { transform: translateX(-50%) scaleY(1); } 95% { transform: translateX(-50%) scaleY(0.1); } }
    @keyframes hatWiggle { 0%, 100% { transform: translateX(-50%) rotate(0deg); } 25% { transform: translateX(-50%) rotate(3deg); } 75% { transform: translateX(-50%) rotate(-3deg); } }
    @keyframes wandWave { 0%, 100% { transform: rotate(0deg); } 50% { transform: rotate(15deg); } }
    @keyframes wandSparkle { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.5; transform: scale(1.5); } }
    @keyframes wandExcited { 0%, 100% { transform: rotate(0deg); } 25% { transform: rotate(25deg); } 75% { transform: rotate(-25deg); } }

    /* Enhanced Particle System */
    .particle-system {
      position: absolute;
      width: 100%;
      height: 100%;
      overflow: hidden;
      pointer-events: none;
    }

    .particle {
      position: absolute;
      width: 8px;
      height: 8px;
      background: radial-gradient(circle, #ffffff, #f0f0f0);
      border-radius: 50%;
      animation: particleFloat 12s linear infinite;
      opacity: 0;
    }

    @keyframes particleFloat {
      0% {
        transform: translateY(100vh) translateX(0px);
        opacity: 0;
      }
      10% {
        opacity: 1;
      }
      90% {
        opacity: 1;
      }
      100% {
        transform: translateY(-100px) translateX(200px);
        opacity: 0;
      }
    }

    /* Character Message */
    .character-message {
      position: absolute;
      background: rgba(255, 255, 255, 0.95);
      border-radius: 20px;
      padding: 12px 20px;
      font-size: 1.1rem;
      font-weight: bold;
      color: #333;
      box-shadow: 0 10px 30px rgba(0,0,0,0.2);
      transform: scale(0);
      opacity: 0;
      z-index: 1000;
      pointer-events: none;
    }

    /* Responsive Design */
    @media (max-width: 768px) {
      .hero-title {
        font-size: 3rem;
      }
      
      .hero-subtitle {
        font-size: 1.5rem;
      }
      
      .hero-buttons {
        flex-direction: column;
        align-items: center;
      }
      
      .floating-book {
        display: none;
      }
      
      .magic-character {
        display: none;
      }
    }

    @media (max-width: 480px) {
      .hero-title {
        font-size: 2.5rem;
      }
      
      .hero-subtitle {
        font-size: 1.2rem;
      }
      
      .btn-primary, .btn-secondary {
        padding: 15px 30px;
        font-size: 1.2rem;
      }
    }

    /* Reduced Motion Support */
    @media (prefers-reduced-motion: reduce) {
      * {
        animation-duration: 0.001s !important;
        animation-delay: 0s !important;
        transition-duration: 0.001s !important;
      }
    }
  `]
})
export class HeroSectionComponent implements AfterViewInit {
  @ViewChild('heroContainer', { static: true }) heroContainer!: ElementRef;
  @ViewChild('heroContent', { static: true }) heroContent!: ElementRef;
  @ViewChild('particlesContainer', { static: true }) particlesContainer!: ElementRef;
  @ViewChild('rainbowTrail', { static: true }) rainbowTrail!: ElementRef;
  @ViewChild('sparkles', { static: true }) sparkles!: ElementRef;
  @ViewChild('loadingOverlay', { static: false }) loadingOverlay!: ElementRef;
  @ViewChild('magicCharacter', { static: false }) magicCharacter!: ElementRef;
  @ViewChild('characterMessage', { static: false }) characterMessage!: ElementRef;
  @ViewChild('rainbow', { static: false }) rainbow!: ElementRef;

  private router = inject(Router);
  private mouseX = signal(0);
  private mouseY = signal(0);

  constructor() {
    // Mouse parallax effect
    effect(() => {
      if (this.heroContent?.nativeElement) {
        const x = this.mouseX();
        const y = this.mouseY();
        this.heroContent.nativeElement.style.transform = 
          `rotateY(${x * 5}deg) rotateX(${-y * 5}deg)`;
      }
    });
  }

  ngAfterViewInit() {
    this.createParticles();
    this.setupMouseEvents();
    this.createSparkles();
  }

  startAdventure() {
    // Add button click animation
    const button = this.heroContainer.nativeElement.querySelector('.hero-button');
    if (button) {
      button.style.transform = 'translateZ(75px) scale(0.95)';
      
      setTimeout(() => {
        button.style.transform = 'translateZ(75px) scale(1)';
      }, 150);
    }
    
    // Navigate to stories
    setTimeout(() => {
      // Scroll to stories section or navigate
      const storiesSection = document.querySelector('.story-list-container');
      if (storiesSection) {
        storiesSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 300);
  }

  onBookClick() {
    // Create rainbow trail effect
    this.createRainbowTrail();
    
    // Add sparkle burst
    this.createSparklesBurst();
  }

  private createParticles() {
    this.createEnhancedParticles();
  }

  private createEnhancedParticles() {
    const container = this.particlesContainer.nativeElement;
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.animationDelay = Math.random() * 12 + 's';
      particle.style.animationDuration = (Math.random() * 8 + 8) + 's';
      
      // Random particle colors
      const colors = ['#ffffff', '#ffd700', '#ff69b4', '#00ffff', '#98fb98'];
      particle.style.background = `radial-gradient(circle, ${colors[Math.floor(Math.random() * colors.length)]}, #f0f0f0)`;
      
      container.appendChild(particle);
    }
  }

  private setupMouseEvents() {
    this.heroContainer.nativeElement.addEventListener('mousemove', (e: MouseEvent) => {
      const rect = this.heroContainer.nativeElement.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      
      this.mouseX.set(x);
      this.mouseY.set(y);

      // Update rainbow trail position
      if (this.rainbowTrail?.nativeElement) {
        this.rainbowTrail.nativeElement.style.left = e.clientX - 100 + 'px';
        this.rainbowTrail.nativeElement.style.top = e.clientY - 5 + 'px';
        this.rainbowTrail.nativeElement.style.opacity = '0.6';
      }
    });

    this.heroContainer.nativeElement.addEventListener('mouseleave', () => {
      if (this.rainbowTrail?.nativeElement) {
        this.rainbowTrail.nativeElement.style.opacity = '0';
      }
    });
  }

  private createRainbowTrail() {
    const trail = this.rainbowTrail.nativeElement;
    trail.style.opacity = '1';
    trail.style.transform = 'scale(1.5)';
    
    setTimeout(() => {
      trail.style.opacity = '0';
      trail.style.transform = 'scale(1)';
    }, 1000);
  }

  private createSparkles() {
    const container = this.sparkles.nativeElement;
    
    for (let i = 0; i < 15; i++) {
      const sparkle = document.createElement('div');
      sparkle.className = 'sparkle';
      sparkle.style.left = Math.random() * 100 + '%';
      sparkle.style.top = Math.random() * 100 + '%';
      sparkle.style.animationDelay = Math.random() * 3 + 's';
      container.appendChild(sparkle);
    }
  }

  private createSparklesBurst() {
    const container = this.sparkles.nativeElement;
    
    for (let i = 0; i < 10; i++) {
      const sparkle = document.createElement('div');
      sparkle.className = 'sparkle';
      sparkle.style.left = Math.random() * 100 + '%';
      sparkle.style.top = Math.random() * 100 + '%';
      sparkle.style.animation = 'sparkleAnimation 1s ease-out';
      container.appendChild(sparkle);
      
      setTimeout(() => {
        container.removeChild(sparkle);
      }, 1000);
    }
  }

  startReading() {
    const button = this.heroContainer.nativeElement.querySelector('.btn-primary') as HTMLElement;
    if (button) {
      button.style.transform = 'translateY(-5px) scale(0.95)';
      this.createMagicalBurst(button);
      
      setTimeout(() => {
        button.style.transform = 'translateY(-5px) scale(1.05)';
        this.router.navigate(['/']);
      }, 300);
    }
  }

  exploreStories() {
    const button = this.heroContainer.nativeElement.querySelector('.btn-secondary') as HTMLElement;
    if (button) {
      button.style.transform = 'translateY(-5px) scale(0.95)';
      this.createMagicalBurst(button);
      
      setTimeout(() => {
        button.style.transform = 'translateY(-5px) scale(1.05)';
        this.router.navigate(['/']);
      }, 300);
    }
  }

  characterInteraction() {
    if (this.magicCharacter?.nativeElement) {
      const character = this.magicCharacter.nativeElement;
      character.style.animation = 'none';
      character.style.transform = 'scale(1.2) rotate(10deg)';
      
      this.createSparklesAround(character);
      
      setTimeout(() => {
        character.style.transform = 'scale(1)';
        character.style.animation = 'characterIdle 4s ease-in-out infinite';
      }, 500);
      
      this.showCharacterMessage("Hi there! Ready for a magical story? ✨");
    }
  }

  private createMagicalBurst(element: HTMLElement) {
    const rect = element.getBoundingClientRect();
    const heroRect = this.heroContainer.nativeElement.getBoundingClientRect();
    
    // Create burst effect at button position
    for (let i = 0; i < 8; i++) {
      const particle = document.createElement('div');
      particle.style.position = 'absolute';
      particle.style.left = (rect.left - heroRect.left + rect.width/2) + 'px';
      particle.style.top = (rect.top - heroRect.top + rect.height/2) + 'px';
      particle.style.width = '8px';
      particle.style.height = '8px';
      particle.style.borderRadius = '50%';
      particle.style.background = '#ffd700';
      particle.style.pointerEvents = 'none';
      particle.style.zIndex = '1000';
      
      const angle = (i / 8) * Math.PI * 2;
      const distance = 50;
      const finalX = Math.cos(angle) * distance;
      const finalY = Math.sin(angle) * distance;
      
      particle.animate([
        { transform: 'translate(0px, 0px) scale(1)', opacity: '1' },
        { transform: `translate(${finalX}px, ${finalY}px) scale(0)`, opacity: '0' }
      ], {
        duration: 600,
        easing: 'ease-out'
      });
      
      this.heroContainer.nativeElement.appendChild(particle);
      
      setTimeout(() => {
        this.heroContainer.nativeElement.removeChild(particle);
      }, 600);
    }
  }

  private createSparklesAround(element: HTMLElement) {
    const rect = element.getBoundingClientRect();
    const heroRect = this.heroContainer.nativeElement.getBoundingClientRect();
    
    for (let i = 0; i < 12; i++) {
      const sparkle = document.createElement('div');
      sparkle.style.position = 'absolute';
      sparkle.style.left = (rect.left - heroRect.left + Math.random() * rect.width) + 'px';
      sparkle.style.top = (rect.top - heroRect.top + Math.random() * rect.height) + 'px';
      sparkle.style.width = '6px';
      sparkle.style.height = '6px';
      sparkle.style.borderRadius = '50%';
      sparkle.style.background = ['#ffd700', '#ff69b4', '#00ffff', '#98fb98'][Math.floor(Math.random() * 4)];
      sparkle.style.pointerEvents = 'none';
      sparkle.style.zIndex = '1000';
      
      sparkle.animate([
        { transform: 'scale(0)', opacity: '0' },
        { transform: 'scale(1.5)', opacity: '1' },
        { transform: 'scale(0)', opacity: '0' }
      ], {
        duration: 1000,
        delay: Math.random() * 500,
        easing: 'ease-in-out'
      });
      
      this.heroContainer.nativeElement.appendChild(sparkle);
      
      setTimeout(() => {
        if (this.heroContainer.nativeElement.contains(sparkle)) {
          this.heroContainer.nativeElement.removeChild(sparkle);
        }
      }, 1500);
    }
  }

  private showCharacterMessage(message: string) {
    if (this.characterMessage?.nativeElement) {
      const messageEl = this.characterMessage.nativeElement;
      messageEl.textContent = message;
      messageEl.style.position = 'absolute';
      messageEl.style.bottom = '20%';
      messageEl.style.right = '5%';
      messageEl.style.background = 'rgba(255, 255, 255, 0.95)';
      messageEl.style.padding = '12px 20px';
      messageEl.style.borderRadius = '20px';
      messageEl.style.fontSize = '1.1rem';
      messageEl.style.fontWeight = 'bold';
      messageEl.style.color = '#333';
      messageEl.style.boxShadow = '0 10px 30px rgba(0,0,0,0.2)';
      messageEl.style.transform = 'scale(0)';
      messageEl.style.opacity = '0';
      messageEl.style.zIndex = '1000';
      
      messageEl.animate([
        { transform: 'scale(0)', opacity: '0' },
        { transform: 'scale(1.1)', opacity: '1' },
        { transform: 'scale(1)', opacity: '1' }
      ], {
        duration: 300,
        easing: 'ease-out'
      });
      
      setTimeout(() => {
        messageEl.animate([
          { transform: 'scale(1)', opacity: '1' },
          { transform: 'scale(0)', opacity: '0' }
        ], {
          duration: 200,
          easing: 'ease-in'
        });
      }, 3000);
    }
  }

}
