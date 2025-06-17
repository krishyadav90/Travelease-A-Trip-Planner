import express from 'express';
import cors from 'cors';
import { createClient } from '@supabase/supabase-js';
import 'dotenv/config';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

app.post('/api/chat', async (req, res) => {
  const { message } = req.body;

  const { data, error } = await supabase
    .from('destinations') // 👈 change to your table name
    .select('*')
    .limit(10);

  if (error) return res.status(500).json({ error: error.message });

  const ollamaResponse = await fetch('http://localhost:11434/api/generate', {
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
