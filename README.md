# 🌍 AI Trip Planner

An intelligent trip planning web application that generates personalized travel itineraries using AI. Simply describe your dream trip, and let AI create a detailed day-by-day plan with budget breakdowns, restaurant recommendations, and mapped routes.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Vue](https://img.shields.io/badge/Vue-3.x-green.svg)
![Nuxt](https://img.shields.io/badge/Nuxt-3.x-00DC82.svg)

## ✨ Features

- **🤖 AI-Powered Itinerary Generation** - Describe your trip in natural language and get a complete personalized plan
- **📅 Day-by-Day Scheduling** - Detailed hour-by-hour activities with timing and descriptions
- **💰 Budget Breakdown** - Automatic cost estimation for transport, food, accommodation, and activities
- **🗺️ Interactive Route Maps** - Visual representation of your journey with GeoServer/PostGIS integration
- **🍽️ Restaurant Recommendations** - Curated dining suggestions based on your preferences
- **📍 Place Discovery** - Must-visit attractions tailored to your interests
- **💾 Save & Export** - Download itineraries as PDF or JSON, save for later, or share with friends
- **📱 Responsive Design** - Beautiful UI that works seamlessly on desktop, tablet, and mobile

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn package manager
- (Optional) PostgreSQL with PostGIS extension for map features
- (Optional) OpenAI API key or similar for AI generation

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/ai-trip-planner.git
cd ai-trip-planner
```

2. **Install dependencies**
```bash
# Using npm
npm install

# Using yarn
yarn install

# Using pnpm
pnpm install
```

3. **Set up environment variables**
```bash
cp .env.example .env
```

Edit `.env` and add your API keys:
```env
# AI Provider (OpenAI, Claude, or custom)
OPENAI_API_KEY=your_openai_api_key
ANTHROPIC_API_KEY=your_claude_api_key

# Map Services
MAPBOX_ACCESS_TOKEN=your_mapbox_token
GOOGLE_MAPS_API_KEY=your_google_maps_key

# Database (for PostGIS features)
DATABASE_URL=postgresql://user:password@localhost:5432/tripplanner
GEOSERVER_URL=http://localhost:8080/geoserver

# Application
NUXT_PUBLIC_API_URL=http://localhost:3000/api
```

4. **Run database migrations** (if using PostGIS)
```bash
npm run db:migrate
```

5. **Start the development server**
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## 🏗️ Tech Stack

### Frontend
- **Nuxt 3** - Vue.js meta-framework for production
- **Vue 3** - Progressive JavaScript framework
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn-vue** - High-quality Vue components
- **Lucide Icons** - Beautiful icon library

### Backend & Services
- **Nuxt Server API** - Built-in server routes
- **OpenAI API** / **Anthropic Claude** - AI itinerary generation
- **PostgreSQL + PostGIS** - Geospatial database
- **GeoServer** - Map tile server and spatial data management

### Maps & Geolocation
- **Leaflet** / **Mapbox GL JS** - Interactive maps
- **Turf.js** - Geospatial analysis
- **PostGIS** - Spatial queries and route optimization

### Export & Storage
- **jsPDF** - PDF generation
- **Pinia** - State management
- **LocalStorage** - Browser storage for saved trips

## 📁 Project Structure

```
ai-trip-planner/
├── assets/
│   ├── css/
│   │   └── tailwind.css
│   └── images/
├── components/
│   ├── ui/              # shadcn-vue components
│   ├── TripInput.vue    # Trip description input
│   ├── ItineraryCard.vue
│   ├── BudgetBreakdown.vue
│   ├── DaySchedule.vue
│   ├── RouteMap.vue
│   └── ExportButtons.vue
├── composables/
│   ├── useAI.ts         # AI generation logic
│   ├── useMap.ts        # Map integration
│   └── useExport.ts     # Export functionality
├── pages/
│   ├── index.vue        # Main trip planner
│   ├── saved.vue        # Saved trips
│   └── trip/[id].vue    # Individual trip view
├── server/
│   ├── api/
│   │   ├── generate.post.ts    # AI generation endpoint
│   │   ├── trips/
│   │   │   ├── index.get.ts
│   │   │   └── [id].get.ts
│   │   └── maps/
│   │       └── route.post.ts
│   └── utils/
│       ├── ai.ts        # AI provider integrations
│       └── geoserver.ts # GeoServer utilities
├── stores/
│   └── trips.ts         # Pinia store for trips
├── types/
│   └── index.ts         # TypeScript definitions
├── nuxt.config.ts
├── tailwind.config.ts
└── package.json
```

## 🔧 Configuration

### AI Provider Setup

#### Using OpenAI
```typescript
// server/utils/ai.ts
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function generateItinerary(description: string) {
  const completion = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content: "You are a travel expert that creates detailed itineraries..."
      },
      {
        role: "user",
        content: description
      }
    ]
  });
  
  return JSON.parse(completion.choices[0].message.content);
}
```

#### Using Anthropic Claude
```typescript
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY
});

export async function generateItinerary(description: string) {
  const message = await anthropic.messages.create({
    model: "claude-3-5-sonnet-20241022",
    max_tokens: 4096,
    messages: [{
      role: "user",
      content: description
    }]
  });
  
  return JSON.parse(message.content[0].text);
}
```

### Map Integration

#### Mapbox Setup
```vue
<!-- components/RouteMap.vue -->
<script setup lang="ts">
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = 'your_mapbox_token';

const initMap = () => {
  const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v12',
    center: [139.6917, 35.6895], // Tokyo
    zoom: 12
  });
  
  // Add markers and routes
};
</script>
```

#### PostGIS + GeoServer Setup
```sql
-- Database setup
CREATE EXTENSION postgis;

CREATE TABLE trips (
  id SERIAL PRIMARY KEY,
  user_id INTEGER,
  title VARCHAR(255),
  destination VARCHAR(255),
  route GEOMETRY(LineString, 4326),
  waypoints GEOMETRY(MultiPoint, 4326),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Spatial index
CREATE INDEX trips_route_gix ON trips USING GIST (route);
```

## 🎨 Customization

### Styling
Customize the design by editing:
- `tailwind.config.ts` - Theme colors, spacing, fonts
- `assets/css/tailwind.css` - Global styles
- Component styles using Tailwind classes

### AI Prompts
Modify the system prompts in `server/utils/ai.ts` to change how itineraries are generated.

### Budget Calculations
Adjust cost estimation logic in `composables/useAI.ts`

## 📦 Building for Production

```bash
# Build the application
npm run build

# Preview production build
npm run preview

# Generate static site (if applicable)
npm run generate
```

## 🚢 Deployment

### Vercel
```bash
npm i -g vercel
vercel
```

### Netlify
```bash
npm i -g netlify-cli
netlify deploy
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["node", ".output/server/index.mjs"]
```

### Environment Setup
Remember to set environment variables in your deployment platform:
- Vercel: Project Settings → Environment Variables
- Netlify: Site Settings → Environment Variables
- Docker: Use `.env` file or Docker secrets

## 🧪 Testing

```bash
# Run unit tests
npm run test

# Run e2e tests
npm run test:e2e

# Check types
npm run typecheck

# Lint code
npm run lint
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct.

## 📝 API Documentation

### Generate Itinerary
```http
POST /api/generate
Content-Type: application/json

{
  "description": "5 days in Japan under RM3000, I love nature and food"
}
```

**Response:**
```json
{
  "destination": "Japan",
  "duration": "5 days",
  "budget": "RM3000",
  "days": [...],
  "budgetBreakdown": {...},
  "recommendations": {...}
}
```

### Save Trip
```http
POST /api/trips
Content-Type: application/json

{
  "itinerary": {...},
  "userId": "user123"
}
```

### Get Saved Trips
```http
GET /api/trips?userId=user123
```

## 🔐 Security

- Never commit `.env` files
- Use environment variables for all sensitive data
- Implement rate limiting on AI endpoints
- Sanitize user inputs
- Use HTTPS in production
- Implement proper authentication/authorization

## 🐛 Known Issues

- Map rendering may be slow with large route datasets
- PDF export for very long itineraries may timeout
- Some currency conversions may not be real-time

See [Issues](https://github.com/yourusername/ai-trip-planner/issues) for a full list.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- OpenAI for GPT models
- Anthropic for Claude AI
- shadcn-vue for beautiful components
- Nuxt team for the amazing framework
- PostGIS community for geospatial tools

---

Made with ❤️ and ☕ by developers who love to travel
