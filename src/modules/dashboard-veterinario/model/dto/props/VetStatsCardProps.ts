import React from "react";

export interface VetStatsCardProps {
  title: string;
  value: string | number;
  subtext: string;
  icon: React.ReactNode;
  valueSize?: string;
}