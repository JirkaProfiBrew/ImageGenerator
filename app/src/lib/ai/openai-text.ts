import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export interface ContextTemplate {
  id: string;
  name: string;
  description: string;
  systemPrompt: string;
}

export const CONTEXT_TEMPLATES: ContextTemplate[] = [
  {
    id: "product_category",
    name: "Product Category Description",
    description:
      'Define visual guidelines for a product category (e.g., "healthy food", "luxury watches")',
    systemPrompt: `You are a professional content writer creating detailed visual guidelines for AI image generation.

Create a comprehensive description of the provided product category including:

1. Visual Characteristics
   - Key visual elements and features
   - Quality indicators to look for
   - Common attributes and styling

2. Composition Guidelines
   - Preferred angles and perspectives
   - Lighting recommendations
   - Background and context suggestions

3. Color and Mood
   - Color palette preferences
   - Atmosphere and emotional tone
   - Seasonal or contextual considerations

4. What to Avoid
   - Common mistakes or pitfalls
   - Elements that detract from quality
   - Style mismatches

Format as clear, structured markdown suitable for AI image generation context.
Be specific and detailed. Use 500-800 words.`,
  },
  {
    id: "brand_guidelines",
    name: "Brand Visual Guidelines",
    description: "Create brand voice, values, and visual style guidelines",
    systemPrompt: `You are a brand strategist creating comprehensive brand guidelines for AI image generation.

Create detailed brand guidelines including:

1. Brand Voice and Tone
   - Communication style
   - Key personality traits
   - Language preferences

2. Visual Style Preferences
   - Overall aesthetic direction
   - Preferred visual treatments
   - Signature elements

3. Color Palette Philosophy
   - Primary and secondary colors
   - Color psychology and meaning
   - Usage guidelines

4. Key Values and Messaging
   - Core brand values
   - Key messages to communicate
   - Emotional positioning

5. Typography and Design Principles
   - Font personality
   - Layout preferences
   - Design system basics

6. Do's and Don'ts
   - What represents the brand well
   - What to avoid

Format as structured markdown suitable for AI image generation context.
Be specific and detailed. Use 500-800 words.`,
  },
  {
    id: "style_guide",
    name: "Visual Style Guide",
    description:
      'Define aesthetic, mood, and visual direction (e.g., "minimalist", "vintage film")',
    systemPrompt: `You are a visual director creating a comprehensive style guide for AI image generation.

Create a detailed visual style guide including:

1. Color Palette and Mood
   - Dominant colors and tones
   - Emotional atmosphere
   - Color relationships

2. Lighting and Atmosphere
   - Lighting quality and direction
   - Time of day preferences
   - Atmospheric effects

3. Composition Principles
   - Layout and framing guidelines
   - Balance and negative space
   - Focal point strategies

4. Textures and Materials
   - Surface qualities
   - Material preferences
   - Tactile considerations

5. Common Motifs and Elements
   - Recurring visual themes
   - Signature elements
   - Pattern preferences

6. Reference Inspirations
   - Historical or cultural references
   - Artistic movements
   - Contemporary influences

Format as structured markdown suitable for AI image generation context.
Be specific and detailed. Use 500-800 words.`,
  },
  {
    id: "custom",
    name: "Custom Prompt",
    description: "Write your own instructions for the AI",
    systemPrompt: `You are a professional content writer creating detailed context for AI image generation.

The user will provide their own instructions. Follow them carefully and create comprehensive, well-structured content suitable for guiding AI image generation.

Format as clear markdown. Use 500-800 words. Be specific and detailed.`,
  },
];

export interface GenerateContextOptions {
  template: string;
  userPrompt: string;
  maxTokens?: number;
}

export interface GenerateContextResult {
  success: boolean;
  generatedText?: string;
  tokensUsed?: number;
  error?: string;
}

export async function generateContext(
  options: GenerateContextOptions
): Promise<GenerateContextResult> {
  try {
    const template = CONTEXT_TEMPLATES.find((t) => t.id === options.template);

    if (!template) {
      return { success: false, error: "Invalid template" };
    }

    console.log(
      "[GPT-4o-mini] Generating context with template:",
      template.name
    );

    const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [
      { role: "system", content: template.systemPrompt },
      { role: "user", content: options.userPrompt },
    ];

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages,
      max_tokens: options.maxTokens || 1500,
      temperature: 0.7,
      top_p: 0.9,
    });

    const generatedText = completion.choices[0]?.message?.content;
    const tokensUsed = completion.usage?.total_tokens || 0;

    if (!generatedText) {
      return { success: false, error: "No text generated" };
    }

    console.log("[GPT-4o-mini] Generation successful, tokens:", tokensUsed);

    return { success: true, generatedText, tokensUsed };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Generation failed";
    console.error("[GPT-4o-mini] Error:", message);
    return { success: false, error: message };
  }
}
