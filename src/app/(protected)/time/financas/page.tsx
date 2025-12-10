"use client";

import { useState } from "react";
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  Calendar,
  Filter,
} from "lucide-react";
import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Badge } from "@/src/components/ui/badge";
import { cn } from "@/src/lib/utils";

// ============================================
// MOCK DATA
// ============================================

interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: "income" | "expense";
  date: string;
  category: "match_fee" | "equipment" | "field_rental" | "other";
}

const mockTransactions: Transaction[] = [
  {
    id: "1",
    description: "Caixinha - Jogo vs Gaviões FC",
    amount: 225,
    type: "income",
    date: "10 Dez",
    category: "match_fee",
  },
  {
    id: "2",
    description: "Aluguel do Campo",
    amount: -180,
    type: "expense",
    date: "10 Dez",
    category: "field_rental",
  },
  {
    id: "3",
    description: "Caixinha - Jogo vs Real Periferia",
    amount: 200,
    type: "income",
    date: "03 Dez",
    category: "match_fee",
  },
  {
    id: "4",
    description: "Compra de Bolas (3x)",
    amount: -120,
    type: "expense",
    date: "01 Dez",
    category: "equipment",
  },
  {
    id: "5",
    description: "Caixinha - Jogo vs União SP",
    amount: 250,
    type: "income",
    date: "26 Nov",
    category: "match_fee",
  },
  {
    id: "6",
    description: "Aluguel do Campo",
    amount: -180,
    type: "expense",
    date: "26 Nov",
    category: "field_rental",
  },
  {
    id: "7",
    description: "Coletes novos",
    amount: -85,
    type: "expense",
    date: "20 Nov",
    category: "equipment",
  },
  {
    id: "8",
    description: "Caixinha - Jogo vs Fúria FC",
    amount: 225,
    type: "income",
    date: "19 Nov",
    category: "match_fee",
  },
];

const categoryLabels = {
  match_fee: "Caixinha",
  equipment: "Equipamento",
  field_rental: "Campo",
  other: "Outros",
};

// ============================================
// PAGE COMPONENT
// ============================================

export default function FinancesPage() {
  const [transactions] = useState(mockTransactions);

  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((acc, t) => acc + t.amount, 0);
  const totalExpenses = Math.abs(
    transactions
      .filter((t) => t.type === "expense")
      .reduce((acc, t) => acc + t.amount, 0)
  );
  const balance = totalIncome - totalExpenses;

  return (
    <>
      {/* Page Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">💰 Finanças</h1>
          <p className="text-xs text-white/50">Temporada 2024</p>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="border-white/20 text-white/70"
        >
          <Filter className="h-4 w-4 mr-1" />
          Filtrar
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <Card className="border-0 bg-green-500/10 text-white">
          <CardContent className="p-4 text-center">
            <TrendingUp className="h-5 w-5 mx-auto mb-1 text-green-400" />
            <p className="text-xs text-white/50">Entradas</p>
            <p className="text-lg font-bold text-green-400">R$ {totalIncome}</p>
          </CardContent>
        </Card>
        <Card className="border-0 bg-red-500/10 text-white">
          <CardContent className="p-4 text-center">
            <TrendingDown className="h-5 w-5 mx-auto mb-1 text-red-400" />
            <p className="text-xs text-white/50">Saídas</p>
            <p className="text-lg font-bold text-red-400">R$ {totalExpenses}</p>
          </CardContent>
        </Card>
        <Card className="border-0 bg-(--varzea-blue)/20 text-white">
          <CardContent className="p-4 text-center">
            <DollarSign className="h-5 w-5 mx-auto mb-1 text-(--varzea-blue-light)" />
            <p className="text-xs text-white/50">Saldo</p>
            <p
              className={cn(
                "text-lg font-bold",
                balance >= 0 ? "text-(--varzea-green)" : "text-red-400"
              )}
            >
              R$ {balance}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Transactions */}
      <Card className="border-0 bg-linear-to-br from-[#1a1a2e] to-[#0f0f1a] text-white">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <Calendar className="h-5 w-5 text-(--varzea-gold)" />
            Histórico
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {transactions.map((transaction, index) => (
            <div
              key={transaction.id}
              className="flex items-center gap-3 rounded-lg bg-white/5 px-3 py-3 animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-full",
                  transaction.type === "income"
                    ? "bg-green-500/20"
                    : "bg-red-500/20"
                )}
              >
                {transaction.type === "income" ? (
                  <TrendingUp className="h-5 w-5 text-green-400" />
                ) : (
                  <TrendingDown className="h-5 w-5 text-red-400" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">
                  {transaction.description}
                </p>
                <div className="flex items-center gap-2 mt-0.5">
                  <Badge className="text-[10px] bg-white/10 text-white/50 border-0">
                    {categoryLabels[transaction.category]}
                  </Badge>
                  <span className="text-xs text-white/40">
                    {transaction.date}
                  </span>
                </div>
              </div>

              <span
                className={cn(
                  "font-semibold",
                  transaction.type === "income"
                    ? "text-green-400"
                    : "text-red-400"
                )}
              >
                {transaction.type === "income" ? "+" : ""}R${" "}
                {Math.abs(transaction.amount)}
              </span>
            </div>
          ))}
        </CardContent>
      </Card>
    </>
  );
}
