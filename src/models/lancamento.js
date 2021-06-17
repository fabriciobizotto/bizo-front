export default class Lancamento {
  constructor(
    id,
    title,
    dtlcto,
    dtpgto,
    vllcto,
    vlpgto,
    pagar,
    category_id,
    account_id,
    user_id,
    category,
    account,
    despesa,
    tags_ids
  ) {
    (this.id = id),
      (this.title = title),
      (this.dtlcto = dtlcto),
      (this.dtpgto = dtpgto),
      (this.vllcto = vllcto),
      (this.vlpgto = vlpgto),
      (this.pagar = pagar || false),
      (this.category_id = category_id),
      (this.account_id = account_id),
      (this.user_id = user_id),
      (this.category = category),
      (this.account = account),
      (this.despesa = despesa || true),
      (this.tags_ids = tags_ids);
  }
}
