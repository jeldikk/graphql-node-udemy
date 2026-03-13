import { getUser } from "../db/users.js";

export async function resolverContext({ req }) {
  const { auth } = req;
  if (auth) {
    const user = await getUser(auth.sub);
    return { user };
  }

  return {};
}
