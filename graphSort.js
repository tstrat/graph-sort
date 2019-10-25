/*
    Graph Sort
    author: Travis Stratton

    Premise: Use the slope of a line from x:0 y: (smallest value) -> x: array.length, y: (largest value)
    With that slope calculate the probable X position given the other y values from the array
    place them in bins associated with those values (bins are put in insertion order).
    Then iterate through all bins and place in order every value back into array.
*/


function graphSort(arr) {
    // dont sort if not more than 1 value
    if (arr.length < 2) {
        return arr;
    }
    var rtn = []

    // find smallest and largest
    let smallest = arr[0]
    let largest = arr[0]
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] < smallest) {
            smallest = arr[i]
        }
        if (arr[i] > largest) {
            largest = arr[i]
        }
    }

    let slope = (largest-smallest) / (arr.length-1)

    for (let i = 0; i < arr.length; i++){
        // find x value
        // y = mx + b (b is 0)
        // x = y/m

        let x = Math.floor(arr[i]/slope)

        // if a bin does not exist make one for this value
        if (rtn[x]) {
          insertInOrder(rtn[x], arr[i])
        }else {
            rtn[x] = [arr[i]]
        }
    }


    // console.log(rtn);
    let final = []
    for (let el of rtn) {
      if (el)
        flat(el).forEach(e => final.push(e))
    }
    return final;
}

function flat(arr1) {
  return arr1.reduce((acc, val) => acc.concat(val), []);
}
function insertInOrder(arr, val) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] > val) {
            arr.splice(i, 0, val)
            return;
        }
    }
    arr[arr.length] = val;
}

let example = [1,3,2,5,10,6,7,9,8,4,10]
// console.log(graphSort(example));


function generateRandomArray(len, size) {
    let rtn = []
    for (let i = 0; i < len; i++) {
        rtn.push(Math.random() * size + 1)
    }
    return rtn;
}

// let randomArr = generateRandomArray(50, 100);
// console.log(randomArr.sort((a, b) => a - b));
// console.log(graphSort(randomArr));

// console.log('sorted', checkSort(randomArr.sort((a, b) => a - b), graphSort(randomArr)))

function checkSort(original, sorted) {
    // check sorted
    for(let i = 0; i < sorted.length-1; i++) {
        if (sorted[i] > sorted[i+1]){
            return false
        }
        if (sorted[i] != original[i]) {
            console.log(sorted[i], original[i]);
            return false
        }
    }
    return true
}


/* Other sorts to test against */
function swap(array, i, j) {
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
// -------------------------------
  function selectionSort(array) {
    for(var i = 0; i < array.length; i++) {
      var min = i;
      for(var j = i + 1; j < array.length; j++) {
        if(array[j] < array[min]) {
          min = j;
        }
      }
      if(i !== min) {
        swap(array, i, min);
      }
    }
    return array;
  }
 // -------------------------------

 // -------------------------------
 function bubbleSort(array) {
    var swapped;
    do {
      swapped = false;
      for(var i = 0; i < array.length; i++) {
        if(array[i] && array[i + 1] && array[i] > array[i + 1]) {
          swap(array, i, i + 1);
          swapped = true;
        }
      }
    } while(swapped);
    return array;
  }
  // -------------------------------

  // -------------------------------
//   function quicksortBasic(array) {
//     if(array.length < 2) {
//       return array;
//     }

//     var pivot = array[0];
//     var lesser = [];
//     var greater = [];

//     for(var i = 1; i < array.length; i++) {
//       if(array[i] < pivot) {
//         lesser.push(array[i]);
//       } else {
//         greater.push(array[i]);
//       }
//     }

//     return quicksortBasic(lesser).concat(pivot, quicksortBasic(greater));
//   }
// -------------------------------

// -------------------------------
  function mergeSort(array) {
    if(array.length < 2) {
      return array;
    }

    var middle = Math.floor(array.length / 2);
    var left = array.slice(0, middle);
    var right = array.slice(middle);

    return merge(mergeSort(left), mergeSort(right));
  }
  function merge(left, right) {
    var array = [];

    while(left.length && right.length) {
      if(left[0] < right[0]) {
        array.push(left.shift());
      } else {
        array.push(right.shift());
      }
    }
    return array.concat(left.slice()).concat(right.slice());
  }

  // -------------------------------
  function insertionSort(array) {
    for(var i = 0; i < array.length; i++) {
      var temp = array[i];
      var j = i - 1;
      while (j >= 0 && array[j] > temp) {
        array[j + 1] = array[j];
        j--;
      }
      array[j + 1] = temp;
    }
    return array;
  }
  // -------------------------------


function runTest(name, sort) {
  let arrSize = 100000 // # of elements
  let variance = 1000; // numbers 1-1000
  let ranArr1 = generateRandomArray(arrSize, variance);
  let ranArr2 = generateRandomArray(arrSize, variance);
  let ranArr3 = generateRandomArray(arrSize, variance);

  console.time(name)
  sort(ranArr1);
  sort(ranArr2);
  sort(ranArr3);
  console.timeEnd(name)

}

function systemSort(){
  let arrSize = 100000 // # of elements
  let variance = 1000; // numbers 1-1000
  let ranArr1 = generateRandomArray(arrSize, variance);
  let ranArr2 = generateRandomArray(arrSize, variance);
  let ranArr3 = generateRandomArray(arrSize, variance);

  console.time('system')
  ranArr1.sort((a,b) => a-b)
  ranArr2.sort((a,b) => a-b)
  ranArr3.sort((a,b) => a-b)
  console.timeEnd('system')

}

function runTimeTests() {

    runTest('selection', selectionSort);
    // runTest('bubble', bubbleSort);
    runTest('insertion', insertionSort);
    runTest('merge', mergeSort);
    runTest('graph', graphSort);
    systemSort()
}

function runCheckSorted() {
  let ranArr1 = generateRandomArray(10000, 1000);
  let ranArr2 = generateRandomArray(10000, 1000);
  let ranArr3 = generateRandomArray(10000, 1000);

  let sorted1 = ranArr1.sort((a,b) => a-b)
  let sorted2 = ranArr2.sort((a,b) => a-b)
  let sorted3 = ranArr3.sort((a,b) => a-b)

  let gsort1 = graphSort(ranArr1);
  let gsort2 = graphSort(ranArr2);
  let gsort3 = graphSort(ranArr3);

  for (let i = 0; i < sorted1.length; i++ ){
    if (sorted1[i]!= gsort1[i]) {
      console.log('NOT SORTED (1)');
      return
    }
  }
  for (let i = 0; i < sorted2.length; i++ ){
    if (sorted2[i]!= gsort2[i]) {
      console.log('NOT SORTED (2)');
      return
    }
  }
  for (let i = 0; i < sorted3.length; i++ ){
    if (sorted3[i]!= gsort3[i]) {
      console.log('NOT SORTED (3)');
      return
    }
  }

  console.log('Sorted');
}

// runTimeTests();

runCheckSorted();
