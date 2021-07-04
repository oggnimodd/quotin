/* eslint-disable max-classes-per-file */
import layerActionTypes from './layerActionTypes';

const {
  UPDATE_LAYER_LAYOUT,
  MODIFY_LAYER_TEXT,
  TOGGLE_LAYER,
  UPDATE_BACKGROUND,
} = layerActionTypes;

class TextLayer {
  constructor(options = {}) {
    this.id = options.id || this.id;
    this.x = options.x || 0;
    this.y = options.y || 0;
    this.width = options.width || 200;
    this.height = options.height || 200;
    this.type = 'text';
    this.name = options.name; // must have name
    this.text = options.text || '- Cak Lontong';
    this.content = options.content || '- Cak Lontong';
    this.uppercase = options.uppercase || false;
    this.shadow = options.shadow || false;
    this.textAlignment = options.textAlignment || 'center';
    this.italic = options.italic || false;
    this.bold = options.bold || false;
    this.alignment = options.alignment || 'horizontal';
    this.textColor = options.textColor || '#FFFFFF';
    this.highlightColor = options.highlightColor || '#e5ac00';
    this.fontFamily = options.fontFamily || 'Open Sans';
    this.fontSize = options.fontSize || 20;
    this.lineHeight = options.lineHeight || 1.2;
    this.letterSpacing = options.lineHeight || 0;
    this.display = options.display;
    this.opacity = options.opacity || 1;
    this.zIndex = options.zIndex || 200;
  }
}

class BackgroundLayer {
  constructor(options = {}) {
    this.name = options.name; // must have name
    this.type = 'background';
    this.id = options.id || 'baseColor';
    this.solidColor = options.solidColor || '#1E1E1E';
    this.color1 = options.color1 || '#1B2B6B  ';
    this.color2 = options.color2 || '#E29595';
    this.opacityColor1 = options.opacityColor1 || 1;
    this.opacityColor2 = options.opacityColor2 || 1;
    this.gradientRotation = options.gradientRotation || 90;
    this.colorStyle = options.colorStyle || 'solid';
    this.display = options.display;
    this.opacity = options.opacity || 1;
    this.zIndex = options.zIndex || 60;
  }
}

class Photo {
  constructor(options = {}) {
    this.id = 'photo';
    this.imageID = options.imageID || '3779822'; // pexels api
    this.name = 'photo';
    this.type = 'photo';
    this.display = options.display;
    this.opacity = options.opacity || 1;
    this.imageX = options.imageX;
    this.imageY = options.imageY;
    this.imageWidth = options.imageWidth;
    this.imageHeight = options.imageHeight;
  }
}

class Frame {
  constructor(options = {}) {
    this.id = 'frame';
    this.name = 'frame';
    this.type = 'frame';
    this.offset = options.offset || 10; // padding
    this.width = options.width || 3; // thickness
    this.opacity = options.opacity || 1;
    this.display = options.display;
    this.color = options.color || '#FFFFFF';
    this.zIndex = options.zIndex || 110;
  }
}

class Brand {
  constructor(options = {}) {
    this.id = 'brand';
    this.name = 'brand';
    this.type = 'brand';
    this.opacity = options.opacity || 1;
    this.display = options.display;
    this.text = options.text || 'minggo1999';
    this.icon = options.icon || 'pinterest';
    this.position = options.position || 'center-end';
    this.color = options.color || '#FFFFFF';
    this.size = options.size || '15';
    this.zIndex = options.zIndex || 100;
  }
}

// Instantiate quote
const quote = new TextLayer({
  name: 'quote',
  text: 'The quick brown fox jumps over the lazy dog',
  content: '<span>The quick brown fox jumps over the lazy dog</span>',
  id: 'quote',
  x: 52.833,
  y: 43,
  height: 'auto',
  textColor: '#FFFFFF',
  fontFamily: 'B612 Mono',
  fontSize: 55,
  display: true,
  width: 343,
});

// Instantiate author
const author = new TextLayer({
  name: 'author',
  id: 'author',
  x: 240,
  y: 400,
  width: 150,
  fontSize: 18,
  textAlignment: 'right',
  height: 'auto',
  fontFamily: 'Amatic SC',
  display: true,
  zIndex: 210,
});

// Instantiate base background
const baseColor = new BackgroundLayer({
  id: 'baseColor',
  colorStyle: 'gradient',
  name: 'baseColor',
  gradientRotation: '0',
  display: true,
});
// Instantiate overlay background
const overlayColor = new BackgroundLayer({
  id: 'overlayColor',
  colorStyle: 'gradient',
  name: 'overlayColor',
  gradientRotation: '0',
  display: true,
  zIndex: 80,
  opacityColor1: 1,
  opacityColor2: 0.01,
  color1: '#000000',
  color2: '#ffffff',
});

const photo = new Photo({
  display: true,
  imageX: 0,
  imageY: 0,
});
const frame = new Frame({
  display: false,
});
const brand = new Brand({
  display: false,
});

const initialState = {
  author,
  quote,
  brand,
  frame,
  overlayColor,
  photo,
  baseColor,
};

const layerReducer = (state = initialState, action) => {
  const targetLayer = action.target;
  const targetSettings = state[action.target];
  const option = action.option;
  const value = action.value;

  switch (action.type) {
    case MODIFY_LAYER_TEXT:
      return {
        ...state,
        [targetLayer]: {
          ...targetSettings,
          [option]: value,
        },
      };
    case UPDATE_LAYER_LAYOUT:
      return {
        ...state,
        [targetLayer]: {
          ...targetSettings,
          [option]: value,
        },
      };
    case UPDATE_BACKGROUND:
      return {
        ...state,
        [targetLayer]: {
          ...targetSettings,
          [option]: value,
        },
      };
    default:
      return state;
  }
};

export default layerReducer;
