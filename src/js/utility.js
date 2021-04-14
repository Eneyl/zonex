export const mediaQuery = {
  md2: window.matchMedia('(max-width: 992px)'),
  md3: window.matchMedia('(max-width: 768px)'),
  md4: window.matchMedia('(max-width: 480px)'),
  md3Min: window.matchMedia('(min-width: 768px)'),
};

export const getElementByDataId = (parent, value) => parent.querySelector(`[data-id = "${value}"]`);

export const createElement = (tag, classes) => {
  const elem = document.createElement(tag);

  if (classes) {
    elem.classList.add(...classes);
    return elem;
  }
  return elem;
};
