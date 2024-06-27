import React from 'react'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const payload = await getPayloadHMR({ config: configPromise })

export default async function Page() {
    const { docs: jobs} = await payload.find({
        collection: 'jobs',
        depth: 2
    });

  return (
      <main>
        <div className='flex flex-col max-w-lg my-0 mx-auto'>
            <p className='mb-4'>Click on any job to be taken to the company&apos;s job posting page.</p>
            <div className='flex flex-col w-full gap-4'>
                {jobs.map((job) => (
                    <a key={job.id} href={job.externalPostingLink} target='_blank' >
                        <Card className='flex flex-nowrap hover:bg-accent hover:text-accent-foreground'>
                            <div className='pt-4 pl-4'>
                                <Image
                                    src={job.company.logo.sizes.thumbnail.url}
                                    width={job.company.logo.sizes.thumbnail.width}
                                    height={job.company.logo.sizes.thumbnail.height}
                                    alt={job.company.logo.altText}
                                />
                            </div>
                            <div>
                            <CardHeader>
                                    <CardTitle>{job.title}</CardTitle>
                                    <CardDescription>{typeof job.company !== 'number' && job.company.name}</CardDescription>
                            </CardHeader>
                            <CardFooter className='flex flex-nowrap'>
                                <p>Los Angeles, CA</p>
                                <p>Posted 4hrs ago</p>
                            </CardFooter>
                            </div>
                            {/* <CardContent className='flex flex-nowrap gap-2'>
                                
                                <div className='flex flex-col'>
                                </div>
                            </CardContent> */}
                        </Card>
                    </a>
                ))}
            </div>
        </div>
      </main>
  )
};
