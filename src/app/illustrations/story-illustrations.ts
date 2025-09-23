// Professional SVG Illustrations for Kids Story World
// High-quality, scalable illustrations that enhance content

export const StoryIllustrations = {
  jungle: {
    scene1: `
      <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="jungle-bg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#87CEEB"/>
            <stop offset="100%" style="stop-color:#228B22"/>
          </linearGradient>
          <linearGradient id="tree-trunk" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#8B4513"/>
            <stop offset="100%" style="stop-color:#654321"/>
          </linearGradient>
          <linearGradient id="leaves" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#32CD32"/>
            <stop offset="100%" style="stop-color:#228B22"/>
          </linearGradient>
        </defs>
        
        <!-- Background -->
        <rect width="400" height="300" fill="url(#jungle-bg)"/>
        
        <!-- Trees -->
        <ellipse cx="80" cy="250" rx="25" ry="50" fill="url(#tree-trunk)"/>
        <ellipse cx="80" cy="180" rx="60" ry="80" fill="url(#leaves)"/>
        
        <ellipse cx="320" cy="260" rx="20" ry="40" fill="url(#tree-trunk)"/>
        <ellipse cx="320" cy="200" rx="50" ry="70" fill="url(#leaves)"/>
        
        <!-- Lion Cub Leo -->
        <ellipse cx="200" cy="220" rx="40" ry="35" fill="#FFD700"/>
        <ellipse cx="185" cy="210" rx="8" ry="8" fill="#FF6347"/>
        <ellipse cx="215" cy="210" rx="8" ry="8" fill="#FF6347"/>
        <ellipse cx="200" cy="225" rx="5" ry="3" fill="#000"/>
        <path d="M 190 235 Q 200 245 210 235" stroke="#000" stroke-width="2" fill="none"/>
        
        <!-- Mane -->
        <ellipse cx="180" cy="200" rx="15" ry="20" fill="#FF8C00"/>
        <ellipse cx="220" cy="200" rx="15" ry="20" fill="#FF8C00"/>
        <ellipse cx="200" cy="185" rx="25" ry="15" fill="#FF8C00"/>
        
        <!-- Squirrel Sammy -->
        <ellipse cx="120" cy="160" rx="15" ry="20" fill="#8B4513"/>
        <ellipse cx="115" cy="155" rx="3" ry="3" fill="#000"/>
        <ellipse cx="125" cy="155" rx="3" ry="3" fill="#000"/>
        <ellipse cx="135" cy="155" rx="12" ry="15" fill="#8B4513"/>
        
        <!-- Butterfly Bella -->
        <ellipse cx="280" cy="120" rx="3" ry="8" fill="#000"/>
        <ellipse cx="275" cy="115" rx="8" ry="6" fill="#FF69B4"/>
        <ellipse cx="285" cy="115" rx="8" ry="6" fill="#FF69B4"/>
        <ellipse cx="275" cy="125" rx="6" ry="4" fill="#9370DB"/>
        <ellipse cx="285" cy="125" rx="6" ry="4" fill="#9370DB"/>
        
        <!-- Flowers -->
        <ellipse cx="150" cy="280" rx="8" ry="8" fill="#FF69B4"/>
        <ellipse cx="250" cy="275" rx="6" ry="6" fill="#FFD700"/>
        <ellipse cx="350" cy="280" rx="7" ry="7" fill="#FF6347"/>
      </svg>
    `,
    
    scene2: `
      <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="waterfall-bg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#87CEEB"/>
            <stop offset="50%" style="stop-color:#32CD32"/>
            <stop offset="100%" style="stop-color:#228B22"/>
          </linearGradient>
          <linearGradient id="water" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style="stop-color:#87CEEB"/>
            <stop offset="100%" style="stop-color:#4682B4"/>
          </linearGradient>
        </defs>
        
        <!-- Background -->
        <rect width="400" height="300" fill="url(#waterfall-bg)"/>
        
        <!-- Waterfall -->
        <rect x="180" y="50" width="40" height="200" fill="url(#water)" opacity="0.8"/>
        
        <!-- Water Pool -->
        <ellipse cx="200" cy="270" rx="100" ry="20" fill="url(#water)"/>
        
        <!-- Animals Playing -->
        <ellipse cx="150" cy="250" rx="25" ry="20" fill="#FFD700"/>
        <ellipse cx="250" cy="250" rx="20" ry="15" fill="#8B4513"/>
        <ellipse cx="300" cy="240" rx="15" ry="25" fill="#FF69B4"/>
        
        <!-- Magical Sparkles -->
        <circle cx="120" cy="80" r="3" fill="#FFD700"/>
        <circle cx="280" cy="60" r="2" fill="#FF69B4"/>
        <circle cx="340" cy="90" r="4" fill="#87CEEB"/>
      </svg>
    `
  },

  space: {
    scene1: `
      <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="space-bg" cx="50%" cy="50%" r="50%">
            <stop offset="0%" style="stop-color:#191970"/>
            <stop offset="100%" style="stop-color:#000008"/>
          </radialGradient>
          <radialGradient id="star-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" style="stop-color:#FFD700"/>
            <stop offset="100%" style="stop-color:#FFA500"/>
          </radialGradient>
        </defs>
        
        <!-- Space Background -->
        <rect width="400" height="300" fill="url(#space-bg)"/>
        
        <!-- Stars -->
        <circle cx="50" cy="50" r="2" fill="#FFD700"/>
        <circle cx="150" cy="40" r="1.5" fill="#FFFFFF"/>
        <circle cx="350" cy="60" r="2.5" fill="#FFD700"/>
        <circle cx="80" cy="120" r="1" fill="#FFFFFF"/>
        <circle cx="320" cy="100" r="2" fill="#FFD700"/>
        
        <!-- Twinkle the Star (main character) -->
        <g transform="translate(200,150)">
          <circle r="25" fill="url(#star-glow)"/>
          <path d="M 0,-20 L 6,-6 L 20,0 L 6,6 L 0,20 L -6,6 L -20,0 L -6,-6 Z" fill="#FFD700"/>
          <!-- Eyes -->
          <circle cx="-8" cy="-5" r="3" fill="#000"/>
          <circle cx="8" cy="-5" r="3" fill="#000"/>
          <!-- Smile -->
          <path d="M -10 5 Q 0 15 10 5" stroke="#000" stroke-width="2" fill="none"/>
        </g>
        
        <!-- Earth in distance -->
        <circle cx="350" cy="250" r="30" fill="#4169E1"/>
        <ellipse cx="340" cy="240" rx="15" ry="10" fill="#228B22"/>
        <ellipse cx="360" cy="255" rx="12" ry="8" fill="#228B22"/>
        
        <!-- Children silhouettes on Earth -->
        <ellipse cx="345" cy="260" rx="3" ry="5" fill="#000"/>
        <ellipse cx="355" cy="260" rx="3" ry="5" fill="#000"/>
      </svg>
    `,
    
    scene2: `
      <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="magic-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" style="stop-color:#FFD700"/>
            <stop offset="100%" style="stop-color:#FF69B4"/>
          </radialGradient>
        </defs>
        
        <!-- Night Sky -->
        <rect width="400" height="300" fill="#000008"/>
        
        <!-- Shooting Star Trail -->
        <path d="M 50 50 Q 200 100 350 200" stroke="url(#magic-glow)" stroke-width="8" fill="none" opacity="0.8"/>
        
        <!-- Twinkle transforming -->
        <g transform="translate(200,150)">
          <circle r="30" fill="url(#magic-glow)" opacity="0.6"/>
          <path d="M 0,-25 L 8,-8 L 25,0 L 8,8 L 0,25 L -8,8 L -25,0 L -8,-8 Z" fill="#FFD700"/>
        </g>
        
        <!-- Children with sparkles in their eyes -->
        <g transform="translate(120,220)">
          <ellipse rx="15" ry="20" fill="#FFB6C1"/>
          <circle cx="-5" cy="-5" r="2" fill="#FFD700"/>
          <circle cx="5" cy="-5" r="2" fill="#FFD700"/>
          <path d="M -8 5 Q 0 10 8 5" stroke="#000" stroke-width="1" fill="none"/>
        </g>
        
        <g transform="translate(280,220)">
          <ellipse rx="15" ry="20" fill="#87CEEB"/>
          <circle cx="-5" cy="-5" r="2" fill="#FFD700"/>
          <circle cx="5" cy="-5" r="2" fill="#FFD700"/>
          <path d="M -8 5 Q 0 10 8 5" stroke="#000" stroke-width="1" fill="none"/>
        </g>
        
        <!-- Magical sparkles -->
        <circle cx="80" cy="80" r="2" fill="#FFD700"/>
        <circle cx="320" cy="120" r="3" fill="#FF69B4"/>
        <circle cx="150" cy="180" r="2" fill="#87CEEB"/>
      </svg>
    `
  },

  rainbow: {
    scene1: `
      <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="sky-bg" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style="stop-color:#87CEEB"/>
            <stop offset="100%" style="stop-color:#E0F6FF"/>
          </linearGradient>
        </defs>
        
        <!-- Sky Background -->
        <rect width="400" height="300" fill="url(#sky-bg)"/>
        
        <!-- Rainbow Bridge -->
        <path d="M 50 200 Q 200 50 350 200" stroke="#FF0000" stroke-width="12" fill="none"/>
        <path d="M 50 208 Q 200 58 350 208" stroke="#FF7F00" stroke-width="12" fill="none"/>
        <path d="M 50 216 Q 200 66 350 216" stroke="#FFFF00" stroke-width="12" fill="none"/>
        <path d="M 50 224 Q 200 74 350 224" stroke="#00FF00" stroke-width="12" fill="none"/>
        <path d="M 50 232 Q 200 82 350 232" stroke="#0000FF" stroke-width="12" fill="none"/>
        <path d="M 50 240 Q 200 90 350 240" stroke="#4B0082" stroke-width="12" fill="none"/>
        <path d="M 50 248 Q 200 98 350 248" stroke="#9400D3" stroke-width="12" fill="none"/>
        
        <!-- Ruby the Rabbit -->
        <g transform="translate(200,180)">
          <ellipse rx="20" ry="25" fill="#FFFFFF"/>
          <!-- Ears -->
          <ellipse cx="-10" cy="-20" rx="5" ry="15" fill="#FFB6C1"/>
          <ellipse cx="10" cy="-20" rx="5" ry="15" fill="#FFB6C1"/>
          <!-- Eyes -->
          <circle cx="-6" cy="-5" r="3" fill="#000"/>
          <circle cx="6" cy="-5" r="3" fill="#000"/>
          <!-- Nose -->
          <ellipse cy="0" rx="2" ry="1" fill="#FF69B4"/>
          <!-- Tail -->
          <circle cx="-25" cy="5" r="8" fill="#FFFFFF"/>
        </g>
        
        <!-- Colorful Friends -->
        <!-- Red Robin -->
        <g transform="translate(120,140)">
          <ellipse rx="12" ry="15" fill="#FF0000"/>
          <circle cx="-5" cy="-5" r="2" fill="#000"/>
          <path d="M 8 0 L 15 -3 L 15 3 Z" fill="#FFA500"/>
        </g>
        
        <!-- Yellow Sun -->
        <g transform="translate(80,80)">
          <circle r="20" fill="#FFFF00"/>
          <path d="M 0,-25 L 5,-30 L -5,-30 Z" fill="#FFFF00"/>
          <path d="M 18,-18 L 25,-20 L 20,-25 Z" fill="#FFFF00"/>
          <path d="M 25,0 L 30,5 L 30,-5 Z" fill="#FFFF00"/>
          <path d="M 18,18 L 25,20 L 20,25 Z" fill="#FFFF00"/>
        </g>
      </svg>
    `,
    
    scene2: `
      <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
        <!-- Colorful World -->
        <rect width="400" height="300" fill="#E0F6FF"/>
        
        <!-- Painted landscape -->
        <ellipse cx="100" cy="250" rx="30" ry="20" fill="#00FF00"/>
        <ellipse cx="200" cy="260" rx="40" ry="25" fill="#FF69B4"/>
        <ellipse cx="300" cy="250" rx="35" ry="20" fill="#9400D3"/>
        
        <!-- Happy creatures -->
        <g transform="translate(100,200)">
          <circle r="15" fill="#FF0000"/>
          <circle cx="-5" cy="-3" r="2" fill="#FFF"/>
          <circle cx="5" cy="-3" r="2" fill="#FFF"/>
          <path d="M -8 5 Q 0 12 8 5" stroke="#FFF" stroke-width="2" fill="none"/>
        </g>
        
        <g transform="translate(200,200)">
          <circle r="15" fill="#FFFF00"/>
          <circle cx="-5" cy="-3" r="2" fill="#000"/>
          <circle cx="5" cy="-3" r="2" fill="#000"/>
          <path d="M -8 5 Q 0 12 8 5" stroke="#000" stroke-width="2" fill="none"/>
        </g>
        
        <g transform="translate(300,200)">
          <circle r="15" fill="#0000FF"/>
          <circle cx="-5" cy="-3" r="2" fill="#FFF"/>
          <circle cx="5" cy="-3" r="2" fill="#FFF"/>
          <path d="M -8 5 Q 0 12 8 5" stroke="#FFF" stroke-width="2" fill="none"/>
        </g>
        
        <!-- Joy sparkles -->
        <circle cx="150" cy="120" r="3" fill="#FFD700"/>
        <circle cx="250" cy="100" r="4" fill="#FF69B4"/>
        <circle cx="350" cy="130" r="3" fill="#87CEEB"/>
      </svg>
    `
  },

  nature: {
    scene1: `
      <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="garden-bg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#98FB98"/>
            <stop offset="100%" style="stop-color:#228B22"/>
          </linearGradient>
          <radialGradient id="flower-center" cx="50%" cy="50%" r="50%">
            <stop offset="0%" style="stop-color:#FFD700"/>
            <stop offset="100%" style="stop-color:#FFA500"/>
          </radialGradient>
        </defs>
        
        <!-- Garden Background -->
        <rect width="400" height="300" fill="url(#garden-bg)"/>
        
        <!-- Secret Garden Cottage -->
        <rect x="50" y="150" width="100" height="80" fill="#8B4513"/>
        <polygon points="50,150 100,100 150,150" fill="#DC143C"/>
        <rect x="75" y="180" width="20" height="30" fill="#654321"/>
        <rect x="110" y="170" width="15" height="15" fill="#87CEEB"/>
        
        <!-- Singing Flowers -->
        <g transform="translate(200,220)">
          <!-- Stem -->
          <rect x="-2" y="0" width="4" height="40" fill="#228B22"/>
          <!-- Petals -->
          <ellipse cx="-15" cy="-10" rx="8" ry="12" fill="#FF69B4"/>
          <ellipse cx="15" cy="-10" rx="8" ry="12" fill="#FF69B4"/>
          <ellipse cx="0" cy="-20" rx="12" ry="8" fill="#FF69B4"/>
          <ellipse cx="0" cy="0" rx="12" ry="8" fill="#FF69B4"/>
          <!-- Center -->
          <circle r="5" fill="url(#flower-center)"/>
          <!-- Musical notes -->
          <text x="20" y="-25" font-family="Arial" font-size="12" fill="#000">♪</text>
          <text x="25" y="-35" font-family="Arial" font-size="10" fill="#000">♫</text>
        </g>
        
        <g transform="translate(280,200)">
          <rect x="-2" y="0" width="4" height="50" fill="#228B22"/>
          <ellipse cx="-12" cy="-8" rx="6" ry="10" fill="#9370DB"/>
          <ellipse cx="12" cy="-8" rx="6" ry="10" fill="#9370DB"/>
          <ellipse cx="0" cy="-16" rx="10" ry="6" fill="#9370DB"/>
          <ellipse cx="0" cy="0" rx="10" ry="6" fill="#9370DB"/>
          <circle r="4" fill="url(#flower-center)"/>
          <text x="18" y="-20" font-family="Arial" font-size="10" fill="#000">♪</text>
        </g>
        
        <g transform="translate(320,240)">
          <rect x="-2" y="0" width="4" height="35" fill="#228B22"/>
          <ellipse cx="-10" cy="-6" rx="5" ry="8" fill="#FFD700"/>
          <ellipse cx="10" cy="-6" rx="5" ry="8" fill="#FFD700"/>
          <ellipse cx="0" cy="-12" rx="8" ry="5" fill="#FFD700"/>
          <ellipse cx="0" cy="0" rx="8" ry="5" fill="#FFD700"/>
          <circle r="3" fill="#FF4500"/>
          <text x="15" y="-15" font-family="Arial" font-size="8" fill="#000">♫</text>
        </g>
        
        <!-- Wind lines -->
        <path d="M 30 100 Q 50 90 70 100" stroke="#87CEEB" stroke-width="2" fill="none" opacity="0.6"/>
        <path d="M 350 80 Q 370 70 390 80" stroke="#87CEEB" stroke-width="2" fill="none" opacity="0.6"/>
      </svg>
    `,
    
    scene2: `
      <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
        <!-- Peaceful Garden -->
        <rect width="400" height="300" fill="#F0FFF0"/>
        
        <!-- Children listening -->
        <g transform="translate(150,200)">
          <ellipse rx="15" ry="20" fill="#FFB6C1"/>
          <circle cx="-5" cy="-5" r="2" fill="#000"/>
          <circle cx="5" cy="-5" r="2" fill="#000"/>
          <path d="M -8 5 Q 0 10 8 5" stroke="#000" stroke-width="1" fill="none"/>
          <!-- Peace aura -->
          <circle r="25" fill="none" stroke="#87CEEB" stroke-width="1" opacity="0.5"/>
        </g>
        
        <g transform="translate(250,200)">
          <ellipse rx="15" ry="20" fill="#98FB98"/>
          <circle cx="-5" cy="-5" r="2" fill="#000"/>
          <circle cx="5" cy="-5" r="2" fill="#000"/>
          <path d="M -8 5 Q 0 10 8 5" stroke="#000" stroke-width="1" fill="none"/>
          <circle r="25" fill="none" stroke="#90EE90" stroke-width="1" opacity="0.5"/>
        </g>
        
        <!-- Magical melody waves -->
        <path d="M 100 150 Q 200 130 300 150" stroke="#FF69B4" stroke-width="3" fill="none" opacity="0.7"/>
        <path d="M 120 160 Q 200 140 280 160" stroke="#9370DB" stroke-width="3" fill="none" opacity="0.7"/>
        
        <!-- Happy sparkles -->
        <circle cx="80" cy="120" r="2" fill="#FFD700"/>
        <circle cx="320" cy="110" r="3" fill="#FF69B4"/>
        <circle cx="200" cy="100" r="2" fill="#87CEEB"/>
      </svg>
    `
  },

  fantasy: {
    scene1: `
      <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="sky-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style="stop-color:#87CEEB"/>
            <stop offset="100%" style="stop-color:#E0F6FF"/>
          </linearGradient>
          <radialGradient id="dragon-body" cx="50%" cy="50%" r="50%">
            <stop offset="0%" style="stop-color:#FF69B4"/>
            <stop offset="100%" style="stop-color:#FF1493"/>
          </radialGradient>
        </defs>
        
        <!-- Sky Background -->
        <rect width="400" height="300" fill="url(#sky-gradient)"/>
        
        <!-- Clouds -->
        <ellipse cx="80" cy="60" rx="30" ry="15" fill="#FFFFFF" opacity="0.8"/>
        <ellipse cx="320" cy="80" rx="25" ry="12" fill="#FFFFFF" opacity="0.8"/>
        
        <!-- Mountain Cave -->
        <polygon points="350,200 400,300 300,300" fill="#696969"/>
        <ellipse cx="350" cy="220" rx="20" ry="30" fill="#2F4F4F"/>
        
        <!-- Sparkle the Dragon -->
        <g transform="translate(200,180)">
          <!-- Body -->
          <ellipse rx="40" ry="25" fill="url(#dragon-body)"/>
          <!-- Head -->
          <ellipse cx="35" cy="-10" rx="25" ry="20" fill="url(#dragon-body)"/>
          <!-- Eyes -->
          <circle cx="30" cy="-15" r="4" fill="#000"/>
          <circle cx="45" cy="-15" r="4" fill="#000"/>
          <circle cx="31" cy="-16" r="2" fill="#FFF"/>
          <circle cx="46" cy="-16" r="2" fill="#FFF"/>
          <!-- Snout -->
          <ellipse cx="55" cy="-8" rx="8" ry="5" fill="#FF1493"/>
          <!-- Wings -->
          <ellipse cx="-10" cy="-15" rx="20" ry="25" fill="#FF69B4" opacity="0.8"/>
          <ellipse cx="10" cy="-15" rx="20" ry="25" fill="#FF69B4" opacity="0.8"/>
          <!-- Tail -->
          <ellipse cx="-55" cy="0" rx="15" ry="8" fill="url(#dragon-body)"/>
        </g>
        
        <!-- Colorful Bubbles instead of fire -->
        <circle cx="280" cy="160" r="8" fill="#87CEEB" opacity="0.7"/>
        <circle cx="290" cy="150" r="6" fill="#FFD700" opacity="0.7"/>
        <circle cx="300" cy="140" r="10" fill="#FF69B4" opacity="0.7"/>
        <circle cx="310" cy="130" r="7" fill="#90EE90" opacity="0.7"/>
        <circle cx="320" cy="120" r="9" fill="#9370DB" opacity="0.7"/>
        
        <!-- Happy children approaching -->
        <g transform="translate(100,220)">
          <ellipse rx="12" ry="18" fill="#FFB6C1"/>
          <circle cx="-4" cy="-8" r="2" fill="#000"/>
          <circle cx="4" cy="-8" r="2" fill="#000"/>
          <path d="M -6 -2 Q 0 4 6 -2" stroke="#000" stroke-width="1" fill="none"/>
        </g>
        
        <g transform="translate(130,225)">
          <ellipse rx="12" ry="18" fill="#87CEEB"/>
          <circle cx="-4" cy="-8" r="2" fill="#000"/>
          <circle cx="4" cy="-8" r="2" fill="#000"/>
          <path d="M -6 -2 Q 0 4 6 -2" stroke="#000" stroke-width="1" fill="none"/>
        </g>
      </svg>
    `,
    
    scene2: `
      <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
        <!-- Teaching scene -->
        <rect width="400" height="300" fill="#F0F8FF"/>
        
        <!-- Sparkle the Dragon helping -->
        <g transform="translate(200,150)">
          <ellipse rx="35" ry="22" fill="#FF69B4"/>
          <ellipse cx="30" cy="-8" rx="22" ry="18" fill="#FF69B4"/>
          <circle cx="25" cy="-12" r="3" fill="#000"/>
          <circle cx="38" cy="-12" r="3" fill="#000"/>
          <circle cx="26" cy="-13" r="1.5" fill="#FFF"/>
          <circle cx="39" cy="-13" r="1.5" fill="#FFF"/>
          <path d="M 20 -5 Q 30 2 40 -5" stroke="#000" stroke-width="2" fill="none"/>
          
          <!-- Kind gesture - outstretched wing -->
          <ellipse cx="-15" cy="-10" rx="25" ry="20" fill="#FF69B4" opacity="0.8"/>
        </g>
        
        <!-- Children learning about kindness -->
        <g transform="translate(120,200)">
          <ellipse rx="15" ry="20" fill="#FFB6C1"/>
          <circle cx="-5" cy="-8" r="2" fill="#000"/>
          <circle cx="5" cy="-8" r="2" fill="#000"/>
          <path d="M -8 -2 Q 0 5 8 -2" stroke="#000" stroke-width="1" fill="none"/>
          <!-- Heart symbol for love -->
          <path d="M -2 5 Q -6 2 -6 -1 Q -6 -4 -2 -1 Q 2 -4 6 -1 Q 6 2 2 5 Z" fill="#FF0000"/>
        </g>
        
        <g transform="translate(280,200)">
          <ellipse rx="15" ry="20" fill="#98FB98"/>
          <circle cx="-5" cy="-8" r="2" fill="#000"/>
          <circle cx="5" cy="-8" r="2" fill="#000"/>
          <path d="M -8 -2 Q 0 5 8 -2" stroke="#000" stroke-width="1" fill="none"/>
          <path d="M -2 5 Q -6 2 -6 -1 Q -6 -4 -2 -1 Q 2 -4 6 -1 Q 6 2 2 5 Z" fill="#FF0000"/>
        </g>
        
        <!-- Magical lesson sparkles -->
        <circle cx="80" cy="100" r="3" fill="#FFD700"/>
        <circle cx="320" cy="120" r="2" fill="#FF69B4"/>
        <circle cx="200" cy="80" r="4" fill="#87CEEB"/>
        <text x="150" y="50" font-family="Arial" font-size="16" fill="#4B0082" text-anchor="middle">✨ Kindness is Magic ✨</text>
      </svg>
    `
  }
};

export function getStoryIllustration(category: string, scene: number = 1): string {
  const illustrations = StoryIllustrations as any;
  const categoryKey = category.toLowerCase();
  
  if (illustrations[categoryKey]) {
    const sceneKey = `scene${scene}`;
    return illustrations[categoryKey][sceneKey] || illustrations[categoryKey].scene1;
  }
  
  // Fallback illustration
  return `
    <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="300" fill="#E6E6FA"/>
      <circle cx="200" cy="150" r="50" fill="#FFD700"/>
      <text x="200" y="160" font-family="Arial" font-size="24" fill="#4B0082" text-anchor="middle">📚</text>
    </svg>
  `;
}
