import { nanoid } from 'nanoid';
import dress from '../images/dress-3-svgrepo-com.svg';
import corset from '../images/corset-svgrepo-com.svg';
import jeans from '../images/jeans-svgrepo-com.svg';
import jacket from '../images/jacket-clothes-svgrepo-com.svg';
import shirt from '../images/shirt-svgrepo-com.svg';
import shoes from '../images/shoes-shoe-svgrepo-com.svg';
import shorts from '../images/shorts-pants-svgrepo-com.svg';
import blackDress from '../images/dress-3-svgrepo-com.svg';
import polo from '../images/polo-polo-shirt-svgrepo-com.svg';
import hoodie from '../images/hoodie.svg';
import scarf from '../images/scarf.svg';
import shirt_ from '../images/shirt.svg';
import shoes_ from '../images/shoes.svg';
import trousers from '../images/trousers-jeans.svg';
//import tr from "../images/trousers-jeans.svg"

const IMAGES_URL = [
  dress,
  corset,
  jacket,
  jeans,
  shirt,
  shoes,
  shorts,
  blackDress,
  polo,
  hoodie,
  scarf,
  shirt_,
  shoes_,
  trousers,
];

const CATEGORIES = [
  'Jeans',
  'Jacket',
  'Polo',
  'Shirt',
  'Shorts',
  'Dress',
  'Hoodi',
  'Corset',
  'Shoes',
  'Hat',
];

const COLORS = [
  'Coral',
  'Purple',
  'Black',
  'Beige',
  'White',
  'Red',
  'Blue',
  'Light blue',
  'Cyan',
  'Magenta',
  'Yellow',
  'Green',
];

export default function generateProducts(quantity = 20) {
  let results = [];
  for (let i = 0; i < quantity; i++) {
    results.push({
      id: nanoid(),
      name: generateRandomString(),
      description: generateDescription(),
      color: generateColor(),
      category: generateCategory(),
      price: generatePrice(),
      rating: generateRating(),
      ImageURL: generateImageURL(),
    });
  }
  return results;
}

const generateRandomString = (length = 7) => {
  let result = '';
  for (let i = 0; i < length; ++i) {
    result += String.fromCharCode(97 + Math.floor(Math.random() * 26));
  }
  return result;
};

const generateDescription = () => {
  let result = '';
  for (let i = 0; i < 5; ++i) {
    result = result + generateRandomString(i + 2) + ' ';
  }
  return result;
};

const generateColor = () => COLORS[Math.floor(Math.random() * COLORS.length)];

const generateCategory = () =>
  CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)];

const generatePrice = (min = 10, max = 9999) =>
  Math.floor(Math.random() * (max - min + 1) + min);

const generateRating = (min = 0, max = 5) =>
  Math.floor(10 * (Math.random() * (max - min) + min)) / 10.0;

const generateImageURL = () =>
  IMAGES_URL[Math.floor(Math.random() * IMAGES_URL.length)];
