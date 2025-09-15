import * as bcrypt from 'bcrypt';

export async function hashString(text: string): Promise<string> {
  // const saltOrRounds = 10;
  return bcrypt.hash(text, '$2b$10$gp8rZogl7dcSfn2yALwmIO');
}

export async function compareHashString(enteredText: string, hashText: string): Promise<boolean> {
  return bcrypt.compare(enteredText, hashText);
}
