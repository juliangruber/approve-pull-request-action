'use strict'

const core = require('@actions/core')
const { GitHub, context } = require('@actions/github')

const main = async () => {
  const token = core.getInput('github-token')
  const number = core.getInput('number')
  const octokit = new GitHub(token)

  // Check for existing approvals before approving a second time
  const { data: reviews } = await octokit.pulls.listReviews({
    ...context.repo,
    pull_number: number
  })
  const user = await octokit.users.getAuthenticated()
  const approved = reviews.some(review => review.state === 'APPROVED' && review.user.login === user.login)
  if (approved) return

  // Approve
  await octokit.pulls.createReview({
    ...context.repo,
    pull_number: number,
    event: 'APPROVE'
  })
}

main().catch(err => core.setFailed(err.message))
