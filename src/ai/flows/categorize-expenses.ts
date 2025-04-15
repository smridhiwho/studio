'use server';
/**
 * @fileOverview Categorizes expenses based on extracted line items.
 *
 * - categorizeExpenses - A function that categorizes expenses.
 * - CategorizeExpensesInput - The input type for the categorizeExpenses function.
 * - CategorizeExpensesOutput - The return type for the categorizeExpenses function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const CategorizeExpensesInputSchema = z.object({
  lineItems: z.array(
    z.object({
      description: z.string().describe('Description of the line item.'),
      amount: z.number().describe('Amount of the line item.'),
    })
  ).describe('Array of line items to categorize.'),
});
export type CategorizeExpensesInput = z.infer<typeof CategorizeExpensesInputSchema>;

const CategorizeExpensesOutputSchema = z.object({
  categorizedExpenses: z.array(
    z.object({
      description: z.string().describe('Description of the line item.'),
      amount: z.number().describe('Amount of the line item.'),
      category: z.string().describe('Category of the expense.'),
    })
  ).describe('Array of categorized expenses.'),
});
export type CategorizeExpensesOutput = z.infer<typeof CategorizeExpensesOutputSchema>;

export async function categorizeExpenses(input: CategorizeExpensesInput): Promise<CategorizeExpensesOutput> {
  return categorizeExpensesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'categorizeExpensesPrompt',
  input: {
    schema: z.object({
      lineItems: z.array(
        z.object({
          description: z.string().describe('Description of the line item.'),
          amount: z.number().describe('Amount of the line item.'),
        })
      ).describe('Array of line items to categorize.'),
    }),
  },
  output: {
    schema: z.object({
      categorizedExpenses: z.array(
        z.object({
          description: z.string().describe('Description of the line item.'),
          amount: z.number().describe('Amount of the line item.'),
          category: z.string().describe('Category of the expense.'),
        })
      ).describe('Array of categorized expenses.'),
    }),
  },
  prompt: `You are an expert expense categorizer. Given a list of line items, categorize each item into one of the following categories: food, travel, utilities, entertainment, miscellaneous. Respond with a JSON array of objects, where each object contains the original description, amount, and the assigned category.\n\nLine Items:\n{{#each lineItems}}
- Description: {{{description}}}, Amount: {{{amount}}}\n{{/each}}`,
});

const categorizeExpensesFlow = ai.defineFlow<
  typeof CategorizeExpensesInputSchema,
  typeof CategorizeExpensesOutputSchema
>(
  {
    name: 'categorizeExpensesFlow',
    inputSchema: CategorizeExpensesInputSchema,
    outputSchema: CategorizeExpensesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
