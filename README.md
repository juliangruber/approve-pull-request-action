# find-pull-request-action

A GitHub Action for finding pull requests.

## Usage

```yaml
steps:
  - uses: juliangruber/find-pull-request-action@master
    id: find-pull-request
    with:
      github-token: ${{ secrets.GITHUB_TOKEN }}
      branch: my-branch-name
  - run: echo "Your Pull Request has number ${number}"
    if: success() && steps.find-pull-request.outputs.number
    env:
      number: ${{ steps.find-pull-request.outputs.number }}
```

Currently this will find a single open PR based on given `branch` input. For more options please open an issue.

## License

MIT
