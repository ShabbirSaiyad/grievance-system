const OpenAI = require('openai');

let openai = null;
if (process.env.OPENAI_API_KEY) {
  openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
}

// Simple keyword-based category detection
function detectCategory(description = '') {
  const text = description.toLowerCase();

  if (text.includes('water') || text.includes('pipeline') || text.includes('sewage')) {
    return 'Water Department';
  }
  if (text.includes('electric') || text.includes('power') || text.includes('electricity')) {
    return 'Electricity Department';
  }
  if (text.includes('road') || text.includes('pothole') || text.includes('street')) {
    return 'Roads and Transport';
  }
  if (text.includes('garbage') || text.includes('waste') || text.includes('sanitation')) {
    return 'Sanitation';
  }
  return 'General';
}

// Priority detection
function detectPriority(description = '') {
  const text = description.toLowerCase();

  if (
    text.includes('urgent') ||
    text.includes('immediately') ||
    text.includes('danger') ||
    text.includes('accident') ||
    text.includes('life threatening')
  ) {
    return 'High';
  }

  if (
    text.includes('pending for months') ||
    text.includes('long pending') ||
    text.includes('delayed') ||
    text.includes('several weeks')
  ) {
    return 'Medium';
  }

  return 'Low';
}

// Optional: OpenAI-based classification and summary
async function openAIClassifyAndSummarize(description) {
  if (!openai) {
    return {
      aiCategory: null,
      aiPriority: null,
      summary: null
    };
  }

  try {
    const prompt = `
You are a classifier for public grievances. 

1. Classify the department (one of: Water Department, Electricity Department, Roads and Transport, Sanitation, General).
2. Classify priority (High, Medium, Low).
3. Provide a short 1-2 line summary.

Return JSON like:
{"category": "...", "priority": "...", "summary": "..."}

Complaint:
${description}
`;

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.2
    });

    const raw = response.choices[0].message.content.trim();
    let parsed = null;

    try {
      parsed = JSON.parse(raw);
    } catch {
      parsed = null;
    }

    return {
      aiCategory: parsed?.category || null,
      aiPriority: parsed?.priority || null,
      summary: parsed?.summary || null
    };
  } catch (err) {
    console.error('OpenAI classification error:', err.message);
    return {
      aiCategory: null,
      aiPriority: null,
      summary: null
    };
  }
}

module.exports = {
  detectCategory,
  detectPriority,
  openAIClassifyAndSummarize
};

