'use strict';

var plexi = plexi || {};
/**
 * @class BodyType
 * @param String id - BodyType identifier
 */
var BodyType = function (id, config) {
  this.id = id;
  this.props = [];
  this.constants = {};
  for (var key in config) {
    if (key === 'props') {
      this.props = config.props;
    } else {
      this.constants[key] = config[key];
    }
  }
};

BodyType.prototype.create = function (config) {
  for (var i = 0, l = this.props.length; i < l; i++) {
    var prop = this.props[i];
    if (!config.hasOwnProperty(prop)) {
      return false;
    }
  }
  var body = new plexi.Body(this, config);
  return body;
};

plexi.BodyType = BodyType;
