import { GithubUser } from "./Githubuser.js";
// classe da logica dos dados
class Favorites {
  constructor(root) {
    this.page = document.querySelector(root)
    this.load()
  }

  load() {
    console.log(GithubUser.search('guilheermeff'))
    // this.entries = [
    //   {
    //     login: 'guilheermeff',
    //     name: 'Guilherme Fernandes',
    //     public_repos: 30,
    //     followers: 50
    //   },
    //   {
    //     login: 'juliuscaezarff',
    //     name: 'Julius Caezar',
    //     public_repos: 344,
    //     followers: 16
    //   }]
  }
}

class FavoritesView extends Favorites {
  constructor(root) {
    super(root)
    this.tbody = this.page.querySelector('table tbody')
  }

  addRow() {
    this.removeAllTr()
    this.entries.forEach(user => {
      const row = this.createRow()

      row.querySelector('.user img').src = `https://github.com/${user.login}.png`
      row.querySelector('.user img').alt = `imagem de ${user.name}`
      row.querySelector('.user a').href = `https://github.com/${user.login}`
      row.querySelector('.user p').textContent = user.name
      row.querySelector('.user span').textContent = user.login
      row.querySelector('.repositories').textContent = user.public_repos
      row.querySelector('.followers').textContent = user.followers

      this.tbody.append(row)
    })
  }

  createRow() {
    const tr = document.createElement('tr')

    tr.innerHTML = `
    <td class="user">
      <img src="" alt="">
      <a href="" target="_blank">
        <p></p>
        <span></span>
      </a>
    </td>
    <td class="repositories"></td>
    <td class="followers"></td>
    <td class="action">
      <button class="remove">&times;</button>
    </td>  
    `
    return tr
  }

  removeAllTr() {
    this.tbody.querySelectorAll('tr').forEach(tr => {tr.remove()})
  }
}

new FavoritesView('#page')