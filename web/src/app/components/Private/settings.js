import { themes } from '../Theme/initThemes';
import layoutSettings from './Layout/LayoutSettings';

// UPDATE BELOW CODE
// DOC http://demos.ui-lib.com/matx-react-doc/layout.html
export const MainLayoutSettings = {
  activeLayout: 'layout1', // layout1, layout2
  activeTheme: 'whitePurple', // View all valid theme colors inside MatxTheme/themeColors.js
  perfectScrollbar: true,

  themes: themes,
  layoutSettings, // open Layout1/Layout1Settings.js

  // Footer options
  footer: {
    show: true,
    fixed: true,
    theme: 'whitePurple', // View all valid theme colors inside MatxTheme/themeColors.js
  },
};
