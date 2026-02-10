import { NextRequest, NextResponse } from 'next/server';

const FORMAT_PROMPT = `You are a document formatter. Format the following text for a rich-text editor.

Rules:
- Use clear structure: add headings (h1, h2, h3) where appropriate for sections.
- Use bullet lists (<ul><li>...</li></ul>) for items or key points.
- Use numbered lists (<ol><li>...</li></ol>) for steps or ordered items.
- Use <strong> for important terms and <em> for emphasis where it helps readability.
- Wrap paragraphs in <p>...</p>. Use <br/> for line breaks inside a paragraph.
- Return ONLY valid HTML. No markdown, no code fences, no explanation. Output must be HTML that can be pasted into an editor (tags: p, br, strong, em, ul, ol, li, h1, h2, h3).`;

export async function POST(request: NextRequest) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'Gemini API key not configured. Set GEMINI_API_KEY in .env.local.' },
        { status: 500 }
      );
    }

    const body = await request.json();
    const content = typeof body?.content === 'string' ? body.content.trim() : '';
    if (!content) {
      return NextResponse.json(
        { error: 'Request body must include { "content": "text to format" }.' },
        { status: 400 }
      );
    }

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent`;
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': apiKey,
      },
      body: JSON.stringify({
        contents: [
          {
            role: 'user',
            parts: [{ text: `${FORMAT_PROMPT}\n\n---\n\n${content}` }],
          },
        ],
        generationConfig: {
          temperature: 0.4,
          maxOutputTokens: 8192,
        },
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error('Gemini API error:', res.status, err);
      return NextResponse.json(
        { error: 'Formatting request failed.', details: err },
        { status: 502 }
      );
    }

    const data = await res.json();
    const text =
      data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ?? '';
    if (!text) {
      return NextResponse.json(
        { error: 'No formatted content in response.' },
        { status: 502 }
      );
    }

    // Strip markdown code blocks if Gemini wrapped the HTML
    let formatted = text;
    if (formatted.startsWith('```')) {
      formatted = formatted.replace(/^```(?:html)?\s*\n?/, '').replace(/\n?```\s*$/, '');
    }

    return NextResponse.json({ formatted });
  } catch (e) {
    console.error('Format API error:', e);
    return NextResponse.json(
      { error: e instanceof Error ? e.message : 'Format request failed.' },
      { status: 500 }
    );
  }
}
