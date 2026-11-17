import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import Module from "node:module";
import ts from "typescript";

const source = ts.transpileModule(fs.readFileSync(new URL("../src/lib/site.ts", import.meta.url), "utf8"), {
  compilerOptions: { module: ts.ModuleKind.CommonJS },
}).outputText;

function loadSite() {
  const site = new Module("site-test");
  site._compile(source, "site-test.cjs");
  return site.exports;
}

test("site URLs use the deployment origin without trailing slashes", () => {
  const original = process.env.NEXT_PUBLIC_SITE_URL;
  try {
    delete process.env.NEXT_PUBLIC_SITE_URL;
    assert.equal(loadSite().SITE_URL, "https://zolbayrr.com");
    for (const value of ["https://new.zolbayrr.com", "https://new.zolbayrr.com/"]) {
      process.env.NEXT_PUBLIC_SITE_URL = value;
      const { SITE_URL } = loadSite();
      assert.equal(SITE_URL, "https://new.zolbayrr.com");
      assert.equal(`${SITE_URL}/mn`, "https://new.zolbayrr.com/mn");
    }
  } finally {
    if (original === undefined) delete process.env.NEXT_PUBLIC_SITE_URL;
    else process.env.NEXT_PUBLIC_SITE_URL = original;
  }
});
