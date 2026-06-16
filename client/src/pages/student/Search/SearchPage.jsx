import React, { useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { useGetSearchCourseQuery } from "@/api/courseApi";
import FilterSection from "./FilterSection";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle, BookOpen, Search, SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams(); 
  const queryFromUrl = searchParams.get("query") || "";

  const [searchInput, setSearchInput] = useState(queryFromUrl);  //for input
  const [selectedCategories, setSelectedCategories] = useState([]); // for categories
  const [sortByPrice, setSortByPrice] = useState(""); // for price
  const [showMobileFilters, setShowMobileFilters] = useState(false); //to show mobile version

  const { data, isLoading, isError } = useGetSearchCourseQuery({
    query: queryFromUrl,
    categories: selectedCategories,
    sortByPrice,
  });

  const courses = data?.courses || [];

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setSearchParams({ query: searchInput.trim() });
    } else {
      setSearchParams({});
    }
  };

  const clearSearch = () => {
    setSearchInput("");
    setSearchParams({});
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-6">
      {/* Search Header */}
      <div className="mb-6">
        <form onSubmit={handleSearch} className="flex items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search courses by title, category..."
              className="w-full pl-10 pr-10 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
            {searchInput && (
              <button
                type="button"
                onClick={clearSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          <Button type="submit">Search</Button>
        </form>

        {/* Search context info */}
        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center gap-2 flex-wrap">
            {queryFromUrl && (
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Showing results for{" "}
                <span className="font-semibold text-gray-800 dark:text-gray-200">
                  "{queryFromUrl}"
                </span>
              </p>
            )}
            {!queryFromUrl && !isLoading && (
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Showing all published courses
              </p>
            )}
            {!isLoading && (
              <Badge variant="secondary" className="text-xs">
                {courses.length} {courses.length === 1 ? "course" : "courses"}
              </Badge>
            )}
          </div>

          {/* Mobile filter toggle */}
          <Button
            variant="outline"
            size="sm"
            className="lg:hidden flex items-center gap-2"
            onClick={() => setShowMobileFilters(!showMobileFilters)}
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filters
            {selectedCategories.length > 0 && (
              <Badge className="ml-1 h-5 w-5 p-0 flex items-center justify-center text-[10px] rounded-full bg-blue-600 text-white">
                {selectedCategories.length}
              </Badge>
            )}
          </Button>
        </div>

        {/* Active filter chips */}
        {selectedCategories.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {selectedCategories.map((cat) => (
              <Badge
                key={cat}
                variant="outline"
                className="flex items-center gap-1 px-3 py-1 bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-950/50 transition-colors"
                onClick={() =>
                  setSelectedCategories((prev) =>
                    prev.filter((c) => c !== cat)
                  )
                }
              >
                {cat}
                <X className="h-3 w-3" />
              </Badge>
            ))}
          </div>
        )}
      </div>

      {/* Main Layout */}
      <div className="flex gap-6">
        {/* Filter Sidebar — desktop */}
        <aside className="hidden lg:block w-64 shrink-0">
          <div className="sticky top-24 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-4 shadow-sm">
            <FilterSection
              selectedCategories={selectedCategories}
              setSelectedCategories={setSelectedCategories}
              sortByPrice={sortByPrice}
              setSortByPrice={setSortByPrice}
            />
          </div>
        </aside>

        {/* Mobile Filter Drawer */}
        {showMobileFilters && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div
              className="absolute inset-0 bg-black/50"
              onClick={() => setShowMobileFilters(false)}
            />
            <div className="absolute right-0 top-0 h-full w-80 max-w-full bg-white dark:bg-gray-900 shadow-xl p-6 overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-lg">Filters</h2>
                <button onClick={() => setShowMobileFilters(false)}>
                  <X className="h-5 w-5 text-gray-500" />
                </button>
              </div>
              <FilterSection
                selectedCategories={selectedCategories}
                setSelectedCategories={setSelectedCategories}
                sortByPrice={sortByPrice}
                setSortByPrice={setSortByPrice}
              />
            </div>
          </div>
        )}

        {/* Results Area */}
        <div className="flex-1 min-w-0">
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {Array.from({ length: 6 }).map((_, idx) => (
                <SearchSkeleton key={idx} />
              ))}
            </div>
          ) : isError ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <AlertCircle className="h-12 w-12 text-red-400 mb-4" />
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                Something went wrong
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                We couldn't fetch search results. Please try again.
              </p>
            </div>
          ) : courses.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <BookOpen className="h-12 w-12 text-gray-300 dark:text-gray-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                No courses found
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 max-w-md">
                {queryFromUrl
                  ? `We couldn't find any courses matching "${queryFromUrl}". Try a different search term or adjust your filters.`
                  : "Try adjusting your filters or search for something else."}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {courses.map((course) => (
                <SearchResultCard key={course._id} course={course} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;

// ---------- Search Result Card ----------
const SearchResultCard = ({ course }) => {
  return (
    <Link to={`/course-detail/${course._id}`}>
      <Card className="overflow-hidden rounded-xl bg-white dark:bg-gray-800 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full">
        <div className="relative">
          <img
            src={course.courseThumbnail}
            alt={course.courseTitle}
            className="w-full h-36 object-cover"
          />
          {course.courseLevel && (
            <Badge className="absolute top-2 right-2 bg-blue-600 text-white text-[10px] px-2 py-0.5">
              {course.courseLevel}
            </Badge>
          )}
        </div>

        <CardContent className="p-4">
          <h3 className="font-semibold text-sm line-clamp-2 mb-2">
            {course.courseTitle}
          </h3>

          {course.subTitle && (
            <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1 mb-3">
              {course.subTitle}
            </p>
          )}

          <div className="flex items-center gap-2 mb-3">
            <Avatar className="h-6 w-6">
              <AvatarImage
                src={
                  course.creator?.photoURL ||
                  "https://github.com/shadcn.png"
                }
              />
              <AvatarFallback>
                {course.creator?.name?.charAt(0) || "U"}
              </AvatarFallback>
            </Avatar>
            <span className="text-xs text-muted-foreground truncate">
              {course.creator?.name || "Unknown"}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="font-bold text-lg">
              {course.coursePrice === 0 ? "Free" : `₹${course.coursePrice}`}
            </span>
            {course.category && (
              <Badge variant="outline" className="text-[10px]">
                {course.category}
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

// ---------- Skeleton ----------
const SearchSkeleton = () => {
  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl overflow-hidden shadow-sm animate-pulse">
      <div className="w-full h-36 bg-gray-200 dark:bg-gray-700" />
      <div className="p-4 space-y-3">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 bg-gray-200 dark:bg-gray-700 rounded-full" />
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-20" />
        </div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4" />
      </div>
    </div>
  );
};