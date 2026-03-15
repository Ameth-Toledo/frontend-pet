"use client";

import { useEffect, useState } from "react";
import { getAnalisisUseCase } from "../usecases/GetAnalisisUseCase";
import { DashboardMetricsUI } from "../model/metrics.ui.model";
import { UserUIModel } from "@/modules/auth/model/ui.model";

interface AnalisisViewModelState {
  metrics: DashboardMetricsUI | null;
  loading: boolean;
  error: string | null;
  userName: string;
}

export function useAnalisisViewModel(): AnalisisViewModelState {
  const [metrics, setMetrics] = useState<DashboardMetricsUI | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState<string | null>(null);
  const [userName, setUserName] = useState("Administrador");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const raw = localStorage.getItem("user");
      if (raw) {
        const user: UserUIModel = JSON.parse(raw);
        setUserName(user.fullName);
      }
    }
  }, []);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      setError(null);
      try {
        setMetrics(await getAnalisisUseCase());
      } catch {
        setError("No se pudieron cargar las métricas.");
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  return { metrics, loading, error, userName };
}