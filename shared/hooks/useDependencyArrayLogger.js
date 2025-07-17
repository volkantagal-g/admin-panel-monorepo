/* eslint-disable no-console */
import { useEffect, useRef } from 'react';

/**
 *
 * @param {Array} dependencyArray - array of dependency variables
 * @param {Array} dependencyNameArray - array of variable names
 * If you want to check which dependency from the array changed
 * use it while debugging, don't commit, usage example:
 * ```js
 *   useDependencyArrayLogger([var1, var2], ['var1', 'var2']);
 * ```
 */
export default function useDependencyArrayLogger(dependencyArray, dependencyNameArray) {
  const previousDependencyArray = useRef(dependencyArray);

  useEffect(() => {
    dependencyArray.forEach((dependency, index) => {
      if (dependency !== previousDependencyArray.current[index]) {
        console.log(`**** index: ${index} - ${dependencyNameArray[index]} changed`);
        console.log('old: ', previousDependencyArray.current[index]);
        console.log('new: ', dependency);
      }
    });
    previousDependencyArray.current = dependencyArray;
  }, [dependencyArray, dependencyNameArray]);
}
