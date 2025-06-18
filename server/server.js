import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { createClient } from '@supabase/supabase-js';
import 'dotenv/config';

// Needed for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Serve static frontend files from the "build" folder
app.use(express.static(path.join(__dirname, 'build')));

// Supabase client setup
const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_PUBLISHABLE_KEY
);

// API route

// Root route for backend verification
app.get('/', (req, res) => {
  res.send('✅ Backend is working');
});


app.post('/api/chat', async (req, res) => {
  const { message } = req.body;

  const { data, error } = await supabase
    .from('destinations')
    .select('*')
    .limit(10);

  if (error) return res.status(500).json({ error: error.message });

  const ollamaResponse = await fetch(`${process.env.BACKEND_URL}/api/generate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'maya',
      prompt: `
You are Maya, the AI trip planner.
Supabase data: ${JSON.stringify(data)}
User asked: ${message}
Give a helpful and engaging answer.
`,
      stream: false
    })
  });

  const result = await ollamaResponse.json();
  res.json({ answer: result.response });
});



app.listen(PORT, () => {
  console.log(`✅ Server listening on http://localhost:${PORT}`);
});
