import './style/style.scss';
import '@fortawesome/fontawesome-free/js/all';

function setFavicon(favImg){
    let headTitle = document.querySelector('head');
    let setFavicon = document.createElement('link');
    setFavicon.setAttribute('rel','shortcut icon');
    setFavicon.setAttribute('href',favImg);
    headTitle.appendChild(setFavicon);
}
function app() {
    document.querySelector('head title').innerHTML = 'Weathery';
    const element = document.createElement('div');
    element.setAttribute('id','content');
    return element;
}
document.body.appendChild(app());