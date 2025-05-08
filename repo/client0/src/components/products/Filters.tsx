'use client';

import React, { useState } from 'react';
import { BiChevronDown, BiX } from 'react-icons/bi';

interface FilterGroup {
  title: string;
  name: string;
  options: {
    id: string;
    label: string;
    count: number;
  }[];
}

interface PriceRange {
  min: number;
  max: number;
}

interface FiltersProps {
  filterGroups: FilterGroup[];
  priceRange: PriceRange;
  onFilterChange: (name: string, value: string, checked: boolean) => void;
  onPriceChange: (minPrice: number, maxPrice: number) => void;
  selectedFilters: Record<string, string[]>;
  onClearFilters: () => void;
}

export default function Filters({
  filterGroups,
  priceRange,
  onFilterChange,
  onPriceChange,
  selectedFilters,
  onClearFilters
}: FiltersProps) {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [localPriceRange, setLocalPriceRange] = useState({
    min: priceRange.min,
    max: priceRange.max
  });
  
  // Toggle expansion of filter group
  const toggleExpand = (name: string) => {
    setExpanded(prev => ({
      ...prev,
      [name]: !prev[name]
    }));
  };
  
  // کنترل تغییر محدوده قیمت
  const handlePriceInputChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'min' | 'max') => {
    const value = parseInt(e.target.value) || 0;
    setLocalPriceRange(prev => ({
      ...prev,
      [type]: value
    }));
  };
  
  // اعمال فیلتر قیمت
  const applyPriceFilter = () => {
    onPriceChange(localPriceRange.min, localPriceRange.max);
  };
  
  // تعداد کل فیلترهای انتخاب شده
  const getTotalFiltersCount = (): number => {
    let count = 0;
    
    for (const key in selectedFilters) {
      count += selectedFilters[key].length;
    }
    
    // وقتی محدوده قیمت تغییر کرده باشد
    if (priceRange.min !== localPriceRange.min || priceRange.max !== localPriceRange.max) {
      count += 1;
    }
    
    return count;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="p-4 border-b border-gray-100 flex justify-between items-center">
        <h2 className="font-bold">فیلترها</h2>
        
        {getTotalFiltersCount() > 0 && (
          <button 
            onClick={onClearFilters}
            className="text-sm text-red-500 hover:text-red-700 flex items-center"
          >
            <BiX className="ml-1" />
            حذف فیلترها
          </button>
        )}
      </div>
      
      {/* قیمت */}
      <div className="border-b border-gray-100">
        <div 
          className="p-4 cursor-pointer flex items-center justify-between hover:bg-gray-50"
          onClick={() => toggleExpand('price')}
        >
          <h3 className="font-medium">محدوده قیمت</h3>
          <BiChevronDown 
            className={`text-xl transition-transform ${expanded['price'] ? 'rotate-180' : ''}`} 
          />
        </div>
        
        {expanded['price'] !== false && (
          <div className="p-4 pt-0">
            <div className="flex items-center justify-between mb-4">
              <div className="text-xs text-gray">از قیمت</div>
              <div className="text-xs text-gray">تا قیمت</div>
            </div>
            
            <div className="flex items-center justify-between gap-4 mb-4">
              <div className="w-1/2 relative">
                <input 
                  type="number"
                  className="w-full border border-gray-200 rounded-lg p-2 text-left"
                  dir="ltr"
                  value={localPriceRange.min}
                  onChange={(e) => handlePriceInputChange(e, 'min')}
                />
                <div className="absolute left-2 top-1/2 transform -translate-y-1/2 text-xs text-gray">
                  تومان
                </div>
              </div>
              
              <div className="w-1/2 relative">
                <input 
                  type="number"
                  className="w-full border border-gray-200 rounded-lg p-2 text-left"
                  dir="ltr"
                  value={localPriceRange.max}
                  onChange={(e) => handlePriceInputChange(e, 'max')}
                />
                <div className="absolute left-2 top-1/2 transform -translate-y-1/2 text-xs text-gray">
                  تومان
                </div>
              </div>
            </div>
            
            <button
              onClick={applyPriceFilter}
              className="w-full bg-primary hover:bg-primary/90 text-white py-2 px-4 rounded-lg text-sm transition-colors"
            >
              اعمال محدوده قیمت
            </button>
          </div>
        )}
      </div>
      
      {/* Filter Groups */}
      {filterGroups.map((group) => (
        <div key={group.name} className="border-b border-gray-100 last:border-b-0">
          <div 
            className="p-4 cursor-pointer flex items-center justify-between hover:bg-gray-50"
            onClick={() => toggleExpand(group.name)}
          >
            <h3 className="font-medium">{group.title}</h3>
            <div className="flex items-center">
              {selectedFilters[group.name]?.length > 0 && (
                <span className="text-xs text-white bg-primary rounded-full w-5 h-5 flex items-center justify-center ml-2">
                  {selectedFilters[group.name].length}
                </span>
              )}
              <BiChevronDown 
                className={`text-xl transition-transform ${expanded[group.name] ? 'rotate-180' : ''}`} 
              />
            </div>
          </div>
          
          {expanded[group.name] !== false && (
            <div className="p-4 max-h-60 overflow-y-auto scrollbar-thin">
              {group.options.map((option) => (
                <div key={option.id} className="flex items-center mb-2 last:mb-0">
                  <input
                    type="checkbox"
                    id={`${group.name}-${option.id}`}
                    className="ml-2"
                    checked={selectedFilters[group.name]?.includes(option.id) || false}
                    onChange={(e) => onFilterChange(group.name, option.id, e.target.checked)}
                  />
                  <label 
                    htmlFor={`${group.name}-${option.id}`}
                    className="text-sm flex-1 cursor-pointer flex items-center justify-between"
                  >
                    <span>{option.label}</span>
                    <span className="text-xs text-gray">({option.count})</span>
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}