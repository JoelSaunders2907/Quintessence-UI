// Convert Tailwind color classes to RGB values
export function tailwindToRgb(tailwindClass: string): string {
    const colorMap: Record<string, string> = {
      'bg-blue-500': 'rgb(59, 130, 246)',
      'bg-purple-500': 'rgb(168, 85, 247)',
      'bg-green-500': 'rgb(34, 197, 94)',
      'bg-orange-500': 'rgb(249, 115, 22)',
      'bg-pink-500': 'rgb(236, 72, 153)',
      'bg-indigo-500': 'rgb(99, 102, 241)',
      'bg-teal-500': 'rgb(20, 184, 166)',
      'bg-red-500': 'rgb(239, 68, 68)'
    };
  
    return colorMap[tailwindClass] || colorMap['bg-blue-500'];
  }