import { client } from "./client";
import { gql } from "graphql-request";

export function getJobs() {
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
  return client.request(document);
}

export function getJobDetails(jobId) {
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
  return client.request(document, { id: jobId });
}

export function getCompanyDetails(companyId) {
  const document = gql`
    query companyDetails($id: ID!) {
      company(id: $id) {
        id
        name
        description
      }
    }
  `;

  return client.request(document, { id: companyId });
}

export function getCompanyDetailsWithJobs(companyId) {
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
  return client.request(document, { id: companyId });
}
