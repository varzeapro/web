import { db } from "./index";
import { positions } from "./schema";
import "dotenv/config";

async function seed() {
  console.log("Seeding positions...");

  const values = [
    { id: 1, nome: "Goleiro" },
    { id: 2, nome: "Zagueiro" },
    { id: 3, nome: "Lateral" },
    { id: 4, nome: "Meio-Campo" },
    { id: 5, nome: "Atacante" },
  ];

  await db
    .insert(positions)
    .values(values)
    .onDuplicateKeyUpdate({ set: { nome: "nome" } });

  console.log("Positions seeded!");
  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
