const testCase1 = "LZ"; 
const testCase2 = "L Z";
const testCase3 = "LLZ";
const testCase4 = "LZZ  L";
const testCase5 = "L   Z";
const testCase6 = "   LZ";
const testCase7 = "  ";
const testCase8 = "ZZZZLLLLL";
const testCase9 = "ZLZLZLZLZL";
const testCase10 = "Z  ZL  ZLL";
const testCase11 = "ZLZL  ZLZL";
const testCase12 = "ZL   ";
const testCase13 = "LLLL";

const lionAndZebraArrangement = testCase8;
let isLionPresent = false;
let isZebraPresent = false;
let minimumDistance = lionAndZebraArrangement.length;

for(let indexOfCurrentLion = 0; indexOfCurrentLion < lionAndZebraArrangement.length; indexOfCurrentLion++){
  let currentLion = lionAndZebraArrangement[indexOfCurrentLion];

  if(currentLion === "L"){
    isLionPresent = true;

    for(let indexOfCurrentZebra = 0; indexOfCurrentZebra < lionAndZebraArrangement.length; indexOfCurrentZebra++){
      let currentZebra = lionAndZebraArrangement[indexOfCurrentZebra];

      if(currentZebra === "Z"){
        isZebraPresent = true;

        let currentDistance = indexOfCurrentLion > indexOfCurrentZebra ? indexOfCurrentLion - indexOfCurrentZebra - 1 : indexOfCurrentZebra - indexOfCurrentLion - 1;
        if(currentDistance < minimumDistance){
          minimumDistance = currentDistance;
        }
      }
    }
  }
}

const finalCalculatedDistance = isLionPresent && isZebraPresent ? minimumDistance : -1;
console.log("Input: ", lionAndZebraArrangement, "\nOutput: ", finalCalculatedDistance);
