'use server';
/**
 * @fileOverview Analyzes a product description to identify key ingredients and qualities using an enhanced AI model.
 *
 * - analyzeProductDescription - A function that analyzes the product description.
 * - AnalyzeProductDescriptionInput - The input type for the analyzeProductDescription function.
 * - AnalyzeProductDescriptionOutput - The return type for the analyzeProductDescription function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const AnalyzeProductDescriptionInputSchema = z.object({
  productDescription: z.string().describe('The detailed description of the cosmetic product for AI analysis.'),
});
export type AnalyzeProductDescriptionInput = z.infer<typeof AnalyzeProductDescriptionInputSchema>;

const AnalyzeProductDescriptionOutputSchema = z.object({
  keyIngredients: z.array(z.string()).describe('A comprehensive list of key ingredients identified in the product description, with detailed information about their benefits.'),
  qualities: z.array(z.string()).describe('An extensive list of qualities or benefits described in the product description, including specific effects on the skin or hair.'),
  suggestedProducts: z.array(z.string()).describe('A list of similar products based on the identified ingredients and qualities, providing alternatives or complementary options.'),
});
export type AnalyzeProductDescriptionOutput = z.infer<typeof AnalyzeProductDescriptionOutputSchema>;

export async function analyzeProductDescription(input: AnalyzeProductDescriptionInput): Promise<AnalyzeProductDescriptionOutput> {
  return analyzeProductDescriptionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeProductDescriptionPrompt',
  input: {
    schema: z.object({
      productDescription: z.string().describe('The detailed description of the cosmetic product.'),
    }),
  },
  output: {
    schema: z.object({
      keyIngredients: z.array(z.string()).describe('A comprehensive list of key ingredients and their benefits.'),
      qualities: z.array(z.string()).describe('An extensive list of qualities or benefits, including specific effects.'),
      suggestedProducts: z.array(z.string()).describe('A list of similar and complementary products.'),
    }),
  },
  prompt: `You are an expert cosmetic product analyst with deep knowledge of ingredients, qualities, and market alternatives. Analyze the following product description to extract key ingredients, benefits, and suggest similar products.

Product Description: {{{productDescription}}}

Provide a detailed analysis, focusing on:
- Listing all key ingredients with a brief explanation of their benefits.
- Describing all the qualities and benefits of the product, specifying effects on skin or hair.
- Suggesting similar or complementary products that the user might find useful.

Analysis:
Key Ingredients:
Qualities:
Suggested Products:`,
});

const analyzeProductDescriptionFlow = ai.defineFlow<
  typeof AnalyzeProductDescriptionInputSchema,
  typeof AnalyzeProductDescriptionOutputSchema
>(
  {
    name: 'analyzeProductDescriptionFlow',
    inputSchema: AnalyzeProductDescriptionInputSchema,
    outputSchema: AnalyzeProductDescriptionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
