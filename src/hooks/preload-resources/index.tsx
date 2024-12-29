import { useState, useEffect, useCallback } from 'react';

/**
 * Custom hook for preloading resources with customizable API calls.
 * @param {Function} fetchActions - Function to fetch actions.
 * @param {Function} fetchReceived - Function to fetch received items.
 * @param {Object} options - Optional settings for the hook.
 * @param {number} options.skipActions - Page number for API requests.
 * @param {number} options.takeActions - Limit of items per request.
 * @param {number} options.skipReceived - Page number for API requests.
 * @param {number} options.takeReceived- Limit of items per request.
 * @returns {Object} - { isPreloaded, reloadResources }
 */

interface PreloadResourcesOptions {
    skipActions : number
    takeActions : number
    skipReceived: number
    takeReceived: number
}

const usePreloadResources = (fetchActions: any, fetchReceived: any, 
    options: PreloadResourcesOptions = 
    { 
      skipActions: 1, takeActions: 30, 
      skipReceived: 1, takeReceived: 30 
    }) => {
  
    const [isPreloaded, setIsPreloaded] = useState(false);

    const loadResources = useCallback(async () => {
    const { 
        skipActions, takeActions,
        skipReceived, takeReceived,
    } = options;

    const apiRequests = [
      fetchActions(skipActions, takeActions),
      fetchReceived(skipReceived, takeReceived),
    ];

    try {
      await Promise.all(apiRequests);
      console.log('Resources loaded successfully');
      setIsPreloaded(true);
    } catch (error) {
      console.error('Error loading resources:', error);
      setIsPreloaded(false);
    }
  }, [fetchActions, fetchReceived, options]);

  useEffect(() => {
    if (!isPreloaded) {
      loadResources();
    }
  }, [isPreloaded, loadResources]);

  const reloadResources = useCallback(() => {
    setIsPreloaded(false);
  }, []);

  return { isPreloaded, reloadResources };
};

export default usePreloadResources;
