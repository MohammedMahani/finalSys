class CustomeError {
  constructor(status, message) {
    this.status = status;
    this.msg = message;
  }
}

module.exports = CustomeError;
