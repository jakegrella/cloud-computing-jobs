import React from 'react'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config';
import { Company, Job } from '@/payload-types';
const payload = await getPayloadHMR({ config: configPromise })

interface JobWithDepth extends Job {
    company: Company
}

const Page = async () => {
    const data = await payload.find({
        collection: 'jobs'
    });
    const jobs = data.docs as JobWithDepth[]

  return (
      <main>
            {jobs.map((job) => (
                <div key={job.id}>
                    <p>{job.title}</p>
                    <p>{job.company.name}</p>
                </div>
            ))}
      </main>
  )
}

export default Page