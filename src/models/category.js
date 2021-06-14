export default class Category {
  constructor(
    title,
    active = true,
    category_id = null,
    category = null,
    user_id = null
  ) {
    this.title = title;
    this.active = active;
    this.category_id = category_id;
    this.category = category;
    this.user_id = user_id;
  }
}
