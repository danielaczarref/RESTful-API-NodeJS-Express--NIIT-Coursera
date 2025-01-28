const URL_PARAMS = new URLSearchParams(window.location.search);
const USER = URL_PARAMS.get('token');

const show = (selector) => {
  document.querySelector(selector).style.display = 'block';
};

const hide = (selector) => {
  document.querySelector(selector).style.display = 'none';
};

if (USER) {
  hide('.content.unauthorized');
  show('.content.authorized');
}




