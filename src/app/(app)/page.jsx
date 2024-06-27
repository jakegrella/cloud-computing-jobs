import React from 'react'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config';
import Image from 'next/image';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { locationsRender } from '@/lib/locationsRender';
import { timeAgo } from '@/lib/timeAgo';

const payload = await getPayloadHMR({ config: configPromise })

export default async function Page() {
    const { docs: jobs } = await payload.find({
        collection: 'jobs',
        where: { publishedDate: { not_equals: null } },
        depth: 2
    });

    return (
        <main>
            <div className='flex flex-col max-w-lg my-0 mx-auto'>
                <p className='mb-4 text-sm'>Click on any job to be taken to the company&apos;s job posting page.</p>
                <div className='flex flex-col w-full gap-4'>
                    {jobs.map((job) => (
                        <a key={job.id} href={job.externalPostingLink} target='_blank'>
                            <Card className='flex flex-nowrap w-full hover:bg-accent hover:text-accent-foreground'>
                                <div className='pt-4 pl-4'>
                                    <Image
                                        src={job.company.logo.sizes.thumbnail.url}
                                        width={job.company.logo.sizes.thumbnail.width}
                                        height={job.company.logo.sizes.thumbnail.height}
                                        alt={job.company.logo.altText}
                                        className='h-[56px] w-[56px] rounded-sm'
                                    />
                                </div>
                                <div className='grow'>
                                    <CardHeader>
                                        <CardTitle>{job.title}</CardTitle>
                                        <CardDescription>{typeof job.company !== 'number' && job.company.name}</CardDescription>
                                    </CardHeader>
                                    <CardFooter className='flex flex-nowrap w-full justify-between'>
                                        <p className='text-xs text-muted-foreground'>{locationsRender(job.locations)}</p>
                                        <p className='text-xs text-muted-foreground'>Posted {timeAgo(job.publishedDate)}</p>
                                    </CardFooter>
                                </div>
                            </Card>
                        </a>
                    ))}
                </div>
            </div>
        </main>
    )
};
