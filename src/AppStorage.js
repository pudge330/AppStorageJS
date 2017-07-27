var AppStorage = function(_TagLoader) {
	var _exports = {};
	var _currentTime = function() {
		return Math.floor((new Date).getTime() / 1000);
	};
	var _randomNumber = function() {
		return Math.floor((Math.random() * 100000000) + 1);
	};
	var _storageObject = function(_s) {
		this.storage = _s;
	};
	_storageObject.prototype = {
		supported: function() {
			if (this.storage)
				return true;
			else
				return false;
		}
		,set: function(_k, _v, _e) {
			if (this.supported()) {
				_v = JSON.stringify(_v);
				this.storage.setItem(_k, _v);
				if (_e)
					this.storage.setItem(_k + '_exp', _currentTime() + _e);
			}
		}
		,get: function(_k) {
			if (this.supported()) {
				if (this.storage.getItem(_k + '_exp')) {
					if (_currentTime() >= parseInt(this.storage.getItem(_k + '_exp'))) {
						if (this.storage.getItem(_k))
							this.storage.removeItem(_k);
						this.storage.removeItem(_k + '_exp');
						return null;
					}
				}
				return JSON.parse(this.storage.getItem(_k));
			}
			else
				return null;
		}
		,remove: function(_k) {
			if (this.supported()) {
				this.storage.removeItem(_k);
				this.storage.removeItem(_k + '_exp');
			}
		}
		,clear: function() {
			if (this.supported())
				this.storage.clear();
		}
		,length: function() {
			if (this.supported()) {
				var _count = 0;
				for (var key in localStorage){
					if (!key.endsWith('_exp'))
						_count++;
				}
				return _count;
			}
			else
				return 0;
		}
	};
	var _pageStorage = function() {
		this.instanceClass = this.itemClass + '_' + _randomNumber();
		this.itemIndex = {};
	}
	_pageStorage.prototype = {
		itemClass: 'appStorageItem'
		,supported: function() {
			if (typeof _TagLoader != 'undefined' && _TagLoader)
				return true;
			else
				return false;
		}
		,set: function(_k, _v, _e) {
			if (this.supported()) {
				if (!this.itemIndex[_k])
					this.itemIndex[_k] = '#' + this.itemClass + '_' + _randomNumber();
				_TagLoader.setJson(this.itemIndex[_k], _v);
				var _item = document.getElementById(this.itemIndex[_k].replace(/^#/, ''));
				_element.addClass(_item, this.itemClass);
				_element.addClass(_item, this.instanceClass);
				if (_e)
					_item.setAttribute('data-exp', _currentTime() + _e);
			}
		}
		,get: function(_k) {
			if (this.supported() && this.itemIndex[_k]) {
				var _item = document.getElementById(this.itemIndex[_k].replace(/^#/, ''));
				if (_item) {
					if (_item.getAttribute('data-exp')) {
						if (_currentTime() >= parseInt(_item.getAttribute('data-exp'))) {
							_element.remove(_item);
							delete this.itemIndex[_k];
							return null;
						}
					}
					return _TagLoader.getJson(_item);
				}
				else
					return null;
			}
		}
		,remove: function(_k) {
			if (this.supported() && this.itemIndex[_k]) {
				var _item = document.getElementById(this.itemIndex[_k].replace(/^#/, ''));
				if (_item) {
					_element.remove(_item);
					delete this.itemIndex[_k];
				}
			}
		}
		,clear: function() {
			if (this.supported()) {
				var _items = document.getElementsByClassName(this.instanceClass);
				if (_items.length > 0) {
					_element.remove(_items);
					this.itemIndex = {};
				}
			}
		}
		,length: function() {
			if (this.supported()) {
				return document.getElementsByClassName(this.instanceClass).length;
			}
			return 0;
		}
		,totalLength: function() {
			if (this.supported()) {
				return document.getElementsByClassName(this.itemClass).length;
			}
			return 0;
		}
	};
	var _element = {
		addClass: function(_el, _class) {
			if (!this.hasClass(_el, _class)) {
				if (_el.className != '')
					_class = ' ' + _class;
				_el.className = _el.className +  _class;
			}
		}
		,removeClass: function(_el, _class) {
			if (this.hasClass(_el, _class)) {
				_class = ' ' + _class + ' ';
				var _className = (" " + _el.className + " ").replace(/[\n\t\r]/g, " ");
				_className.replace(_class, '');
				_el.className = _className;
			}
		}
		,hasClass: function(_el, _class) {
			_class = ' ' + _class + ' ';
			if ((" " + _el.className + " ").replace(/[\n\t\r]/g, " ").indexOf(_class) > -1)
				return true;
			else
				return false;
		}
		,toggleClass: function(_el, _class) {
			if (this.hasClass(_el, _class))
				this.addClass(_el, _class);
			else
				this.removeClass(_el, _class);
		}
		,remove: function(_el) {
			if (_el instanceof Element) {
				_el.parentElement.removeChild(_el);
			}
			else if (_el instanceof NodeList || _el instanceof HTMLCollection) {
				for(var i = _el.length - 1; i >= 0; i--) {
					if(_el[i] && _el[i].parentElement) {
						_el[i].parentElement.removeChild(_el[i]);
					}
				}
			}
		}
	};
	_exports.local = new _storageObject(window.localStorage);
	_exports.session = new _storageObject(window.sessionStorage);
	_exports.page = new _pageStorage();
	return _exports;
};