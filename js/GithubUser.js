export class GithubUser {
  static search(username) {
    const endpoint = `https://api.github.com/users/${username}`

    return fetch(endpoint)
    .then(userObject => userObject.json())
    .then(userObject => {
      const { login, name, public_repos, followers } = userObject
      return {
        login: login,
        name: name, 
        public_repos: public_repos,
        followers: followers,
      }
    })
  }
}