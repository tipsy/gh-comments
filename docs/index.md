# Add comments to any webpage

Simply include the gh-comments JS/CSS files and call the plugin with your username, repo-name, and the issue number:
```html
<div id="gh-comments">
    <script>
      githubComments({
        user: 'tipsy', 
        repo: 'gh-comments', 
        issueNr: 1
      });
  </script>
</div>
```
You need to create one issue per webpage you want to add comments to. All comments from the issue will be fetched and put into the `<div id="gh-comments"></div>` tag. By default, the comments are styled just like GitHub comments, but you can easily switch out the CSS.

## Limitations
The plugin uses the official GitHub API, which has a rate-limit of 60 request per IP per hour, meaning that your users would have to reload the plugin more than 60 times in one hour in order to hit the rate-limit.

## Browser support
All the way down to IE9.
