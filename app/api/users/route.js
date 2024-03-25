import { faker } from "@faker-js/faker";
import { setTimeout } from "timers/promises";

export async function GET(req) {
  const users = Array.from({ length: 20 }, () => ({
    id: faker.string.uuid(),
    name: faker.internet.userName(),
    email: faker.internet.email(),
  }));

  // Sleep for 5 seconds
  // await new Promise((resolve) => setTimeout(resolve, 5000));
  await setTimeout(500);

  return Response.json(users);
}
