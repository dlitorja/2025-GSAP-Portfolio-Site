import * as prismic from '@prismicio/client'
import { enableAutoPreviews } from '@prismicio/next'

export const repositoryName = process.env.NEXT_PUBLIC_PRISMIC_ENVIRONMENT || 'litorja-portfolio'

export const createClient = (config: prismic.ClientConfig = {}) => {
  const client = prismic.createClient(repositoryName, {
    accessToken: process.env.PRISMIC_ACCESS_TOKEN,
    ...config,
  })

  enableAutoPreviews({
    client,
  })

  return client
}

/**
 * Default revalidation time for Prismic queries (60 seconds)
 * Can be overridden per query
 */
export const DEFAULT_REVALIDATE = 60

