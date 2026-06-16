import React from "react";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const categories = [
  "Next JS",
  "Data Science",
  "Frontend Development",
  "Fullstack Development",
  "MERN Stack Development",
  "Backend Development",
  "Javascript",
  "Python",
  "Docker",
  "MongoDB",
  "HTML",
];

const FilterSection = ({ selectedCategories, setSelectedCategories, sortByPrice, setSortByPrice }) => {

  const handleCategoryToggle = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-lg">Filters</h2>
        {(selectedCategories.length > 0 || sortByPrice) && (
          <button
            onClick={() => {
              setSelectedCategories([]);
              setSortByPrice("");
            }}
            className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
          >
            Clear All
          </button>
        )}
      </div>
      <Separator className="my-3" />

      {/* Sort by Price */}
      <div className="mb-5">
        <Label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
          Sort by Price
        </Label>
        <Select value={sortByPrice} onValueChange={(value) => setSortByPrice(value === "none" ? "" : value)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select order" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">Default</SelectItem>
            <SelectItem value="low">Low to High</SelectItem>
            <SelectItem value="high">High to Low</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Separator className="my-3" />

      {/* Category Filters */}
      <div>
        <Label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 block">
          Category
        </Label>
        <div className="space-y-2 max-h-[400px] overflow-y-auto pr-1">
          {categories.map((category) => {
            const isSelected = selectedCategories.includes(category);
            return (
              <label
                key={category}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-all duration-150 ${
                  isSelected
                    ? "bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800"
                    : "hover:bg-gray-50 dark:hover:bg-gray-800/50 border border-transparent"
                }`}
              >
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => handleCategoryToggle(category)}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 accent-blue-600"
                />
                <span className={`text-sm ${
                  isSelected
                    ? "text-blue-700 dark:text-blue-300 font-medium"
                    : "text-gray-600 dark:text-gray-400"
                }`}>
                  {category}
                </span>
              </label>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FilterSection;
