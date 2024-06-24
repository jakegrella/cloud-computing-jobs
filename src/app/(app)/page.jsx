import React from 'react'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config';
import { Button } from '@/components/ui/button';
const payload = await getPayloadHMR({ config: configPromise })

const Page = async () => {
    const { docs: jobs} = await payload.find({
        collection: 'jobs',
        depth: 2
    });

  return (
      <main className='bg-red-500'>
            {jobs.map((job) => (
                <div key={job.id}>
                    <p className='text-3xl font-bold underline'>{job.title}</p>
                    {typeof job.company !== 'number' && job.company.name}
                </div>
            ))}
            <Button>Click me</Button>
      </main>
  )
}

export default Page