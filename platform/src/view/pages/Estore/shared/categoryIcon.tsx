const ICON_RULES: Array<[string[], string]> = [
  [['topwear', 'dress', 'innerwear', 'clothing', 'apparel', 'fashion', 'wear'], '👗'],
  [['shoe', 'footwear', 'sandal', 'boot', 'flip'], '👟'],
  [['sock'], '🧦'],
  [['bag', 'wallet', 'backpack'], '👜'],
  [['watch'], '⌚'],
  [['jewel'], '💍'],
  [['eyewear', 'sunglass'], '🕶️'],
  [['tie', 'muffler', 'headwear'], '🧣'],
  [['belt'], '🪢'],
  [['beauty', 'cosmetic', 'personal care', 'care'], '💄'],
  [['mobile', 'phone', 'cell phone'], '📱'],
  [['computer', 'electronic', 'appstore'], '💻'],
  [['home', 'kitchen', 'furniture', 'living', 'decor', 'furnishing'], '🏠'],
  [['baby', 'kid', 'toy', 'hobby'], '🧸'],
  [['sport', 'outdoor', 'fitness'], '⚽'],
  [['music', 'digital'], '🎵'],
  [['book', 'station', 'pen'], '📚'],
  [['auto', 'car'], '🚗'],
  [['pet'], '🐾'],
  [['food', 'beverage', 'grocery'], '🍔'],
  [['health'], '🩺'],
  [['industrial', 'scientific', 'tool'], '🔧'],
  [['saree'], '🥻'],
];

export default function categoryIcon(name: string): string {
  const key = (name || '').toLowerCase();

  for (const [keywords, icon] of ICON_RULES) {
    if (keywords.some((keyword) => key.includes(keyword))) {
      return icon;
    }
  }

  return '🏷️';
}
