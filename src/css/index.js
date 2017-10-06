import utilities from './utilities';
import global from './global';

export default function css(renderStatic) {
  utilities(renderStatic);
  global(renderStatic);
}
