import { GithubUser } from "./Githubuser.js"
import { emptyMode } from "./emptyMode.js"
export class Favorites {
  constructor(root) {
    this.page = document.querySelector(root)
    this.tbody = this.page.querySelector('table tbody')
    this.empty = emptyMode()
    this.load()
  }

  load() {
    const laodLocalStorage = JSON.parse(localStorage.getItem('@gitfav-2.0:'))
    const emptyArray = []
    this.entries =  laodLocalStorage || emptyArray
    console.log(this.entries)
    
    if(laodLocalStorage[0] === undefined) {
      this.tbody.append(this.empty)
    }
  }

  async add(user) {
    try {
      const userExist = this.entries.find(entry => entry.login === user)
      if(userExist) {
        throw new Error('O usuário informado já está cadastrado!')
      }

      const userReturn = await GithubUser.search(user)

      if(userReturn.login === undefined) {
        throw new Error('Usuário não encontrado!')
      }

      this.entries = [userReturn, ...this.entries]
      this.update()
      this.save()
    } catch(error) {
      alert(error.message)
    }
  }

  save() {
    localStorage.setItem('@gitfav-2.0:', JSON.stringify(this.entries))
  }

  delete(user) {
    const filteredEntries = this.entries.filter(entry => entry.login !== user.login)
    this.entries = filteredEntries
    this.update()
    this.save()
  }
}

export class FavoritesView extends Favorites {
  constructor(root) {
    super(root)
    this.entry = this.page.querySelector('input')

    this.addRow()
    this.update()
  }

  update() {
    this.removeAllTr()
    this.entries.forEach(user => {
      const row = this.createRow()

      row.querySelector('.user img').src = `https://github.com/${user.login}.png`
      row.querySelector('.user img').alt = `imagem de ${user.name}`
      row.querySelector('.user a').href = `https://github.com/${user.login}`
      row.querySelector('.user p').textContent = user.name
      row.querySelector('.user span').textContent = `/${user.login}`
      row.querySelector('.repositories').textContent = user.public_repos
      row.querySelector('.followers').textContent = user.followers

      row.querySelector('.remove').onclick = () => {
        const confirmation = confirm('Tem certeza que deseja remover este usuário?')
        if(confirmation) {
          this.delete(user)
        }
      }
      this.tbody.append(row)
    })
  }

  addRow() {
    const favButton = this.page.querySelector('button')
    
    favButton.onclick = () => {
      const username = this.entry.value
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
      <button class="remove">Remover</button>
    </td>  
    `
    return tr
  }

  removeAllTr() {
    this.tbody.querySelectorAll('tr').forEach(tr => {tr.remove()})
  }
}