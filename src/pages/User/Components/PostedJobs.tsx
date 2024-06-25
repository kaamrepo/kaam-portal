
import { useEffect } from "react";
import useJobApplications from "../../../store/jobapplications.store";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/fancy-example.css';

interface PostedJobsProps {
  user: {
    _id?: string;
  };
}

export const PostedJobs = ({ user }: PostedJobsProps) => {
  const { jobapplications, getJobApplications } = useJobApplications();
console.log("user",user);

  useEffect(() => {
    if (user?._id) {
      getJobApplications({ employerid: user._id });
    }
  }, [user?._id, getJobApplications]);

  return (
    <div className="w-100">
      <Accordion allowZeroExpanded>
        {jobapplications.map((application: any) => (
          <AccordionItem key={application._id}>
            <AccordionItemHeading> 
              <AccordionItemButton>
                {application.jobDetails.jobtitle}
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              <div className="my-2">
                <h3><u>Job Details:</u> </h3>
                <p><strong>Description:</strong> {application.jobDetails.description}</p>
                <p><strong>Salary:</strong> {application.jobDetails.salary}</p>
                <p><strong>Location:</strong> {application.jobDetails.location.fulladdress}, {application.jobDetails.location.city}, {application.jobDetails.location.state} - {application.jobDetails.location.pincode}</p>
              </div>
              <div>
                <h3>Applicant Details</h3>
                <p><strong>Name:</strong> {application.applicantDetails.firstname} {application.applicantDetails.lastname}</p>
              </div>
              <div>
                <h3>Employer Details</h3>
                <p><strong>Name:</strong> {application.employerDetails.firstname} {application.employerDetails.lastname}</p>
              </div>
            </AccordionItemPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};
