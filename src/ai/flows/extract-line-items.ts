'use server';
/**
 * @fileOverview Extracts line items from uploaded documents.
 *
 * - extractLineItems - A function that handles the line item extraction process.
 * - ExtractLineItemsInput - The input type for the extractLineItems function.
 * - ExtractLineItemsOutput - The return type for the extractLineItems function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const ExtractLineItemsInputSchema = z.object({
  documentUrl: z.string().describe('The URL of the document (PDF or image) to extract line items from.'),
});
export type ExtractLineItemsInput = z.infer<typeof ExtractLineItemsInputSchema>;

const ExtractLineItemsOutputSchema = z.object({
  lineItems: z.array(
    z.object({
      description: z.string().describe('Description of the item.'),
      amount: z.number().describe('Amount of the item.'),
    })
  ).describe('Extracted line items from the document.'),
});
export type ExtractLineItemsOutput = z.infer<typeof ExtractLineItemsOutputSchema>;

export async function extractLineItems(input: ExtractLineItemsInput): Promise<ExtractLineItemsOutput> {
  return extractLineItemsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'extractLineItemsPrompt',
  input: {
    schema: z.object({
      documentUrl: z.string().describe('The URL of the document to extract line items from.'),
    }),
  },
  output: {
    schema: z.object({
      lineItems: z.array(
        z.object({
          description: z.string().describe('Description of the item.'),
          amount: z.number().describe('Amount of the item.'),
        })
      ).describe('Extracted line items from the document.'),
    }),
  },
  prompt: `You are an expert in extracting line items from documents like receipts and bills.

  Analyze the document provided via URL and extract all the line items, including their descriptions and amounts.
  Return the data in JSON format.

  Document URL: {{media url=documentUrl}}
  `, // Using media tag so the LLM can see the doc.
});

const extractLineItemsFlow = ai.defineFlow<
  typeof ExtractLineItemsInputSchema,
  typeof ExtractLineItemsOutputSchema
>(
  {
    name: 'extractLineItemsFlow',
    inputSchema: ExtractLineItemsInputSchema,
    outputSchema: ExtractLineItemsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
