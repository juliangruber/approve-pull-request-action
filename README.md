# approve-pull-request-action

A GitHub Action for approving pull requests.

## Usage

```yaml
steps:
  - uses: juliangruber/approve-pull-request-action@master
    with:
      github-token: ${{ secrets.GITHUB_TOKEN }}
      number: 1
```

## License

MIT
