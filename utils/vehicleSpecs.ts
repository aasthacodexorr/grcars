// Shared parser for vehicle standard/technical/optional JSON blobs.
// Used by VehicleSpecificationsAccordion (Faq.tsx) and ViewAllFeaturesButton.

export function safeParseVehicleJson(jsonString: any): Record<string, string[]> {
  if (!jsonString) return {};

  try {
    let parsed = typeof jsonString === 'string' ? JSON.parse(jsonString) : jsonString;

    // Unwrap a single wrapper key like { "Specifications": {...} }
    if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
      const keys = Object.keys(parsed);
      if (keys.length === 1 && typeof parsed[keys[0]] === 'object' && !Array.isArray(parsed[keys[0]])) {
        parsed = parsed[keys[0]];
      }
    }

    const normalized: Record<string, string[]> = {};

    if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
      for (const [key, value] of Object.entries(parsed)) {
        let cleanedItems: string[] = [];

        if (Array.isArray(value)) {
          cleanedItems = value.map((item) => String(item));
        } else if (value && typeof value === 'object') {
          cleanedItems = Object.entries(value).map(([subKey, subVal]) => {
            if (subVal === 1 || subVal === '1' || subVal === true) return subKey;
            if (subVal === 0 || subVal === '0' || subVal === false) return `No ${subKey}`;
            return `${subKey}: ${String(subVal)}`;
          });
        } else if (value !== null && value !== undefined) {
          cleanedItems = value === 1 || value === '1' || value === true ? [key] : [String(value)];
        }

        if (cleanedItems.length > 0) {
          normalized[key] = cleanedItems;
        }
      }
      return normalized;
    }

    return {};
  } catch (e) {
    console.error('Failed to parse vehicle specifications JSON:', e);
    return {};
  }
}
