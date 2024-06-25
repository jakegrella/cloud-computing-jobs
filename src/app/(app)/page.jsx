import React from 'react'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config';
import { Card } from '@/components/ui/card';
import Image from 'next/image';
const payload = await getPayloadHMR({ config: configPromise })

const Page = async () => {
    const { docs: jobs} = await payload.find({
        collection: 'jobs',
        depth: 2
    });

  return (
      <main className='bg-red-500'>
        <p className='text-3xl font-bold underline'>click any card to go to application page</p>
        <div className='flex flex-col max-w-md gap-4'>
            {jobs.map((job) => (
                <Card key={job.id} className='flex flex-nowrap'>
                    {/* co logo */}
                    <Image
                        src={job.company.logo.sizes.thumbnail.url}
                        width={job.company.logo.sizes.thumbnail.width}
                        height={job.company.logo.sizes.thumbnail.height}
                        alt={job.company.logo.altText}
                    />
                    {/* job info */}
                    <div className='flex flex-col'>
                        <p className='text-3xl font-bold underline'>{job.title}</p>
                        {typeof job.company !== 'number' && job.company.name}
                    </div>
                </Card>
            ))}
        </div>
      </main>
  )
}

export default Page