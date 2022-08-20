import { GithubUser } from "./Githubuser.js";
// classe da logica dos dados
class Favorites {
  constructor(root) {
    this.page = document.querySelector(root)
    this.load()
  }

  load() {
    this.entries = []
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

  async add(user) {
    const userReturn = await GithubUser.search(user)
    
    this.entries = [userReturn, ...this.entries]
    this.update()

    // CONTINUAR DAQUI 20/08/2022
  }
}

class FavoritesView extends Favorites {
  constructor(root) {
    super(root)
    this.tbody = this.page.querySelector('table tbody')
    this.addRow()
  }

  update() {
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

  addRow() {
    const entry = this.page.querySelector('input')
    const favButton = this.page.querySelector('button')
    
    favButton.onclick = () => {
      const username = entry.value
      this.add(username)
    }
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