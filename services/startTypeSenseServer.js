import "../loadEnv.js";
import { exec } from "child_process";

const API_KEY = process.env.TYPESENSE_API_KEY;
const PORT = 8108;

const command = `docker run -d -p ${PORT}:8108 -v/tmp/data:/data typesense/typesense:0.23.1 --data-dir /data --api-key=${API_KEY} --listen-port ${PORT}  --enable-cors`;

exec(command, (err, stdout, stderr) => {
  if (!err && !stderr) console.log("Typesense Server is running...");

  if (err) {
    console.log("Error running server: ", err);
  }

  if (stderr) {
    console.log("Error running server: ", stderr);
  }

  if (stdout) {
    console.log("Server output: ", stdout);
  }
});
