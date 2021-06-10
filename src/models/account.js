export default class Account {
  constructor(title, active = true, investment = false, user_id = null) {
    this.title = title;
    this.active = active;
    this.investment = investment;
    self.user_id = user_id;
  }
}
