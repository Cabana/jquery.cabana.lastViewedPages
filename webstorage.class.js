Storage.prototype.setObject = function(key, value) {
  this.setItem(key, JSON.stringify(value));
}
Storage.prototype.getObject = function(key) {
  var value = this.getItem(key);
  return value && JSON.parse(value);
}

Array.prototype.remove = function(from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
}

function DataSet(objName) {

  init();

  this.all = function(){
    return localStorage.getObject(objName);
  };

  this.save = function(new_data){
    var data = [];
    if ( this.all() && this.all().length > 0 )
      data = this.all();

    new_data.id = nextId(this);

    data.push(new_data);
    localStorage.setObject(objName, data);
    return this.find(new_data.id);
  };

  this.destroy = function(id){
    var data = this.all();
    for (var i = 0; i < data.length; i += 1) {
      if ( data[i].id == id ) {
        var deletedData = data[i];
        data.remove(i);
      }
    }
    localStorage.setObject(objName, data);
    return deletedData;
  };

  this.find = function(id){
    var data = this.all();
    for (var i = 0; i < data.length; i += 1) {
      if (data[i].id == id)
        return data[i];
    }
  };

  this.findByKeyAndValue = function(keyToFind, valueToFind){
    var results = [];
    this.all().forEach(function(thing){
      Object.keys(thing).forEach(function(key) {
        if (key == keyToFind && thing[key] == valueToFind)
          results.push(thing);
      });
    });
    return results;
  };

  this.findByKey = function(keyToFind){
    var results = []
    this.all().forEach(function(thing){
      Object.keys(thing).forEach(function(key) {
        if (key == keyToFind)
          results.push(thing);
      });
    });
    return results;
  };

  this.findByValue = function(valueToFind){
    var results = []
    this.all().forEach(function(thing){
      Object.keys(thing).forEach(function(key) {
        if (valueToFind == thing[key])
          results.push(thing);
      });
    });
    return results;
  };

  this.destroyAll = function(){
    var data = this.all();
    localStorage.setObject(objName, null);
    return data;
  };

  // Private methods

  function init(){
    if ( !localStorage.getObject(objName) ) {
      localStorage.setObject(objName, []);
    }
  }

  function nextId(thing){
    if ( thing.all().length == 0 )
      return 1;
    else
      return thing.all()[thing.all().length - 1].id + 1
  }
}
