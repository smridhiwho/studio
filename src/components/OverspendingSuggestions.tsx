
'use client';

import {suggestOverspending} from '@/ai/flows/suggest-overspending';
import {Button} from '@/components/ui/button';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {useToast} from '@/hooks/use-toast';
import {Lightbulb} from 'lucide-react';
import React, {useState} from 'react';

interface OverspendingSuggestionsProps {
  expenseCategories: string[];
}

const OverspendingSuggestions: React.FC<OverspendingSuggestionsProps> = ({expenseCategories}) => {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const {toast} = useToast();

  const handleGetSuggestions = async () => {
    setIsLoading(true);
    try {
      const weeklySummary = 'This week, you spent $200 on food, $50 on travel, and $30 on utilities.';
      const monthlySummary = 'This month, you spent $800 on food, $200 on travel, and $120 on utilities.';

      const result = await suggestOverspending({
        weeklySummary,
        monthlySummary,
        expenseCategories,
      });

      setSuggestions(result.overspendingSuggestions);
      toast({
        title: 'Suggestions Generated',
        description: 'Overspending suggestions have been generated.',
      });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to generate overspending suggestions.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Overspending Suggestions</CardTitle>
        <CardDescription>Analyze spending patterns to identify areas where overspending occurs.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col space-y-4">
        <Button onClick={handleGetSuggestions} disabled={isLoading}>
          {isLoading ? (
            <>
              <Lightbulb className="mr-2 h-4 w-4 animate-spin" />
              <span>Loading...</span>
            </>
          ) : (
            <>
              <Lightbulb className="mr-2 h-4 w-4" />
              <span>Get Suggestions</span>
            </>
          )}
        </Button>
        {suggestions.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold">Suggestions:</h3>
            <ul className="list-disc pl-5">
              {suggestions.map((suggestion, index) => (
                <li key={index}>{suggestion}</li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default OverspendingSuggestions;
