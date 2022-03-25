import sanityClient from "@sanity/client";

// TODO: Sanity should require authentication; Use Sanity Auth Token.

export default sanityClient({
  projectId: "nnibj6rf",
  dataset: "production",
  useCdn: process.env.NODE_ENV === 'production'
});
