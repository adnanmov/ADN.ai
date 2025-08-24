# ADN.ai Chatbot

A modern AI chatbot built with React, TypeScript, and Tailwind CSS, powered by OpenRouter API.

## Features

- 💬 Text conversations with AI
- 🖼️ Image analysis (upload or URL)
- 🔍 Web search capabilities
- ✨ Beautiful animated UI
- 📱 Responsive design

## Deployment to Vercel

### 1. Fork this repository to your GitHub account

### 2. Connect to Vercel
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import your forked GitHub repository

### 3. Configure Environment Variables
In Vercel's project settings, add these environment variables:

```
VITE_OPENROUTER_API_KEY=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
VITE_GROQ_API_KEY=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
```

**IMPORTANT**: You need to add this environment variable in Vercel:
1. Go to your Vercel project dashboard
2. Click on "Settings" tab
3. Click on "Environment Variables" in the sidebar
4. Add these environment variables:

   **First variable:**
   - Name: `VITE_OPENROUTER_API_KEY`
   - Value: `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`
   - Environment: Production (and Preview if you want)
   
   **Second variable:**
   - Name: `VITE_GROQ_API_KEY`
   - Value: `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`
   - Environment: Production (and Preview if you want)

5. Click "Save" for each variable
6. Redeploy your application

### 4. Deploy
Click "Deploy" and Vercel will automatically build and deploy your chatbot!

## Local Development

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file with your API key:
   ```
   VITE_OPENROUTER_API_KEY=your_api_key_here
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## Environment Variables

- `VITE_OPENROUTER_API_KEY` - Your OpenRouter API key (required)
- `VITE_GROQ_API_KEY` - Your Groq API key (required)

## Tech Stack

- React 18
- TypeScript
- Tailwind CSS
- Vite
- OpenRouter API
- Lucide React Icons

## Created by

[@adnan.MOV](https://instagram.com/adnan.mov)