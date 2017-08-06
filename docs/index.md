# Add comments to any webpage

## Installation and usage
Simply include the gh-comments JS/CSS files and paste the following snippet where you want your comment section:
```html
<div id="gh-comments">
    <script>
      githubComments({
        user: 'tipsy', // <- your github-username
        repo: 'gh-comments', // <- your github-repo
        issueNr: 1 // <- your issue number
      });
  </script>
</div>
```

You need to create one issue per comments section. All comments from the issue will be fetched and put into the `<div id="gh-comments"></div>` tag. By default, the comments are styled just like GitHub comments, but you can easily switch out the CSS.

### NPM
...

## Limitations
The plugin uses the official GitHub API, which has a rate-limit of 60 request per IP per hour, meaning that your users would have to reload the plugin more than 60 times in one hour in order to hit the rate-limit.

## Browser support
All the way down to IE9.
