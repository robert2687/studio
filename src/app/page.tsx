'use client'

import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getProductPrices, ProductPrice } from '@/services/price-aggregation';
import { analyzeProductDescription, AnalyzeProductDescriptionOutput } from '@/ai/flows/analyze-product-description';
import { Badge } from '@/components/ui/badge';
import { ExternalLink } from 'lucide-react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast"
+import { useTheme } from 'next-themes';
+import {
+    DropdownMenu,
+    DropdownMenuContent,
+    DropdownMenuItem,
+    DropdownMenuTrigger,
+} from "@/components/ui/dropdown-menu"
 

interface RareCosmetic {
   name: string;
   description: string;
   imageUrl: string;
 }
+const images = [
+    'https://images.unsplash.com/photo-1519638394554-4e397adda670?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGNvc21ldGljc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
+    'https://images.unsplash.com/photo-1606939448523-613411294e48?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGNvc21ldGljc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
+    'https://images.unsplash.com/photo-1614635767994-95780c2105ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjJ8fGNvc21ldGljc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
+    'https://images.unsplash.com/photo-1584477635735-9c9305cd544b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzB8fGNvc21ldGljc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
+    'https://images.unsplash.com/photo-1591672354798-93c2838b6943?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzJ8fGNvc21ldGljc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
+    'https://images.unsplash.com/photo-1584477568564-c4ca5aefe58a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzl8fGNvc21ldGljc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
+    'https://images.unsplash.com/photo-1591672299082-e95b19314315?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDF8fGNvc21ldGljc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
+    'https://images.unsplash.com/photo-1584477566270-942041551569?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDR8fGNvc21ldGljc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
+    'https://images.unsplash.com/photo-1575412677514-3b5f4a961c64?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDh8fGNvc21ldGljc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
+    'https://images.unsplash.com/photo-1571102243474-1974cbbe0547?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTB8fGNvc21ldGljc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60'
+];
 

 interface Product {
   name: string;
@@ -114,6 +115,7 @@
     }
   ]);
   const [instructionsVisible, setInstructionsVisible] = useState(true);
+    const { theme, setTheme } = useTheme();
   const toggleInstructions = () => {
     setInstructionsVisible(!instructionsVisible);
   };
@@ -150,6 +152,8 @@
 
   return (
     <div className="container mx-auto p-4">
+        
+
        <Card className="max-w-4xl mx-auto mb-8">
         <CardHeader>
           <CardTitle>How to Use Global Glam Finder</CardTitle>
@@ -157,9 +161,9 @@
         </CardHeader>
         <CardContent>
           <ol className="list-decimal pl-5">
-            <li>
+            <li >
               <strong>Enter Product Name:</strong> Type the name of the cosmetic product
-              you're looking for in the "Product Name" input box.
+              you&apos;re looking for in the "Product Name" input box.
             </li>
             <li>
               <strong>Add Product Description (optional):</strong> Provide a description
@@ -178,16 +182,29 @@
           </ol>
         </CardContent>
       </Card>
+       <DropdownMenu>
+                <DropdownMenuTrigger asChild>
+                    <Button variant="outline" size="icon">
+                        <svg
+                            xmlns="http://www.w3.org/2000/svg"
+                            width="24"
+                            height="24"
+                            viewBox="0 0 24 24"
+                            fill="none"
+                            stroke="currentColor"
+                            strokeWidth="2"
+                            strokeLinecap="round"
+                            strokeLinejoin="round"
+                            className="h-4 w-4"
+                        >
+                            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
+                        </svg>
+                    </Button>
+                </DropdownMenuTrigger>
+                <DropdownMenuContent align="end" forceMount>
+                    <DropdownMenuItem onClick={() => setTheme("light")}>Light</DropdownMenuItem>
+                    <DropdownMenuItem onClick={() => setTheme("dark")}>Dark</DropdownMenuItem>
 

       <Card className="max-w-4xl mx-auto">
         <CardHeader>
@@ -270,18 +287,20 @@
         </Card>
 
          <Card className="max-w-4xl mx-auto mt-8">
-        <CardHeader>
-          <CardTitle>Sample Products</CardTitle>
-          <CardDescription>Explore a few sample cosmetic products.</CardDescription>
-        </CardHeader>
-        <CardContent>
-          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
-            {sampleProducts.map((product, index) => (
-              <div key={index} className="border rounded-md p-4">
-                <h3 className="text-lg font-semibold">{product.name}</h3>
-                <p className="text-sm text-muted-foreground">{product.brand} - {product.category}</p>
-                <p className="text-sm">{product.description}</p>
-                {/* Add more details as needed */}
+

           <CardHeader>
-          <CardTitle>Sample Products</CardTitle>
           <CardDescription>Explore a few sample cosmetic products.</CardDescription>
         </CardHeader>
         <CardContent>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
             {sampleProducts.map((product, index) => (
               <div key={index} className="border rounded-md p-4">
+            <img
+                src={images[index % images.length]}
+                alt={`Cosmetic ${index + 1}`}
+                className="w-full h-32 object-cover mb-2 rounded"
+            />
                 <h3 className="text-lg font-semibold">{product.name}</h3>
                 <p className="text-sm text-muted-foreground">{product.brand} - {product.category}</p>
                 <p className="text-sm">{product.description}</p>
@@ -309,3 +328,4 @@
       );
 }
 

+