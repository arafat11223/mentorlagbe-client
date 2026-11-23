"use client";

import { useCallback, useEffect, useState } from "react";
import { apiRequest } from "../../lib/api/client";

interface DashboardStatsState<T> {
  data: T | null;
  loading: boolean;
  error: string;
  retry: () => void;
}

export function useDashboardStats<T>(
  endpoint: string
): DashboardStatsState<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [attempt, setAttempt] = useState(0);

  const retry = useCallback(() => {
    setAttempt((current) => current + 1);
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function loadStatistics() {
      setLoading(true);
      setError("");

      try {
        const response = await apiRequest<T>(endpoint);

        if (!response.data) {
          throw new Error("Dashboard statistics are unavailable.");
        }

        if (!cancelled) {
          setData(response.data);
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error
              ? err.message
              : "Unable to load dashboard statistics."
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadStatistics();

    return () => {
      cancelled = true;
    };
  }, [endpoint, attempt]);

  return { data, loading, error, retry };
}
