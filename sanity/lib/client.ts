import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId, useCdn } from '../env'

export const client = createClient({
  apiVersion,
  dataset,
  projectId,
  useCdn, //? false if you want to ensure fresh data: https://www.sanity.io/help/js-client-cdn-configuration
  perspective: 'published' //? prevent draft changes from being accidentally published
})