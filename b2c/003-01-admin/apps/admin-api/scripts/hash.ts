#!/usr/bin/env ts-node
import * as argon2 from 'argon2';

async function prompt(question: string): Promise<string> {
  return await new Promise((resolve) => {
    process.stdout.write(question);
    process.stdin.setEncoding('utf8');
    process.stdin.once('data', (d) => resolve(String(d).trim()));
  });
}

async function main() {
  const arg = process.argv[2];
  const password = arg ?? (await prompt('Password to hash: '));
  if (!password) {
    console.error('Usage: ts-node scripts/hash.ts <password>');
    process.exit(1);
  }
  const hash = await argon2.hash(password);
  console.log(hash);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
