function Cat(name, url) {
  this.name = name;
  this.url = url;
  this.count = 0;
}

Cat.prototype.getName = function() {
  return this.name;
}

Cat.prototype.getUrl = function() {
  return this.url;
}

Cat.prototype.getCount = function() {
  return this.count;
}

Cat.prototype.increaseCount = function() {
  this.count += 1;
}
