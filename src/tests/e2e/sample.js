//To run:: node src/tests/e2e/sample.js


// IsAnagram: Check if two strings are anagrams.
function areAnagrams(str1, str2) {
  // Remove spaces and convert to lowercase
  const normalize = (str) => str.toLowerCase().replace(/\s/g, '');
  
  // Normalize both strings
  const normalStr1 = normalize(str1);
  const normalStr2 = normalize(str2);
  
  // Check if lengths are different
  if (normalStr1.length !== normalStr2.length) return false;
  
  // Sort and compare
  return normalStr1.split('').sort().join('') === normalStr2.split('').sort().join('');
}

// Test cases with descriptive output
/*
console.log('Result:', areAnagrams('listen', 'silent'));
console.log('Result:', areAnagrams('hello', 'world'));
console.log('Result:', areAnagrams('Debit Card', 'Bad Credit'));
console.log('--------------------------------');
console.log('Test 4: Empty strings');
console.log('Result:', areAnagrams('', ''));
console.log('--------------------------------');
console.log('Test 5: rat and car');
console.log('Result:', areAnagrams('rat', 'car'));
*/


// Two Sum: Find two numbers in an array that add up to a target.
function twoSum(nums, target) {
  const map = new Map();
  
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  return [];
}

/* Test cases
console.log('--------------------------------');
console.log('Two Sum Tests:');
console.log(twoSum([2, 7, 11, 15], 9));  // [0, 1]
console.log(twoSum([3, 2, 4], 6));       // [1, 2]
console.log(twoSum([3, 3], 6));          // [0, 1]
*/

// isPalindrome: Check if string is a palindrome (ignoring non-alphanumeric chars and case)
function isPalindrome(str) {
  const cleanStr = str.toLowerCase().replace(/[^a-z0-9]/g, '');
  return cleanStr === cleanStr.split('').reverse().join('');
}

// Test cases
console.log('--------------------------------');
console.log('Palindrome Tests:');
console.log(isPalindrome('A man, a plan, a canal: Panama'));  // true
console.log(isPalindrome('race a car'));                      // false
console.log(isPalindrome(' '));                               // true
console.log(isPalindrome('Was it a car or a cat I saw?'));   // true
//


const sample_log_data = [
  {'timestamp': 1, 'print_id': 1, 'msg': 'starting'},
  {'timestamp': 4, 'print_id': 2, 'msg': 'starting'},
  {'timestamp': 5, 'print_id': 3, 'msg': 'starting'},
  {'timestamp': 6, 'print_id': 4, 'msg': 'starting'},
  {'timestamp': 8, 'print_id': 5, 'msg': 'starting'},
  {'timestamp': 10, 'print_id': 6, 'msg': 'starting'},
  {'timestamp': 11, 'print_id': 2, 'msg': 'finished'},
  {'timestamp': 13, 'print_id': 7, 'msg': 'starting'},
  {'timestamp': 14, 'print_id': 3, 'msg': 'finished'},
  {'timestamp': 15, 'print_id': 8, 'msg': 'starting'},
  {'timestamp': 16, 'print_id': 4, 'msg': 'finished'},
  {'timestamp': 20, 'print_id': 5, 'msg': 'finished'},
  {'timestamp': 22, 'print_id': 7, 'msg': 'finished'},
  {'timestamp': 24, 'print_id': 8, 'msg': 'finished'},
  {'timestamp': 25, 'print_id': 6, 'msg': 'finished'},

];

function findShortestPrintJob(logs) {
  // Create maps to store start and end times
  const startTimes = new Map();
  const durations = new Map();

  // Process all logs
  for (const log of logs) {
    const { timestamp, print_id, msg } = log;
    
    if (msg === 'starting') {
      startTimes.set(print_id, timestamp);
    } else if (msg === 'finished' && startTimes.has(print_id)) {
      const duration = timestamp - startTimes.get(print_id);
      durations.set(print_id, duration);
    }
  }

  // Find the shortest duration
  let shortestDuration = Infinity;
  let fastestPrintId = null;

  for (const [printId, duration] of durations) {
    if (duration < shortestDuration) {
      shortestDuration = duration;
      fastestPrintId = printId;
    }
  }

  return {
    printId: fastestPrintId,
    duration: shortestDuration,
  };
}

// Test the function with sample data
const result = findShortestPrintJob(sample_log_data);
console.log('--------------------------------');
console.log('Shortest Print Job:');
console.log(`Print ID: ${result.printId}`);
console.log(`Duration: ${result.duration} time units`);

