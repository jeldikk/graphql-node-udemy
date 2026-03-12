import { gql } from "graphql-request";
import { client } from "./client";

export function createJob({ title, description }) {
  const document = gql`
    mutation CreateJob($input: CreateJobInput!) {
      job: createJob(input: $input) {
        id
        title
        description
      }
    }
  `;
  return client.request(document, { input: { title, description } });
}
