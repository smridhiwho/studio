'use server';

/**
 * @fileOverview Analyzes spending patterns and suggests areas for overspending reduction.
 *
 * - suggestOverspending - A function that suggests areas for overspending reduction.
 * - SuggestOverspendingInput - The input type for the suggestOverspending function.
 * - SuggestOverspendingOutput - The return type for the suggestOverspending function.
 */

import { ai } from '@/ai/ai-instance';
import { z } from 'genkit';

const SuggestOverspendingInputSchema = z.object({
  weeklySummary: z.string().describe('A summary of weekly expenses.'),
  monthlySummary: z.string().describe('A summary of monthly expenses.'),
  expenseCategories: z
    .array(z.string())
    .describe('An array of expense categories.'),
});
export type SuggestOverspendingInput = z.infer<
  typeof SuggestOverspendingInputSchema
>;

const SuggestOverspendingOutputSchema = z.object({
  overspendingSuggestions: z
    .array(z.string())
    .describe(
      'Suggestions for areas where the user might be overspending, with explanations.'
    ),
});
export type SuggestOverspendingOutput = z.infer<
  typeof SuggestOverspendingOutputSchema
>;

export async function suggestOverspending(
  input: SuggestOverspendingInput
): Promise<SuggestOverspendingOutput> {
  return suggestOverspendingFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestOverspendingPrompt',
  input: {
    schema: z.object({
      weeklySummary: z.string().describe('A summary of weekly expenses.'),
      monthlySummary: z.string().describe('A summary of monthly expenses.'),
      expenseCategories: z
        .array(z.string())
        .describe('An array of expense categories.'),
    }),
  },
  output: {
    schema: z.object({
      overspendingSuggestions: z
        .array(z.string())
        .describe(
          'Suggestions for areas where the user might be overspending, with explanations.'
        ),
    }),
  },
  prompt: `Given the following weekly and monthly expense summaries, and a list of expense categories, analyze spending patterns and suggest areas where the user might be overspending. Provide clear explanations for each suggestion.

Weekly Summary:
{{weeklySummary}}

Monthly Summary:
{{monthlySummary}}

Expense Categories:
{{#each expenseCategories}}- {{{this}}}
{{/each}}
`,
});

const suggestOverspendingFlow = ai.defineFlow<
  typeof SuggestOverspendingInputSchema,
  typeof SuggestOverspendingOutputSchema
>(
  {
    name: 'suggestOverspendingFlow',
    inputSchema: SuggestOverspendingInputSchema,
    outputSchema: SuggestOverspendingOutputSchema,
  },
  async input => {
    const { output } = await prompt(input);
    return output!;
  }
);
