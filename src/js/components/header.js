import { getElementByDataId, createElement, mediaQuery } from '../utility';

const $header = getElementByDataId(document, 'header'),
  $headerContainer = getElementByDataId(document, 'header-container'),
  $logo = getElementByDataId(document, 'logo'),
  $shopNav = getElementByDataId(document, 'shop-nav'),
  $headerTop = createElement('div', ['header__top']),
  $hamburger = createElement('div', ['hamburger']);

/**
 * Mobile navigation menu
 */
const handleMobileNav = () => {
  $hamburger.classList.toggle('hamburger--active');
  $headerContainer.classList.toggle('header__container--active');
};

let isScrolled = false;
const scrollHeader = () => {
  if (window.pageYOffset >= $header.offsetHeight && !isScrolled) {
    $headerContainer.classList.add('header__container--scrolled');
    isScrolled = true;
  } else if (window.pageYOffset <= $header.offsetHeight && isScrolled) {
    $headerContainer.classList.remove('header__container--scrolled');
    isScrolled = false;
  }
};

/**
 * Media for tabler
 */
const handleTabletChange = (e) => {
  if (e.matches) {
    $headerTop.append($logo, $shopNav);
    $headerContainer.prepend($headerTop);
  } else {
    $headerContainer.append($logo, $shopNav);
    $headerTop.remove();
  }
};

/**
 * Media for smartphone
 */
const handleSmartphoneChange = (e) => {
  if (e.matches) {
    $headerTop.append($hamburger, $logo, $shopNav);
    $header.prepend($headerTop);
  } else if (mediaQuery.md3.matches) {
    $headerTop.append($logo, $shopNav);
    $headerContainer.prepend($headerTop);
  } else {
    $headerContainer.append($logo, $shopNav);
    $headerTop.remove();
  }
};

$hamburger.addEventListener('click', handleMobileNav);
document.addEventListener('scroll', scrollHeader);
mediaQuery.md3.addEventListener('change', handleTabletChange);
mediaQuery.md4.addEventListener('change', handleSmartphoneChange);

handleTabletChange(mediaQuery.md3);
handleSmartphoneChange(mediaQuery.md4);
