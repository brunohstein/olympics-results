var elementMethods = {
  addClass: function(className) {
    if (this.classList) {
      this.classList.add(className);
    } else {
      this.className += ' ' + className;
    }
  },

  removeClass: function(className) {
    if (this.classList) {
      this.classList.remove(className);
    } else {
      this.className = this.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    }
  },

  hasClass: function(className) {
    if (this.classList) {
      return this.classList.contains(className);
    } else {
      return new RegExp('(^| )' + className + '( |$)', 'gi').test(this.className);
    }
  },

  hide: function() {
    this.style.display = 'none';
  },

  show: function() {
    this.style.display = '';
  }
};

for (var key in elementMethods) {
  if (elementMethods.hasOwnProperty(key)) {
    window.Element.prototype[key] = elementMethods[key];
  }
}

var app = {};

app.podium = {
  scrollPosition: document.body.scrollTop,

  init: function() {
    this.bind();
    this.setPosition();
  },

  bind: function() {
    window.addEventListener('scroll', this.onWindowScroll.bind(this));
  },

  onWindowScroll: function() {
    this.scrollPosition = document.body.scrollTop;
    this.setPosition();
  },

  setPosition: function() {
    if (this.scrollPosition > window.innerHeight / 4) {
      document.body.addClass('should-show-podium');
    } else {
      document.body.removeClass('should-show-podium');
    }
  }
};

app.search = {
  container: document.querySelector('.search'),
  icon: document.querySelector('.search-icon'),
  input: document.querySelector('.search-input'),
  names: document.querySelectorAll('.country-name'),

  init: function() {
    this.bind();
  },

  bind: function() {
    this.icon.addEventListener('click', this.onIconClick.bind(this));
    this.input.addEventListener('keyup', this.onInputKeyup.bind(this));
  },

  onIconClick: function(event) {
    if (this.container.hasClass('is-opened')) {
      this.close();
    } else {
      this.open();
    }
  },

  onInputKeyup: function(event) {
    this.filter();
  },

  close: function() {
    this.container.removeClass('is-opened');
    this.input.value = '';
    this.filter();
  },

  open: function () {
    this.container.addClass('is-opened');
    this.input.focus();
  },

  filter: function() {
    var value = this.input.value.toLowerCase();

    for (i = 0; i < this.names.length; i++) {
      var name = this.names[i];

      name.parentNode.parentNode.hide();

      if (name.innerText.toLowerCase().indexOf(value) > -1) {
        name.parentNode.parentNode.show();
      }
    }
  }
};

app.podium.init();
app.search.init();
