"use client";

import React from "react";
import { useRouter } from "next/navigation";

export function ActionLink({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) {
  const router = useRouter();
  return (
    <button onClick={() => router.push(href)} className={className}>
      {children}
    </button>
  );
}

export function UnderConstructionButton({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <button
      onClick={() => alert("Fonctionnalité en cours d'implémentation...")}
      className={className}
    >
      {children}
    </button>
  );
}
