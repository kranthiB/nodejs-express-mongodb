class InvalidAttribute extends Error {
  constructor(message) {
    super(message);
    this.name = "InvalidAttribute";
  }
}

class AttributeAlreadyExists extends Error {
  constructor(message) {
    super(message);
    this.name = "AttributeAlreadyExists";
  }
}

class ResourceNotExists extends Error {
  constructor(message) {
    super(message);
    this.name = "ResourceNotExists";
  }
}

export { InvalidAttribute, AttributeAlreadyExists, ResourceNotExists };
