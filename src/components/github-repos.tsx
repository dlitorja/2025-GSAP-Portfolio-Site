import { getGitHubRepos } from '@/lib/github'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Star, GitFork, ExternalLink } from 'lucide-react'

interface GitHubReposProps {
  username?: string
  limit?: number
}

export async function GitHubRepos({ username, limit = 6 }: GitHubReposProps) {
  const repos = await getGitHubRepos(username, limit)

  if (repos.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <p>No repositories found. Configure GitHub credentials in your environment variables.</p>
      </div>
    )
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {repos.map((repo) => (
        <a
          key={repo.id}
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="block"
        >
          <Card className="h-full hover:shadow-lg transition-shadow duration-300 group">
            <CardHeader>
              <div className="flex items-start justify-between gap-2">
                <CardTitle className="text-lg group-hover:text-primary transition-colors">
                  {repo.name}
                </CardTitle>
                <ExternalLink className="h-4 w-4 text-muted-foreground" />
              </div>
              <CardDescription className="line-clamp-2">
                {repo.description || 'No description provided'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {/* Language and Topics */}
                <div className="flex gap-2 flex-wrap">
                  {repo.language && (
                    <Badge variant="secondary">{repo.language}</Badge>
                  )}
                  {repo.topics.slice(0, 2).map((topic) => (
                    <Badge key={topic} variant="outline">
                      {topic}
                    </Badge>
                  ))}
                </div>

                {/* Stats */}
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4" />
                    <span>{repo.stargazers_count}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <GitFork className="h-4 w-4" />
                    <span>{repo.forks_count}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </a>
      ))}
    </div>
  )
}

