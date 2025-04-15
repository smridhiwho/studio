
'use client';

import {ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent} from '@/components/ui/chart';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import React from 'react';
import {Area, AreaChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis} from 'recharts';

const SpendingSummary: React.FC = () => {
  const data = [
    {name: 'Week 1', food: 400, travel: 200, utilities: 100},
    {name: 'Week 2', food: 300, travel: 300, utilities: 150},
    {name: 'Week 3', food: 200, travel: 400, utilities: 200},
    {name: 'Week 4', food: 278, travel: 300, utilities: 100},
  ];

  const chartConfig = {
    food: {
      label: 'Food',
      color: 'hsl(var(--chart-1))',
    },
    travel: {
      label: 'Travel',
      color: 'hsl(var(--chart-2))',
    },
    utilities: {
      label: 'Utilities',
      color: 'hsl(var(--chart-3))',
    },
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Spending Summary</CardTitle>
        <CardDescription>Weekly and monthly summaries of expenses.</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={data} margin={{top: 10, right: 30, left: 0, bottom: 0}}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Area type="monotone" dataKey="food" stroke={chartConfig.food.color} fill={chartConfig.food.color} />
              <Area type="monotone" dataKey="travel" stroke={chartConfig.travel.color} fill={chartConfig.travel.color} />
              <Area type="monotone" dataKey="utilities" stroke={chartConfig.utilities.color} fill={chartConfig.utilities.color} />
            </AreaChart>
          </ResponsiveContainer>
          <ChartLegend content={<ChartLegendContent />} />
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default SpendingSummary;
