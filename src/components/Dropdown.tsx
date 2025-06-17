import { useEffect, useRef, useState } from "react";
import Button from "./Button";
import Input from "./Input";
import cn from "../utils/cn";
import type { Option } from "../types";

type DropdownProps = {
  items?: Option[];
  placeholder?: string;
  value?: number | null;
  searchable?: boolean;
  clearable?: boolean;
  onSelect?: (value: number | null) => void;
  onClear?: () => void;
  className?: string;
  buttonClass?: string;
};

const Dropdown = ({
  items = [],
  placeholder = "Select items...",
  value = null,
  searchable = true,
  clearable = true,
  onSelect,
  onClear,
  className = "",
  buttonClass = "",
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const dropdownElement = useRef<HTMLDivElement>(null);
  const dropdownList = useRef<HTMLDivElement>(null);
  const searchInput = useRef<HTMLInputElement>(null);

  const filteredItems = searchTerm
    ? items.filter((item) =>
        item.label.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : items;

  const selectedItem = items.find((item) => item.value == value);
  const displayValue =
    value === null
      ? placeholder
      : selectedItem
      ? selectedItem.label
      : placeholder;

  useEffect(() => {
    if (isOpen && searchInput.current) searchInput.current.focus();
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownElement.current &&
        !dropdownElement.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setSelectedIndex(-1);
      }
    };
    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleSelect = (item: Option) => {
    if (onSelect) onSelect(item.value);
    setIsOpen(false);
    setSearchTerm("");
    setSelectedIndex(-1);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onSelect) onSelect(null);
    if (onClear) onClear();
    setSearchTerm("");
    setSelectedIndex(-1);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (!isOpen) {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        setIsOpen(true);
      }
      return;
    }
    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        setSelectedIndex((i) => Math.min(i + 1, filteredItems.length - 1));
        break;
      case "ArrowUp":
        event.preventDefault();
        setSelectedIndex((i) => Math.max(i - 1, 0));
        break;
      case "Enter":
        event.preventDefault();
        if (selectedIndex >= 0 && filteredItems[selectedIndex]) {
          handleSelect(filteredItems[selectedIndex]);
        }
        break;
      case "Escape":
        event.preventDefault();
        setIsOpen(false);
        break;
      case "Tab":
        setIsOpen(false);
        break;
    }
  };

  return (
    <div className={cn("relative w-full", className)} ref={dropdownElement}>
      <div className="relative flex items-center w-full rounded-lg">
        <Button
          type="button"
          className={cn(
            "w-full pl-4 py-2.5 text-sm border rounded-md focus:outline-none text-left min-h-[40px] bg-white",
            buttonClass
          )}
          onClick={() => {
            setIsOpen((o) => !o);
          }}
          onKeyDown={handleKeyDown}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-controls="dropdown-list"
          aria-label={placeholder}>
          <div className="flex items-center justify-between w-full">
            <span
              className={cn(
                "truncate block",
                !value ? "text-neutral-500" : "text-black"
              )}
              style={{ minWidth: 0 }}>
              {displayValue}
            </span>
            <div className="flex items-center gap-2 ml-2">
              <span className="flex items-center">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className={cn(
                    "transition-transform duration-200 ease-in-out",
                    isOpen ? "rotate-180" : "rotate-0"
                  )}
                  aria-hidden="true">
                  <path
                    d="M6 8L10 12L14 8"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              {value !== null && clearable && (
                <Button
                  type="button"
                  className="text-gray-400 hover:font-semibold text-xl focus:outline-none flex-shrink-0 px-0 py-0 h-auto min-w-0"
                  onClick={handleClear}
                  aria-label="Clear selection">
                  ×
                </Button>
              )}
            </div>
          </div>
        </Button>
      </div>
      {isOpen && (
        <div
          id="dropdown-list"
          className={cn(
            "absolute w-full bg-white border rounded-lg z-50 overflow-hidden transition-all duration-200",
            "shadow-2xl"
          )}
          style={{ top: "100%", marginTop: 4, maxHeight: 300 }}
          role="listbox"
          aria-label={`${placeholder} options`}
          tabIndex={-1}
          ref={dropdownList}>
          {searchable && (
            <div
              className="sticky top-0 p-2 bg-white border-b w-full z-10"
              onClick={(e) => e.stopPropagation()}
              onKeyDown={(e) => e.stopPropagation()}>
              <Input
                ref={searchInput}
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 text-sm border rounded focus:outline-none"
                aria-label="Search options"
                role="searchbox"
                onKeyDown={handleKeyDown}
              />
            </div>
          )}
          <div className="overflow-y-auto" style={{ maxHeight: 256 }}>
            {!filteredItems.length ? (
              <div
                className="px-4 py-2 text-sm text-gray-500 italic"
                role="status">
                No results found
              </div>
            ) : (
              filteredItems.map((item, index) => (
                <Button
                  type="button"
                  key={`${item.value}`}
                  className={cn(
                    "w-full hover:font-semibold text-left px-4 py-2 text-sm transition-colors",
                    selectedIndex === index || value == item.value
                      ? "font-semibold"
                      : ""
                  )}
                  role="option"
                  aria-selected={value === item.value}
                  onClick={() => handleSelect(item)}
                  onKeyDown={handleKeyDown}>
                  <span className="truncate block">{item.label}</span>
                </Button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
