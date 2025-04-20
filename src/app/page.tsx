'use client'

import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getProductPrices, ProductPrice } from '@/services/price-aggregation';
import { analyzeProductDescription, AnalyzeProductDescriptionOutput } from '@/ai/flows/analyze-product-description';
import { Badge } from '@/components/ui/badge';
import { ExternalLink } from 'lucide-react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast"

interface RareCosmetic {
  name: string;
  description: string;
  imageUrl: string;
}

interface Product {
  name: string;
  brand: string;
  category: string;
  subcategory: string;
  description: string;
  ingredients: string[];
  shades?: { [shadeName: string]: string };
  variants?: string[];
  averagePrice: number;
  eanUpcCode: string;
  images: string[];
  userRatings?: { averageRating: number; ratingCount: number };
  sellerLinks: { [sellerName: string]: string };
}

export default function Home() {
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [prices, setPrices] = useState<ProductPrice[]>([]);
  const [analysis, setAnalysis] = useState<AnalyzeProductDescriptionOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast()
  const [rareCosmetics, setRareCosmetics] = useState<RareCosmetic[]>([
    {
      name: "Chanel No. 5 Parfum Grand Extrait",
      description: "An exquisite, limited-edition presentation of the iconic Chanel No. 5 fragrance.",
      imageUrl: "https://picsum.photos/200/300", // Placeholder image
    },
    {
      name: "Guerlain KissKiss Gold and Diamonds Lipstick",
      description: "A luxurious lipstick encased in 18-carat gold and adorned with diamonds.",
      imageUrl: "https://picsum.photos/200/300", // Placeholder image
    },
    {
      name: "H.R.H. Princess Diana Sapphire Perfume",
      description: "A rare perfume dedicated to Princess Diana, featuring a sapphire-encrusted bottle.",
      imageUrl: "https://picsum.photos/200/300", // Placeholder image
    },
    {
      name: "Shiseido Eudermine Revitalizing Essence (1897)",
      description: "A replica of the original Eudermine, Shiseido's oldest product, in a vintage bottle.",
      imageUrl: "https://picsum.photos/200/300", // Placeholder image
    }
  ]);

    const [sampleProducts, setSampleProducts] = useState<Product[]>([
        {
            name: "Hyaluronic Acid Serum",
            brand: "The Ordinary",
            category: "skincare",
            subcategory: "serum",
            description: "A hydrating serum with hyaluronic acid.",
            ingredients: ["Hyaluronic Acid", "Vitamin B5"],
            averagePrice: 7.50,
            eanUpcCode: "629110735424",
            images: ["https://picsum.photos/200/300"],
            userRatings: { averageRating: 4.5, ratingCount: 1200 },
            sellerLinks: {
                "Sephora": "https://www.sephora.com/...",
                "Ulta": "https://www.ulta.com/..."
            },
            variants: ["30ml", "60ml"]
        },
        {
            name: "Superstay Matte Ink Lipstick",
            brand: "Maybelline",
            category: "makeup",
            subcategory: "lipstick",
            description: "A long-lasting matte lipstick.",
            ingredients: ["Dimethicone", "Silica"],
            shades: {
                "Lover": "#FF0000",
                "Pioneer": "#B3214F"
            },
            averagePrice: 9.99,
            eanUpcCode: "041554491301",
            images: ["https://picsum.photos/200/300"],
            userRatings: { averageRating: 4.2, ratingCount: 800 },
            sellerLinks: {
                "Amazon": "https://www.amazon.com/...",
                "Target": "https://www.target.com/..."
            },
            variants: ["Various Shades"]
        },
        {
            name: "Argan Oil Shampoo",
            brand: "Moroccanoil",
            category: "haircare",
            subcategory: "shampoo",
            description: "A shampoo infused with argan oil for smooth and shiny hair.",
            ingredients: ["Argan Oil", "Keratin"],
            averagePrice: 24.00,
            eanUpcCode: "7290011521034",
            images: ["https://picsum.photos/200/300"],
            userRatings: { averageRating: 4.7, ratingCount: 1500 },
            sellerLinks: {
                "Nordstrom": "https://www.nordstrom.com/...",
                "Amazon": "https://www.amazon.com/..."
            },
            variants: ["8.5 oz", "33.8 oz"]
        }
    ]);

  useEffect(() => {
    // Simulate fetching data for rare cosmetics examples.
    // Replace this with actual data fetching from an API or database.
  }, []);

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
    } catch (error: any) {
      console.error("Error fetching data:", error);
      toast({
        title: "Error",
        description: "Failed to fetch data. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
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
        <Card className="max-w-4xl mx-auto mt-8">
          <CardHeader>
            <CardTitle>AI Analysis</CardTitle>
            <CardDescription>Detailed ingredients, qualities, and alternatives identified by AI.</CardDescription>
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
            <div className="mb-4">
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
            <div>
              <h3 className="text-lg font-semibold mb-2">Suggested Products</h3>
              {analysis.suggestedProducts.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {analysis.suggestedProducts.map((product, index) => (
                    <Badge key={index}>{product}</Badge>
                  ))}
                </div>
              ) : (
                <p>No similar products found.</p>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {prices.length > 0 && (
        <Card className="max-w-4xl mx-auto mt-8">
          <CardHeader>
            <CardTitle>Price Comparison</CardTitle>
            <CardDescription>Prices sorted from lowest to highest, with retailer details.</CardDescription>
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
                      View at {item.retailer}
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

        <Card className="max-w-4xl mx-auto mt-8">
          <CardHeader>
            <CardTitle>Rare Cosmetics Examples</CardTitle>
            <CardDescription>Explore some of the most unique and hard-to-find cosmetics.</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[300px] w-full rounded-md border">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                {rareCosmetics.map((cosmetic, index) => (
                  <div key={index} className="flex flex-col items-center justify-center p-4 border rounded-md">
                    <img src={cosmetic.imageUrl} alt={cosmetic.name} className="w-24 h-24 object-cover rounded-md mb-2" />
                    <h4 className="text-sm font-semibold text-center">{cosmetic.name}</h4>
                    <p className="text-xs text-muted-foreground text-center">{cosmetic.description}</p>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

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
