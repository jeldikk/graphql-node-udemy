import { createJob, getJob, getJobs, getJobsByCompany } from "./db/jobs.js";
import { getCompanies, getCompany } from "./db/companies.js";
import { GraphQLError } from "graphql";
import { notFoundError } from "./utils/error.utils.js";

export const resolvers = {
  Query: {
    greeting: () => "Hello, World",
    job: async (_root, qargs) => {
      console.log({ _root, qargs });
      const job = await getJob(qargs.id);
      if (!job) {
        throw notFoundError("No Job found with id: " + qargs.id);
      }
      return job;
    },
    jobs: async () => getJobs(),
    company: async (_root, qargs) => {
      const company = await getCompany(qargs.id);
      if (!company) {
        throw notFoundError("No Company found with id: " + qargs.id);
      }

      console.log({ company });
      return company;
    },
    companies: () => getCompanies(),
  },

  Mutation: {
    createJob: (_root, args) => {
      console.log({ args });
      const { input } = args;
      const companyId = "FjcJCHJALA4i";
      return createJob({
        companyId,
        title: input.title,
        description: input.description,
      });
    },
  },
  Job: {
    title: (job) => job.title,
    date: (job) => job.createdAt.split("T")[0],
    timestamp: (job) => job.createdAt.split("T")[1].split(".")[0],
    company: (job) => {
      console.log({ job });
      return getCompany(job.companyId);
    },
  },
  Company: {
    jobs: async (company) => {
      console.log({ company });
      return getJobsByCompany(company.id);
    },
  },
};
