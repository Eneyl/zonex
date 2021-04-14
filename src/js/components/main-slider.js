import Swiper from 'swiper/bundle';

const swiper = new Swiper('.hero-swiper ', {
  loop: true,
  // autoplay: {
  //   delay: 5000,
  // },

  pagination: {
    el: '.swiper-pagination',
  },
});
