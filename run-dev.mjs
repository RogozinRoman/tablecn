import { spawn } from "node:child_process";
import { writeFileSync, appendFileSync } from "node:fs";

const log = (msg) => appendFileSync("setup.log", `${new Date().toISOString()} ${msg}\n`);

writeFileSync("setup.log", "");
log("starting next dev");

const child = spawn(
  "node",
  ["./node_modules/next/dist/bin/next", "dev", "-p", "3000"],
  {
    cwd: process.cwd(),
    env: {
      ...process.env,
      DATABASE_URL:
        process.env.DATABASE_URL ??
        "postgresql://tablecn:securepassword@localhost:5432/tablecn",
      NODE_ENV: "development",
    },
    detached: true,
    stdio: ["ignore", "open", "open"],
  },
);

child.stdout?.on("data", (d) => log(`stdout: ${d}`));
child.stderr?.on("data", (d) => log(`stderr: ${d}`));
child.on("error", (e) => log(`error: ${e}`));
child.on("exit", (code) => log(`exit: ${code}`));

child.unref();
log(`pid: ${child.pid}`);
