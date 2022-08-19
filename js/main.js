// classe da logica dos dados
class Favorites {
  constructor(root) {
    this.page = document.querySelector(root)
  }

  load() {
    this.entries = [
      {
        login: 'guilheermeff',
        name: 'Guilherme Fernandes',
        public_repos: 30,
        followers: 50
      },{}]
  }
}

class FavoritesView extends Favorites {
  constructor(root) {
    super(root)
    this.tbody = this.page.querySelector('table tbody')
  }

  createRow() {
    const tr = document.createElement('tr')

    tr.innerHTML = `
    <td class="user">
      <img src="https://github.com/guilheermeff.png" alt="Imagem de guilheermeff">
      <a href="https://github.com/guilheermeff" target="_blank">
        <p>Guilherme Fernandes</p>
        <span>/guilheermeff</span>
      </a>
    </td>
    <td class="repositories">
      76
    </td>
    <td class="followers">
      9589
    </td>
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