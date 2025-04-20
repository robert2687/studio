'use client'

import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ExternalLink } from 'lucide-react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast"
import { useTheme } from 'next-themes';

interface RareCosmetic {
  name: string;
  brand: string;
  category: string;
  subcategory: string;
  description: string;
  ingredients: string[];
  variants?: { shadeName: string; shadeCode: string }[];
  averagePrice: number;
  eanUpc: string;
  imageUrls: string[];
  userRatings?: { average: number; count: number };
  sellerLinks: { sellerName: string; url: string }[];
}

const API_URL = process.env.API_URL; // Access API URL from environment variables

async function analyzeProductDescription(productDescription: { productDescription: string }) {
  try {
    const response = await fetch("/api/analyze", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productDescription),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to analyze product description:", error);
    throw error;
  }
}

export default function Home() {
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [prices, setPrices] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const { toast } = useToast()
    const [sampleProducts, setSampleProducts] = useState([
         {
             name: "Chanel No. 5 Parfum Grand Extrait",
             brand: "Chanel",
             category: "fragrance",
             description: "An exquisite, limited-edition presentation of the iconic Chanel No. 5 fragrance.",
             ingredients: [],
             variants: [],
             averagePrice: 4200.00,
             eanUpc: "3145891201004",
             imageUrls: [],
             userRatings: { average: 0, count: 0 },
             sellerLinks: []
         },
         {
             name: "Guerlain KissKiss Gold and Diamonds Lipstick",
             brand: "Guerlain",
             category: "makeup",
             description: "A luxurious lipstick encased in 18-carat gold and adorned with diamonds.",
             ingredients: [],
             variants: [],
             averagePrice: 62000.00,
             eanUpc: "3346470640794",
             imageUrls: [],
             userRatings: { average: 0, count: 0 },
             sellerLinks: []
         },
         {
             name: "H.R.H. Princess Diana Sapphire Perfume",
             brand: "Thameen",
             category: "fragrance",
             description: "A rare perfume dedicated to Princess Diana, featuring a sapphire-encrusted bottle.",
             ingredients: [],
             variants: [],
             averagePrice: 5000.00,
             eanUpc: "5060446450019",
             imageUrls: [],
             userRatings: { average: 0, count: 0 },
             sellerLinks: []
         },
         {
             name: "Shiseido Eudermine Revitalizing Essence (1897)",
             brand: "Shiseido",
             category: "skincare",
             description: "A replica of the original Eudermine, Shiseido's oldest product, in a vintage bottle.",
             ingredients: [],
             variants: [],
             averagePrice: 180.00,
             eanUpc: "0730852142438",
             imageUrls: [],
             userRatings: { average: 0, count: 0 },
             sellerLinks: []
         },
         {
             name: "La Prairie Cellular Cream Platinum Rare",
             brand: "La Prairie",
             category: "skincare",
             description: "An ultra-luxurious cream infused with platinum to help maintain the skin's electrical balance and preserve its youthful appearance.",
             ingredients: [],
             variants: ["8.5 oz", "33.8 oz"],
             averagePrice: 1500.00,
             eanUpc: "7611773083048",
             imageUrls: [],
             userRatings: { average: 0, count: 0 },
             sellerLinks: []
         }
     ]);
   const [instructionsVisible, setInstructionsVisible] = useState(true);
   const toggleInstructions = () => {
     setInstructionsVisible(!instructionsVisible);
   };
 
   useEffect(() => {
     // Simulate fetching data for rare cosmetics examples.
     // In a real application, this data would come from an API or database.
   }, []);
 
   const handleSubmit = async (event: React.FormEvent) => {
     event.preventDefault();
     setIsLoading(true);
 
     // Simulate fetching prices from various retailers.
     // In a real application, this data would come from an API that aggregates prices from different sources.
 
     try {
       const priceResults = [
         { retailer: 'Amazon', price: 25.99, currency: 'USD' },
         { retailer: 'Sephora', price: 29.50, currency: 'USD' },
         { retailer: 'Ulta', price: 27.00, currency: 'USD' },
       ];
       setPrices(priceResults);
 
       if (productDescription) {
         const analysisResults = await analyzeProductDescription({ productDescription });
         setAnalysis(analysisResults);
       }
     } catch (error) {
       toast({
         title: "Uh oh! Something went wrong.",
         description: "There was a problem with your request.",
       })
     } finally {
       setIsLoading(false);
     }
   };
 
   return (
     <div className="container mx-auto p-4">
       <Card className="max-w-4xl mx-auto mb-8">
         <CardHeader>
           <CardTitle>How to Use Global Glam Finder</CardTitle>
           <CardDescription>A quick guide to get the most out of this app.</CardDescription>
         </CardHeader>
         <CardContent>
           <ol className="list-decimal pl-5">
             <li>
               <strong>Enter Product Name:</strong> Type the name of the cosmetic product
               you're looking for in the "Product Name" input box.
             </li>
             <li>
               <strong>Add Product Description (optional):</strong> Provide a description
               of the product in the "Product Description" textarea. This helps our AI
               analysis provide more accurate insights.
             </li>
             <li>
               <strong>Find Prices:</strong> Click the "Find Prices" button to search for the
               best prices from various retailers.
             </li>
             <li>
               <strong>View AI Analysis:</strong> If you've provided a product description,
               an AI analysis will be displayed, showing key ingredients and qualities.
             </li>
             <li>
               <strong>Explore Price Comparison:</strong> The app will display a price
               comparison list, showing prices and retailer information.
             </li>
           </ol>
         </CardContent>
       </Card>
 
 
       <Card className="max-w-4xl mx-auto">
         <CardHeader>
           <CardTitle>Global Glam Finder</CardTitle>
           <CardDescription>Find the best prices and detailed analysis for your favorite cosmetics worldwide.</CardDescription>
         </CardHeader>
         <CardContent>
           <form onSubmit={handleSubmit} className="flex flex-col gap-4">
             <div>
               <label htmlFor="productName" className="block text-sm font-medium text-foreground">
                 Product Name
               </label>
               <Input
                 type="text"
                 id="productName"
                 value={productName}
                 onChange={(e) => setProductName(e.target.value)}
                 placeholder="Enter product name"
                 className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
               />
             </div>
             <div>
               <label htmlFor="productDescription" className="block text-sm font-medium text-foreground">
                 Product Description (optional)
               </label>
               <textarea
                 id="productDescription"
                 value={productDescription}
                 onChange={(e) => setProductDescription(e.target.value)}
                 rows={3}
                 className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                 placeholder="Enter product description"
               />
             </div>
             <Button type="submit" disabled={isLoading}>
               {isLoading ? 'Searching...' : 'Find Prices'}
             </Button>
           </form>
         </CardContent>
       </Card>
 
       {analysis && (
         <Card className="max-w-4xl mx-auto mt-8">
           <CardHeader>
             <CardTitle>AI Analysis</CardTitle>
             <CardDescription>Detailed analysis of the product description.</CardDescription>
           </CardHeader>
           <CardContent>
             {analysis.keyIngredients && analysis.keyIngredients.length > 0 && (
               <div>
                 <h4 className="text-lg font-semibold">Key Ingredients:</h4>
                 <ul>
                   {analysis.keyIngredients.map((ingredient, index) => (
                     <li key={index}>{ingredient}</li>
                   ))}
                 </ul>
               </div>
             )}
 
             {analysis.qualities && analysis.qualities.length > 0 && (
               <div>
                 <h4 className="text-lg font-semibold">Qualities:</h4>
                 <ul>
                   {analysis.qualities.map((quality, index) => (
                     <li key={index}>{quality}</li>
                   ))}
                 </ul>
               </div>
             )}
 
             {analysis.suggestedProducts && analysis.suggestedProducts.length > 0 && (
               <div>
                 <h4 className="text-lg font-semibold">Suggested Products:</h4>
                 <ul>
                   {analysis.suggestedProducts.map((product, index) => (
                     <li key={index}>{product}</li>
                   ))}
                 </ul>
               </div>
             )}
              {analysis.safetyRating &&
                 <div>
                     <h4 className="text-lg font-semibold">Safety Rating:</h4>
                     <p>{analysis.safetyRating}</p>
                 </div>
             }
              {analysis.usageInstructions &&
                 <div>
                     <h4 className="text-lg font-semibold">Usage Instructions:</h4>
                     <p>{analysis.usageInstructions}</p>
                 </div>
             }
           </CardContent>
         </Card>
       )}
 
       {prices && prices.length > 0 && (
         <Card className="max-w-4xl mx-auto mt-8">
           <CardHeader>
             <CardTitle>Price Comparison</CardTitle>
             <CardDescription>Prices from various retailers.</CardDescription>
           </CardHeader>
           <CardContent>
             <ul>
               {prices.map((price, index) => (
                 <li key={index} className="py-2 border-b">
                   {price.retailer}: {price.price} {price.currency}
                   <a href="/" target="_blank" rel="noopener noreferrer" className="ml-2 text-blue-500 hover:text-blue-700">
                     Buy Now <ExternalLink className="inline-block ml-1 h-4 w-4" />
                   </a>
                 </li>
               ))}
             </ul>
           </CardContent>
         </Card>
       )}
 
         <Card className="max-w-4xl mx-auto mt-8">
         <CardHeader>
           <CardTitle>Sample Products</CardTitle>
           <CardDescription>Explore a few sample cosmetic products.</CardDescription>
         </CardHeader>
         <CardContent>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
             {sampleProducts.map((product, index) => (
               <div key={index} className="border rounded-md p-4">
                 <h3 className="text-lg font-semibold">{product.name}</h3>
                 <p className="text-sm text-muted-foreground">{product.brand} - {product.category}</p>
                 <p className="text-sm">{product.description}</p>
                 {/* Add more details as needed */}
               </div>
             ))}
           </div>
         </CardContent>
 
             </Card>
     </div>
   );
 }

