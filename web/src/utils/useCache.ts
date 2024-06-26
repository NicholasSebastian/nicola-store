import cache from 'memory-cache';

// NOTE: For server-side use only.
// This may look like a React hook, but its not.

const DEFAULT_CACHE_TIME = 60; // 1 minute.

async function useCache<T>(id: string, process: () => T, cacheTime?: number): Promise<T> {
  const cachedValue = cache.get(id);
  if (cachedValue) {
    console.log("Data found in cache."); // LOG
    return cachedValue;
  }
  else {
    console.log("Data not found in cache. Processing..."); // LOG
    const result = await process();
    cache.put(id, result, (cacheTime ?? DEFAULT_CACHE_TIME) * 1000);
    return result;
  }
}

export default useCache;