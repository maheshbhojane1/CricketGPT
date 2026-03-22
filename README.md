# CricketGPT — IPL Analyst Chatbot 🏏

## Live Demo
[https://your-vercel-url.vercel.app](https://cricket-gpt-indol.vercel.app/)

## What it does
A purpose-built IPL chatbot powered by OpenRouter (NVIDIA Nemotron model).
Knows team histories, player stats, season records, and auction strategies.

## Why Cricket / IPL
IPL is India's biggest sporting event — rich domain knowledge, 
passionate users, and lots of interesting UI design decisions.

## Stack
- React + Vite
- Pure CSS (no Tailwind or component libraries)
- OpenRouter API — NVIDIA Nemotron 3 Super 120B (free tier)
- Deployed on Vercel

## Why OpenRouter instead of OpenAI or Gemini
- OpenAI requires a paid plan — no free tier for GPT-4
- Gemini free tier hits rate limits (429) very quickly
- OpenRouter gives access to powerful free models with the 
  same API interface as OpenAI — just swap the URL and model name

## Design decisions
- Dark navy theme reflects cricket's night match culture
- Orange accent matches IPL's brand color
- Team pills have actual team colors (MI blue, CSK yellow, RCB red)
- Suggested questions solve the blank slate UX problem
- Typing indicator says "Analysing squad data" not just three dots
- Error messages use cricket metaphors for personality
- Messages animate in with fade + slide up
