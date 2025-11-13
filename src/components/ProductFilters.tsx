import { useState, useEffect } from "react";
import {
  Filter,
  X,
  ChevronDown,
  Star,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import { supabase } from "@/integrations/supabase/client";

export interface ProductFilters {
  categories: string[];
  priceRange: [number, number];
  features: string[];
  rating: number;
  inStock: boolean;
  isBestseller: boolean;
  sortBy: string;
}

interface ProductFiltersProps {
  onFiltersChange: (filters: ProductFilters) => void;
  categories: string[];
  className?: string;
}

const ProductFilters = ({
  onFiltersChange,
  categories,
  className = "",
}: ProductFiltersProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const [filters, setFilters] = useState<ProductFilters>({
    categories: [],
    priceRange: [0, 10000],
    features: [],
    rating: 0,
    inStock: false,
    isBestseller: false,
    sortBy: "name",
  });

  const [availableFeatures, setAvailableFeatures] = useState<string[]>([]);
  const [loadingFeatures, setLoadingFeatures] = useState(true);

  useEffect(() => {
    fetchAvailableFeatures();
  }, []);

  const fetchAvailableFeatures = async () => {
    try {
      const { data, error } = await supabase
        .from("product_features")
        .select("name")
        .eq("is_active", true)
        .order("name");

      if (error) throw error;

      setAvailableFeatures(data?.map((f) => f.name) || []);
    } catch (e) {
      console.error("Error:", e);

      setAvailableFeatures([
        "Premium Quality",
        "Hygienically Packed",
        "Bulk Pack",
        "Long Shelf Life",
        "Gluten Free",
        "Recyclable Packaging",
        "Eco Friendly",
        "Organic",
        "Restaurant Grade",
      ]);
    } finally {
      setLoadingFeatures(false);
    }
  };

  const updateFilters = (newFilters: Partial<ProductFilters>) => {
    const updated = { ...filters, ...newFilters };
    setFilters(updated);
    onFiltersChange(updated);
  };

  const toggleCategory = (category: string) => {
    const updated = filters.categories.includes(category)
      ? filters.categories.filter((c) => c !== category)
      : [...filters.categories, category];

    updateFilters({ categories: updated });
  };

  const toggleFeature = (feature: string) => {
    const updated = filters.features.includes(feature)
      ? filters.features.filter((f) => f !== feature)
      : [...filters.features, feature];

    updateFilters({ features: updated });
  };

  const clearAllFilters = () => {
    const cleared: ProductFilters = {
      categories: [],
      priceRange: [0, 10000],
      features: [],
      rating: 0,
      inStock: false,
      isBestseller: false,
      sortBy: "name",
    };
    setFilters(cleared);
    onFiltersChange(cleared);
  };

  const activeFiltersCount = [
    filters.categories.length,
    filters.features.length,
    filters.rating > 0,
    filters.inStock,
    filters.isBestseller,
    filters.priceRange[0] > 0 || filters.priceRange[1] < 10000,
  ].filter(Boolean).length;

  return (
    <div className={`space-y-4 ${className}`}>
      {/* MOBILE FILTER TOGGLE */}
      <div className="lg:hidden">
        <Button
          variant="outline"
          className="w-full justify-between rounded-xl py-5 shadow-sm bg-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4" />
            <span className="font-medium">Filters</span>
            {activeFiltersCount > 0 && (
              <Badge className="text-xs bg-[#D4A017] text-white px-2 py-0.5 rounded-full">
                {activeFiltersCount}
              </Badge>
            )}
          </div>

          <ChevronDown
            className={`w-4 h-4 transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </Button>
      </div>

      {/* FILTER PANEL */}
      <div className={`${isOpen ? "block" : "hidden"} lg:block`}>
        <Card className="rounded-2xl border-[#f0e7d4] bg-white shadow-[0_4px_18px_rgba(0,0,0,0.06)]">
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="text-xl font-semibold text-[#3A2E21]">
              Filters
            </CardTitle>

            {activeFiltersCount > 0 && (
              <Button
                variant="ghost"
                className="text-sm text-red-500 hover:text-red-600"
                size="sm"
                onClick={clearAllFilters}
              >
                Reset
              </Button>
            )}
          </CardHeader>

          <CardContent className="space-y-7">
            {/* CATEGORY FILTER */}
            <FilterSection title="Categories">
              {categories
                .filter((c) => c !== "All")
                .map((category) => (
                  <FilterCheckbox
                    key={category}
                    id={`cat-${category}`}
                    label={category}
                    checked={filters.categories.includes(category)}
                    onChange={() => toggleCategory(category)}
                  />
                ))}
            </FilterSection>

            {/* PRICE RANGE */}
            <FilterSection title="Price Range">
              <div className="space-y-4">
                <Slider
                  min={0}
                  max={10000}
                  step={100}
                  value={filters.priceRange}
                  className="w-full"
                  onValueChange={(value) =>
                    updateFilters({
                      priceRange: value as [number, number],
                    })
                  }
                />

                <div className="flex justify-between text-sm">
                  <span className="font-medium text-[#3A2E21]">
                    ₹{filters.priceRange[0]}
                  </span>
                  <span className="font-medium text-[#3A2E21]">
                    ₹{filters.priceRange[1]}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {[
                    [0, 1000, "Under ₹1,000"],
                    [1000, 3000, "₹1,000 - ₹3,000"],
                    [3000, 5000, "₹3,000 - ₹5,000"],
                    [5000, 10000, "Above ₹5,000"],
                  ].map(([min, max, label]) => (
                    <Button
                      key={label}
                      size="sm"
                      variant="outline"
                      className="text-xs rounded-lg"
                      onClick={() =>
                        updateFilters({
                          priceRange: [min as number, max as number],
                        })
                      }
                    >
                      {label}
                    </Button>
                  ))}
                </div>
              </div>
            </FilterSection>

            {/* FEATURES */}
            <FilterSection title="Product Features">
              <div className="max-h-48 overflow-y-auto pr-1 space-y-2 scrollbar-thin scrollbar-thumb-gray-300">
                {loadingFeatures ? (
                  <div className="space-y-2">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="h-4 w-24 bg-gray-200 animate-pulse rounded"
                      />
                    ))}
                  </div>
                ) : (
                  availableFeatures.map((feature) => (
                    <FilterCheckbox
                      key={feature}
                      id={`feat-${feature}`}
                      label={feature}
                      checked={filters.features.includes(feature)}
                      onChange={() => toggleFeature(feature)}
                    />
                  ))
                )}
              </div>
            </FilterSection>

            {/* RATING */}
            <FilterSection title="Customer Rating">
              {[5, 4, 3, 2, 1].map((rating) => (
                <FilterCheckbox
                  key={rating}
                  id={`rating-${rating}`}
                  checked={filters.rating === rating}
                  onChange={(checked) =>
                    updateFilters({ rating: checked ? rating : 0 })
                  }
                  label={
                    <div className="flex items-center gap-1">
                      <span>{rating}</span>
                      <span className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3 h-3 ${
                              i < rating
                                ? "text-yellow-400 fill-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </span>
                      <span className="text-gray-500">& up</span>
                    </div>
                  }
                />
              ))}
            </FilterSection>

            {/* EXTRA FILTERS */}
            <FilterSection title="Additional Filters">
              <FilterCheckbox
                id="instock"
                label="In Stock Only"
                checked={filters.inStock}
                onChange={(checked) =>
                  updateFilters({ inStock: !!checked })
                }
              />

              <FilterCheckbox
                id="bestseller"
                label="Bestsellers Only"
                checked={filters.isBestseller}
                onChange={(checked) =>
                  updateFilters({ isBestseller: !!checked })
                }
              />
            </FilterSection>

            {/* SORT */}
            <FilterSection title="Sort By">
              {[
                ["name", "Name (A-Z)"],
                ["name-desc", "Name (Z-A)"],
                ["price-low", "Price: Low → High"],
                ["price-high", "Price: High → Low"],
                ["rating", "Customer Rating"],
                ["newest", "Newest First"],
                ["bestseller", "Bestsellers First"],
              ].map(([value, label]) => (
                <FilterCheckbox
                  key={value}
                  id={`sort-${value}`}
                  label={label}
                  checked={filters.sortBy === value}
                  onChange={(checked) =>
                    updateFilters({
                      sortBy: checked ? value : "name",
                    })
                  }
                />
              ))}
            </FilterSection>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

/* ---------------------------- REUSABLE COMPONENTS ---------------------------- */

const FilterSection = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <Collapsible defaultOpen>
    <CollapsibleTrigger className="w-full flex justify-between items-center py-2 text-[#3A2E21] font-medium">
      {title}
      <ChevronDown className="w-4 h-4 opacity-70" />
    </CollapsibleTrigger>

    <CollapsibleContent className="pt-2 pl-1 space-y-2">
      {children}
    </CollapsibleContent>
  </Collapsible>
);

const FilterCheckbox = ({
  id,
  label,
  checked,
  onChange,
}: {
  id: string;
  label: any;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) => (
  <div className="flex items-center gap-2">
    <Checkbox
      id={id}
      checked={checked}
      onCheckedChange={(v) => onChange(!!v)}
      className="border-[#D4A017] text-[#D4A017]"
    />
    <label htmlFor={id} className="text-sm cursor-pointer text-gray-800">
      {label}
    </label>
  </div>
);

export default ProductFilters;
