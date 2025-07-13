// server/scripts/verifyUser.ts
import { db } from '../lib/db';
import { users } from '../../shared/schema';

async function verifyUser(address: string) {
  await db.update(users)
    .set({ isVerified: true })
    .where(users.address.eq(address));
  console.log('User verified!');
}

verifyUser('0xa1f57a6525751ba5194f081f85b2f56625b3f1c3');