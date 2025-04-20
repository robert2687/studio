'use client'

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getProductPrices, ProductPrice } from '@/services/price-aggregation';
import { analyzeProductDescription, AnalyzeProductDescriptionOutput } from '@/ai/flows/analyze-product-description';
import { Badge } from '@/components/ui/badge';
import { ExternalLink } from 'lucide-react';

export default function Home() {
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [prices, setPrices] = useState<ProductPrice[]>([]);
  const [analysis, setAnalysis] = useState<AnalyzeProductDescriptionOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProductName(e.target.value);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setProductDescription(e.target.value);
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setPrices([]);
    setAnalysis(null);

    try {
      const priceResults = await getProductPrices(productName);
      setPrices(priceResults);

      if (productDescription) {
        const analysisResults = await analyzeProductDescription({ productDescription });
        setAnalysis(analysisResults);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      // TODO: Show error message to user
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Global Glam Finder</CardTitle>
          <CardDescription>Find the best prices for your favorite cosmetics worldwide.</CardDescription>
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
                placeholder="Enter product name"
                value={productName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label htmlFor="productDescription" className="block text-sm font-medium text-foreground">
                Product Description (optional)
              </label>
              <textarea
                id="productDescription"
                placeholder="Enter product description for AI analysis"
                value={productDescription}
                onChange={handleDescriptionChange}
                className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Searching...' : 'Find Prices'}
            </Button>
          </form>
        </CardContent>
      </Card>

      {analysis && (
        <Card className="max-w-2xl mx-auto mt-8">
          <CardHeader>
            <CardTitle>AI Analysis</CardTitle>
            <CardDescription>Key ingredients and qualities identified by AI.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">Key Ingredients</h3>
              {analysis.keyIngredients.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {analysis.keyIngredients.map((ingredient, index) => (
                    <Badge key={index}>{ingredient}</Badge>
                  ))}
                </div>
              ) : (
                <p>No key ingredients found.</p>
              )}
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Qualities</h3>
              {analysis.qualities.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {analysis.qualities.map((quality, index) => (
                    <Badge key={index}>{quality}</Badge>
                  ))}
                </div>
              ) : (
                <p>No qualities found.</p>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {prices.length > 0 && (
        <Card className="max-w-2xl mx-auto mt-8">
          <CardHeader>
            <CardTitle>Price Comparison</CardTitle>
            <CardDescription>Prices sorted from lowest to highest.</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="divide-y divide-border">
              {prices.sort((a, b) => a.price - b.price).map((item, index) => (
                <li key={index} className="py-2 flex items-center justify-between">
                  <div>
                    <span className="font-medium">{item.retailer}</span>
                    <span className="text-muted-foreground ml-2">
                      {item.price} {item.currency}
                    </span>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <a href={item.productUrl} target="_blank" rel="noopener noreferrer" className="flex items-center">
                      Buy Now
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
}


    
