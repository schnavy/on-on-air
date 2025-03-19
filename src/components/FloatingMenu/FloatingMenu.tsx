"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./FloatingMenu.module.scss";
import Link from "next/link";
import { VscClose } from "react-icons/vsc";

// Custom useDebounce hook
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cleanup if value changes
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

const FloatingMenu = () => {
  const [leftPosition, setLeftPosition] = useState("10vw");
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Initialize searchText from URL
  const [searchText, setSearchText] = useState(() => {
    if (typeof window !== "undefined") {
      const currentParams = new URLSearchParams(window.location.search);
      return currentParams.get("search") || "";
    } else {
      return "";
    }
  });

  const debouncedSearchText = useDebounce(searchText, 300);

  // Randomize left position on mount
  useEffect(() => {
    const randomLeft = Math.floor(Math.random() * 30);
    setLeftPosition(`${randomLeft}vw`);
    setLoading(false);
  }, []);

  // Update URL when debouncedSearchText changes
  useEffect(() => {
    const currentParams = new URLSearchParams(window.location.search);
    const currentSearchParam = currentParams.get("search") || "";

    if (debouncedSearchText !== currentSearchParam) {
      if (debouncedSearchText) {
        currentParams.set("search", debouncedSearchText);
      } else {
        currentParams.delete("search");
      }
      router.replace(`?${currentParams.toString()}`);
    }
  }, [debouncedSearchText, router]);

  const handleClearSearch = () => {
    setSearchText("");
  };

  return (
    <nav
      className={`${styles.floatingNav} ${loading ? "loading" : "loaded"}`}
      style={{ left: leftPosition }}
    >
      <div>
        <Link href="/" className={styles.link}>
          <span className={styles.titleText}>On on Air</span>
          <span className={styles.circle}></span>
        </Link>
      </div>
      <div>
        <Link href="/" className={styles.link}>
          Index
        </Link>
      </div>
      <div>
        <Link href="/about" className={styles.link}>
          About
        </Link>
      </div>
      <div className={styles.searchContainer}>
        <input
          type="search"
          className={styles.search}
          placeholder="Search"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        {searchText && (
          <VscClose className={styles.clearIcon} onClick={handleClearSearch} />
        )}
      </div>
    </nav>
  );
};

export default FloatingMenu;
