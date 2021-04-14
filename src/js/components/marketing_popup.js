import { getElementByDataId, mediaQuery } from '../utility';

const $popup = getElementByDataId(document, 'marketing-popup'),
  $title = getElementByDataId($popup, 'marketing-popup-title'),
  $time = getElementByDataId($popup, 'marketing-popup-time'),
  $place = getElementByDataId($popup, 'marketing-popup-place');

const delay = 8000;

const data = [
  {
    title: 'Faux shearling double-breasted coat',
    time: 15,
    place: 'London, Great Britain',
  },
  {
    title: 'Red slick dress',
    time: 23,
    place: 'USA, New York',
  },
];

let counter = 0,
  intervalID;

const handlePopup = (e) => {
  if (e.target.closest('[data-id="marketing-popup-close"')) {
    $popup.classList.remove('marketing-popup--show');
  }
};

const changeData = () => {
  $title.textContent = data[counter].title;
  $time.textContent = data[counter].time;
  $place.textContent = data[counter].place;

  $popup.classList.add('marketing-popup--show');

  counter++;
  if (counter === data.length) {
    counter = 0;
  }

  setTimeout(() => $popup.classList.remove('marketing-popup--show'), delay - 2000);
};

const handleTabletMinChange = (e) => {
  if (e.matches) {
    intervalID = setInterval(changeData, delay);
  } else {
    clearInterval(intervalID);
  }
};

$popup.addEventListener('click', handlePopup);
mediaQuery.md3Min.addEventListener('change', handleTabletMinChange);

handleTabletMinChange(mediaQuery.md3Min);
