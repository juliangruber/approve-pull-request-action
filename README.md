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

## Related

- [find-pull-request-action](https://github.com/juliangruber/find-pull-request-action) &mdash; Find a Pull Request
- [merge-pull-request-action](https://github.com/juliangruber/merge-pull-request-action) &mdash; Merge a Pull Request

## License

MIT
