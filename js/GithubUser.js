export class GithubUser {
  static search(username) {
    const endpoint = `https://api.github.com/users/${username}`

    fetch(endpoint)
    .then(userObject => userObject.json())
    .then(userObject => {
      
      { login, name, public_repos, followers } = userObject
    
      // CONTINUAR DAQUI 19/08
    })
  }
}