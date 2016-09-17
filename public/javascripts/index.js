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
      this.classList.contains(className);
    } else {
      new RegExp('(^| )' + className + '( |$)', 'gi').test(this.className);
    }
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
    console.log('scrollPosition', this.scrollPosition);
    console.log('innerHeight', window.innerHeight);

    if (this.scrollPosition > window.innerHeight / 4) {
      document.body.addClass('should-show-podium');
    } else {
      document.body.removeClass('should-show-podium');
    }
  }
};

app.podium.init();
