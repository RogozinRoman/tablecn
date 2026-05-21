import { spawn } from "node:child_process";
import { writeFileSync, appendFileSync } from "node:fs";

const log = (msg) => appendFileSync("setup.log", `${new Date().toISOString()} seed: ${msg}\n`);

writeFileSync("setup-seed.log", "");
const logSeed = (msg) => appendFileSync("setup-seed.log", `${msg}\n`);

logSeed("starting seed");

const child = spawn(
  "node",
  ["--import", "tsx", "./src/db/seed.ts"],
  {
    cwd: process.cwd(),
    env: {
      ...process.env,
      DATABASE_URL:
        process.env.DATABASE_URL ??
        "postgresql://tablecn:securepassword@localhost:5432/tablecn",
      NODE_ENV: "development",
    },
    stdio: ["ignore", "pipe", "pipe"],
  },
);

child.stdout?.on("data", (d) => logSeed(`stdout: ${d}`));
child.stderr?.on("data", (d) => logSeed(`stderr: ${d}`));
child.on("exit", (code) => logSeed(`exit: ${code}`));
