import assert from "node:assert/strict";
import { fork } from "node:child_process";
import * as fs from "node:fs";
import * as os from "node:os";
import * as path from "node:path";

const app = path.resolve("bin/app");
// Matches the path baked into the Gren app (FileSystem.tmpDirectory + filename).
const file = path.join(os.tmpdir(), "gren-file-system-append.txt");

describe("FileSystem", () => {
  it("appends written bytes after existing content", (done) => {
    fs.writeFileSync(file, "first\n");
    const child = fork(app, ["Append"], { silent: true });
    child.on("exit", (code) => {
      assert.equal(code, 0);
      assert.equal(fs.readFileSync(file, "utf8"), "first\nsecond\n");
      if (fs.existsSync(file)) fs.unlinkSync(file);
      done();
    });
  });
});
