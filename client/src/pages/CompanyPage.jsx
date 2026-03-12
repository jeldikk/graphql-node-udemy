import { useParams } from "react-router";
import { useEffect, useState } from "react";
import {
  getCompanyDetails,
  getCompanyDetailsWithJobs,
} from "../lib/graphql/queries";
import { formatDate } from "../lib/formatters";

function CompanyPage() {
  const { companyId } = useParams();
  const [company, setCompany] = useState();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(true);
    getCompanyDetailsWithJobs(companyId).then((res) => {
      setCompany(res.company);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <h1 className="title">{company.name}</h1>
      <div className="box">{company.description}</div>
      <h2 className="title ls-5">Jobs at {company.name}</h2>
      {company.jobs.map((job) => (
        <div className="box" key={job.id}>
          <div className="block has-text-grey">
            Posted: {formatDate(job.date, "long")}
          </div>
          <p className="block">{job.description}</p>
        </div>
      ))}
    </div>
  );
}

export default CompanyPage;
