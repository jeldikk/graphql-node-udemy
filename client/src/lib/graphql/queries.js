import { apolloClient } from "./client";
import { gql } from "@apollo/client";

export async function getJobs() {
  const document = gql`
    query {
      jobs {
        id
        title
        description
        date
        company {
          name
        }
      }
    }
  `;
  //   return client.request(document);
  const result = await apolloClient.query({ query: document });
  //   console.log({ result });
  return result.data;
}

export async function getJobDetails(jobId) {
  console.log({ jobId });
  const document = gql`
    query JobDetails($id: ID!) {
      job(id: $id) {
        id
        title
        description
        date
        company {
          id
          name
        }
      }
    }
  `;
  //   return client.request(document, { id: jobId });
  const result = await apolloClient.query({
    query: document,
    variables: { id: jobId },
  });
  console.log({ result });
  return result.data;
}

export async function getCompanyDetails(companyId) {
  const document = gql`
    query companyDetails($id: ID!) {
      company(id: $id) {
        id
        name
        description
      }
    }
  `;

  //   return client.request(document, { id: companyId });
  const result = await apolloClient.query({
    query: document,
    variables: { id: companyId },
  });
  return result.data;
}

export async function getCompanyDetailsWithJobs(companyId) {
  const document = gql`
    query comapnyDetailsWithJobs($id: ID!) {
      company(id: $id) {
        id
        name
        description
        jobs {
          id
          title
          date
          description
        }
      }
    }
  `;
  //   return client.request(document, { id: companyId });
  const result = await apolloClient.query({
    query: document,
    variables: { id: companyId },
  });
  return result.data;
}
