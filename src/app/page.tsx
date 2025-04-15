
import DataUpload from '@/components/DataUpload';
import OverspendingSuggestions from '@/components/OverspendingSuggestions';
import SpendingSummary from '@/components/SpendingSummary';
import {Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarSeparator, SidebarTrigger} from '@/components/ui/sidebar';
import {Toaster} from '@/components/ui/toaster';
import {Home, Upload, Lightbulb, ListChecks} from 'lucide-react';
import React from 'react';

const expenseCategories = ['Food', 'Travel', 'Utilities', 'Entertainment', 'Miscellaneous'];

export default function MainPage() {
  return (
    <SidebarProvider>
      <div className="md:pl-64">
        <Sidebar className="md:fixed md:inset-y-0 md:left-0 md:z-50 md:w-64">
          <SidebarHeader>
            <h1 className="text-2xl font-bold">ExpenseAI</h1>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="#">
                    <Home className="mr-2 h-4 w-4" />
                    <span>Home</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="#">
                    <Upload className="mr-2 h-4 w-4" />
                    <span>Data Upload</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="#">
                    <ListChecks className="mr-2 h-4 w-4" />
                    <span>Spending Summary</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="#">
                    <Lightbulb className="mr-2 h-4 w-4" />
                    <span>Overspending Suggestions</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
            <SidebarSeparator />
            <SidebarFooter>
              <p className="text-xs text-muted-foreground">
                Created by Firebase Studio
              </p>
            </SidebarFooter>
          </SidebarContent>
        </Sidebar>
        <div className="p-4 md:ml-64">
          <DataUpload />
          <SpendingSummary />
          <OverspendingSuggestions expenseCategories={expenseCategories} />
        </div>
      </div>
      <Toaster />
    </SidebarProvider>
  );
}

