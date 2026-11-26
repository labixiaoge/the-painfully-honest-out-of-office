// The Painfully Honest Out-of-Office
// make.fun competition: u-po-pu-the-painfully-honest-out-of-office-63e7ca0b
// Writes a single out-of-office email auto-reply (one sentence, at most
// 200 characters) to $MAKEFUN_OUTPUT_DIR/entry.txt. Deterministic, no
// network, no input files: the reply is a constant baked into this file.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const REPLY =
  "I'm away until Monday and won't be reading email \u2014 I left with 214 unread messages and no enthusiasm for catching up, so thank you for your patience; please resend anything urgent when I return.";

// The gate allows 1 to 200 characters of UTF-8 text. This reply is 194
// characters, so it passes with room to spare; refuse to write anything
// longer rather than silently handing the judge a clipped sentence.
if ([...REPLY].length > 200 || REPLY.trim().length === 0) {
  throw new Error(`reply must be 1-200 characters, got ${[...REPLY].length}`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), REPLY, "utf8");
console.log(REPLY);
