import { DeepClient } from "@deep-foundation/deeplinks/imports/client";
import { generateApolloClient } from '@deep-foundation/hasura/client';
import * as dotenv from 'dotenv';
dotenv.config();

async function installPackage() {

  if(!process.env.GQL_URL) {
    throw new Error(`GQL_URL environment variable in .env file must be set`)
  }
  const gqlUrl = process.env.GQL_URL;

  const apolloClient = generateApolloClient({
    path: gqlUrl || '', // <<= HERE PATH TO UPDATE
    ssl: gqlUrl.contains('localhost'),
  });
  const unloginedDeep = new DeepClient({ apolloClient });
  const guest = await unloginedDeep.guest();
  const guestDeep = new DeepClient({ deep: unloginedDeep, ...guest });
  const admin = await guestDeep.login({
    linkId: await guestDeep.id('deep', 'admin'),
  });
  const deep = new DeepClient({ deep: guestDeep, ...admin });

  const typeTypeLinkId = await deep.id("@deep-foundation/core", "Type");
  const anyTypeLinkId = await deep.id("@deep-foundation/core", "Any");
  const containTypeLinkId = await deep.id("@deep-foundation/core", "Contain");
  const packageTypeLinkId = await deep.id("@deep-foundation/core", "Package");
  const joinTypeLinkId = await deep.id("@deep-foundation/core", "Join");
  const valueTypeLinkId = await deep.id("@deep-foundation/core", "Value");
  const stringTypeLinkId = await deep.id("@deep-foundation/core", "String");
  const numberTypeLinkId = await deep.id("@deep-foundation/core", "Number");
  
  // TODO
  
  
}

installPackage();
