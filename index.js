'use strict'

const core = require('@actions/core')
const github = require('@actions/github')

const main = async () => {
  const token = core.getInput('github-token')
  const number = core.getInput('number')
  const repoString = core.getInput('repo')

  let repoObject
  if (repoString) {
    const [owner, repo] = repoString.split('/')
    repoObject = { owner, repo }
  } else {
    repoObject = github.context.repo
  }

  const octokit = github.getOctokit(token)

  await octokit.rest.pulls.createReview({
    ...repoObject,
    pull_number: number,
    event: 'APPROVE'
  })
}

main().catch(err => core.setFailed(err.message))
