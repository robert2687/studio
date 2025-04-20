'use client'
 
 import React, { useState, useEffect } from 'react';
 import { Input } from '@/components/ui/input';
 import { Button } from '@/components/ui/button';
 import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
-import {
-    DropdownMenu,
-    DropdownMenuContent,
-    DropdownMenuTrigger,
-} from "@/components/ui/dropdown-menu"
 import { ExternalLink } from 'lucide-react';
 import { ScrollArea } from "@/components/ui/scroll-area";
 import { useToast } from "@/hooks/use-toast"
+import {
+    DropdownMenu,
+    DropdownMenuContent,
+    DropdownMenuTrigger,
+} from "@/components/ui/dropdown-menu"
 import { useTheme } from 'next-themes';
 
 interface RareCosmetic {
