export default class Tag {
  constructor(title, active = true, user_id = null) {
    this.title = title;
    this.active = active;
    this.user_id = user_id;
  }
}
