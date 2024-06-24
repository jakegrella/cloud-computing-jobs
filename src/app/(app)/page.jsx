import React from 'react'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config';
const payload = await getPayloadHMR({ config: configPromise })

const Page = async () => {
    const { docs: jobs} = await payload.find({
        collection: 'jobs',
        depth: 2
    });

  return (
      <main>
            {jobs.map((job) => (
                <div key={job.id}>
                    <p>{job.title}</p>
                    {typeof job.company !== 'number' && job.company.name}
                </div>
            ))}
      </main>
  )
}

export default Page