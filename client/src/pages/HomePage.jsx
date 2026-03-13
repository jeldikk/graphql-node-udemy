import { useEffect, useState } from "react";
import JobList from "../components/JobList";
import { getJobs } from "../lib/graphql/queries";
// import { jobs } from "../lib/fake-data";

function HomePage() {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(true);
    getJobs().then((res) => {
      console.log({ res });
      setJobs(res.jobs);
      setIsLoading(false);
    });
  }, []);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <h1 className="title">Job Board</h1>
      <JobList jobs={jobs} />
    </div>
  );
}

export default HomePage;
