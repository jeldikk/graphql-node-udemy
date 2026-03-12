import {
  createJob,
  deleteJob,
  getJob,
  getJobs,
  getJobsByCompany,
  updateJob,
} from "./db/jobs.js";
import { getCompanies, getCompany } from "./db/companies.js";
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
    deleteJob: async (_root, args) => {
      try {
        const job = await deleteJob(args.id);
        return job;
      } catch (err) {
        throw notFoundError(err.message);
      }
    },
    updateJob: async (_root, args) => {
      const { input } = args;
      try {
        const updatedJob = await updateJob({
          id: input.id,
          title: input.title,
          description: input.description,
        });
        return updatedJob;
      } catch (err) {
        throw notFoundError(err.message);
      }
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
