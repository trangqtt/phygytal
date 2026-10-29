export type ThemeType =
  | 'home'
  | 'about'
  | 'recipe'
  | 'story'
  | 'tutorial'
  | 'letter'
  | 'craft_village'
  | 'craftsmen'
  | 'stone_info';

export type ThemeModel = {
  name: string;
  theme_id: string;
}
