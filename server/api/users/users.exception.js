class InvalidFirstName extends Error {
  constructor(message) {
    super(message);
    this.name = "InvalidFirstName";
  }
}

class InvalidLastName extends Error {
  constructor(message) {
    super(message);
    this.name = "InvalidLastName";
  }
}

class InvalidUserName extends Error {
  constructor(message) {
    super(message);
    this.name = "InvalidUserName";
  }
}

class InvalidEmail extends Error {
  constructor(message) {
    super(message);
    this.name = "InvalidEmail";
  }
}

class InvalidName extends Error {
  constructor(message) {
    super(message);
    this.name = "InvalidName";
  }
}

class UserAlreadyExists extends Error {
  constructor(message) {
    super(message);
    this.name = "UserAlreadyExists";
  }
}

class EmailAlreadyExists extends Error {
  constructor(message) {
    super(message);
    this.name = "EmailAlreadyExists";
  }
}

class UserNotExists extends Error {
  constructor(message) {
    super(message);
    this.name = "UserNotExists";
  }
}

export {
  InvalidFirstName,
  InvalidLastName,
  InvalidUserName,
  InvalidEmail,
  InvalidName,
  UserAlreadyExists,
  EmailAlreadyExists,
  UserNotExists,
};
