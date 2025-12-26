// src/utils/password-storage.ts
import { LocalStorage } from "@raycast/api";

const STORAGE_KEY_PREFIX = "wifi-password-";

/**
 * Save a WiFi password in LocalStorage
 * @param ssid - Network SSID
 * @param password - Network password
 */
export async function savePassword(ssid: string, password: string): Promise<void> {
  const key = `${STORAGE_KEY_PREFIX}${ssid}`;
  await LocalStorage.setItem(key, password);
}

/**
 * Retrieve a saved WiFi password
 * @param ssid - Network SSID
 * @returns The saved password or null if not found
 */
export async function getSavedPassword(ssid: string): Promise<string | null> {
  const key = `${STORAGE_KEY_PREFIX}${ssid}`;
  const password = await LocalStorage.getItem<string>(key);
  return password || null;
}

/**
 * Check if a network has a saved password
 * @param ssid - Network SSID
 * @returns True if password is saved
 */
export async function hasSavedPassword(ssid: string): Promise<boolean> {
  const password = await getSavedPassword(ssid);
  return password !== null;
}

/**
 * Remove a saved password for a network
 * @param ssid - Network SSID
 */
export async function forgetPassword(ssid: string): Promise<void> {
  const key = `${STORAGE_KEY_PREFIX}${ssid}`;
  await LocalStorage.removeItem(key);
}

/**
 * Clear all saved WiFi passwords
 */
export async function clearAllPasswords(): Promise<void> {
  const items = await LocalStorage.allItems();
  const passwordKeys = Object.keys(items).filter((key) => key.startsWith(STORAGE_KEY_PREFIX));

  for (const key of passwordKeys) {
    await LocalStorage.removeItem(key);
  }
}
