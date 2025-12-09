"use client";

import { useMemo } from "react";
import { cn } from "@/src/lib/utils";

interface PasswordStrengthIndicatorProps {
  password: string;
}

interface StrengthCheck {
  label: string;
  check: (password: string) => boolean;
}

const strengthChecks: StrengthCheck[] = [
  { label: "Mínimo 6 caracteres", check: (p) => p.length >= 6 },
  { label: "Letra maiúscula", check: (p) => /[A-Z]/.test(p) },
  { label: "Letra minúscula", check: (p) => /[a-z]/.test(p) },
  { label: "Número", check: (p) => /[0-9]/.test(p) },
  {
    label: "Caractere especial",
    check: (p) => /[!@#$%^&*(),.?":{}|<>]/.test(p),
  },
];

function getStrengthLevel(password: string): {
  level: number;
  label: string;
  color: string;
} {
  const passedChecks = strengthChecks.filter((c) => c.check(password)).length;

  if (password.length === 0) {
    return { level: 0, label: "", color: "bg-muted" };
  }
  if (passedChecks <= 1) {
    return { level: 1, label: "Muito fraca", color: "bg-red-500" };
  }
  if (passedChecks === 2) {
    return { level: 2, label: "Fraca", color: "bg-orange-500" };
  }
  if (passedChecks === 3) {
    return { level: 3, label: "Média", color: "bg-yellow-500" };
  }
  if (passedChecks === 4) {
    return { level: 4, label: "Forte", color: "bg-lime-500" };
  }
  return { level: 5, label: "Muito forte", color: "bg-green-500" };
}

export function PasswordStrengthIndicator({
  password,
}: PasswordStrengthIndicatorProps) {
  const strength = useMemo(() => getStrengthLevel(password), [password]);
  const checks = useMemo(
    () =>
      strengthChecks.map((check) => ({
        ...check,
        passed: check.check(password),
      })),
    [password]
  );

  if (!password) return null;

  return (
    <div className="space-y-3 mt-2">
      {/* Barra de força */}
      <div className="space-y-1">
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((level) => (
            <div
              key={level}
              className={cn(
                "h-1.5 flex-1 rounded-full transition-all duration-300",
                level <= strength.level ? strength.color : "bg-muted"
              )}
            />
          ))}
        </div>
        {strength.label && (
          <p
            className={cn(
              "text-xs font-medium transition-colors",
              strength.level <= 2
                ? "text-red-500"
                : strength.level === 3
                ? "text-yellow-600"
                : "text-green-600"
            )}
          >
            {strength.label}
          </p>
        )}
      </div>

      {/* Lista de requisitos */}
      <ul className="grid grid-cols-2 gap-x-2 gap-y-1 text-xs">
        {checks.map((check, index) => (
          <li
            key={index}
            className={cn(
              "flex items-center gap-1.5 transition-colors",
              check.passed ? "text-green-600" : "text-muted-foreground"
            )}
          >
            <span
              className={cn(
                "size-3.5 rounded-full flex items-center justify-center text-[10px] font-bold transition-all",
                check.passed
                  ? "bg-green-100 text-green-600"
                  : "bg-muted text-muted-foreground"
              )}
            >
              {check.passed ? "✓" : ""}
            </span>
            {check.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
