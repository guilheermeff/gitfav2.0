// classe da logica dos dados
class Favorites {
  constructor(root) {
    this.page = document.querySelector(root)
  }
}

class FavoritesView extends Favorites {
  constructor(root) {
    super(root)
  }

  removeAllTr() {
    this.tbody = this.page.querySelector('table tbody')
    this.tbody.querySelectorAll('tr').forEach(tr => {tr.remove()})
  }
}

new FavoritesView('#page')