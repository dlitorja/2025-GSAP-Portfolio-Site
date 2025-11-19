const GITHUB_API_URL = 'https://api.github.com'
const GITHUB_USERNAME = process.env.GITHUB_USERNAME || 'github' // fallback username
const GITHUB_TOKEN = process.env.GITHUB_TOKEN // optional for higher rate limits

export interface GitHubRepo {
  id: number
  name: string
  full_name: string
  description: string | null
  html_url: string
  homepage: string | null
  language: string | null
  stargazers_count: number
  forks_count: number
  fork: boolean
  topics: string[]
  created_at: string
  updated_at: string
  pushed_at: string
}

export interface GitHubUser {
  login: string
  name: string
  avatar_url: string
  bio: string | null
  public_repos: number
  followers: number
  following: number
}

const headers: HeadersInit = {
  Accept: 'application/vnd.github.v3+json',
}

if (GITHUB_TOKEN) {
  headers['Authorization'] = `Bearer ${GITHUB_TOKEN}`
}

export async function getGitHubUser(username: string = GITHUB_USERNAME): Promise<GitHubUser | null> {
  try {
    const response = await fetch(`${GITHUB_API_URL}/users/${username}`, {
      headers,
      next: { revalidate: 3600 }, // Cache for 1 hour
    })

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Error fetching GitHub user:', error)
    return null
  }
}

export async function getGitHubRepos(
  username: string = GITHUB_USERNAME,
  limit: number = 6
): Promise<GitHubRepo[]> {
  try {
    const response = await fetch(
      `${GITHUB_API_URL}/users/${username}/repos?sort=updated&per_page=${limit}`,
      {
        headers,
        next: { revalidate: 3600 }, // Cache for 1 hour
      }
    )

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.statusText}`)
    }

    const repos: GitHubRepo[] = await response.json()
    
    // Filter out forks and sort by stars
    return repos
      .filter((repo) => !repo.fork)
      .sort((a, b) => b.stargazers_count - a.stargazers_count)
      .slice(0, limit)
  } catch (error) {
    console.error('Error fetching GitHub repos:', error)
    return []
  }
}

export async function getPinnedRepos(username: string = GITHUB_USERNAME): Promise<GitHubRepo[]> {
  // Note: GitHub's GraphQL API is better for pinned repos, but REST API is simpler
  // This returns top repos as an alternative
  return getGitHubRepos(username, 6)
}

