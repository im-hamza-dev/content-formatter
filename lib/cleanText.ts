export function cleanText(text: string): string {
  if (!text || typeof text !== 'string') {
    return '';
  }

  let cleaned = text;

  cleaned = cleaned.replace(/[\u{1F600}-\u{1F64F}]/gu, ''); // Emoticons
  cleaned = cleaned.replace(/[\u{1F300}-\u{1F5FF}]/gu, ''); // Misc Symbols and Pictographs
  cleaned = cleaned.replace(/[\u{1F680}-\u{1F6FF}]/gu, ''); // Transport and Map
  cleaned = cleaned.replace(/[\u{1F1E0}-\u{1F1FF}]/gu, ''); // Flags
  cleaned = cleaned.replace(/[\u{2600}-\u{26FF}]/gu, ''); // Misc symbols
  cleaned = cleaned.replace(/[\u{2700}-\u{27BF}]/gu, ''); // Dingbats
  cleaned = cleaned.replace(/[\u{1F900}-\u{1F9FF}]/gu, ''); // Supplemental Symbols and Pictographs
  cleaned = cleaned.replace(/[\u{1FA00}-\u{1FA6F}]/gu, ''); // Chess Symbols
  cleaned = cleaned.replace(/[\u{1FA70}-\u{1FAFF}]/gu, ''); // Symbols and Pictographs Extended-A
  cleaned = cleaned.replace(/[\u{231A}-\u{231B}]/gu, ''); // Watch and Hourglass
  cleaned = cleaned.replace(/[\u{23E9}-\u{23EC}]/gu, ''); // Fast-forward, etc.
  cleaned = cleaned.replace(/[\u{23F0}]/gu, ''); // Alarm Clock
  cleaned = cleaned.replace(/[\u{23F3}]/gu, ''); // Hourglass
  cleaned = cleaned.replace(/[\u{25FD}-\u{25FE}]/gu, ''); // White/Black Square
  cleaned = cleaned.replace(/[\u{2614}-\u{2615}]/gu, ''); // Umbrella, Coffee
  cleaned = cleaned.replace(/[\u{2648}-\u{2653}]/gu, ''); // Zodiac
  cleaned = cleaned.replace(/[\u{267F}]/gu, ''); // Wheelchair
  cleaned = cleaned.replace(/[\u{2693}]/gu, ''); // Anchor
  cleaned = cleaned.replace(/[\u{26A1}]/gu, ''); // Lightning
  cleaned = cleaned.replace(/[\u{26AA}-\u{26AB}]/gu, ''); // White/Black Circle
  cleaned = cleaned.replace(/[\u{26BD}-\u{26BE}]/gu, ''); // Soccer/Basketball
  cleaned = cleaned.replace(/[\u{26C4}-\u{26C5}]/gu, ''); // Snowman
  cleaned = cleaned.replace(/[\u{26CE}]/gu, ''); // Ophiuchus
  cleaned = cleaned.replace(/[\u{26D4}]/gu, ''); // No Entry
  cleaned = cleaned.replace(/[\u{26EA}]/gu, ''); // Church
  cleaned = cleaned.replace(/[\u{26F2}-\u{26F3}]/gu, ''); // Fountain, Flag
  cleaned = cleaned.replace(/[\u{26F5}]/gu, ''); // Sailboat
  cleaned = cleaned.replace(/[\u{26FA}]/gu, ''); // Tent
  cleaned = cleaned.replace(/[\u{26FD}]/gu, ''); // Fuel Pump
  cleaned = cleaned.replace(/[\u{2705}]/gu, ''); // White Check Mark
  cleaned = cleaned.replace(/[\u{270A}-\u{270B}]/gu, ''); // Fist
  cleaned = cleaned.replace(/[\u{2728}]/gu, ''); // Sparkles
  cleaned = cleaned.replace(/[\u{274C}]/gu, ''); // Cross Mark
  cleaned = cleaned.replace(/[\u{274E}]/gu, ''); // Negative Squared Cross Mark
  cleaned = cleaned.replace(/[\u{2753}-\u{2755}]/gu, ''); // Question Marks
  cleaned = cleaned.replace(/[\u{2757}]/gu, ''); // Exclamation Mark
  cleaned = cleaned.replace(/[\u{2795}-\u{2797}]/gu, ''); // Plus/Minus/Divide
  cleaned = cleaned.replace(/[\u{27B0}]/gu, ''); // Curly Loop
  cleaned = cleaned.replace(/[\u{27BF}]/gu, ''); // Double Curly Loop
  cleaned = cleaned.replace(/[\u{2B1B}-\u{2B1C}]/gu, ''); // Black/White Large Square
  cleaned = cleaned.replace(/[\u{2B50}]/gu, ''); // White Star
  cleaned = cleaned.replace(/[\u{2B55}]/gu, ''); // Heavy Large Circle

  cleaned = cleaned.replace(/[★☆✦✧✩✪✫✬✭✮✯✰]/g, ''); // Stars
  cleaned = cleaned.replace(/[◆◇◈◉◊○●]/g, ''); // Shapes
  cleaned = cleaned.replace(/[→←↑↓↔]/g, ''); // Arrows
  cleaned = cleaned.replace(/[✓✔✗✘]/g, ''); // Checkmarks
  cleaned = cleaned.replace(/[•◦‣⁃▪▫]/g, ''); // Bullets (will normalize later)

  cleaned = cleaned.replace(/[-]{3,}/g, '---');
  cleaned = cleaned.replace(/[*]{3,}/g, '***');
  cleaned = cleaned.replace(/[_]{3,}/g, '___');
  cleaned = cleaned.replace(/[=]{3,}/g, '===');

  cleaned = cleaned.replace(/\r\n/g, '\n'); // Windows to Unix
  cleaned = cleaned.replace(/\r/g, '\n'); // Mac to Unix

  cleaned = cleaned.replace(/^\n+/, '');
  cleaned = cleaned.replace(/\n+$/, '');

  return cleaned;
}
