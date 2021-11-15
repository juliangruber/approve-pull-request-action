'use strict'

const core = require('@actions/core')
const { GitHub, context } = require('@actions/github')

const main = async () => {
  const token = core.getInput('github-token')
  const number = core.getInput('number')
  const repo = core.getInput('repo')

  var repoValue
  if (!repo) {
    repoValue = context.repo
  } else {
    const [owner, repo] = repo.split('/')
    repoValue = {owner, repo}
  }

  const octokit = new GitHub(token)

  await octokit.pulls.createReview({
    ...repoValue,
    pull_number: number,
    event: 'APPROVE'
  })
}

main().catch(err => core.setFailed(err.message))
