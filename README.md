# 🌟 Kids Story World 🌟

A magical Angular application designed for children ages 2-5, featuring colorful stories, interactive elements, and a kid-friendly interface.

## Features

### 📚 Story Management
- **Story Listing**: Scrollable grid of stories with beautiful thumbnails
- **Category Filtering**: Filter stories by categories (Animals, Space, Colors, Nature, Fantasy)
- **Real-time Search**: Search stories by title, content, or keywords
- **Story Details**: Full story view with images and navigation

### 🎨 Kid-Friendly Design
- **Colorful Interface**: Bright, engaging colors and gradients
- **Large Touch Elements**: Optimized for small fingers
- **Smooth Animations**: Bouncy, playful animations throughout
- **Mobile-First**: Responsive design that works on all devices
- **Accessible**: Focus indicators and keyboard navigation

### 🚀 Technical Features
- **Angular 20**: Latest Angular with standalone components
- **Reactive Programming**: Uses signals and computed values
- **Lazy Loading**: Components loaded on demand
- **Type Safety**: Full TypeScript support
- **Future-Ready**: Easy toggle between JSON and API data sources

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd kids-story-world
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open your browser and navigate to `http://localhost:4200`

### Building for Production

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory, ready for deployment to AWS Amplify or any static hosting service.

## Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── search-bar/          # Search and filter component
│   │   ├── story-list/          # Story grid component
│   │   └── story-detail/        # Individual story view
│   ├── models/
│   │   └── story.model.ts       # Story data interface
│   ├── services/
│   │   └── story.service.ts     # Data management service
│   ├── app.component.*          # Main app component
│   ├── app.routes.ts            # Routing configuration
│   └── app.config.ts            # App configuration
├── assets/
│   └── stories.json             # Story data (MVP)
└── styles.css                   # Global styles
```

## Story Data Format

Stories are stored in `public/assets/stories.json` with the following structure:

```json
{
  "id": 1,
  "title": "The Jungle Adventure",
  "category": "Animals",
  "text": "Once upon a time...",
  "image_urls": ["assets/images/jungle1.png"],
  "age_range": "2-4",
  "reading_time": 3
}
```

## Customization

### Adding New Stories
1. Add story data to `public/assets/stories.json`
2. Add corresponding images to `public/assets/images/`
3. Update the category emoji mapping in components if needed

### Switching to API
To switch from JSON to API data source:
1. Set `USE_API = true` in `StoryService`
2. Update the `API_URL` constant
3. Ensure your API returns data in the same format

### Styling
- Global styles: `src/styles.css`
- Component styles: Inline styles in each component
- Color scheme: Easily customizable CSS custom properties

## Deployment

### AWS Amplify
1. Build the project: `npm run build`
2. Deploy the `dist/` folder to AWS Amplify
3. Configure routing for SPA (redirect all routes to index.html)

### Other Platforms
The app is a standard Angular SPA and can be deployed to:
- Netlify
- Vercel
- GitHub Pages
- Any static hosting service

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers (iOS Safari, Chrome Mobile)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For questions or support, please open an issue in the repository.

---

Made with ❤️ for little readers everywhere! 📚✨