import * as bcrypt from 'bcrypt';

export async function hashString(text: string): Promise<string> {
  const saltRounds = 10;
  return bcrypt.hash(text, saltRounds);
}

export async function compareHashString(enteredText: string, hashText: string): Promise<boolean> {
  return bcrypt.compare(enteredText, hashText);
}
