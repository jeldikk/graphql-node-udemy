import { gql } from "@apollo/client";
import { apolloClient } from "./client";

export async function createJob({ title, description }) {
  const document = gql`
    mutation CreateJob($input: CreateJobInput!) {
      job: createJob(input: $input) {
        id
        title
        description
      }
    }
  `;
  const result = await apolloClient.mutate({
    mutation: document,
    variables: { input: { title, description } },
  });
  return result.data;
}
