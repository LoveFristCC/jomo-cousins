"use client";

import { ReactNode } from "react";

// All animation components now just pass through children without animations

export function FadeInUp({ children }: { children: ReactNode; delay?: number }) {
  return <>{children}</>;
}

export function FadeInLeft({ children }: { children: ReactNode; delay?: number }) {
  return <>{children}</>;
}

export function FadeInRight({ children }: { children: ReactNode; delay?: number }) {
  return <>{children}</>;
}

export function ScaleIn({ children }: { children: ReactNode; delay?: number }) {
  return <>{children}</>;
}

export function StaggerChildren({ children }: { children: ReactNode; staggerDelay?: number }) {
  return <>{children}</>;
}

export function StaggerItem({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

export function FadeIn({ children }: { children: ReactNode; delay?: number }) {
  return <>{children}</>;
}

export function SlideInTop({ children }: { children: ReactNode; delay?: number }) {
  return <>{children}</>;
}
